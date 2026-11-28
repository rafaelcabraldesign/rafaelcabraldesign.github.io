/* v2.15 - Entrada em escada dos cards, sem alterar as demais entradas. */
(() => {
  'use strict';
  const root = document.documentElement;
  if (!root.classList.contains('motion-ready') || !('IntersectionObserver' in window)) return;
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches) return;

  const STEP = 95;
  const groups = new Map();
  const cards = new Map();
  let observer = null;
  let frame = 0;
  let active = true;

  function stop() {
    active = false;
    root.classList.remove('card-order-active');
    observer?.disconnect();
    if (frame) cancelAnimationFrame(frame);
    for (const group of groups.values()) clearTimeout(group.timer);
    document.removeEventListener('portfolio:media-ready', onMediaReady);
    document.removeEventListener('focusin', onFocus);
    preference.removeEventListener?.('change', onPreference);
  }

  function reveal(card, group) {
    if (card.revealed) return;
    card.revealed = true;
    group.lastStart = performance.now();
    observer.unobserve(card.element);
    card.element.classList.add('is-card-revealed');
  }

  function requestFlush() {
    if (!active || frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      if (!root.classList.contains('motion-ready') || preference.matches) { stop(); return; }
      for (const group of groups.values()) flush(group);
    });
  }

  function flush(group) {
    clearTimeout(group.timer);
    group.timer = 0;
    // A ordem e a do DOM: esquerda -> direita e linha por linha.
    // Cards fora da area visivel nao bloqueiam a fila (scroll rapido/restaurado).
    const next = group.cards.find(card => !card.revealed && card.visible);
    if (!next) return;
    // Nem uma imagem rapida nem um placeholder pode ultrapassar um card
    // anterior que esteja visivel e aguardando load/decode.
    if (next.element.hasAttribute('data-media-pending')) return;
    const wait = group.lastStart + STEP - performance.now();
    if (wait > 0) {
      group.timer = setTimeout(requestFlush, Math.ceil(wait));
      return;
    }
    reveal(next, group);
    // O proximo card inicia apos o mesmo intervalo da animacao original.
    if (group.cards.some(card => !card.revealed && card.visible)) {
      group.timer = setTimeout(requestFlush, STEP);
    }
  }

  function onMediaReady(event) {
    const card = cards.get(event.detail?.element);
    if (card && !card.revealed) requestFlush();
  }

  function onFocus(event) {
    // Foco por teclado nao deve ficar invisivel enquanto outro card carrega.
    const card = cards.get(event.target.closest?.('.project-card'));
    if (!card || card.revealed || card.element.hasAttribute('data-media-pending')) return;
    if (event.target.matches?.(':focus-visible')) {
      reveal(card, card.group);
      requestFlush();
    }
  }

  function onPreference(event) { if (event.matches) stop(); }

  function init() {
    if (!active || !root.classList.contains('motion-ready') || preference.matches) { stop(); return; }
    try {
      // site.js monta as tres listas de forma sincrona antes de DOMContentLoaded.
      // Observar mesmo as capas pendentes: a geometria ja esta reservada.
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          const card = cards.get(entry.target);
          if (card && !card.revealed) card.visible = entry.isIntersecting;
        }
        requestFlush();
      }, { threshold: .08, rootMargin: '0px 0px -24px 0px' });
      for (const grid of document.querySelectorAll('.projects-grid')) {
        const elements = [...grid.children].filter(node => node.classList.contains('project-card'));
        if (!elements.length) continue;
        const group = { cards: [], lastStart: -Infinity, timer: 0 };
        groups.set(grid, group);
        for (const element of elements) {
          const card = { element, group, visible: false, revealed: false };
          group.cards.push(card);
          cards.set(element, card);
          observer.observe(element);
        }
      }
      if (!cards.size) { stop(); return; }
      document.addEventListener('portfolio:media-ready', onMediaReady);
      document.addEventListener('focusin', onFocus);
      preference.addEventListener?.('change', onPreference);
    } catch (error) {
      // Se a inicializacao falhar, o reveal original permanece como fallback.
      stop();
      console.warn('Portfolio: entrada ordenada indisponivel.', error);
    }
  }

  // Executado antes de site.js, para que o observador original nao consiga
  // iniciar a animacao CSS dos cards antes da fila. Sem este script, a regra
  // original continua funcionando. Os demais elementos nao sao afetados.
  root.classList.add('card-order-active');
  if (document.readyState === 'loading' || document.readyState === 'interactive') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else init();
})();
