/* v2.13 | Hover circular dos botoes, independente das animacoes do site. */
(() => {
  if (!window.Element || !Element.prototype.animate || !window.matchMedia || !window.CSS || !CSS.supports('clip-path', 'circle(1px at 0px 0px)')) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.pill').forEach(pill => {
    const layer = pill.querySelector('.pill-fill');
    const surface = pill.querySelector('.pill-surface');
    if (!layer || !surface) return;
    let animation = null;
    let state = 'idle';
    function run(enter, event) {
      const r = surface.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const x = event ? Math.max(0, Math.min(r.width, event.clientX - r.left)) : r.width / 2;
      const y = event ? Math.max(0, Math.min(r.height, event.clientY - r.top)) : r.height / 2;
      const radius = Math.hypot(Math.max(x, r.width - x), Math.max(y, r.height - y)) + 4;
      const zero = `circle(0px at ${x}px ${y}px)`;
      const full = `circle(${radius}px at ${x}px ${y}px)`;
      // Se houver uma inversao rapida, retoma o quadro visual atual.
      const start = state === 'idle' ? zero : state === 'full' ? full : getComputedStyle(layer).clipPath;
      const end = enter ? full : zero;
      if (animation) { animation.cancel(); animation = null; }
      if (reduced.matches) {
        layer.style.clipPath = enter ? 'none' : zero;
        state = enter ? 'full' : 'idle';
        return;
      }
      state = 'moving';
      layer.style.clipPath = start;
      const a = layer.animate([{ clipPath: start }, { clipPath: end }], {
        duration: enter ? 560 : 460,
        easing: enter ? 'cubic-bezier(.22,1,.36,1)' : 'cubic-bezier(.55,.05,.25,1)',
        fill: 'forwards'
      });
      animation = a;
      a.onfinish = () => {
        if (animation !== a) return;
        // No estado preenchido, apenas o recorte externo de 9px permanece.
        layer.style.clipPath = enter ? 'none' : zero;
        state = enter ? 'full' : 'idle';
        a.cancel();
        animation = null;
      };
    }
    pill.classList.add('pill-motion');
    pill.addEventListener('pointerenter', e => { if (e.pointerType !== 'touch') run(true, e); });
    pill.addEventListener('pointerleave', e => { if (e.pointerType !== 'touch' && !pill.matches(':focus-visible')) run(false, e); });
    pill.addEventListener('focus', () => { if (pill.matches(':focus-visible')) run(true); });
    pill.addEventListener('blur', () => { if (!pill.matches(':hover')) run(false); });
    // Cobre a situacao em que o ponteiro ja esta sobre o botao ao carregar.
    if (pill.matches(':hover, :focus-visible')) run(true);
  });
})();
