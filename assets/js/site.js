/* Shared behaviour: theme toggle, mobile menu, publication filters, BibTeX copy. */
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  /* Scroll-reveal: sections fade up as they enter the viewport. */
  function setupReveal() {
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    var sel = '.page-head, .hero > *, .section-head, .pub, .theme, .project, .timeline > li, .news li, .interest-list li, .awards li, .skills > div, .callout, .org-index, .moments .tile, .photo-grid .tile';
    var els = Array.prototype.slice.call(document.querySelectorAll(sel));
    if (reduce || !('IntersectionObserver' in window)) return;
    els.forEach(function (el) {
      var sib = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.style.setProperty('--d', Math.min(sib, 6));
      el.classList.add('reveal');
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    els.forEach(function (el) { io.observe(el); });
    setTimeout(function () { els.forEach(function (el) { el.classList.add('in'); }); }, 4000);
  }

  function setupHeader() {
    var h = document.querySelector('.site-header');
    if (!h) return;
    var on = function () { h.classList.toggle('scrolled', window.scrollY > 8); };
    on(); window.addEventListener('scroll', on, { passive: true });
  }

  function setupTiles() {
    document.querySelectorAll('.tile img').forEach(function (img) {
      var t = img.closest('.tile'), done = function () { t.classList.add('loaded'); };
      if (img.complete) done(); else { img.addEventListener('load', done); img.addEventListener('error', done); }
    });
  }

  function init() { setupReveal(); setupHeader(); setupTiles(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

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
