// ============================================================
// Navbar.js
// PURPOSE: Renders the top navigation bar on every page.
// ============================================================

/**
 * Returns Navbar HTML string.
 * @param {string} activePage - 'home' | 'movies' | 'series' | 'celebrities'
 */
export function createNavbar(activePage = 'home') {
  return `
    <nav class="navbar">
      <div class="navbar__inner">

        <a href="#" class="navbar__logo" data-page="home">
          🍿 <span>MY POPCORN</span>
        </a>

        <ul class="navbar__links">
          <li><a href="#" data-page="home" class="${activePage === 'home' ? 'active' : ''}">Home</a></li>
          <li><a href="#" data-page="movies" class="${activePage === 'movies' ? 'active' : ''}">Movies</a></li>
          <li><a href="#" data-page="series" class="${activePage === 'series' ? 'active' : ''}">Series</a></li>
          <li><a href="#" data-page="celebrities" class="${activePage === 'celebrities' ? 'active' : ''}">Celebrities</a></li>
        </ul>

        <div class="navbar__search">
          <input type="text" id="search-input" placeholder="Search for a movie or show..." />
          <button id="search-btn">🔍</button>
        </div>

      </div>
    </nav>
  `;
}

/**
 * Attaches click events to nav links and search.
 * @param {Function} navigateFn - The app's navigate() function from app.js
 */
export function initNavbar(navigateFn) {
  // All elements with data-page (logo + nav links)
  document.querySelectorAll('[data-page]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigateFn(link.dataset.page);
    });
  });

  // Search
  const input = document.getElementById('search-input');
  const btn = document.getElementById('search-btn');

  const doSearch = () => {
    const query = input?.value.trim();
    if (query) navigateFn('search', { query });
  };

  btn?.addEventListener('click', doSearch);
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doSearch();
  });
}
