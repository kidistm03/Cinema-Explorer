/**
 * Renders the universal content control navigation bar
 */
export function renderPagination(currentPage, totalPages) {
  // Cap TMDB pages at 500 max to follow safe remote API guidelines [cite: 251]
  const maxSafePages = totalPages > 500 ? 500 : totalPages;

  return `
    <div class="pagination-container" style="display: flex; justify-content: center; align-items: center; gap: 20px; margin-top: 40px; padding: 20px 0;">
      <button id="btn-prev-page" ${currentPage === 1 ? 'disabled' : ''} style="padding: 10px 20px; background-color: #1e1e1e; border: 1px solid #333; color: white; border-radius: 4px; cursor: pointer;">
        Previous
      </button>
      <span style="color: #aaa; font-size: 0.95rem;">Page <strong>${currentPage}</strong> of ${maxSafePages}</span>
      <button id="btn-next-page" ${currentPage === maxSafePages ? 'disabled' : ''} style="padding: 10px 20px; background-color: #1e1e1e; border: 1px solid #333; color: white; border-radius: 4px; cursor: pointer;">
        Next
      </button>
    </div>
  `;
}

export function bindPaginationEvents(currentPage, totalPages, onPageChange) {
  const maxSafePages = totalPages > 500 ? 500 : totalPages;
  
  document.getElementById('btn-prev-page')?.addEventListener('click', () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  });

  document.getElementById('btn-next-page')?.addEventListener('click', () => {
    if (currentPage < maxSafePages) onPageChange(currentPage + 1);
  });
}