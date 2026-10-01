(function () {
  const EASE = 'cubic-bezier(.16,1,.3,1)', CURVE = 'cubic-bezier(.76,0,.24,1)';
  const FX = {
    motion() { return !(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches); },
    curtain() {
      let c = document.getElementById('pfx-curtain');
      if (!c) {
        c = document.createElement('div'); c.id = 'pfx-curtain';
        Object.assign(c.style, { position: 'fixed', inset: '0', zIndex: '999', background: '#0A0A0A', pointerEvents: 'none', transform: 'scaleY(0)', transformOrigin: '50% 0%' });
        const bar = document.createElement('div');
        Object.assign(bar.style, { position: 'absolute', left: '0', right: '0', bottom: '0', height: '2px', background: '#E5A93C' });
        c.appendChild(bar); document.body.appendChild(c);
        addEventListener('pageshow', e => { if (e.persisted) { c.getAnimations().forEach(a => a.cancel()); c.style.transform = 'scaleY(0)'; } });
      }
      return c;
    },
    enter(el) {
      const c = this.curtain(); if (!this.motion()) return;
      c.style.transformOrigin = '50% 0%';
      c.animate([{ transform: 'scaleY(1)' }, { transform: 'scaleY(0)' }], { duration: 900, easing: CURVE, fill: 'forwards' });
      if (el) el.animate([{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'none' }], { duration: 1000, delay: 250, easing: EASE, fill: 'backwards' });
    },
    go(href) {
      const c = this.curtain();
      if (!this.motion()) { location.href = href; return; }
      c.style.transformOrigin = '50% 100%';
      c.animate([{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], { duration: 600, easing: CURVE, fill: 'forwards' }).onfinish = () => { location.href = href; };
    },
    bindLinks(root) {
      root.addEventListener('click', e => {
        const a = e.target.closest && e.target.closest('a[data-route]');
        if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault(); this.go(a.getAttribute('href'));
      });
    },
    kinetic(root) {
      if (!this.motion()) return;
      root.querySelectorAll('[data-k]').forEach((el, i) => el.animate(
        [{ transform: 'translateY(110%) rotate(6deg)', opacity: 0 }, { transform: 'none', opacity: 1 }],
        { duration: 1200, delay: 380 + i * 55, easing: 'cubic-bezier(.34,1.3,.64,1)', fill: 'backwards' }));
    },
    reveal(root) {
      const els = [...root.querySelectorAll('[data-reveal]')];
      if (!this.motion() || !('IntersectionObserver' in window)) return () => {};
      const show = el => {
        if (el.dataset.shown) return; el.dataset.shown = '1';
        const d = +(el.dataset.reveal || 0);
        el.animate([{ opacity: 0, transform: 'translateY(28px)' }, { opacity: 1, transform: 'none' }], { duration: 1000, delay: d, easing: EASE, fill: 'backwards' });
        el.style.opacity = '';
      };
      els.forEach(el => { el.style.opacity = '0'; });
      const io = new IntersectionObserver(en => en.forEach(x => { if (x.isIntersecting) { show(x.target); io.unobserve(x.target); } }), { threshold: 0.12 });
      els.forEach(el => io.observe(el));
      const sweep = () => els.forEach(el => { const r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) show(el); });
      setTimeout(sweep, 1200); addEventListener('scroll', sweep, { passive: true });
      const t = setTimeout(() => els.forEach(el => { el.style.opacity = ''; el.dataset.shown = '1'; }), 15000);
      return () => { io.disconnect(); removeEventListener('scroll', sweep); clearTimeout(t); };
    },
    progress(bar) {
      const f = () => { const h = document.documentElement; if (bar) bar.style.transform = `scaleX(${h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)})`; };
      addEventListener('scroll', f, { passive: true }); f();
      return () => removeEventListener('scroll', f);
    },
    clock(cb) {
      const t = () => cb(new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour12: false }));
      t(); const id = setInterval(t, 1000); return () => clearInterval(id);
    },
    boot(ctx, root, bar) {
      this.enter(root.querySelector('[data-page]'));
      this.bindLinks(root); this.kinetic(root);
      const a = this.reveal(root), b = this.progress(bar), c = this.clock(time => ctx.state.time !== time && ctx.setState({ time }));
      return () => { a(); b(); c(); };
    }
  };
  window.PageFX = FX;
})();
