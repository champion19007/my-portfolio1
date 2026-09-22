/* =====================================================================
   THE CHOSEN ONE — a screen-by-screen exploration game.

   Each painted image IS one stage, exactly one screen wide. Walk to the
   right edge and the screen fades into the next place. The ground is
   painted into the artwork, so a stage needs only four numbers: where the
   feet sit, how zoomed the art is, and how far left and right the solid
   ground reaches.

   The character walks, runs and jumps. That is the whole verb list.

   Art: GandalfHardcore.
   ===================================================================== */
(() => {
'use strict';

/* ------------------------------------------------------------------ *
 * 1. Constants
 * ------------------------------------------------------------------ */

const VIEW_W = 512;          // one stage is exactly this wide
const VIEW_H = 288;
const STEP   = 1 / 60;

/* Movement is expressed in character-heights rather than pixels: every
   value below is multiplied by the stage's zoom, so a close-up screen and
   a wide one show the same stride. */
const GRAVITY       = 1000;
const MAX_FALL      = 420;
const WALK_SPEED    = 42;
const RUN_SPEED     = 86;
const RUN_RAMP      = 0.8;   // seconds of holding a direction before running
const ACCEL         = 600;
const FRICTION      = 1000;
const JUMP_VELOCITY = -300;
const COYOTE_TIME   = 0.10;
const JUMP_BUFFER   = 0.12;

const FADE_TIME = 0.72;      // full fade out-and-in between stages

/* Character sheet: 800x448 => 80x64 frames, 10 cols x 7 rows.
   The art is drawn FACING LEFT, so facing right is the mirrored case —
   the opposite of the usual convention. Measured with the sword layer
   removed, the body sits at x 31..49 and the soles land on the frame
   bottom. */
const F_W = 80, F_H = 64;
const BODY_W  = 18;
const BODY_CX = 40;          // body's centre line inside the 80px frame

const ANIM = {
  idle: { row: 0, frames: 5, fps: 7,  loop: true  },
  walk: { row: 1, frames: 8, fps: 10, loop: true  },
  run:  { row: 2, frames: 8, fps: 13, loop: true  },
  jump: { row: 3, frames: 4, fps: 10, loop: false },
  fall: { row: 4, frames: 4, fps: 8,  loop: false },
  /* The sheet's last row is a collapse: upright, a slow sink, then prone.
     Started partway in it reads as lying down rather than falling over,
     and its final two frames differ enough to breathe on a loop. `from`
     is the column the clip starts at. */
  doze:  { row: 6, from: 3, frames: 7, fps: 9,   loop: false },
  sleep: { row: 6, from: 8, frames: 2, fps: 1.6, loop: true  },
  // and the same seven frames played backwards to get him up again
  wake:  { row: 6, from: 3, frames: 7, fps: 18,  loop: false, rev: true },
};

const SLEEP_AFTER = 6.5;    // seconds of standing still before he nods off

/* ------------------------------------------------------------------ *
 * 2. The stages
 *
 *   feetY    where the soles sit, measured off the characters painted
 *            into each image so the hero stands on the same ground they do
 *   scale    the art's zoom, measured the same way
 *   x0 / x1  how far the solid ground reaches. Water is not ground.
 *   flip     mirror the artwork horizontally
 *
 * The last entry is the hidden one: it is not part of the walk, and the
 * only way in is through the gate.
 * ------------------------------------------------------------------ */

const STAGES = [
  /* Behind the start, and the only stage you see whole.
     The art is a cutaway of a house, 1120x928, so cover-fitting it would
     put three quarters of the building off the top of the frame. It is
     contained instead: the picture shrinks until all of it fits and the
     sides letterbox. That is what makes the upper floors somewhere you
     can actually go.

     The geometry below is traced from a collision map drawn over the art
     and converted with x = 82.21 + 0.31034*xi, y = 0.31034*yi, taking the
     TOP edge of each line as the surface. It reads bottom to top as one
     unbroken chain - every segment's end meets exactly one other's, which
     is what keeps each junction unambiguous and the whole house walkable
     without a key:

       garden - door steps - hall - cellar steps - stairwell foot
          |
       flight B (up-left) - turn - flight A (up-right) - half landing
          |
       flight C (up-left) - solar

     Three painted areas are deliberately left out, because a stair that
     meets a floor in the MIDDLE of its run cannot be walked onto without
     asking the player which way they meant: the fireplace corner west of
     the stair head, the cellar west of the stairwell, and the little
     mezzanine the flights pass. They stay as scenery.                  */
  { slug:'manor',   src:'manor.gif',   title:'The Manor',       feetY:248, scale:0.60,
    /* x0 is chosen so that x0 + halfW lands exactly on 123.8, the foot of
       the switchback and the westmost surface in the house. Any lower and
       the hero can be clamped onto a strip with no floor under it, which
       a jump will find sooner or later; any higher and he cannot reach
       the turn. */
    x0:118.4, x1:427, flip:true, fit:'contain', mat:'#0b0d15',
    // no jumping inside the house; the garden past the door steps is fine
    noJump: [[0, 332]],
    floors: [
      { y:169.4, x0:133.4, x1:301.6 },   // the solar, the lit floor upstairs
      /* Ledges the map draws above the solar. The low one on the right is
         within a jump of it; the others are not, but they are here so that
         a hero who reaches them by any route has something to stand on
         rather than passing through the roof. */
      { y:139.0, x0:192.4, x1:230.6 },   // the attic floor
      { y:110.8, x0:291.1, x1:308.4 },   // the high ledge, east
      { y:149.6, x0:298.8, x1:310.3 },   // the low ledge, east
      { y:139.7, x0: 89.3, x1:100.2 },   // the shelf, west
      { y:199.6, x0:151.1, x1:160.4 },   // the half landing between flights
      { y:268.1, x0:158.9, x1:171.9 },   // foot of the stairwell
      { y:248.3, x0:189.6, x1:331.4 },   // the hall, where most of the house is
      { y:268.4, x0:349.7, x1:470   },   // the garden - runs past x1 so the
                                         // stage edge, not a wall, ends it
    ],
    /* Walls, [x, top, bottom]. The map draws these from the solar floor
       upward; they are carried a little higher here (to y 130) because a
       jumping hero would otherwise sail over the top of one and land
       outside the house. */
    walls: [
      [299.4, 130,   171.9],           // east end of the solar
      [ 89.7, 130,   170  ],           // west end of the solar
      [192.4, 108.6, 139.4],           // the attic, left
      [230.6,  89.1, 139.4],           // the attic, right
    ],
    ramps: [
      [133.4, 169.4, 160.4, 199.6],      // flight C, solar down to the landing
      [123.8, 228.7, 151.1, 199.6],      // flight A, the turn up to the landing
      [123.8, 228.7, 158.9, 268.1],      // flight B, the turn down to the cellar
      [171.9, 268.1, 189.6, 248.3],      // cellar steps, up to the hall
      [331.4, 248.3, 349.7, 268.4],      // door steps, hall down to the garden
    ],
    npcs: [
      { x:360, feet:268.4, sayTop: true, face:"raven", name:"By the Door", role:"You are walking backwards",
        text:"The road runs the other way, friend - everything worth hearing is east of here. Though while you are in: the stair is at the bottom of the house, it turns twice on the way up, and there is someone at the top worth the climb." },
      { x:255, feet:248.3, face:"helm-slit2", name:"The Steward", role:"Education",
        text:"B.Tech in Computer Science Engineering, AI &amp; ML - Manipal University Jaipur, December 2025." },
      { x:174, feet:169.4, face:"queen", name:"In the Solar", role:"Papers & Prizes",
        text:"He has spoken at IEEE and at the American Control Conference, and took first place at the Codestellation CodeWar 4.0 hackathon. His chess-engine paper is on IEEE Xplore - the swineherd two stages east will tell you about it." },
    ] },




  // The game opens here.
  { slug:'cottage', src:'cottage.gif', title:'Harvest Cottage', feetY:243, scale:1.30,
    x0: 20, x1:492,
    npcs: [
      { x:305, face:"dusk", name:"The Cottager", role:"Sai Yashwant Reddy Panthy",
        text:"AI/ML engineer. He builds LLM and RAG applications, computer vision systems, and the backend and MLOps plumbing that keeps them running — document intelligence, distributed self-play, ROS2 robotics, automated pipelines." },
    ] },

  /* The market is where the built things get talked about. These are the
     real repositories, not a tidied-up version of them. */
  { slug:'market',  src:'market.gif',  title:'The Market',      feetY:250, scale:1.10,
    x0: 20, x1:492, sayTop: true,   // the stalls run along the foot of the frame
    npcs: [
      { x: 70, face:"elf", name:"The Herbalist", role:"CareNest — healthcare booking for India",
        text:"Clinic visits, video consults, lab tests, surgery and vet care in one place. Next.js 16 over Postgres across three schemas. The clever part is a <b>map-free area search</b> — a pre-computed proximity graph with hand-authored adjacency instead of geocoding calls." },
      { x:150, face:"frost", name:"The Fruit Seller", role:"QWERTY Studio — anti-detect browser",
        text:"A self-hosted alternative to GoLogin and Multilogin. Most fingerprint tools randomise each value on its own, which is exactly what gets them caught — this one draws every value from a single realistic device archetype so they stay <b>coherent</b>. Python, Playwright, React." },
      { x:245, face:"wizard-blue", name:"The Blue Wizard", role:"agentd — a runner that repairs itself",
        text:"Scheduled checks over external sources. When a source changes shape and the extraction breaks, it detects the failure and proposes a verified repair for a human to approve. Go, SQLite, MCP plugins, hexagonal architecture with the boundaries enforced by import-graph tests." },
      { x:345, face:"knight-cross", name:"The Knight", role:"PDF AI SaaS — ask your own documents",
        text:"A RAG application over uploaded PDFs: ingestion, chunking, embedding generation, semantic retrieval and context-aware answers, behind REST endpoints. LangChain, the OpenAI API and Pinecone." },
      { x:450, face:"sunny", name:"The Armourer", role:"MLOps, end to end",
        text:"Six repositories of it — MLOps-Forge, an end-to-end data pipeline, a bank-churn pipeline, a CV MLOps project, and CI/CD on AWS with CodePipeline, CodeDeploy and CloudFormation." },
    ] },

  { slug:'croft',   src:'croft.gif',   title:'The Croft',       feetY:237, scale:1.45,
    x0: 24, x1:488,
    npcs: [
      { x:160, face:"auburn", name:"The Swineherd", role:"Research — ACROSET 2025, IEEE Xplore",
        text:"A hybrid chess engine welding Minimax, MCTS and reinforcement learning from human feedback. Ten million self-play games across distributed CPU workers — 100 to 150 Elo above baseline. Written twice, once in Python and once in C++. <a href='https://ieeexplore.ieee.org/abstract/document/11280596' target='_blank' rel='noopener'>Read the paper</a>." },
      { x:307, face:"ginger", name:"At the Cauldron", role:"Smaller things, still shipped",
        text:"A Yelp-based restaurant recommender, a Zoom-lite clone, ChatSphere and an FCM chat app, a Pac-Man in Java — and a platformer in Godot called <b>The Adventures of the Heroic Fox</b>." },
    ] },

  // Everyone camped here has worked somewhere.
  { slug:'tent',    src:'tent.gif',    title:'The Encampment',  feetY:244, scale:2.00,
    x0: 22, x1:490,
    npcs: [
      { x:100, face:"hazel", name:"By the Reeds", role:"Main Flow Services · Software Intern",
        text:"Jul–Nov 2024. He trained YOLO models for object detection and shipped ROS2 systems in Docker — sensors, control modules, automated data pipelines and PLC-driven motors." },
      { x:190, face:"gold", name:"The Woman in Red", role:"Deloitte · Data Analytics Trainee",
        text:"Oct–Nov 2025. A forensic technology simulation built around business investigation workflows. He cleaned and classified the records in Excel, then built a Tableau dashboard to make the patterns arguable." },
      { x:250, face:"crimson", name:"At the Barrel", role:"BCG · Data Science Intern",
        text:"Nov 2025 – Jan 2026. Customer churn analysis in Python, Pandas and NumPy. He tuned a Random Forest to 50% recall and carried the findings up into an executive summary." },
      { x:292, face:"blonde", name:"The Woman in White", role:"JPMorgan Chase · Quantitative Researcher",
        text:"Feb–Apr 2026. He read a book of loans to estimate each customer’s probability of default, using dynamic programming to turn raw FICO scores into categorical bands the model could use." },
      { x:462, face:"ranger", name:"The Cook", role:"Tata Group · Gen AI Data Analyst",
        text:"Jan–Jul 2026. GenAI exploratory analysis to judge data quality and surface risk. He proposed a no-code framework for scoring customer delinquency, and an agentic collections strategy with ethics and compliance written into it." },
    ] },

  { slug:'farm',    src:'farm.gif',    title:'The Farmstead',   feetY:246, scale:2.50,
    x0: 28, x1:484,
    npcs: [
      { x:305, face:"copper", name:"The Milkmaid", role:"Languages, Models, Vision",
        text:"Python, SQL, JavaScript and TypeScript, Bash, C++ and some Go. For the models: PyTorch, TensorFlow, scikit-learn, OpenCV and Hugging Face Transformers — regression, classification, clustering, time series, CNNs, transformers, NLP and object detection." },
      { x:425, face:"hooded", name:"The Farmhand", role:"Agents, Pipelines, Cloud",
        text:"LangChain and the OpenAI API, RAG pipelines, Pinecone, embeddings, prompt engineering and agentic tool–planner–memory patterns. Docker, Git, Linux, MLflow, Weights &amp; Biases, CI/CD, and AWS — CodePipeline, CodeDeploy, CloudFormation." },
    ] },

  { slug:'gate',    src:'gate.gif',    title:'The Gate',        feetY:234, scale:3.00,
    x0: 30, x1:482,
    // x/w is the trigger band, cx is the painted mound's centre line
    portal: { x: 275, w: 190, cx: 356, label: 'THE GATE' },
    npcs: [
      { x:85, face:"knight-plume", name:"The Gatekeeper", role:"What He Is Working On",
        text:"Most recently Gen AI Data Analyst at Tata Group, through the first half of 2026. His work sits in AI and ML — LLM and RAG applications, computer vision, and the backend and MLOps infrastructure that carries them." },
    ] },

  { slug:'falls',   src:'falls.gif',   title:'The Falls',       feetY:236, scale:2.25,
    x0: 10, x1: 86,
    // The bank here is barely wider than the hero, so he arrives at the
    // water's edge looking across at the chest rather than on top of the
    // woman already painted on the left.
    entryX: 62, end: true,
    npcs: [
      { x:32, face:"bloom", name:"Watcher at the Falls", role:"How to Reach Him",
        text:"<a href='mailto:saiyashwantreddypanthy@gmail.com'>saiyashwantreddypanthy@gmail.com</a> · <a href='https://github.com/champion19007' target='_blank' rel='noopener'>GitHub</a> · <a href='https://www.linkedin.com/in/saiyashwantreddy' target='_blank' rel='noopener'>LinkedIn</a>" },
    ] },

  // ---- hidden: only reachable through the gate ----
  { slug:'winter',  src:'winter.gif',  title:'Winter Watch',    feetY:206, scale:2.50,
    x0: 60, x1:420,
    entryX: 96, secret: true, backTo: 'gate',
    npcs: [
      { x:118, face:"knight-slit", name:"The Knight", role:"Real-Time Animal Detection",
        text:"Computer vision on live CCTV — a model watching video streams and flagging animals as they appear, for safety monitoring. Built on OpenVision." },
      { x:180, face:"helm", name:"The Shieldmaiden", role:"Advanced Stock Forecaster",
        text:"A CNN-BiLSTM-GRU stack reading historical market data for what comes next. Three architectures trained and compared to see which actually caught the time-based structure." },
      { x:345, face:"helm-ornate", name:"The Second Knight", role:"The Adventures of the Heroic Fox",
        text:"A platformer written in Godot, in GDScript. Not everything he builds has a model in it." },
      { x:395, face:"wizard-navy", name:"The Wizard", role:"You found the hidden place",
        text:"Everything you have been told here is real and public. <a href='https://github.com/champion19007?tab=repositories' target='_blank' rel='noopener'>Go and read the source</a>." },
    ] },
];

const START_INDEX = 1;                   // Autumn Camp
const SECRET      = STAGES.findIndex(s => s.secret);
const WALK_LAST   = SECRET - 1;          // last stage of the ordinary walk

const WALK_N = WALK_LAST + 1;            // how many stages the counter knows about

/* ------------------------------------------------------------------ *
 * 3. Assets
 * ------------------------------------------------------------------ */

const SOURCES = {
  hero:    'assets/sprites/hero.png',
  'npc-b': 'assets/sprites/npc-b.png',
};
for (const s of STAGES) SOURCES['stage_' + s.slug] = 'assets/stages/' + s.src;

const IMG = {};

/* Animated GIFs only advance while the browser considers the <img> to be
   painting, which makes them unreliable as a source of motion. The still
   <img> here is only ever a fallback; the animated stages are decoded
   below and played from the game loop instead. */
function assetHolder() {
  let el = document.getElementById('asset-holder');
  if (!el) {
    el = document.createElement('div');
    el.id = 'asset-holder';
    el.setAttribute('aria-hidden', 'true');
    el.style.cssText = 'position:fixed;left:0;bottom:0;width:2px;height:2px;' +
                       'overflow:hidden;opacity:0.02;pointer-events:none;z-index:-1';
    document.body.appendChild(el);
  }
  return el;
}

function loadOne(name) {
  return new Promise(resolve => {
    const img = new Image();
    img.alt = '';
    img.style.cssText = 'position:absolute;left:0;top:0;width:2px;height:2px';
    img.onload = img.onerror = () => { IMG[name] = img; resolve(); };
    img.src = SOURCES[name];
    assetHolder().appendChild(img);
  });
}

/* Load in two passes so the loading screen has something to show: the
   hero first, then everything else with a progress callback. */
async function loadAssets(onProgress) {
  await loadOne('hero');
  const rest = Object.keys(SOURCES).filter(n => n !== 'hero');
  let done = 0;
  onProgress(1 / (rest.length + 1));
  await Promise.all(rest.map(n => loadOne(n).then(() => {
    onProgress(++done / (rest.length + 1) + 1 / (rest.length + 1));
  })));
  onProgress(1);
}

/* ---- animated stages -------------------------------------------- *
   Decoded once with WebCodecs and played from the game loop, which puts
   the timing under our control and makes the result identical
   everywhere. Lazy per stage, small LRU cache, downscaled at decode time
   to the resolution the screen actually needs. Without ImageDecoder the
   stage simply stays still. */

const MAX_GIF_FRAMES = 14;
const GIF_CACHE_MAX  = 3;
const DECODE_CAP_PX  = 1600;   // no source here is wider; guards a 4K window
const STAGE_BUDGET   = 34e6;   // bytes of decoded frames we will hold per stage

const gifCache = new Map();
const decoding = new Set();
let   gifClock = 0;

const isAnimated = st => st.src.endsWith('.gif');

async function decodeStage(st) {
  if (!isAnimated(st) || gifCache.has(st.slug) || decoding.has(st.slug)) return;
  if (typeof ImageDecoder === 'undefined') return;
  decoding.add(st.slug);
  try {
    const buf = await (await fetch('assets/stages/' + st.src)).arrayBuffer();
    const dec = new ImageDecoder({ data: buf, type: 'image/gif' });
    await dec.tracks.ready;      // tracks.ready, not completed: selectedTrack
    await dec.completed;         // is still null when only `completed` has run

    const count = dec.tracks.selectedTrack.frameCount || 1;

    /* Decode at the size the screen will actually show, not at the design
       size. Holding frames at 512 wide and then drawing them across 1280
       real pixels is exactly the blur we are trying to remove. Never
       larger than the source though — upscaling into the cache would cost
       memory and add nothing. */
    const probe = await dec.decode({ frameIndex: 0 });
    const nw = probe.image.displayWidth, nh = probe.image.displayHeight;
    probe.image.close();

    /* How wide this art is actually drawn. A contained stage is letterboxed
       down to a fraction of the frame, so decoding it at full window width
       would hold pixels nobody ever sees. */
    const shownW = st.fit === 'contain'
      ? nw * Math.min(VIEW_W / nw, VIEW_H / nh)
      : VIEW_W;
    let wantW = Math.min(nw, DECODE_CAP_PX, Math.max(VIEW_W, Math.ceil(shownW * view.k)));
    let scale = wantW / nw;
    let fw = Math.round(nw * scale), fh = Math.round(nh * scale);

    /* Resolution and smoothness both come out of the same budget, and a
       long animation held at full width would be cut to four or five
       frames - a slideshow. So if that is where we are heading, trade a
       little sharpness back for frames until about WANT_FRAMES fit. */
    const WANT_FRAMES = 10;
    const maxPx = STAGE_BUDGET / Math.min(count, WANT_FRAMES) / 4;
    if (fw * fh > maxPx) {
      const k = Math.sqrt(maxPx / (fw * fh));
      fw = Math.round(fw * k); fh = Math.round(fh * k);
      scale = fw / nw;
    }

    // Bigger frames mean fewer of them; the loop still reads the whole
    // animation, just at a coarser stride.
    const budgetFrames = Math.max(4, Math.floor(STAGE_BUDGET / (fw * fh * 4)));
    const cap  = Math.min(MAX_GIF_FRAMES, budgetFrames);
    const step = Math.max(1, Math.ceil(count / cap));

    const frames = [], durs = [];
    for (let i = 0; i < count; i += step) {
      const { image } = await dec.decode({ frameIndex: i });
      frames.push(scale < 0.999
        ? await createImageBitmap(image, { resizeWidth: fw, resizeHeight: fh, resizeQuality: 'high' })
        : await createImageBitmap(image));
      durs.push(((image.duration ?? 80000) / 1e6) * step);   // microseconds -> seconds
      image.close();
    }
    dec.close();

    if (frames.length) {
      gifCache.set(st.slug, { frames, durs, total: durs.reduce((a, b) => a + b, 0), used: performance.now() });
      trimGifCache();
    }
  } catch (err) {
    // Any failure just means this stage stays a still image.
  } finally {
    decoding.delete(st.slug);
  }
}

function trimGifCache() {
  while (gifCache.size > GIF_CACHE_MAX) {
    let oldest = null;
    for (const [k, v] of gifCache) if (!oldest || v.used < gifCache.get(oldest).used) oldest = k;
    gifCache.get(oldest).frames.forEach(b => b.close && b.close());
    gifCache.delete(oldest);
  }
}

function warmStages() {
  for (const i of [stageIndex, stageIndex + 1, stageIndex - 1]) {
    if (i >= 0 && i < STAGES.length) decodeStage(STAGES[i]);
  }
  if (stage().portal) decodeStage(STAGES[SECRET]); // the gate leads here
}

function gifFrame(slug) {
  const g = gifCache.get(slug);
  if (!g) return null;
  g.used = performance.now();
  let t = gifClock % g.total;
  for (let i = 0; i < g.frames.length; i++) {
    t -= g.durs[i];
    if (t < 0) return g.frames[i];
  }
  return g.frames[g.frames.length - 1];
}

/* Where a stage's artwork lands inside the 512x288 design rect.
   Returns a source rect (which part of the file) and a destination rect
   (where it goes), because the two fits need different things:

     cover   - the default. Scale up until the frame is full, throw away
               the overflow, anchor to the bottom so the painted ground
               sits on the bottom edge. Destination is the whole frame.
     contain - scale down until the WHOLE picture fits, and letterbox the
               rest. A stage that is a building rather than a landscape
               has to be seen entire or its upper floors are off-screen,
               and no crop can rescue that. Source is the whole file. */
function fitRect(img, st) {
  // naturalWidth for an <img> (these are styled tiny, so `width` reports
  // the layout size); plain width/height for a decoded bitmap.
  const nw = img.naturalWidth || img.width, nh = img.naturalHeight || img.height;
  const crop = st && st.crop;

  /* A stage may nominate a sub-rectangle of its own artwork to use, which
     zooms the scene up without touching the file. */
  const ox = crop ? crop[0] : 0, oy = crop ? crop[1] : 0;
  const iw = crop ? crop[2] - crop[0] : nw;
  const ih = crop ? crop[3] - crop[1] : nh;

  if (st && st.fit === 'contain') {
    const s = Math.min(VIEW_W / iw, VIEW_H / ih);
    const dw = iw * s, dh = ih * s;
    return { sx: ox, sy: oy, sw: iw, sh: ih,
             dx: (VIEW_W - dw) / 2, dy: (VIEW_H - dh) / 2, dw, dh };
  }

  const s = Math.max(VIEW_W / iw, VIEW_H / ih);
  const sw = VIEW_W / s, sh = VIEW_H / s;
  return { sx: ox + (iw - sw) / 2, sy: oy + ih - sh, sw, sh,
           dx: 0, dy: 0, dw: VIEW_W, dh: VIEW_H };
}

/* ------------------------------------------------------------------ *
 * 4. World state
 * ------------------------------------------------------------------ */

let stageIndex = 0;
const visited = new Set();

/* A stage change is a fade through black rather than a slide. The stages
   are shot at different zooms and their ground lines sit at different
   heights, so sliding two of them past each other never lined up; going
   dark in the middle hides the change completely. */
let fade = null;             // { dir, from, to, t, swapped }

const player = {
  x: 0,                      // centre of the body, screen coordinates
  feet: 0,                   // y of the soles
  vx: 0, vy: 0,
  dir: 1,                    // +1 right, -1 left
  onGround: true, coyote: 0, held: 0,
  surf: 0, park: 0, still: 0, waking: 0,
  anim: 'idle', frame: 0, clock: 0,
};

let titleCard = 0;

const stage = () => STAGES[stageIndex];
const halfW = () => (BODY_W / 2) * stage().scale;

/* ------------------------------------------------------------------ *
 * 5. Input — move, and jump. That is all.
 * ------------------------------------------------------------------ */

const keys = { left: false, right: false, jump: false, up: false };
const KEYMAP = {
  ArrowLeft: 'left',  KeyA: 'left',
  ArrowRight:'right', KeyD: 'right',
  ArrowUp:   'up',    KeyE: 'up',
  KeyW:      'jump',  Space: 'jump',
};

let running = false;
let paused  = false;
let jumpBuffer = 0;
let togglePause = () => {};   // assigned once the menus exist

function bindInput(canvas) {
  addEventListener('keydown', e => {
    if (e.code === 'Escape') {
      if (closePanels()) { e.preventDefault(); return; }
      if (running) { togglePause(); e.preventDefault(); return; }
    }
    const k = KEYMAP[e.code];
    if (!k || !running || paused) return;
    if (k === 'jump' && !keys.jump) jumpBuffer = JUMP_BUFFER;
    keys[k] = true;
    if (document.activeElement === canvas &&
        ['Space','ArrowUp','ArrowLeft','ArrowRight','ArrowDown'].includes(e.code)) e.preventDefault();
  });
  addEventListener('keyup', e => { const k = KEYMAP[e.code]; if (k) keys[k] = false; });
  addEventListener('blur', () => Object.keys(keys).forEach(k => (keys[k] = false)));

  document.querySelectorAll('#touchpad button').forEach(btn => {
    const k = btn.dataset.key;
    if (!(k in keys)) return;
    const on  = e => { e.preventDefault(); if (k === 'jump' && !keys.jump) jumpBuffer = JUMP_BUFFER; keys[k] = true; };
    const off = e => { e.preventDefault(); keys[k] = false; };
    btn.addEventListener('pointerdown', on);
    btn.addEventListener('pointerup', off);
    btn.addEventListener('pointerleave', off);
    btn.addEventListener('pointercancel', off);
  });
}

/* ------------------------------------------------------------------ *
 * 6. Animation helpers
 * ------------------------------------------------------------------ */

function setAnim(e, name) {
  if (e.anim === name) return;
  e.anim = name; e.frame = 0; e.clock = 0;
}

function advanceAnim(e, dt) {
  const a = ANIM[e.anim];
  e.clock += dt;
  const dur = 1 / a.fps;
  while (e.clock >= dur) {
    e.clock -= dur;
    if (a.loop) e.frame = (e.frame + 1) % a.frames;
    else if (e.frame < a.frames - 1) e.frame++;
  }
}

/* ------------------------------------------------------------------ *
 * 7. The player
 * ------------------------------------------------------------------ */

/* ---- standing on things ----
   Most stages are one painted ground line: feetY, from x0 to x1. A stage
   that is a building rather than a landscape has several, at different
   heights and overlapping in x - the hall runs above the cellar, the
   solar above the hall, and a staircase crosses both on its way between
   them. So the ground is not y = f(x): at one x there can be three
   answers, and which one is right depends on where the hero already is.

   The hero therefore remembers the segment he is standing on. He keeps it
   while it covers him, and only when he walks off one of its ends does he
   look for another whose end meets it. That is what makes a staircase
   walkable: its foot and its head are endpoints, so he steps onto it
   there and nowhere else, and the floors it crosses in between are simply
   not offered.

   `floors` are level slabs, `ramps` are [x0,y0,x1,y1] slopes - stairs are
   just steep ramps. Both are in design coordinates. */
const STEP_UP = 6;   // design px of rise the hero takes in his stride
const JOIN    = 0.75; // how close an end has to be to count as meeting

function surfaces(st) {
  if (st._surf) return st._surf;
  const out = [];
  for (const f of (st.floors || [])) out.push({ x0: f.x0, x1: f.x1, y0: f.y, y1: f.y });
  for (const r of (st.ramps || [])) {
    // stored left-to-right so the interpolation never divides by a negative run
    const [a, b] = r[0] <= r[2] ? [[r[0], r[1]], [r[2], r[3]]]
                                : [[r[2], r[3]], [r[0], r[1]]];
    out.push({ x0: a[0], x1: b[0], y0: a[1], y1: b[1] });
  }
  /* A single-ground stage gets one slab, run well past its own bounds so
     that walking off the edge of the painting stays the business of the
     stage-transition code rather than being stopped dead here. */
  if (!out.length) out.push({ x0: st.x0 - 80, x1: st.x1 + 80, y0: st.feetY, y1: st.feetY });
  return (st._surf = out);
}

const surfaceY = (s, x) =>
  s.y0 === s.y1 ? s.y0 : s.y0 + (s.y1 - s.y0) * ((x - s.x0) / (s.x1 - s.x0));

const clampTo = (s, x) => Math.min(Math.max(x, s.x0), s.x1);
const covers  = (s, x) => x >= s.x0 - JOIN && x <= s.x1 + JOIN;

/* The segment whose end meets this point: near enough in x, and within a
   stride in y. Prefer one that carries on the way the hero is walking. */
function stepTo(segs, x, feet, dir, exclude) {
  let best = -1, bestScore = Infinity;
  for (let i = 0; i < segs.length; i++) {
    if (i === exclude) continue;
    const s = segs[i];
    if (!covers(s, x)) continue;
    const d = Math.abs(surfaceY(s, clampTo(s, x)) - feet);
    if (d > STEP_UP) continue;
    const score = (onward(s, x, dir) ? 0 : 1000) + d;
    if (score < bestScore) { bestScore = score; best = i; }
  }
  return best;
}

// Does this segment continue the way he is walking, or does it lie behind him?
const onward = (s, x, dir) => dir > 0 ? s.x1 > x + JOIN : s.x0 < x - JOIN;

// Is there anything under him to fall to?
function anythingBelow(segs, x, feet) {
  for (const s of segs) {
    if (x < s.x0 || x > s.x1) continue;
    if (surfaceY(s, x) > feet + STEP_UP) return true;
  }
  return false;
}

/* Settle the hero onto the world after his position has been integrated.
   `prevFeet` is where his soles were before the step, which is what makes
   the landing test a sweep - a fast fall cannot pass through a floor
   between two frames. */
function settle(st, p, prevFeet) {
  const segs = surfaces(st);

  if (p.onGround) {
    const s = segs[p.surf];
    /* Strict bounds here, not the join tolerance. The tolerance is for
       deciding whether another run's END meets this point; using it to
       decide whether he is STILL on this one means that a step smaller
       than the tolerance leaves him inside the margin, clamped back to
       the end, and unable ever to leave - which is exactly what a slow
       walk down a steep ramp produces. */
    if (s && p.x >= s.x0 && p.x <= s.x1) {   // still on it: follow it up or down
      p.x = clampTo(s, p.x);
      p.feet = surfaceY(s, p.x); p.vy = 0;
      if (p.x > s.x0 + JOIN && p.x < s.x1 - JOIN) p.park = 0;   // well clear of the end
      return;
    }

    const dir = Math.sign(p.vx) || p.dir;

    /* Parked: he has already been put down at the end of a run and is
       still leaning the same way. Without this he would shuttle between
       the two segments that meet there, one per frame, and which one he
       came to rest on would be a coin toss. */
    if (p.park === dir && s) {
      p.x = clampTo(s, p.x);
      p.feet = surfaceY(s, p.x); p.vx = 0; p.vy = 0;
      return;
    }

    /* Look from the END of the run he is leaving, not from wherever the
       overshoot put him. Two segments that begin at the same x - a stair
       whose foot is the end of the floor - are otherwise both out of
       range at the same moment, and he steps onto neither. */
    const t = stepTo(segs, s ? clampTo(s, p.x) : p.x, prevFeet, dir, p.surf);
    if (t >= 0) {
      p.surf = t;
      p.x = clampTo(segs[t], p.x);
      p.feet = surfaceY(segs[t], p.x); p.vy = 0;
      /* The segment he stepped onto runs back the way he came - the foot
         of a stair, or the turn of a switchback. Put him on it and stop
         him dead. He carries on by turning round, which is exactly what a
         half-landing asks of you. */
      if (!onward(segs[t], p.x, dir)) {
        p.vx = 0; p.park = dir;
        // Face along the run he has just stepped onto. At the turn of a
        // switchback that is the only cue the player gets for which way to
        // press next, and it costs nothing to give it.
        p.dir = -dir;
      }
      return;
    }
    if (anythingBelow(segs, p.x, prevFeet)) { p.onGround = false; p.surf = -1; return; }
    if (s) {                               // a wall: nothing across, nothing below
      p.x = clampTo(s, p.x);
      p.feet = surfaceY(s, p.x); p.vx = 0; p.vy = 0; p.park = dir;
    }
    return;
  }

  if (p.vy < 0) return;                    // still rising: floors are one-way
  let best = -1, bestY = Infinity;
  for (let i = 0; i < segs.length; i++) {
    const s = segs[i];
    if (p.x < s.x0 || p.x > s.x1) continue;
    const y = surfaceY(s, p.x);
    if (prevFeet <= y + 0.01 && p.feet >= y && y < bestY) { bestY = y; best = i; }
  }
  if (best >= 0) {
    p.surf = best; p.park = 0;
    p.feet = bestY; p.vy = 0; p.onGround = true;
  }
}

// Where the hero is put down when he is placed on a stage rather than
// arriving under his own weight: the topmost surface at that x.
function dropOnto(st, x) {
  const segs = surfaces(st);
  let best = -1, bestY = Infinity;
  for (let i = 0; i < segs.length; i++) {
    const s = segs[i];
    if (x < s.x0 || x > s.x1) continue;
    const y = surfaceY(s, x);
    if (y < bestY) { bestY = y; best = i; }
  }
  // null, not a guess: callers need to know when there is nothing here
  return best >= 0 ? { surf: best, feet: bestY } : null;
}

function placeOnStage(fromLeft) {
  const st = stage();
  player.x = st.entryX !== undefined
    ? st.entryX
    : (fromLeft ? st.x0 + halfW() + 4 : st.x1 - halfW() - 4);
  const d = dropOnto(st, player.x);
  player.feet = st.entryFeet !== undefined ? st.entryFeet : (d ? d.feet : st.feetY);
  player.surf = d ? d.surf : 0; player.park = 0; player.still = 0; player.waking = 0;
  player.vy = 0;
  player.onGround = true;
}

function resetPlayer() {
  placeOnStage(true);
  player.vx = 0;
  player.dir = 1;
  setAnim(player, 'idle');
}

function updatePlayer(dt) {
  const p = player;
  const st = stage();
  const z = st.scale;
  jumpBuffer = Math.max(0, jumpBuffer - dt);

  /* ---- stroll, then break into a run if the direction is held ---- */
  let wants = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);

  /* Getting up takes a moment and he cannot walk through it. Brief enough
     not to read as input lag, long enough to see him stand. */
  if (p.waking > 0) { p.waking = Math.max(0, p.waking - dt); wants = 0; p.vx = 0; }
  if (wants !== 0) { p.dir = wants; p.held = Math.min(RUN_RAMP, p.held + dt); }
  else p.held = 0;

  /* Hold the pace ALONG the ground rather than across it. A 48-degree
     staircase taken at full walking speed looks like the hero is being
     winched up it - and on the way down he outruns his own legs. Dividing
     by the slope's hypotenuse makes a stair cost what a stair should. */
  let top = (WALK_SPEED + (RUN_SPEED - WALK_SPEED) * (p.held / RUN_RAMP)) * z;
  if (p.onGround) {
    const seg = surfaces(st)[p.surf];
    if (seg && seg.y0 !== seg.y1) {
      top /= Math.hypot(1, (seg.y1 - seg.y0) / (seg.x1 - seg.x0));
    }
  }
  const target = wants * top;

  if (wants !== 0) {
    p.vx += Math.sign(target - p.vx) * ACCEL * z * dt;
    if (Math.abs(p.vx) > Math.abs(target)) p.vx = target;
  } else {
    const drop = FRICTION * z * dt * (p.onGround ? 1 : 0.35);
    p.vx = Math.abs(p.vx) <= drop ? 0 : p.vx - Math.sign(p.vx) * drop;
  }

  // Mid-fade the hero keeps walking the way he was going, so he is
  // already moving when the next stage appears.
  if (fade) { p.vx = fade.dir * Math.max(top, WALK_SPEED * z); p.dir = fade.dir; }

  /* ---- jump ---- */
  if (p.onGround) p.coyote = COYOTE_TIME;
  else p.coyote = Math.max(0, p.coyote - dt);

  /* Indoors nobody jumps. The manor is walkable end to end without one,
     and a jump under a low ceiling only finds the seams between storeys -
     clipping a ledge, or landing somewhere the stairs were meant to be
     the way to. Outside the front door it is allowed again. */
  const penned = (st.noJump || []).some(b => p.x >= b[0] && p.x <= b[1]);

  // and nobody jumps straight out of a lying-down pose: the tap that
  // wakes him is spent on standing up, not on launching him
  const abed = p.waking > 0 || p.anim === 'sleep' || p.anim === 'doze';

  if (jumpBuffer > 0 && p.coyote > 0 && !fade && !penned && !abed) {
    p.vy = JUMP_VELOCITY * z;
    p.onGround = false; p.coyote = 0; jumpBuffer = 0;
    setAnim(p, 'jump');
  }

  p.vy += GRAVITY * z * dt;
  tuneJump(p, dt, z);
  if (p.vy > MAX_FALL * z) p.vy = MAX_FALL * z;

  /* ---- integrate, then settle onto the painted ground ---- */
  const prevFeet = p.feet, prevX = p.x;
  p.x += p.vx * dt;
  p.feet += p.vy * dt;

  /* A ceiling at the top of the frame. A stage drawn at 3x zoom gives the
     hero a jump taller than he is, and without this his head leaves the
     picture entirely - most obvious at the gate, where the arc puts him a
     clear body-length above the sky. */
  const headroom = 45 * z;
  if (p.feet < headroom) { p.feet = headroom; if (p.vy < 0) p.vy = 0; }

  settle(st, p, prevFeet);

  /* ---- the floor of last resort ----
     Falling out of the picture should be impossible, and when it happens
     it is unrecoverable: there is nothing below to land on, so the hero
     drops forever and the stage is lost. A stage with several storeys has
     more gaps to get this wrong in than one painted ground line ever did,
     so rather than trust the geometry, catch him and stand him back up on
     whatever is nearest. */
  if (p.feet > VIEW_H + 60) {
    const back = dropOnto(st, p.x);
    if (back) { p.surf = back.surf; p.feet = back.feet; p.vy = 0; p.vx = 0; p.park = 0; p.onGround = true; }
    else placeOnStage(true);
  }

  /* ---- walls ----
     A floor can end at a wall rather than at a drop. Without one the hero
     walks off the east end of the solar and falls into the hall, which is
     not what the house looks like. Each wall is [x, yTop, yBottom] in
     design coordinates and only bites while his soles are between them,
     so a wall on one storey does not block the floor above or below. */
  for (const w of (st.walls || [])) {
    const [wx, wy0, wy1] = w;
    if (p.feet < wy0 || p.feet > wy1) continue;
    const half = halfW();
    if (prevX + half <= wx + 0.01 && p.x + half > wx)      { p.x = wx - half; p.vx = 0; }
    else if (prevX - half >= wx - 0.01 && p.x - half < wx) { p.x = wx + half; p.vx = 0; }
  }

  /* Nobody is solid. A villager standing mid-stage would otherwise wall
     off the only route onward, and the hero draws on top anyway, so
     walking past reads as passing in front of them. */

  /* ---- edges. x0/x1 are the limits of solid ground: past them is
         water, a cliff or the end of the painting, never somewhere to
         stand, so they are walls unless a stage waits beyond. ---- */
  if (!fade) {
    const hw = halfW();
    const rightTo = (st.end || st.secret || stageIndex >= WALK_LAST)
      ? null : stageIndex + 1;
    // The secret's exit is named, not numbered: an index here would drift
    // every time a stage is added or removed ahead of it.
    const back    = STAGES.findIndex(x => x.slug === st.backTo);
    const leftTo  = st.secret ? (back >= 0 ? back : null)
                              : (stageIndex > 0 ? stageIndex - 1 : null);

    if (p.x + hw > st.x1 && p.vx > 0 && rightTo !== null)     startFade(+1, rightTo);
    else if (p.x - hw < st.x0 && p.vx < 0 && leftTo !== null) startFade(-1, leftTo);
    else p.x = Math.max(st.x0 + hw, Math.min(st.x1 - hw, p.x));
  } else {
    // Mid-fade he keeps striding, but he is still standing on painted
    // ground until the screen is fully dark — and on a stage that ends in
    // a cliff, walking past the edge would show him out over the drop
    // while there is still light to see it by.
    const hw = halfW();
    p.x = Math.max(st.x0 + hw, Math.min(st.x1 - hw, p.x));
  }

  /* ---- animation ---- */
  /* How long he has been left alone. Anything at all resets it, being
     spoken to included - he is not going to fall asleep while somebody is
     telling him about their life's work. */
  const busy = !p.onGround || wants !== 0 || keys.jump || keys.up
            || Math.abs(p.vx) > 2 * z || fade || speaking;
  p.still = busy ? 0 : p.still + dt;

  // roused: stand up before anything else
  if ((p.anim === 'sleep' || p.anim === 'doze') && busy && p.waking <= 0) {
    p.waking = ANIM.wake.frames / ANIM.wake.fps;
  }

  if (p.waking > 0)                             setAnim(p, 'wake');
  else if (!p.onGround)                         setAnim(p, p.vy < 0 ? 'jump' : 'fall');
  // thresholds against `top`, not the flat walk speed, so a hero climbing
  // a stair at two thirds pace still plays the walk cycle
  else if (Math.abs(p.vx) > top * 0.82 && p.held >= RUN_RAMP * 0.9) setAnim(p, 'run');
  else if (Math.abs(p.vx) > 2 * z)                 setAnim(p, 'walk');
  else if (p.still > SLEEP_AFTER)  setAnim(p, p.anim === 'sleep' ? 'sleep' : 'doze');
  else                                             setAnim(p, 'idle');
  advanceAnim(p, dt);

  // the lying-down runs once; after its last frame he just breathes
  if (p.anim === 'doze' && p.frame >= ANIM.doze.frames - 1) setAnim(p, 'sleep');

  /* ---- anyone close enough to speak? ----
     Several stages are crowded, so the nearest one wins: walking along a
     line of people hands you from one to the next instead of letting the
     first one in the list hold the floor. */
  const reach = Math.max(52, Math.min(110, 34 * z));
  let near = null, bestD = Infinity;
  for (const who of (st.npcs || [])) {
    // On a stage with floors, someone one storey up is not "close" however
    // near they are in x.
    if (Math.abs(p.feet - feetOf(st, who)) > 20) continue;
    const d = Math.abs(p.x - who.x);
    if (d < reach && d < bestD) { bestD = d; near = who; }
  }
  setSpeaker(near);

  /* ---- the gate ---- */
  const g = st.portal;
  const atGate = g && !fade && p.x > g.x && p.x < g.x + g.w;
  setPrompt(atGate ? g : null);
  if (atGate && keys.up) { keys.up = false; startFade(+1, SECRET); }
}

/* ------------------------------------------------------------------ *
 * 8. Fading between stages
 * ------------------------------------------------------------------ */

function startFade(dir, to) {
  if (fade || to < 0 || to >= STAGES.length) return;
  fade = { dir, from: stageIndex, to, t: 0, swapped: false };
  setPrompt(null);
  setSpeaker(null);
}

function updateFade(dt) {
  if (!fade) return;
  fade.t += dt;

  // Swap at the darkest point, so the change of zoom and ground line is
  // never seen.
  if (!fade.swapped && fade.t >= FADE_TIME / 2) {
    fade.swapped = true;
    stageIndex = fade.to;
    visited.add(stageIndex);
    placeOnStage(fade.dir > 0);
    warmStages();
  }
  if (fade.t >= FADE_TIME) { fade = null; titleCard = 2.2; }
}

const fadeVeil = () => {
  if (!fade) return 0;
  const h = FADE_TIME / 2;
  return fade.t < h ? fade.t / h : Math.max(0, 1 - (fade.t - h) / h);
};

/* ------------------------------------------------------------------ *
 * 9. Rendering
 * ------------------------------------------------------------------ */

let ctx, canvasEl;

/* The design space stays 512x288 — every feetY, scale and bound in the
   stage table is measured in it — but the canvas is sized to COVER the
   window so there are no letterbox bars. The overflow is cropped, and
   the crop is biased upward (VERT_ANCHOR) because the top of a stage is
   sky and the bottom is the ground the hero stands on. */
const VERT_ANCHOR = 0.72;   // crop the sky, keep the ground
const MAX_OVERSCAN = 1.15;  // how much of the picture we will throw away
const MAX_DPR = 2;          // past this the buffer costs more than it shows

/* view.s  CSS pixels per design pixel
   view.k  DEVICE pixels per design pixel  (what we actually draw at)
   view.ox/oy  where the design rect sits inside the buffer            */
const view = { s: 1, k: 1, ox: 0, oy: 0 };

/* The canvas is exactly the window, backed at device resolution, and the
   512x288 design space is mapped onto it with a transform. Drawing code
   keeps working in design coordinates while every pixel it produces is a
   real screen pixel — so a 1280px painting is drawn into 1280px of canvas
   instead of being crushed to 512 and stretched back out. */
function fit() {
  if (!canvasEl) return;
  const W = innerWidth, H = innerHeight;
  const dpr = Math.min(devicePixelRatio || 1, MAX_DPR);

  canvasEl.style.width  = W + 'px';
  canvasEl.style.height = H + 'px';
  canvasEl.style.left = '0px';
  canvasEl.style.top  = '0px';

  const bw = Math.round(W * dpr), bh = Math.round(H * dpr);
  if (canvasEl.width !== bw || canvasEl.height !== bh) {
    canvasEl.width = bw; canvasEl.height = bh;
  }

  /* Cover the window, but never overscan past MAX_OVERSCAN — on a narrow
     or near-square window a true cover would crop away the hero. */
  const cover   = Math.max(W / VIEW_W, H / VIEW_H);
  const contain = Math.min(W / VIEW_W, H / VIEW_H);
  const s = Math.min(cover, contain * MAX_OVERSCAN);
  const k = s * dpr;

  const dw = VIEW_W * k, dh = VIEW_H * k;
  const anchor = dh > bh ? VERT_ANCHOR : 0.5;

  view.s = s;
  view.k = k;
  view.ox = Math.round((bw - dw) / 2);
  view.oy = Math.round((bh - dh) * anchor);
}

/* Which part of the design space is actually on screen. The on-canvas UI
   is positioned against this rather than against 0,0, so a counter or a
   title card never ends up in the cropped margin on an odd-shaped window. */
function safeArea() {
  const visW = Math.min(VIEW_W, innerWidth / view.s);
  const visH = Math.min(VIEW_H, innerHeight / view.s);
  const anchor = visH < VIEW_H ? VERT_ANCHOR : 0.5;
  return {
    x: (VIEW_W - visW) / 2,
    y: (VIEW_H - visH) * anchor,
    w: visW, h: visH,
  };
}

function drawStage(index) {
  const st  = STAGES[index];
  const src = gifFrame(st.slug) || IMG['stage_' + st.slug];
  if (!src || !(src.naturalWidth || src.width)) {
    ctx.fillStyle = '#2b2e42';
    ctx.fillRect(0, 0, VIEW_W, VIEW_H);
    return;
  }
  const key = '_fit_' + st.slug;
  const r = src[key] || (src[key] = fitRect(src, st));

  // A contained stage leaves bars; paint them out first so the previous
  // stage does not show through at the sides.
  if (r.dw < VIEW_W || r.dh < VIEW_H) {
    ctx.fillStyle = st.mat || '#0a0c13';
    ctx.fillRect(0, 0, VIEW_W, VIEW_H);
  }

  /* Nearest-neighbour is right for blowing pixel art UP and wrong for
     shrinking it DOWN, where it point-samples and throws detail away.
     So pick per draw, based on which way this plate is actually going. */
  const srcToScreen = (r.dw * view.k) / r.sw;
  ctx.imageSmoothingEnabled = srcToScreen < 0.995;
  ctx.imageSmoothingQuality = 'high';

  if (st.flip) {
    ctx.save();
    ctx.translate(VIEW_W, 0);
    ctx.scale(-1, 1);
    // mirrored, so the destination's left edge measures from the far side
    ctx.drawImage(src, r.sx, r.sy, r.sw, r.sh,
                  VIEW_W - r.dx - r.dw, r.dy, r.dw, r.dh);
    ctx.restore();
  } else {
    ctx.drawImage(src, r.sx, r.sy, r.sw, r.sh, r.dx, r.dy, r.dw, r.dh);
  }
  ctx.imageSmoothingEnabled = false;
}

/* The sheet is drawn facing LEFT, so dir > 0 is the mirrored case.
   `x` is the body's centre line and `feet` is the sole of the boot. */
function drawHero(x, feet, z) {
  const sheet = IMG.hero;
  if (!sheet || !sheet.naturalWidth) return;
  const a = ANIM[player.anim];
  const w = F_W * z, h = F_H * z;

  ctx.save();
  ctx.globalAlpha = 0.22;
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.ellipse(x, feet - 1, 7 * z, 2.4 * z, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  const col = a.rev ? a.frames - 1 - player.frame : player.frame;
  const sx = ((a.from || 0) + col) * F_W, sy = a.row * F_H;
  ctx.imageSmoothingEnabled = false;
  ctx.save();
  if (player.dir > 0) {
    ctx.translate(Math.round(x + (F_W - BODY_CX) * z), Math.round(feet - h));
    ctx.scale(-1, 1);
    ctx.drawImage(sheet, sx, sy, F_W, F_H, 0, 0, w, h);
  } else {
    ctx.drawImage(sheet, sx, sy, F_W, F_H,
                  Math.round(x - BODY_CX * z), Math.round(feet - h), w, h);
  }
  ctx.restore();
}

/* Three z's drifting off a sleeping hero. Drawn rather than spritesheeted
   because the game already owns this typeface - the gate's label and the
   NPC bubbles are the same eight pixels. */
function drawSleepZs(t) {
  if (player.anim !== 'sleep') return;
  const z = stage().scale;
  const hx = player.x + (player.dir > 0 ? 9 : -9) * z;   // over his head
  ctx.save();
  ctx.font = '8px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ece7dc';
  for (let i = 0; i < 3; i++) {
    const k = (t * 0.42 + i / 3) % 1;                    // each one rises and fades
    ctx.globalAlpha = Math.max(0, 0.85 - k * 0.95);
    ctx.fillText('z', hx + k * 9, player.feet - 9 * z - k * 20);
  }
  ctx.restore();
}

/* Stages whose artwork already has someone standing in it use that painted
   person as the speaker; the two that do not get a villager drawn in. */
function drawNpcs(t) {
  const st = stage();
  for (const n of (st.npcs || [])) drawOneNpc(st, n, t);
}

// A villager on a stage with more than one floor carries the height of
// the one they are standing on.
const feetOf = (st, n) => (n.feet !== undefined ? n.feet : st.feetY);

function drawOneNpc(st, n, t) {
  const z = st.scale;

  if (n.sprite) {
    const sheet = IMG[n.sprite];
    if (sheet && sheet.naturalWidth) {
      const a = ANIM.idle;
      const frame = Math.floor(t * a.fps) % a.frames;
      const w = F_W * z, h = F_H * z;
      // turn to face whoever is walking up
      const faceRight = player.x > n.x;
      ctx.imageSmoothingEnabled = false;
      ctx.save();
      if (faceRight) {
        ctx.translate(Math.round(n.x + (F_W - BODY_CX) * z), Math.round(feetOf(st, n) - h));
        ctx.scale(-1, 1);
        ctx.drawImage(sheet, ((a.from || 0) + frame) * F_W, a.row * F_H, F_W, F_H, 0, 0, w, h);
      } else {
        ctx.drawImage(sheet, ((a.from || 0) + frame) * F_W, a.row * F_H, F_W, F_H,
                      Math.round(n.x - BODY_CX * z), Math.round(feetOf(st, n) - h), w, h);
      }
      ctx.restore();
    }
  }

  // A little bubble so you can tell who is worth walking up to. It goes
  // away once they are actually talking.
  if (speaking === n) return;
  const bob = Math.sin(t * 3) * 2;
  const y = feetOf(st, n) - 45 * z - 16 + bob;
  ctx.fillStyle = 'rgba(12,15,24,0.86)';
  ctx.fillRect(n.x - 12, y, 24, 14);
  ctx.strokeStyle = 'rgba(232,177,58,0.85)';
  ctx.strokeRect(n.x - 11.5, y + 0.5, 23, 13);
  ctx.fillStyle = '#e8b13a';
  for (let i = 0; i < 3; i++) ctx.fillRect(n.x - 7 + i * 5, y + 6, 3, 2);
}

function glow(x, y, r, color) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, color);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(x - r, y - r, r * 2, r * 2);
}

