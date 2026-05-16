import { renderNavbar } from './components/Navbar.js';
import { renderFooter } from './components/Footer.js';
import { renderHomePage } from './pages/home.js';

document.addEventListener('DOMContentLoaded', () => {
  const headerContainer = document.getElementById('navbar-container');
  const mainViewport = document.getElementById('app-viewport');
  const footerContainer = document.getElementById('footer-container');

  // 1. Structural View Routing Handler function
  const handleRouting = async (pageKey) => {
    mainViewport.innerHTML = `<div style="padding: 40px; text-align: center;">Loading section...</div>`;
    
    switch(pageKey) {
      case 'home':
        await renderHomePage(mainViewport);
        break;
      case 'movies':
        mainViewport.innerHTML = `<div style="padding: 40px; color: var(--text-muted);">Movies layout module loaded. Ready for implementation.</div>`;
        break;
      default:
        await renderHomePage(mainViewport);
    }
  };

  // 2. Initialize Core Structural Framework
  renderNavbar(headerContainer, (targetPage) => {
    handleRouting(targetPage);
  });
  
  renderFooter(footerContainer);

  // 3. Kick off application state on the homepage automatically
  handleRouting('home');
});