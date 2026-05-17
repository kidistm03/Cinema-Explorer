// ============================================================
// Hero.js
// PURPOSE: Renders the hero carousel banner at the top of each page.
// Works for movies, series, and people.
// ============================================================

import { IMG_ORIGINAL, IMG_BASE } from '../api/apiClient.js';

let currentSlide = 0;
let autoPlayTimer = null;

/**
 * Builds Hero HTML from an array of TMDB items.
 * @param {Array} items - movies, series, or people (max 5 used)
 * @param {string} type - 'movie' | 'tv' | 'person'
 */
export function createHero(items, type = 'movie') {
  const slides = items.slice(0, 5);

  const slidesHTML = slides.map((item, index) => {
    const title = item.title || item.name || 'Unknown';
    const overview = item.overview || 'No description available.';

    // Backdrop image for movies/series, profile for people
    const bgUrl = item.backdrop_path
      ? `${IMG_ORIGINAL}${item.backdrop_path}`
      : item.profile_path
      ? `${IMG_BASE}${item.profile_path}`
      : '';

    // Genre tags (just decorative — IDs shown since we don't have names here)
    const tags = (item.genre_ids || [])
      .slice(0, 3)
      .map((id) => `<span class="hero__tag">${id}</span>`)
      .join('');

    return `
      <div class="hero__slide ${index === 0 ? 'active' : ''}">
        <div class="hero__bg" style="background-image: url('${bgUrl}')"></div>
        <div class="hero__overlay"></div>
        <div class="hero__content">
          <div class="hero__tags">${tags}</div>
          <h1 class="hero__title">${title}</h1>
          <p class="hero__overview">${overview.slice(0, 150)}${overview.length > 150 ? '...' : ''}</p>
          <button class="hero__btn" data-id="${item.id}" data-type="${type}">Detail ➤</button>
        </div>
      </div>
    `;
  }).join('');

  const dotsHTML = slides
    .map((_, i) => `<span class="hero__dot ${i === 0 ? 'active' : ''}" data-dot="${i}"></span>`)
    .join('');

  return `
    <section class="hero">
      <div class="hero__slides">${slidesHTML}</div>
      <button class="hero__arrow hero__arrow--prev" id="hero-prev">‹</button>
      <button class="hero__arrow hero__arrow--next" id="hero-next">›</button>
      <div class="hero__dots">${dotsHTML}</div>
    </section>
  `;
}

/**
 * Activates carousel: arrows, dots, auto-play.
 * Call after hero HTML is inserted into the DOM.
 */
export function initHero() {
  currentSlide = 0;
  clearInterval(autoPlayTimer);

  const allSlides = document.querySelectorAll('.hero__slide');
  const dots = document.querySelectorAll('.hero__dot');

  if (!allSlides.length) return;

  function goToSlide(index) {
    allSlides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (index + allSlides.length) % allSlides.length;
    allSlides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  document.getElementById('hero-prev')?.addEventListener('click', () => goToSlide(currentSlide - 1));
  document.getElementById('hero-next')?.addEventListener('click', () => goToSlide(currentSlide + 1));

  dots.forEach((dot) => {
    dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.dot)));
  });

  autoPlayTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
}
