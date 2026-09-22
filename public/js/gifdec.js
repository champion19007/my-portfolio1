/* ---- reading a GIF by hand ----

   The animated stages are decoded with WebCodecs' ImageDecoder, which is the
   only way to ask a browser for frame N of a GIF: an <img> animates itself on
   its own clock and, drawn into a canvas, hands back whichever frame it feels
   like - in practice the first one, forever.

   Safari has no ImageDecoder. So on an iPhone every stage sat frozen on frame
   one. There is no second browser API to fall back to, so this reads the file
   itself: colour tables, LZW, disposal and all, out to one RGBA buffer per
   frame. The caller scales those into the same per-stage cache the WebCodecs
   path fills, so from the game loop's side the two are indistinguishable.

   It is about a page of code because GIF is a small format: a screen, then a
   sequence of sub-images that are pasted onto it, each one optionally undoing
   itself afterwards. The only real work is the LZW.

   Frames are yielded one at a time, over a single reused buffer, rather than
   returned as an array. Croft is 1880x950 over 40 frames: held all at once
   that is 285MB, which is not a thing a phone will forgive. The caller scales
   each frame down and lets go of it before asking for the next. Because of
   the reuse, a yielded frame is only valid until the next `next()`.

   The frames cannot be decoded out of order, or skipped: each one is painted
   over the one before, so frame 30 only exists once 0..29 have been drawn.
   Hence a forward-only iterator, and a separate structural pass for the
   count - which the caller needs up front to work out its stride. */

