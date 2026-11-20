// Dark / light toggle. The saved choice is applied before paint by an
// inline snippet in each page's <head>; this only wires up the button.
(function () {
  var btn = document.querySelector('.theme-toggle');
  if (!btn) return;
  var root = document.documentElement;

  var MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  var SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';

  // On narrow screens CSS hides the label and shows only the icon.
  function sync() {
    var dark = root.classList.contains('dark-mode');
    var label = dark ? 'Light mode' : 'Dark mode';
    btn.innerHTML = (dark ? SUN : MOON) + '<span class="theme-label">' + label + '</span>';
    btn.setAttribute('aria-label', label);
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
