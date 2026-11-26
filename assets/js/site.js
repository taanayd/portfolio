/* Shared behaviour: theme toggle, mobile menu, publication filters, BibTeX copy. */
(function () {
  var root = document.documentElement;

  function store(key, val) { try { localStorage.setItem(key, val); } catch (e) {} }

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-theme-toggle]');
    if (t) {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      store('theme', next);
      t.setAttribute('aria-label', next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      return;
    }
    var m = e.target.closest('[data-menu]');
    if (m) {
      var nav = document.getElementById('site-nav');
      var open = nav.classList.toggle('open');
      m.setAttribute('aria-expanded', open ? 'true' : 'false');
      return;
    }
    var b = e.target.closest('[data-bib]');
    if (b) {
      var pre = document.getElementById(b.getAttribute('data-bib'));
      var text = pre.textContent;
      var done = function (ok) {
        pre.hidden = false;
        toast(ok ? 'BibTeX copied to clipboard' : 'Select the BibTeX below to copy');
      };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
      else done(false);
      return;
    }
    var f = e.target.closest('[data-filter]');
    if (f) {
      var group = f.closest('[data-filter-group]');
      var target = document.querySelector(group.getAttribute('data-filter-group'));
      var val = f.getAttribute('data-filter');
      group.querySelectorAll('[data-filter]').forEach(function (x) { x.setAttribute('aria-pressed', x === f ? 'true' : 'false'); });
      target.querySelectorAll('[data-kind]').forEach(function (item) {
        item.hidden = !(val === 'all' || item.getAttribute('data-kind').split(' ').indexOf(val) > -1);
      });
      target.querySelectorAll('[data-group]').forEach(function (g) {
        g.hidden = !g.querySelector('[data-kind]:not([hidden])');
      });
    }
  });

  var toastEl, toastT;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove('show'); }, 2000);
  }
})();
