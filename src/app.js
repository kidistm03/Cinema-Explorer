// src/app.js
// App entry point — wires router, modal, and page modules together.
// Dependency Inversion: pages depend on injected callbacks, not on app internals.
 
import { renderNavbar, setActiveLink } from './components/Navbar.js';
import { initHomePage }        from './pages/home.js';
import { initMoviesPage }      from './pages/movies.js';
import { initSeriesPage }      from './pages/series.js';
import { initCelebritiesPage } from './pages/celebrities.js';
import { getMovieDetail }      from './api/movieService.js';
import { getSeriesDetail }     from './api/seriesService.js';
import { getPersonDetail }     from './api/peopleService.js';
import { IMG }                 from './api/apiClient.js';
 
// ── Page registry ─────────────────────────────────────────────────────────────
const PAGE_IDS  = ['home', 'movies', 'series', 'celebrities'];
const INIT_FNS  = {
  home:        initHomePage,
  movies:      initMoviesPage,
  series:      initSeriesPage,
  celebrities: initCelebritiesPage,
};
const loaded = {};   // tracks which pages have been initialised
 
// ── Router ────────────────────────────────────────────────────────────────────
function navigate(pageName) {
  if (!PAGE_IDS.includes(pageName)) return;
 
  // Show/hide pages
  PAGE_IDS.forEach(id => {
    document.getElementById(`page-${id}`)
      ?.classList.toggle('active', id === pageName);
  });
 
  setActiveLink(pageName);
  window.scrollTo({ top: 0, behavior: 'instant' });
 
  // Lazy-load pages on first visit
  if (!loaded[pageName]) {
    loaded[pageName] = true;
    INIT_FNS[pageName]({ onDetail, onNavigate: navigate });
  }
}
 
// ── Detail modal ─────────────────────────────────────────────────────────────
const FETCH_MAP = {
  movie:  getMovieDetail,
  tv:     getSeriesDetail,
  person: getPersonDetail,
};
 
async function onDetail(type, id) {
  const backdrop = document.getElementById('modal-backdrop');
  const box      = document.getElementById('modal-box');
 
  box.innerHTML = '<div class="loading" style="padding:5rem"><div class="spinner"></div></div>';
  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
 
  try {
    const fetchFn = FETCH_MAP[type];
    if (!fetchFn) throw new Error(`Unknown detail type: ${type}`);
    const data = await fetchFn(id);
    renderModal(box, data, type);
  } catch (err) {
    box.innerHTML = `
      <button class="modal-close" id="modal-close-btn">✕</button>
      <div class="loading" style="padding:4rem;flex-direction:column;gap:1rem">
        <p style="color:var(--text3);text-align:center">
          Could not load details.<br>
          <small>Make sure your TMDB Bearer Token is configured in <code>src/api/apiClient.js</code>.</small>
        </p>
      </div>`;
    document.getElementById('modal-close-btn').addEventListener('click', closeModal);
    console.error('Detail fetch failed:', err);
  }
}
 
function renderModal(box, data, type) {
  const title    = data.title || data.name || '';
  const overview = data.overview || data.biography || '';
  const backdrop = data.backdrop_path  ? `${IMG.W780}${data.backdrop_path}` : null;
  const poster   = data.poster_path    ? `${IMG.W500}${data.poster_path}`   :
                   data.profile_path   ? `${IMG.W500}${data.profile_path}`  : null;
  const rating   = data.vote_average   ? data.vote_average.toFixed(1)       : null;
  const year     = (data.release_date || data.first_air_date || data.birthday || '').slice(0, 4);
  const runtime  = data.runtime
    ? `${data.runtime} min`
    : data.episode_run_time?.length ? `${data.episode_run_time[0]} min/ep` : null;
  const genres   = (data.genres || []).map(g => g.name).join(', ');
  const cast     = data.credits?.cast?.slice(0, 6).map(c => c.name).join(', ') || '';
  const knownFor = data.combined_credits?.cast?.slice(0, 4).map(c => c.title || c.name).join(', ') || '';
 
  box.innerHTML = `
    <button class="modal-close" id="modal-close-btn" aria-label="Close">✕</button>
 
    <div class="modal-hero-img">
      ${backdrop
        ? `<img src="${backdrop}" alt="" loading="lazy">`
        : `<div class="no-backdrop">🎬</div>`}
      <div class="modal-hero-gradient"></div>
    </div>
 
    <div class="modal-body">
      <div class="modal-top">
        ${poster
          ? `<img class="modal-poster" src="${poster}" alt="${escHtml(title)}" loading="lazy">`
          : `<div class="modal-poster-placeholder">🎬</div>`}
        <div>
          <h2 class="modal-title">${escHtml(title)}</h2>
          <div class="modal-meta">
            ${rating   ? `<span class="modal-badge">⭐ ${rating}</span>` : ''}
            ${year     ? `<span class="modal-badge">📅 ${year}</span>`   : ''}
            ${runtime  ? `<span class="modal-badge">⏱ ${runtime}</span>` : ''}
            ${genres   ? `<span class="modal-badge">${escHtml(genres)}</span>` : ''}
          </div>
        </div>
      </div>
 
      ${overview ? `<p class="modal-overview">${escHtml(overview.slice(0, 600))}${overview.length > 600 ? '…' : ''}</p>` : ''}
      ${cast     ? `<p class="modal-detail-row"><strong>Cast:</strong> ${escHtml(cast)}</p>` : ''}
      ${knownFor ? `<p class="modal-detail-row"><strong>Known for:</strong> ${escHtml(knownFor)}</p>` : ''}
    </div>`;
 
  document.getElementById('modal-close-btn').addEventListener('click', closeModal);
}
 
function closeModal() {
  document.getElementById('modal-backdrop').classList.remove('open');
  document.body.style.overflow = '';
}
 
// ── Bootstrap ─────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Build page skeletons
  PAGE_IDS.forEach(id => {
    const div = document.createElement('div');
    div.className = 'page';
    div.id = `page-${id}`;
    document.getElementById('app').appendChild(div);
  });
 
  // Navbar
  renderNavbar({ onNavigate: navigate });
 
  // Modal backdrop
  const backdrop = document.getElementById('modal-backdrop');
  backdrop.addEventListener('click', e => {
    if (e.target === backdrop) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
 
  // Search result → detail (dispatched by Navbar)
  window.addEventListener('openDetail', e => {
    onDetail(e.detail.type, e.detail.id);
  });
 
  // Start on home
  navigate('home');
});
 
function escHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}