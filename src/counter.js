// ============================================================
// counter.js
// PURPOSE: A simple counter utility (part of Vite's default scaffold).
// Can be used to track counts or state anywhere in the app.
// ============================================================

/**
 * Creates a counter that increments each time it's called.
 * @param {HTMLElement} element - The element to update with the count
 */
export function setupCounter(element) {
  let counter = 0;

  const setCounter = (count) => {
    counter = count;
    element.innerHTML = `count is ${counter}`;
  };

  element.addEventListener('click', () => setCounter(counter + 1));
  setCounter(0);
}
