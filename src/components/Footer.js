export function renderFooter(containerElement) {
  containerElement.innerHTML = `
    <footer style="padding: 40px 4%; background-color: #0c0c0c; margin-top: 50px; text-align: center; color: #666; font-size: 0.9rem; border-top: 1px solid #222;">
      <p>&copy; ${new Date().getFullYear()} Cinema Explorer. Built cleanly following strict SOLID guidelines.</p>
    </footer>
  `;
}