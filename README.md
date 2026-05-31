# AI Visualizations

Interactive explanations of ML concepts. One folder per post, no build step.

```
assets/blog.css        all styling
assets/posts.js        post index (single source of truth)
assets/post-header.js  builds a post's header from posts.js
assets/home.js         home page list + tag filter
index.html             home page
<slug>/index.html      a post
```

## Add a new post

**1. Create the folder.** The folder name *is* the slug: `my-new-post/index.html`

**2. Register it in `assets/posts.js`** — this is the only place title, blurb and tags live:

```js
{
  slug: 'my-new-post',        // must match the folder name
  title: 'My New Post',       // -> document.title, <h1>, home page card
  blurb: 'One sentence.',     // -> post subtitle, card description
  date: '2026-08-03',         // home page ordering only, never displayed
  tags: ['transformers']      // tag chips + home page filter
}
```

**3. Start from this boilerplate.** **Never write an `<h1>`** — the page's only `<h1>`
is the one `post-header.js` injects from `posts.js`, so start your sections at `<h2>`.
Any `<h1>` left in the markup is stripped at load. The `<title>` stays generic for the
same reason: it is overwritten from `posts.js`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AI Visualizations</title>
<link rel="stylesheet" href="../assets/blog.css">
<script defer src="../assets/posts.js"></script>
<script defer src="../assets/post-header.js"></script>
</head>
<body>
<article id="post">
  <!-- no <h1> here: the title, subtitle and tags come from posts.js -->
  <p>Opening paragraph.</p>
  <h2>A section</h2>
  <p>More prose.</p>

  <!-- widgets go here, inside the article -->

  <h2>Another section</h2>
  <p>More prose.</p>
</article>
</body>
</html>
```

The two comments above are scaffolding notes. Delete them once your post has real content.

For math, add KaTeX above `blog.css` and point it at `#post`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"
        onload="renderMathInElement(document.getElementById('post'));"></script>
```

Then write `\(inline\)` and `\[display\]` directly in the prose.

## Styling

Prose needs no classes — `#post h2/h3/p` are styled for you (`h1` is header-only, see above).
Keep everything inside `<article id="post">` and it inherits the 900px centred column, so
widgets need no widths of their own.

**Injected automatically — do not write these:** `.post-header`, `.subtitle`,
`.post-metadata`, `.back-link`, and the `<h1>`.

**Widget hooks** (use these ids/classes to get the existing styling):

| Markup | Purpose |
|---|---|
| `<div id="controls">` | Slider/button panel; put `<label>`, `<input type="range">`, `<span>`, `<button>` inside |
| `<div id="canvas-wrap">` | Horizontally scrollable canvas area |
| `<div id="spacer">` | Sets scroll width inside `#canvas-wrap` |
| `<canvas id="c">` | The visualization |
| `<div id="text-section">` | Token/sentence panel |
| `.text-box` | Bordered box inside `#text-section` |
| `.word` / `.word.active` | Token spans; `.active` highlights the current one |

Colours: bg `#0d1117`, panels `#161b22`, borders `#30363d`, text `#e6edf3`,
muted `#8b949e`, accent `#238636`, links `#58a6ff`.

## Preview

Open `index.html` or any `<slug>/index.html` straight from disk. Everything is
relative paths and plain `<script>` tags, so nothing needs a server.

To check it the way GitHub Pages will serve it:

```bash
python3 -m http.server 8000    # then open http://localhost:8000
```
