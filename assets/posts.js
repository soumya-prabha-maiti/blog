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
  },
  {
    slug: 'hierarchical-clustering-dendrogram',
    title: 'Agglomerative Hierarchical Clustering',
    blurb: 'Watch clusters merge step by step and the dendrogram build itself from the bottom up.',
    date: '2026-07-31',
    tags: ['clustering', 'unsupervised-learning']
  },
  {
    slug: 'gradient-descent-optimizers',
    title: 'Gradient Descent Optimizer Comparison',
    blurb: 'SGD, momentum, RMSProp and Adam racing across the same loss surface.',
    date: '2026-07-25',
    tags: ['optimization', 'training']
  },
  {
    slug: 'bpe-tokenization',
    title: 'BPE Tokenization',
    blurb: 'Byte pair encoding merging character pairs into subword tokens, one merge at a time.',
    date: '2026-07-15',
    tags: ['tokenization', 'nlp']
  },
  {
    slug: 'rope-positional-encoding',
    title: 'RoPE — Rotary Position Embedding',
    blurb: 'Rotary embeddings encode position by rotating query and key vectors instead of adding to them.',
    date: '2026-06-08',
    tags: ['transformers', 'positional-encoding', 'embeddings']
  },
  {
    slug: 'vision-transformer',
    title: 'Vision Transformer (ViT)',
    blurb: 'Splitting an image into patches and feeding them to a transformer as a sequence.',
    date: '2026-06-03',
    tags: ['transformers', 'computer-vision']
  },
  {
    slug: 'attention-in-transformers',
    title: 'Transformer Attention',
    blurb: 'Queries, keys and values combining into attention weights across a sentence.',
    date: '2026-05-31',
    tags: ['transformers', 'attention']
  }
];
