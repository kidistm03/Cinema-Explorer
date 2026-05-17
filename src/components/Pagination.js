// ============================================================
// Pagination.js
// PURPOSE: Renders page number buttons. Calls a callback on click.
// ============================================================

/**
 * Returns Pagination HTML.
 * @param {number} currentPage
 * @param {number} totalPages
 */
export function createPagination(currentPage, totalPages) {
  const max = Math.min(totalPages, 10); // Cap at 10 pages displayed

  let buttons = '';
  for (let i = 1; i <= max; i++) {
    buttons += `<button class="pagination__btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
  }

  return `
    <div class="pagination">
      <button class="pagination__btn pagination__arrow" id="prev-page" ${currentPage === 1 ? 'disabled' : ''}>‹</button>
      ${buttons}
      <button class="pagination__btn pagination__arrow" id="next-page" ${currentPage === max ? 'disabled' : ''}>›</button>
    </div>
  `;
}

/**
 * Attaches click events to pagination buttons.
 * @param {number} currentPage
 * @param {number} totalPages
 * @param {Function} onPageChange - Called with (newPage: number)
 */
export function initPagination(currentPage, totalPages, onPageChange) {
  const max = Math.min(totalPages, 10);

  document.querySelectorAll('.pagination__btn[data-page]').forEach((btn) => {
    btn.addEventListener('click', () => onPageChange(parseInt(btn.dataset.page)));
  });

  document.getElementById('prev-page')?.addEventListener('click', () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  });

  document.getElementById('next-page')?.addEventListener('click', () => {
    if (currentPage < max) onPageChange(currentPage + 1);
  });
}