function drawGate(t) {
  const g = stage().portal;
  if (!g) return;
  const cx = g.cx ?? (g.x + g.w / 2);
  const cy = stage().feetY - 40;
  glow(cx, cy, 64, 'rgba(168,48,58,0.30)');
  glow(cx, cy, 30, 'rgba(232,177,58,0.20)');

  const lift = Math.sin(t * 2) * 2;
  ctx.font = '8px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  const w = ctx.measureText(g.label).width + 12;
  ctx.fillStyle = 'rgba(27,30,46,0.85)';
  ctx.fillRect(cx - w / 2, cy - 78 + lift, w, 15);
  ctx.fillStyle = '#e8b13a';
  ctx.fillText(g.label, cx, cy - 67 + lift);
  ctx.textAlign = 'left';
}

function drawTitleCard() {
  if (titleCard <= 0) return;
  const sa = safeArea();
  const a = Math.min(1, titleCard / 0.5) * Math.min(1, (2.2 - titleCard) / 0.3);
  ctx.globalAlpha = Math.max(0, Math.min(1, a));
  ctx.font = '10px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  const label = stage().title;
  const w = ctx.measureText(label).width + 30;
  const cx = sa.x + sa.w / 2, y = sa.y + 26;
  ctx.fillStyle = 'rgba(12,15,24,0.88)';
  ctx.fillRect(cx - w / 2, y, w, 26);
  ctx.strokeStyle = 'rgba(232,177,58,0.75)';
  ctx.strokeRect(cx - w / 2 + 0.5, y + 0.5, w - 1, 25);
  ctx.fillStyle = '#e8b13a';
  ctx.fillText(label, cx, y + 17);
  ctx.textAlign = 'left';
  ctx.globalAlpha = 1;
}

