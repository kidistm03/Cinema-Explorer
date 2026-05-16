export function createCard(item, mediaType = 'movie') {
  // Gracefully handle alternate key titles used across different TMDB item records
  const title = item.title || item.name || 'Untitled Content';
  const subText = item.release_date || item.first_air_date || item.known_for_department || '';
  const imagePath = item.poster_path || item.profile_path;
  const imageUrl = imagePath 
    ? `https://image.tmdb.org/t/p/w500${imagePath}` 
    : 'https://via.placeholder.com/500x750?text=No+Image+Available';

  return `
    <div class="movie-card" data-id="${item.id}" data-type="${mediaType}">
      <div class="card-img-wrapper">
        <img src="${imageUrl}" alt="${title}" loading="lazy" />
      </div>
      <div class="card-info">
        <h3>${title}</h3>
        <p>${subText ? subText.split('-')[0] : ''}</p>
      </div>
    </div>
  `;
}