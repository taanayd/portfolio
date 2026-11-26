/*
 * Galleries and lightbox.
 * - Lab gallery: rendered from window.LAB_GALLERY (assets/js/lab-gallery.js), photos and videos.
 * - Any other container with [data-lightbox]: links inside <figure> open in the lightbox.
 * Lightbox: PhotoSwipe v5.4.4 (https://github.com/dimsemenov/PhotoSwipe, MIT), vendored in assets/vendor.
 */
import PhotoSwipeLightbox from '../vendor/photoswipe/photoswipe-lightbox.esm.min.js';

const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>';

function makeLightbox(extra = {}) {
  const lb = new PhotoSwipeLightbox({
    pswpModule: () => import('../vendor/photoswipe/photoswipe.esm.min.js'),
    bgOpacity: 0.95, showHideAnimationType: 'fade', wheelToZoom: true, padding: { top: 24, bottom: 72, left: 16, right: 16 },
    ...extra
  });
  lb.on('uiRegister', () => {
    lb.pswp.ui.registerElement({
      name: 'custom-caption', order: 9, isButton: false, appendTo: 'root',
      onInit: (el, pswp) => pswp.on('change', () => {
        const d = pswp.currSlide.data;
        el.textContent = d.caption || d.element?.dataset.cap || '';
      })
    });
  });
  // Play a video when its slide is shown; pause it when it leaves.
  lb.on('contentDeactivate', ({ content }) => { content.element?.querySelector?.('video')?.pause(); });
  lb.on('contentActivate', ({ content }) => { const v = content.element?.querySelector?.('video'); if (v) v.play().catch(() => {}); });
  lb.init();
  return lb;
}

/* ---------- Masonry: fills the shortest column next, so tiles keep reading order left-to-right ---------- */
function ratioOf(tile) {
  const a = tile.querySelector('a');
  const m = /([\d.]+)\s*\/\s*([\d.]+)/.exec(a && a.style.aspectRatio || '');
  return m ? (+m[2] / +m[1]) : 0.75;
}
function masonry(el, force) {
  if (!el._tiles) el._tiles = [...el.querySelectorAll('.tile')];
  const w = el.clientWidth || window.innerWidth;
  const n = w >= 860 ? 3 : w >= 500 ? 2 : 1;
  if (el._n === n && !force) return;
  el._n = n;
  const cols = Array.from({ length: n }, () => { const c = document.createElement('div'); c.className = 'col'; return c; });
  const h = new Array(n).fill(0);
  el._tiles.forEach(t => {
    if (t.hidden) { cols[0].appendChild(t); return; }
    const k = h.indexOf(Math.min(...h));
    cols[k].appendChild(t); h[k] += ratioOf(t) + 0.04;
  });
  el.replaceChildren(...cols);
}
function watchMasonry(el) {
  masonry(el, true);
  let t; window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(() => masonry(el), 120); });
}