function drawEdgeHints(t) {
  if (fade) return;
  const st = stage();
  ctx.globalAlpha = 0.3 + 0.25 * Math.sin(t * 3);
  ctx.fillStyle = '#e8b13a';
  ctx.font = '10px "Press Start 2P", monospace';
  const sa = safeArea();
  if (!st.end && !st.secret && stageIndex < WALK_LAST) {
    ctx.textAlign = 'right'; ctx.fillText('▶', sa.x + sa.w - 9, sa.y + sa.h / 2);
  }
  if (stageIndex > 0 || st.secret) {
    ctx.textAlign = 'left'; ctx.fillText('◀', sa.x + 9, sa.y + sa.h / 2);
  }
  ctx.textAlign = 'left';
  ctx.globalAlpha = 1;
}

function render(t) {
  // Paint the whole buffer first: on an odd-shaped window the design rect
  // does not reach the edges, and that margin should be the void colour.
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = '#0c0f18';
  ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

  // From here on everything draws in 512x288 design coordinates.
  ctx.setTransform(view.k, 0, 0, view.k, view.ox, view.oy);
  ctx.imageSmoothingEnabled = false;

  drawStage(stageIndex);
  drawGate(t);
  drawNpcs(t);
  drawHero(player.x, player.feet, stage().scale);
  drawSleepZs(t);

  // A little top shade so the labels stay legible over bright skies.
  const v = ctx.createLinearGradient(0, 0, 0, VIEW_H);
  v.addColorStop(0, 'rgba(27,30,46,0.24)');
  v.addColorStop(0.3, 'rgba(27,30,46,0)');
  ctx.fillStyle = v;
  ctx.fillRect(0, 0, VIEW_W, VIEW_H);

  drawEdgeHints(t);
  drawTitleCard();

  const veil = fadeVeil();
  if (veil > 0) {
    ctx.fillStyle = `rgba(17,19,30,${veil})`;
    ctx.fillRect(0, 0, VIEW_W, VIEW_H);
  }
}

