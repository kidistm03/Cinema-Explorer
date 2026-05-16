import { renderNavbar } from './components/Navbar.js';
import { renderFooter } from './components/Footer.js';
import { renderHomePage } from './pages/home.js';
import { renderMoviesPage } from './pages/movies.js'; // Import our new page module

document.addEventListener('DOMContentLoaded', () => {
  const headerContainer = document.getElementById('navbar-container');
  const mainViewport = document.getElementById('app-viewport');
  const footerContainer = document.getElementById('footer-container');

  const handleRouting = async (pageKey) => {
    mainViewport.innerHTML = `<div style="padding: 60px; text-align: center; color: #888;">Switching views...</div>`;
    
    switch(pageKey) {
      case 'home':
        await renderHomePage(mainViewport);
        break;
      case 'movies':
        await renderMoviesPage(mainViewport); // Load full functional layout view
        break;
      case 'series':
        mainViewport.innerHTML = `<div style="padding: 40px; color: #aaa;">TV Series Content Module placeholder view structural panel.</div>`;
        break;
      case 'celebrities':
        mainViewport.innerHTML = `<div style="padding: 40px; color: #aaa;">Celebrities Content Module placeholder view structural panel.</div>`;
        break;
      default:
        await renderHomePage(mainViewport);
    }
  };

  renderNavbar(headerContainer, (targetPage) => {
    handleRouting(targetPage);
  });
  
  renderFooter(footerContainer);
  handleRouting('home'); // Base load execution
});