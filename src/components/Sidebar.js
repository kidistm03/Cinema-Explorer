// ============================================================
// Sidebar.js
// PURPOSE: Renders the genre list aside on Movies and Series pages.
// ============================================================

/**
 * Returns Sidebar HTML with genre buttons.
 * @param {Array} genres - Array of { id, name }
 * @param {number|null} activeGenreId - Highlighted genre
 */
export function createSidebar(genres, activeGenreId = null) {
  const items = genres.map((genre) => `
    <li>
      <button class="sidebar__btn ${genre.id === activeGenreId ? 'active' : ''}" data-genre-id="${genre.id}">
        ${genre.name}
      </button>
    </li>
  `).join('');

  return `
    <aside class="sidebar">
      <h3 class="sidebar__title">Genres</h3>
      <ul class="sidebar__list">${items}</ul>
    </aside>
  `;
}

/**
 * Attaches click events to genre buttons.
 * @param {Function} onSelect - Called with (genreId: number) on click
 */
export function initSidebar(onSelect) {
  const buttons = document.querySelectorAll('.sidebar__btn');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      onSelect(parseInt(btn.dataset.genreId));
    });
  });
}
