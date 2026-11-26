/*
 * Photo galleries: lab gallery (data from lab-gallery.js) and personal photography.
 * Lightbox: PhotoSwipe v5.4.4 (https://github.com/dimsemenov/PhotoSwipe, MIT), vendored in assets/vendor.
 */
import PhotoSwipeLightbox from '../vendor/photoswipe/photoswipe-lightbox.esm.min.js';

const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function renderLabGallery(mount) {
  const orgs = (window.LAB_GALLERY || []).filter(o => o && o.id);
  const index = document.getElementById('org-index');
  const total = orgs.reduce((n, o) => n + (o.photos || []).length, 0);

  const cards = [`<button type="button" class="org-card" data-org="all" aria-pressed="true"><b>All organisations</b><span>Every lab and team</span><em>${total} photo${total === 1 ? '' : 's'}</em></button>`]
    .concat(orgs.map(o => {
      const n = (o.photos || []).length;
      return `<button type="button" class="org-card" data-org="${esc(o.id)}" aria-pressed="false"${n ? '' : ' disabled'}>
        <b>${esc(o.org)}</b><span>${esc(o.unit || '')}${o.unit && o.place ? ' · ' : ''}${esc(o.place || '')}</span>
        <em>${esc(o.period || '')} · ${n ? `${n} photo${n === 1 ? '' : 's'}` : 'photos to come'}</em></button>`;
    }));
  index.innerHTML = cards.join('');

  if (!total) {
    mount.outerHTML = '<p class="empty">Photographs from these labs are being added.</p>';
    return;
  }

  mount.innerHTML = orgs.flatMap(o => (o.photos || []).map(p => `
    <figure data-org="${esc(o.id)}">
      <a href="${esc(p.src)}" data-cap="${esc((p.caption || '') + (p.caption ? ' — ' : '') + o.org)}">
        <img src="${esc(p.thumb || p.src)}" alt="${esc(p.alt || p.caption || o.org)}" loading="lazy" decoding="async">
      </a>
      <figcaption>${esc(p.caption || '')}<small>${esc(o.org)}${p.year ? ' · ' + esc(p.year) : ''}</small></figcaption>
    </figure>`)).join('');

  index.addEventListener('click', e => {
    const b = e.target.closest('[data-org]');
    if (!b || b.disabled) return;
    const id = b.getAttribute('data-org');
    index.querySelectorAll('[data-org]').forEach(x => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
    mount.querySelectorAll('figure').forEach(f => { f.hidden = !(id === 'all' || f.getAttribute('data-org') === id); });
  });
}

/* PhotoSwipe needs the full-size dimensions; read them from the image once it loads. */
function sizeLinks(gallery) {
  gallery.querySelectorAll('a[href]').forEach(a => {
    if (a.dataset.pswpWidth) return;
    const probe = new Image();
    probe.onload = () => { a.dataset.pswpWidth = probe.naturalWidth; a.dataset.pswpHeight = probe.naturalHeight; };
    probe.src = a.getAttribute('href');
  });
}

function attach(gallery) {
  sizeLinks(gallery);
  const lb = new PhotoSwipeLightbox({
    gallery, children: 'figure:not([hidden]) a',
    pswpModule: () => import('../vendor/photoswipe/photoswipe.esm.min.js'),
    bgOpacity: 0.94, showHideAnimationType: 'fade', wheelToZoom: true
  });
  lb.on('uiRegister', () => {
    lb.pswp.ui.registerElement({
      name: 'custom-caption', order: 9, isButton: false, appendTo: 'root',
      onInit: (el, pswp) => pswp.on('change', () => { el.textContent = pswp.currSlide.data.element?.dataset.cap || ''; })
    });
  });
  lb.addFilter('itemData', d => {
    const a = d.element;
    if (a && !a.dataset.pswpWidth) { d.width = 1600; d.height = 1200; }
    return d;
  });
  lb.init();
}

const lab = document.getElementById('lab-gallery');
if (lab) renderLabGallery(lab);
document.querySelectorAll('[data-lightbox]').forEach(attach);
