// ============================================================
// Card.js
// PURPOSE: Creates a single movie/series card or person card.
// MovieCard and SeriesCard share the same base structure (Liskov).
// ============================================================

import { IMG_BASE } from '../api/apiClient.js';

/**
 * Movie or Series card.
 * @param {object} item - TMDB movie or TV object
 * @param {string} type - 'movie' | 'tv'
 */
export function createMediaCard(item, type = 'movie') {
  const title = item.title || item.name || 'Unknown';
  const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';
  const date = item.release_date || item.first_air_date || '';
  const year = date ? date.split('-')[0] : '';

  const posterUrl = item.poster_path
    ? `${IMG_BASE}${item.poster_path}`
    : 'https://via.placeholder.com/200x300/1a1a1a/e50914?text=No+Image';

  return `
    <div class="card" data-id="${item.id}" data-type="${type}">
      <div class="card__poster">
        <img src="${posterUrl}" alt="${title}" loading="lazy" />
        <div class="card__rating">⭐ ${rating}</div>
      </div>
      <div class="card__info">
        <p class="card__title">${title}</p>
        ${year ? `<p class="card__year">${year}</p>` : ''}
      </div>
    </div>
  `;
}

/**
 * Person / Celebrity card.
 * @param {object} person - TMDB person object
 */
export function createPersonCard(person) {
  const name = person.name || 'Unknown';
  const dept = person.known_for_department || 'Acting';

  const profileUrl = person.profile_path
    ? `${IMG_BASE}${person.profile_path}`
    : 'https://via.placeholder.com/200x300/1a1a1a/e50914?text=No+Photo';

  const knownFor = (person.known_for || [])
    .slice(0, 2)
    .map((w) => w.title || w.name)
    .join(', ');

  return `
    <div class="card card--person" data-id="${person.id}" data-type="person">
      <div class="card__poster">
        <img src="${profileUrl}" alt="${name}" loading="lazy" />
      </div>
      <div class="card__info">
        <p class="card__title">${name}</p>
        <p class="card__year">${dept}</p>
        ${knownFor ? `<p class="card__known-for">${knownFor}</p>` : ''}
      </div>
    </div>
  `;
}