/* ------------------------------------------------------------------ *
 * 10. The gate
 * ------------------------------------------------------------------ */

/* ---- the nav panels ---- */
const panels = [...document.querySelectorAll('.panel')];

function closePanels() {
  let any = false;
  for (const el of panels) if (!el.hidden) { el.hidden = true; any = true; }
  if (any) {
    const c = document.getElementById('game');
    if (c) c.focus();
  }
  return any;
}

function openPanel(name) {
  closePanels();
  const el = document.getElementById('p-' + name);
  if (!el) return;
  if (name === 'map') fillMap();
  el.hidden = false;
  Object.keys(keys).forEach(k => (keys[k] = false));   // don't walk while reading
}

/* The map is built from the stage table, so it can never drift out of step
   with the world the way a hand-written list would. */
function fillMap() {
  const grid = document.getElementById('mapGrid');
  const note = document.getElementById('mapNote');
  if (!grid) return;
  grid.innerHTML = '';
  STAGES.forEach((st, i) => {
    if (st.secret && !visited.has(i)) return;          // don't spoil it
    const cell = document.createElement('div');
    cell.className = 'cell'
      + (i === stageIndex ? ' here' : '')
      + (!visited.has(i) && i !== stageIndex ? ' unseen' : '');
    /* A plate of the place itself. The stage art is already in the browser
       cache by now, so this costs a decode and nothing else. */
    cell.innerHTML =
      `<img class="shot" src="assets/stages/${st.src}" alt="" loading="lazy">`
      + `<b>${st.secret ? '✦' : i + 1}</b><span>${st.title}</span>`;
    grid.appendChild(cell);
  });
  if (note) {
    const seen = STAGES.filter((st, i) => !st.secret && (visited.has(i) || i === stageIndex)).length;
    note.textContent = `${seen} of ${WALK_N} seen. Walk right to move on — and there is one place the walk never takes you.`;
  }
}

