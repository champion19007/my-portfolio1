import { redirect } from 'next/navigation';

/* This used to be its own route in a sidebar layout. The written portfolio
   is one scrolling page now, so the URL survives as an anchor rather than
   becoming a 404 for anyone holding an old link. */
export default function Page() {
  redirect('/site#services');
}
