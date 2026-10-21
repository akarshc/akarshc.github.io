// Dark / light toggle. The saved choice is applied before paint by an
// inline snippet in each page's <head>; this only wires up the button.
(function () {
  var btn = document.querySelector('.theme-toggle');
  if (!btn) return;
  var root = document.documentElement;

  function sync() {
    btn.textContent = root.classList.contains('dark-mode') ? 'Light mode' : 'Dark mode';
  }

  sync();
  btn.addEventListener('click', function () {
    root.classList.toggle('dark-mode');
    try {
      localStorage.setItem('theme', root.classList.contains('dark-mode') ? 'dark' : 'light');
    } catch (e) {}
    sync();
  });
})();