/* ---------- Lab gallery ---------- */
function renderLabGallery(mount) {
  const orgs = (window.LAB_GALLERY || []).filter(o => o && o.id);
  const index = document.getElementById('org-index');
  const items = orgs.flatMap(o => (o.photos || []).map(p => ({ ...p, orgId: o.id, org: o.org })));
  const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;
  const count = list => {
    const v = list.filter(p => p.type === 'video').length, ph = list.length - v;
    return [ph ? plural(ph, 'photo') : '', v ? plural(v, 'video') : ''].filter(Boolean).join(' · ');
  };

  index.innerHTML = [`<button type="button" class="org-card" data-org="all" aria-pressed="true"><b>All</b><span>Every lab, team and conference</span><em>${count(items)}</em></button>`]
    .concat(orgs.map(o => {
      const n = (o.photos || []).length;
      return `<button type="button" class="org-card" data-org="${esc(o.id)}" aria-pressed="false"${n ? '' : ' disabled'}>
        <b>${esc(o.org)}</b><span>${esc(o.unit || '')}${o.unit && o.place ? ' · ' : ''}${esc(o.place || '')}</span>
        <em>${o.period ? esc(o.period) + ' · ' : ''}${n ? count(o.photos) : 'photos to come'}</em></button>`;
    })).join('');

  if (!items.length) { mount.outerHTML = '<p class="empty">Photographs from these labs are being added.</p>'; return; }

  mount.innerHTML = items.map((p, i) => {
    const isVideo = p.type === 'video';
    const img = isVideo ? p.poster : (p.thumb || p.src);
    const ratio = isVideo ? '4 / 5' : `${p.w || 4} / ${p.h || 3}`;
    return `<figure class="tile${isVideo ? ' is-video' : ''}" data-org="${esc(p.orgId)}" data-i="${i}" style="--i:${i % 12}">
      <a href="${esc(p.src)}" aria-label="${esc((isVideo ? 'Play video: ' : 'Open photo: ') + (p.caption || p.org))}" style="aspect-ratio:${ratio}">
        <img src="${esc(img)}" alt="${esc(p.alt || p.caption || p.org)}" loading="lazy" decoding="async">
        ${isVideo ? `<span class="play">${PLAY}</span>` : ''}
        <figcaption class="cap"><span class="cap-org">${esc(p.org)}${p.year ? ' · ' + esc(p.year) : ''}</span><span class="cap-text">${esc(p.caption || '')}</span></figcaption>
      </a>
    </figure>`;
  }).join('');

  watchMasonry(mount);
  mount.querySelectorAll('img').forEach(im => {
    const done = () => im.closest('.tile').classList.add('loaded');
    if (im.complete) done(); else { im.addEventListener('load', done); im.addEventListener('error', done); }
  });

  const lb = makeLightbox();
  const slide = p => p.type === 'video'
    ? { html: `<div class="pswp-video"><video src="${esc(p.src)}" poster="${esc(p.poster || '')}" controls playsinline preload="metadata"></video></div>`,
        caption: `${p.caption || ''} — ${p.org}` }
    : { src: p.src, width: p.w || 1600, height: p.h || 1200, msrc: p.thumb, alt: p.caption,
        caption: `${p.caption || ''} — ${p.org}${p.year ? ', ' + p.year : ''}` };

  mount.addEventListener('click', e => {
    const a = e.target.closest('.tile a');
    if (!a) return;
    e.preventDefault();
    const visible = mount._tiles.filter(f => !f.hidden);
    lb.loadAndOpen(visible.indexOf(a.closest('.tile')), visible.map(f => slide(items[+f.dataset.i])));
  });

  index.addEventListener('click', e => {
    const b = e.target.closest('[data-org]');
    if (!b || b.disabled) return;
    const id = b.getAttribute('data-org');
    index.querySelectorAll('[data-org]').forEach(x => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
    let k = 0;
    mount.querySelectorAll('.tile').forEach(f => {
      const show = id === 'all' || f.dataset.org === id;
      f.hidden = !show;
      if (show) { f.style.setProperty('--i', k++ % 12); f.classList.remove('pop'); void f.offsetWidth; f.classList.add('pop'); }
    });
    masonry(mount, true);
  });
}

/* ---------- Generic DOM galleries (photography, project screenshots) ---------- */
function attach(container) {
  const links = [...container.querySelectorAll('figure a[href]')];
  if (container.classList.contains('gallery')) watchMasonry(container);
  const lb = makeLightbox();
  container.addEventListener('click', e => {
    const a = e.target.closest('figure a[href]');
    if (!a || !links.includes(a)) return;
    e.preventDefault();
    const data = links.map(l => {
      const img = l.querySelector('img');
      return { src: l.getAttribute('href'), width: img && img.naturalWidth || 1600, height: img && img.naturalHeight || 1200,
               msrc: img && img.currentSrc, caption: l.dataset.cap || (img && img.alt) || '' };
    });
    lb.loadAndOpen(links.indexOf(a), data);
  });
}

const lab = document.getElementById('lab-gallery');
if (lab) renderLabGallery(lab);
document.querySelectorAll('[data-lightbox]').forEach(g => { if (g.id !== 'lab-gallery') attach(g); });
