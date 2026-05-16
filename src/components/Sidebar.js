/**
 * Renders the Genre Selection Sidebar Panel matching Figma templates
 * @param {Array} genres - Array list of category objects from TMDB
 * @param {Function} onGenreSelect - Callback function to fire when a category item changes
 * @returns {string} - Compiled HTML template string
 */
export function renderSidebar(genres, onGenreSelect) {
  const itemsHTML = genres
    .map(genre => `
      <li class="genre-item" data-id="${genre.id}" style="padding: 10px 15px; margin-bottom: 6px; border-radius: 6px; cursor: pointer; list-style: none; color: #aaa; transition: all 0.2s ease;">
        ${genre.name}
      </li>
    `).join('');

  // Use a unique timeout stack handle to attach safe click event interactions 
  setTimeout(() => {
    const listElements = document.querySelectorAll('.genre-item');
    listElements.forEach(item => {
      item.addEventListener('click', () => {
        listElements.forEach(el => {
          el.style.backgroundColor = 'transparent';
          el.style.color = '#aaa';
        });
        
        item.style.backgroundColor = '#e50914'; // Red active background brand color from Figma
        item.style.color = '#ffffff';
        
        onGenreSelect(item.dataset.id);
      });
    });
  }, 0);

  return `
    <aside class="genres-sidebar" style="width: 240px; background-color: #181818; padding: 25px 20px; border-radius: 8px; flex-shrink: 0; max-height: 85vh; overflow-y: auto;">
      <h3 style="font-size: 1.2rem; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #333; padding-bottom: 10px;">Genres</h3>
      <ul id="sidebar-genre-list" style="margin: 0; padding: 0;">
        <li class="genre-item" data-id="" style="padding: 10px 15px; margin-bottom: 6px; border-radius: 6px; cursor: pointer; list-style: none; color: #ffffff; background-color: #e50914;">
          All Categories
        </li>
        ${itemsHTML}
      </ul>
    </aside>
  `;
}