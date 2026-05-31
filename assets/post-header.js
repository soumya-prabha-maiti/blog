/* Builds a post's header from window.POSTS, matching on the folder name in
   the URL: document.title and <h1> from title, subtitle from blurb, plus a
   back link and tag chips. Any <h1> in the markup is replaced.

   Opt a post in with:
     <script defer src="../assets/posts.js"></script>
     <script defer src="../assets/post-header.js"></script> */
(function () {
  const article = document.getElementById('post');
  if (!article || !window.POSTS) return;

  // Works for both /<slug>/index.html and /<slug>/
  const segments = location.pathname.split('/').filter(Boolean);
  if (segments[segments.length - 1] === 'index.html') segments.pop();
  const slug = segments[segments.length - 1];
  const post = window.POSTS.find(p => p.slug === slug);
  if (!post) return;

  document.title = post.title;

  const header = document.createElement('header');
  header.className = 'post-header';

  const back = document.createElement('a');
  back.className = 'back-link';
  back.href = '../index.html';
  back.textContent = '← all posts';

  const h1 = document.createElement('h1');
  h1.textContent = post.title;

  const subtitle = document.createElement('p');
  subtitle.className = 'subtitle';
  subtitle.textContent = post.blurb;

  const tagRow = document.createElement('div');
  tagRow.className = 'post-metadata';
  post.tags.forEach(tag => {
    const link = document.createElement('a');
    link.className = 'tag';
    link.href = `../index.html#tags=${encodeURIComponent(tag)}`;
    link.textContent = tag;
    tagRow.appendChild(link);
  });

  header.append(back, h1, subtitle, tagRow);

  // posts.js is canonical: drop any title hardcoded in the markup.
  const staleHeading = article.querySelector('h1');
  if (staleHeading) staleHeading.remove();

  article.insertBefore(header, article.firstChild);
})();
