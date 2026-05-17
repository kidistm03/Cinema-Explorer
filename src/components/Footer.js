// ============================================================
// Footer.js
// PURPOSE: Renders the site footer on every page.
// ============================================================

export function createFooter() {
  return `
    <footer class="footer">
      <div class="footer__inner">

        <div class="footer__brand">
          <div class="footer__logo">🍿 MY POPCORN</div>
          <p>Immerse yourself in the world of movies! Stay tuned, explore, and enjoy the magic of cinema — one film at a time. 🎬</p>
        </div>

        <div class="footer__col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#" data-page="home">Home</a></li>
            <li><a href="#" data-page="movies">Blog</a></li>
            <li><a href="#" data-page="series">Support</a></li>
            <li><a href="#" data-page="celebrities">Contact</a></li>
          </ul>
        </div>

        <div class="footer__col">
          <h4>By</h4>
          <p>Eyassu Solomon Lule</p>
          <p>Email: s.ayelel@gmail.com</p>
          <p>Tel: +251972725423</p>
          <p>Addis Ababa, Ethiopia</p>
          <a href="#" target="_blank">My Portfolio ↗</a>
        </div>

        <div class="footer__col">
          <h4>Show Your Support</h4>
          <div class="footer__icons">
            <a href="#" target="_blank">⭐ GitHub</a>
            <a href="#" target="_blank">💼 LinkedIn</a>
            <a href="#" target="_blank">✉️ Gmail</a>
            <a href="#" target="_blank">📸 Instagram</a>
          </div>
        </div>

      </div>
      <div class="footer__bottom">
        <p>© 2025 MY POPCORN</p>
      </div>
    </footer>
  `;
}
