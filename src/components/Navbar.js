export function renderNavbar(containerElement, onNavigate) {
  containerElement.innerHTML = `
    <nav class="navbar">
      <div class="logo" style="font-weight: bold; font-size: 1.5rem; color: #fff;">🍿 CinemaExplorer</div>
      <ul class="nav-links">
        <li class="nav-item active" data-page="home">Home</li>
        <li class="nav-item" data-page="movies">Movies</li>
        <li class="nav-item" data-page="series">Series</li>
        <li class="nav-item" data-page="celebrities">Celebrities</li>
      </ul>
    </nav>
  `;

  // Attach dynamic single-page routing click listeners
  containerElement.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      containerElement.querySelectorAll('.nav-item').forEach(li => li.classList.remove('active'));
      e.target.classList.add('active');
      
      const targetPage = e.target.dataset.page;
      onNavigate(targetPage); // Call out router callback instantly
    });
  });
}