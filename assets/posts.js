/* Post index - the single source of truth for every post.
   Add an entry here and the post appears on the home page and tag filter,
   and gets its <h1>, browser title and subtitle.

   title  -> document.title, post <h1>, home page card
   blurb  -> post subtitle, card description
   date   -> home page ordering only (not displayed)

   Plain script rather than JSON so it also works over file:// */
window.POSTS = [
  {
    slug: 'sinusoidal-positional-encoding-transformers',
    title: 'Sinusoidal Positional Encoding: Giving Transformers a Sense of Order',
    blurb: 'How sine and cosine waves of different frequencies give a transformer a sense of word order, shown as rotating phasors.',
    date: '2026-05-31',
    tags: ['transformers', 'positional-encoding']
  }
];