const toast = document.getElementById('toast');
let promptFor = null;

/* ---- who is talking ---- */
const sayEl   = document.getElementById('say');
const sayName = document.getElementById('sayName');
const sayRole = document.getElementById('sayRole');
const sayText = document.getElementById('sayText');
let speaking  = null;

/* Who is talking. Each NPC names a bust in assets/faces; the ones with
   no bust yet - the men who are not in full armour - simply show none,
   and the box closes up around the text. */
const sayFace = document.getElementById('sayFace');

function showFace(n) {
  if (!sayFace) return;
  if (!n.face) { sayFace.hidden = true; sayFace.removeAttribute('src'); return; }
  const want = 'assets/faces/' + n.face + '.png';
  if (!sayFace.src.endsWith(want)) sayFace.src = want;
  sayFace.hidden = false;
}

function setSpeaker(n) {
  if (n === speaking) return;
  speaking = n;
  if (!n) { sayEl.hidden = true; return; }
  const st = stage();
  // The subject leads and the speaker's name is the footnote: what they
  // are telling you matters more than which villager is telling it.
  sayRole.textContent = n.role;
  sayName.textContent = n.name;
  sayText.innerHTML   = n.text;
  // Some stages crowd their people along the bottom of the frame, where a
  // box at the foot of the screen would cover the very thing being talked
  // about. Those put it at the top instead.
  sayEl.classList.toggle('top', !!(n.sayTop || st.sayTop));
  showFace(n);
  sayEl.hidden = false;
}

