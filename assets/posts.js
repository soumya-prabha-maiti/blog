/* Post index - the single source of truth for every post.
   Add an entry here and the post appears on the home page and tag filter,
   and gets its <h1>, browser title and subtitle.

   title  -> document.title, post <h1>, home page card
   blurb  -> post subtitle, card description
   date   -> home page ordering only (not displayed)

   Plain script rather than JSON so it also works over file:// */
window.POSTS = [
  {
    slug: 'mlp-forward-pass',
    title: 'Inside a Neural Network: The Forward Pass',
    blurb: 'Draw a digit and watch a one-hidden-layer network turn 256 pixels into a prediction, one neuron at a time.',
    date: '2026-10-05',
    tags: ['neural-networks', 'inference']
  },
  {
    slug: 'sinusoidal-positional-encoding-transformers',
    title: 'Sinusoidal Positional Encoding: Giving Transformers a Sense of Order',
    blurb: 'How sine and cosine waves of different frequencies give a transformer a sense of word order, shown as rotating phasors.',
    date: '2026-05-31',
    tags: ['transformers', 'positional-encoding']
  },
  {
    slug: 'attention-in-transformers',
    title: 'Transformer Attention',
    blurb: 'Queries, keys and values combining into attention weights across a sentence.',
    date: '2026-06-02',
    tags: ['transformers', 'attention']
  }
];
