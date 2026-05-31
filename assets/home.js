/* Home page: post list, tag filter and text search, from window.POSTS.
   Selected tags are ANDed and mirrored into the URL hash
   (e.g. #tags=transformers,positional-encoding) so a filtered view is shareable. */
(function () {
  const posts = (window.POSTS || []).slice().sort((a, b) => b.date.localeCompare(a.date));

  const tagBar = document.getElementById('tag-bar');
  const searchInput = document.getElementById('search');
  const list = document.getElementById('post-list');
  const count = document.getElementById('result-count');
  if (!tagBar || !searchInput || !list) return;

  const allTags = [...new Set(posts.flatMap(p => p.tags))].sort();
  const selected = new Set(readHash());

  function readHash() {
    const match = /(?:^|[#&])tags=([^&]*)/.exec(location.hash);
    if (!match) return [];
    return decodeURIComponent(match[1]).split(',').filter(Boolean);
  }

  function writeHash() {
    const value = [...selected].join(',');
    // replaceState keeps filtering out of the browser's back history
    history.replaceState(null, '', value ? `#tags=${encodeURIComponent(value)}` : location.pathname);
  }

  function matches(post) {
    const query = searchInput.value.trim().toLowerCase();
    const haystack = `${post.title} ${post.blurb} ${post.tags.join(' ')}`.toLowerCase();
    const textOk = !query || query.split(/\s+/).every(term => haystack.includes(term));
    const tagsOk = [...selected].every(tag => post.tags.includes(tag));
    return textOk && tagsOk;
  }

  function renderTags() {
    tagBar.innerHTML = '';
    allTags.forEach(tag => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tag-chip' + (selected.has(tag) ? ' active' : '');
      btn.textContent = tag;
      btn.setAttribute('aria-pressed', selected.has(tag) ? 'true' : 'false');
      btn.addEventListener('click', () => {
        selected.has(tag) ? selected.delete(tag) : selected.add(tag);
        writeHash();
        render();
      });
      tagBar.appendChild(btn);
    });

    if (selected.size) {
      const clear = document.createElement('button');
      clear.type = 'button';
      clear.className = 'tag-chip clear';
      clear.textContent = '✕ clear';
      clear.addEventListener('click', () => {
        selected.clear();
        writeHash();
        render();
      });
      tagBar.appendChild(clear);
    }
  }

  function renderList() {
    const visible = posts.filter(matches);
    list.innerHTML = '';

    if (!visible.length) {
      const empty = document.createElement('p');
      empty.className = 'empty';
      empty.textContent = 'No posts match that filter.';
      list.appendChild(empty);
    }

    visible.forEach(post => {
      const card = document.createElement('a');
      card.className = 'post-card';
      card.href = `${post.slug}/index.html`;

      const title = document.createElement('h2');
      title.textContent = post.title;

      const blurb = document.createElement('p');
      blurb.textContent = post.blurb;

      const tags = document.createElement('div');
      tags.className = 'card-tags';
      post.tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'tag' + (selected.has(tag) ? ' active' : '');
        span.textContent = tag;
        tags.appendChild(span);
      });

      card.append(title, blurb, tags);
      list.appendChild(card);
    });

    if (count) {
      count.textContent = `${visible.length} of ${posts.length} post${posts.length === 1 ? '' : 's'}`;
    }
  }

  function render() {
    renderTags();
    renderList();
  }

  searchInput.addEventListener('input', renderList);
  window.addEventListener('hashchange', () => {
    selected.clear();
    readHash().forEach(tag => selected.add(tag));
    render();
  });

  render();
})();