function setPrompt(g) {
  if (g === promptFor) return;
  promptFor = g;
  if (!g) { toast.hidden = true; return; }
  toast.textContent = `▲  ENTER  ${g.label}`;
  toast.hidden = false;
}

/* ------------------------------------------------------------------ *
 * 12. Main loop
 * ------------------------------------------------------------------ */

let acc = 0, last = 0, elapsed = 0, visible = true;

function frame(now) {
  requestAnimationFrame(frame);
  if (!last) last = now;
  let dt = (now - last) / 1000;
  last = now;
  if (dt > 0.25) dt = 0.25;           // the tab was backgrounded

  if (running && visible && !paused) {
    acc += dt;
    while (acc >= STEP) {
      elapsed  += STEP;
      gifClock += STEP;
      titleCard = Math.max(0, titleCard - STEP);
      updatePlayer(STEP);
      updateFade(STEP);
      acc -= STEP;
    }
  }
  render(elapsed);
}

/* ------------------------------------------------------------------ *
 * 13. Boot
 * ------------------------------------------------------------------ */

async function boot() {
  canvasEl = document.getElementById('game');
  ctx = canvasEl.getContext('2d');
  canvasEl.setAttribute('tabindex', '0');

  /* The button bar wraps onto more rows as the window narrows, and the
     dialogue has to stay above it or it buries the only way into the
     panels. Measuring beats guessing a breakpoint. */
  const measureChrome = () => {
    const t = document.getElementById('tools');
    const h = t && !t.hidden ? t.getBoundingClientRect().height : 0;
    document.documentElement.style.setProperty('--tools-h', Math.ceil(h) + 'px');
  };
  window.measureChrome = measureChrome;

  fit();
  addEventListener('resize', () => { fit(); measureChrome(); });
  addEventListener('orientationchange', fit);

  // #stage=<slug> starts on that stage. Handy while tuning a single
  // screen; harmless otherwise.
  stageIndex = START_INDEX;
  const want = /stage=([a-z]+)/.exec(location.hash || '');
  if (want) {
    const i = STAGES.findIndex(s => s.slug === want[1]);
    if (i >= 0) stageIndex = i;
  }

  /* ---- a phone has to be turned first ----
     The stage is a 16:9 painting. Held upright a phone would show it as a
     thin letterbox with a hero a few pixels tall, so the game waits: the
     loading screen does not even begin until the handset is sideways, and
     the minimum dwell below is timed from the moment it is. */
  const rotateEl = document.getElementById('rotate');
  const loaderEl = document.getElementById('loader');

  /* One test for "this is a handset", used by both the rotate gate and the
     layout. A media query alone would do it, but hanging a class off <html>
     keeps the two in step and means the phone layout can be switched on by
     hand to look at. */
  const onPhone = () => matchMedia('(hover: none) and (pointer: coarse)').matches;
  const syncTouch = () => document.documentElement.classList.toggle('touch', onPhone());
  addEventListener('resize', syncTouch);
  syncTouch();

  const mustTurn = () => onPhone() && innerHeight > innerWidth;

  if (rotateEl && mustTurn()) {
    rotateEl.hidden = false;
    if (loaderEl) loaderEl.hidden = true;        // do not start the bar behind it
    await new Promise(done => {
      const look = () => {
        if (mustTurn()) return;
        removeEventListener('resize', look);
        removeEventListener('orientationchange', turned);
        rotateEl.hidden = true;
        if (loaderEl) loaderEl.hidden = false;
        fit();
        done();
      };
      // orientationchange fires before the new size is readable, so look again
      const turned = () => setTimeout(look, 180);
      addEventListener('resize', look);
      addEventListener('orientationchange', turned);
    });
  }
  // and if it is turned back mid-game, ask again
  if (rotateEl) {
    const watch = () => { rotateEl.hidden = !mustTurn(); };
    addEventListener('resize', watch);
    addEventListener('orientationchange', () => setTimeout(watch, 180));
  }

  /* ---- loading screen ----
     A first visit holds the painted screen for MIN_FIRST no matter how fast
     the assets land: it is the front door of the site and deserves to be
     looked at. A return visit only needs long enough to not flicker, so it
     gets MIN_AGAIN. The bar is paced against whichever floor applies, so it
     fills across the whole wait instead of snapping to 100% and sitting
     there - a bar that finishes early reads as a hang, not as speed. */
  const MIN_FIRST = 3400, MIN_AGAIN = 700;
  let seen = false;
  try { seen = localStorage.getItem('tco-seen') === '1'; } catch (e) {}
  const MIN_MS = seen ? MIN_AGAIN : MIN_FIRST;
  const t0 = performance.now();

  const loader = loaderEl;
  const barFill = document.getElementById('barFill');
  const pctEl   = document.getElementById('pct');

  let shown = 0, target = 0, spinning = true, slast = performance.now();
  (function tick(now) {
    if (!spinning) return;
    const dt = Math.min(0.1, (now - slast) / 1000); slast = now;
    // never run ahead of the floor, and never claim more than really loaded
    const paced = Math.min(target, (now - t0) / MIN_MS);
    // ease the bar toward that figure so it never snaps
    shown += (paced - shown) * (1 - Math.pow(0.002, dt));
    const pc = Math.round(shown * 100);
    if (barFill) barFill.style.width = pc + '%';
    if (pctEl) pctEl.textContent = pc + '%';
    requestAnimationFrame(tick);
  })(performance.now());

  await loadAssets(p => { target = p; });
  warmStages();
  resetPlayer();
  bindInput(canvasEl);

  // hold out the rest of the floor, then let the bar visibly finish
  const left = MIN_MS - (performance.now() - t0);
  if (left > 0) await new Promise(r => setTimeout(r, left));
  await new Promise(r => setTimeout(r, 220));
  spinning = false;
  try { localStorage.setItem('tco-seen', '1'); } catch (e) {}
  if (barFill) barFill.style.width = '100%';
  if (pctEl) pctEl.textContent = '100%';
  await new Promise(r => setTimeout(r, 180));
  loader.hidden = true;

  /* ---- menus ---- */
  const menu  = document.getElementById('menu');
  const pausePanel = document.getElementById('pause');
  menu.hidden = false;

  const tools = document.getElementById('tools');
  const menuButton = document.getElementById('menuBtn');
  const play = () => {
    menu.hidden = true;
    pausePanel.hidden = true;
    if (tools) tools.hidden = false;
    const tl = document.getElementById('topleft');
    if (tl) tl.hidden = false;
    measureChrome();
    running = true; paused = false;
    visited.add(stageIndex);
    titleCard = 2.2;
    canvasEl.focus();
  };
  document.getElementById('startBtn').addEventListener('click', play);
  document.getElementById('resumeBtn').addEventListener('click', () => setPause(false));
  document.getElementById('restartBtn').addEventListener('click', () => {
    stageIndex = START_INDEX;
    resetPlayer();
    warmStages();
    setPause(false);
  });

  togglePause = () => setPause(!paused);
  window.setPause = setPause;   // handy from the console

  function setPause(on) {
    paused = on;
    pausePanel.hidden = !on;
    if (on) {
      Object.keys(keys).forEach(k => (keys[k] = false));
      setSpeaker(null);
    } else {
      canvasEl.focus();
    }
  }

  /* ---- nav ---- */
  document.querySelectorAll('[data-panel]').forEach(b =>
    b.addEventListener('click', () => openPanel(b.dataset.panel)));
  document.querySelectorAll('.panel .close').forEach(b =>
    b.addEventListener('click', closePanels));
  panels.forEach(el => el.addEventListener('pointerdown', e => {
    if (e.target === el) closePanels();               // click the backdrop to dismiss
  }));

  /* Under the Hood is a tabbed document: one nav, one section shown. */
  const hoodTabs = document.getElementById('hoodTabs');
  if (hoodTabs) {
    hoodTabs.addEventListener('click', e => {
      const b = e.target.closest('button[data-tab]');
      if (!b) return;
      hoodTabs.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
      document.querySelectorAll('[data-panel-tab]').forEach(sec => {
        sec.hidden = sec.dataset.panelTab !== b.dataset.tab;
      });
      const body = document.querySelector('.hood-body');
      if (body) body.scrollTop = 0;
    });
  }

  const menuBtn = document.getElementById('menuBtn');
  if (menuBtn) menuBtn.addEventListener('click', () => setPause(true));

  const fsBtn = document.getElementById('fsBtn');
  if (fsBtn) fsBtn.addEventListener('click', () => {
    const d = document.documentElement;
    try {
      if (document.fullscreenElement) document.exitFullscreen();
      else if (d.requestFullscreen) {
        const r = d.requestFullscreen();
        if (r && r.catch) r.catch(() => {});
      }
    } catch (e) { /* not allowed here; the page is fine as it is */ }
    canvasEl.focus();
  });
  addEventListener('fullscreenchange', () => {
    if (fsBtn) fsBtn.textContent = document.fullscreenElement ? '✕' : '[ ]';
    fit(); measureChrome();
  });

  /* Don't burn a phone battery animating a canvas nobody is looking at.
     This used to be an IntersectionObserver, which was wrong twice over:
     the canvas fills the window and is never scrolled out of view, and if
     it happened to be reported off-screen once - a hidden tab at load,
     say - nothing ever fired again to turn the game back on, so it froze
     for good. requestAnimationFrame already stops for a hidden tab; all
     that is left to do is notice when it comes back. */
  const wake = () => {
    visible = !document.hidden;
    if (visible) last = 0;        // don't bill the player for time away
  };
  document.addEventListener('visibilitychange', wake);
  wake();

  requestAnimationFrame(frame);
}

if (document.readyState === 'loading') addEventListener('DOMContentLoaded', boot);
else boot();

/* ------------------------------------------------------------------ *
 * 14. Jump feel
 * ------------------------------------------------------------------ */

/**
 * Called once per physics step, right after gravity has been applied and
 * before the position is integrated.
 *
 * `p.vy` is in pixels/second, negative is upward.
 * `keys.jump` is true while the jump key is held.
 * `p.onGround` is true when standing on the painted ground.
 * `z` is the stage's zoom — multiply any acceleration you add by it so the
 *     jump keeps the same shape on a close-up stage as on a wide one.
 *
 * Returning without touching p.vy gives a fixed-height jump: playable,
 * but stiff — every tap sends you exactly the same distance.
 */
function tuneJump(p, dt, z) {
  // TODO(human)
}

})();