function* gifFrames(buf) {
  const b = new Uint8Array(buf);
  let p = 0;
  const u8  = () => b[p++];
  const u16 = () => (b[p++] | (b[p++] << 8));

  if (b[0] !== 0x47 || b[1] !== 0x49 || b[2] !== 0x46) throw new Error('not a GIF');
  p = 6;                                       // past "GIF89a"

  const width = u16(), height = u16();
  const flags = u8();
  p += 2;                                      // background index, pixel aspect

  const table = n => { const t = b.subarray(p, p + n * 3); p += n * 3; return t; };
  const gct = (flags & 0x80) ? table(2 << (flags & 7)) : null;

  const skipBlocks = () => { let n; while ((n = u8())) p += n; };
  function readBlocks() {                      // LZW data arrives in <=255b chunks
    const parts = []; let n, total = 0;
    while ((n = u8())) { parts.push(b.subarray(p, p + n)); p += n; total += n; }
    const out = new Uint8Array(total); let o = 0;
    for (const part of parts) { out.set(part, o); o += part.length; }
    return out;
  }

  /* GIF's LZW. Codes start at minSize+1 bits and widen each time the table
     fills, up to 12; two codes above the colour indices mean "reset" and
     "done". Strings are stored as a prefix code plus one byte, so a string is
     read back by walking the prefix chain - which yields it backwards, hence
     the stack. The one subtlety is a code that is not in the table yet: it can
     only ever mean "the last string, plus its own first byte". */
  function lzw(minSize, data, count) {
    const out = new Uint8Array(count);
    const clear = 1 << minSize, eoi = clear + 1;
    const prefix = new Int32Array(4096), suffix = new Uint8Array(4096),
          stack  = new Uint8Array(4096);
    for (let c = 0; c < clear; c++) suffix[c] = c;

    let size = minSize + 1, mask = (1 << size) - 1, next = clear + 2;
    let acc = 0, bits = 0, i = 0, o = 0, prev = -1, first = 0, sp = 0;

    while (o < count) {
      while (bits < size) {
        if (i >= data.length) return out;       // truncated: keep what we have
        acc |= data[i++] << bits; bits += 8;
      }
      const code = acc & mask; acc >>>= size; bits -= size;

      if (code === eoi) break;
      if (code === clear) {
        size = minSize + 1; mask = (1 << size) - 1; next = clear + 2; prev = -1;
        continue;
      }
      if (prev === -1) {                        // first code is always literal
        out[o++] = first = suffix[code]; prev = code; continue;
      }

      let cur = code;
      if (code >= next) { stack[sp++] = first; cur = prev; }
      while (cur >= clear) { stack[sp++] = suffix[cur]; cur = prefix[cur]; }
      first = suffix[cur];
      stack[sp++] = first;

      if (next < 4096) {                        // prev + this string's first byte
        prefix[next] = prev; suffix[next] = first; next++;
        if (next > mask && size < 12) { size++; mask = (1 << size) - 1; }
      }
      prev = code;
      while (sp > 0 && o < count) out[o++] = stack[--sp];
      sp = 0;
    }
    return out;
  }

  const screen = new Uint8ClampedArray(width * height * 4);   // composed so far
  let delay = 100, transparent = -1, disposal = 0;

  for (;;) {
    if (p >= b.length) break;
    const block = u8();
    if (block === 0x3B) break;                                // trailer

    if (block === 0x21) {                                     // extension
      if (u8() === 0xF9) {                                    // graphic control
        u8();                                                 // block size (4)
        const f = u8();
        disposal = (f >> 2) & 7;
        delay = u16() * 10;                                   // centiseconds
        const t = u8();
        transparent = (f & 1) ? t : -1;
        u8();                                                 // terminator
      } else skipBlocks();
      continue;
    }
    if (block !== 0x2C) continue;                             // image descriptor

    const fx = u16(), fy = u16(), fw = u16(), fh = u16(), ff = u8();
    const pal = (ff & 0x80) ? table(2 << (ff & 7)) : gct;
    const interlaced = !!(ff & 0x40);
    const idx = lzw(u8(), readBlocks(), fw * fh);
    const undo = disposal === 3 ? screen.slice() : null;

    /* Interlaced GIFs store their rows in four passes, so row n of the data
       is not row n of the image. */
    const row = new Int32Array(fh);
    if (interlaced) {
      let r = 0;
      for (const [start, step] of [[0,8],[4,8],[2,4],[1,2]])
        for (let y = start; y < fh; y += step) row[r++] = y;
    } else for (let y = 0; y < fh; y++) row[y] = y;

    for (let sy = 0; sy < fh; sy++) {
      const dy = fy + row[sy];
      if (dy >= height) continue;
      const sRow = sy * fw, dRow = dy * width;
      for (let sx = 0; sx < fw; sx++) {
        const dx = fx + sx;
        if (dx >= width) continue;
        const ci = idx[sRow + sx];
        if (ci === transparent) continue;                     // shows what is under
        const o = (dRow + dx) * 4, c = ci * 3;
        screen[o] = pal[c]; screen[o+1] = pal[c+1]; screen[o+2] = pal[c+2];
        screen[o+3] = 255;
      }
    }

    yield { data: screen, width, height, delay: delay || 100 };

    if (disposal === 2) {                                     // clear back to nothing
      for (let y = fy; y < Math.min(fy + fh, height); y++)
        for (let x = fx; x < Math.min(fx + fw, width); x++)
          screen[(y * width + x) * 4 + 3] = 0;
    } else if (undo) screen.set(undo);                        // disposal 3: put it back
  }

}

/* How many frames, without doing any of the work of decoding them: walk the
   same block structure but skip every image's LZW payload instead of
   expanding it. Cheap enough to run before deciding anything. */
function gifCount(buf) {
  const b = new Uint8Array(buf);
  let p = 6;
  const u8 = () => b[p++], u16 = () => (b[p++] | (b[p++] << 8));
  const width = u16(), height = u16(), flags = u8();
  p += 2;
  if (flags & 0x80) p += (2 << (flags & 7)) * 3;
  const skip = () => { let n; while ((n = u8())) p += n; };

  let count = 0;
  while (p < b.length) {
    const block = u8();
    if (block === 0x3B) break;
    if (block === 0x21) { u8(); skip(); continue; }
    if (block !== 0x2C) continue;
    p += 8;                                   // left, top, width, height
    const f = u8();
    if (f & 0x80) p += (2 << (f & 7)) * 3;    // local colour table
    u8();                                     // LZW minimum code size
    skip();
    count++;
  }
  return { width, height, count };
}

if (typeof module !== 'undefined') module.exports = { gifFrames, gifCount };
