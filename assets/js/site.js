/* Funcionalidades do site. Os conteudos editaveis estao em conteudo.js. */
(() => {
  'use strict';

  const data = window.PORTFOLIO_CONTEUDO || { projetos: [], contato: {} };
  const projects = Array.isArray(data.projetos) ? data.projetos : [];
  const contact = data.contato || {};

  // Sem frameworks, CDN ou servicos pagos.
  document.documentElement.classList.add('js-enabled');

  const el = (tag, className = '', text = '') => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };

  const projectLink = project => `projeto.html?projeto=${encodeURIComponent(project.slug)}`;
  const names = { instagram: 'Instagram', behance: 'Behance', linkedin: 'LinkedIn' };

  function cover(project, index) {
    const link = el('a', 'project-cover');
    link.href = projectLink(project);
    link.setAttribute('aria-label', `Ver projeto ${project.nome}`);

    if (project.imagem) {
      link.classList.add('has-image');
      const img = el('img');
      img.src = project.imagem;
      img.alt = ''; // O nome do projeto ja esta no texto do proprio link.
      img.loading = 'lazy';
      img.decoding = 'async';
      img.addEventListener('error', () => {
        img.remove();
        link.classList.remove('has-image');
        link.append(el('span', 'placeholder-center', 'Imagem em breve'));
      }, { once: true });
      link.append(img);
    } else {
      link.append(el('span', 'placeholder-center', 'Imagem em breve'));
    }

    const caption = el('div', 'cover-meta');
    caption.append(el('h3', 'project-title', project.nome));
    if (project.categoria) caption.append(el('p', 'project-category', project.categoria));
    link.append(caption);
    return link;
  }

  function renderCards(container, items) {
    const fragment = document.createDocumentFragment();
    items.forEach(project => {
      const index = projects.indexOf(project);
      const card = el('article', 'project-card');
      card.append(cover(project, index));
      fragment.append(card);
    });
    container.replaceChildren(fragment);
  }

  function makeDetailBlock(title, body) {
    if (!body) return null;
    const section = el('section', 'detail-detail-block');
    section.append(el('h2', '', title));
    section.append(el('p', '', body));
    return section;
  }

  function renderProjectDetail(container) {
    const params = new URLSearchParams(location.search);
    const slug = params.get('projeto');
    const index = projects.findIndex(p => p.slug === slug);
    if (index < 0) {
      container.append(el('h1', '', 'Projeto não encontrado.'));
      const back = el('a', 'text-link', 'Ver todos os projetos ↗');
      back.href = 'projetos.html';
      container.append(back);
      document.title = 'Projeto não encontrado — Rafael Cabral';
      return;
    }

    const project = projects[index];
    document.title = `${project.nome} — Rafael Cabral`;
    const intro = el('div', 'detail-intro');
    const headingGroup = el('div');
    headingGroup.append(el('h1', '', project.nome));
    intro.append(headingGroup);
    if (project.categoria || project.ano) intro.append(el('span', 'detail-badge', [project.categoria, project.ano].filter(Boolean).join(' · ')));

    const hero = el('div', 'detail-cover');
    if (project.imagem) {
      const img = el('img');
      img.src = project.imagem;
      img.alt = `Capa do projeto ${project.nome}`;
      img.decoding = 'async';
      img.addEventListener('error', () => {
        img.remove();
        hero.append(el('span', 'detail-placeholder', 'Imagem do projeto em breve'));
      }, { once: true });
      hero.append(img);
    } else {
      hero.append(el('span', 'detail-placeholder', 'Imagem do projeto em breve'));
    }

    const overview = el('div', 'detail-overview');
    overview.append(el('h2', '', 'O projeto'));
    overview.append(el('p', '', project.resumo || 'Este case está em preparação. Em breve, este espaço reunirá a apresentação do projeto, suas imagens e os detalhes do processo criativo.'));

    container.append(intro, hero, overview);
    const context = makeDetailBlock('Contexto', project.contexto);
    const solution = makeDetailBlock('Solução', project.solucao);
    if (context) container.append(context);
    if (solution) container.append(solution);

    if (Array.isArray(project.galeria) && project.galeria.length) {
      const gallery = el('div', 'detail-gallery');
      project.galeria.forEach((src, i) => {
        if (!src) return;
        const img = el('img');
        img.loading = 'lazy';
        img.decoding = 'async';
        img.src = src;
        img.alt = `${project.nome} — aplicação visual ${i + 1}`;
        gallery.append(img);
      });
      if (gallery.children.length) container.append(gallery);
    }

    // Relacionados: todos os demais projetos, sem botoes de anterior/proximo.
    const others = projects.filter(item => item.slug !== project.slug);
    if (others.length) {
      const related = el('section', 'related-projects');
      related.setAttribute('aria-labelledby', 'related-title');
      const relatedHeader = el('div', 'related-header');
      const relatedTitle = el('h2', '', 'Outros projetos');
      relatedTitle.id = 'related-title';
      relatedHeader.append(relatedTitle, el('span', 'related-counter', `01 — ${String(others.length).padStart(2,'0')}`));
      const relatedGrid = el('div', 'projects-grid projects-grid--related');
      renderCards(relatedGrid, others);
      related.append(relatedHeader, relatedGrid);
      container.append(related);
    }

  }

  function configureContact() {
    const email = typeof contact.email === 'string' ? contact.email.trim() : '';
    const number = typeof contact.whatsapp === 'string' ? contact.whatsapp.replace(/\D/g, '') : '';
    const message = typeof contact.mensagemWhatsApp === 'string' ? contact.mensagemWhatsApp.trim() : '';
    const whatsappUrl = /^\d{10,15}$/.test(number)
      ? `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ''}`
      : '';

    // O botao abre uma conversa pronta no WhatsApp; nao envia mensagem automaticamente.
    document.querySelectorAll('[data-contact-whatsapp]').forEach(anchor => {
      if (whatsappUrl) {
        anchor.href = whatsappUrl;
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
        anchor.setAttribute('aria-label', 'Entre em contato pelo WhatsApp (nova aba)');
      } else if (email) {
        // Fallback: continua possivel falar por e-mail, mesmo sem WhatsApp configurado.
        anchor.href = `mailto:${email}`;
        anchor.removeAttribute('target');
        anchor.removeAttribute('rel');
      }
    });

    document.querySelectorAll('[data-social-links]').forEach(container => {
      if (email) {
        const emailLink = el('a', '', 'E-mail');
        emailLink.href = `mailto:${email}`;
        emailLink.setAttribute('aria-label', `Enviar e-mail para ${email}`);
        container.append(emailLink);
      }
      Object.entries(names).forEach(([key, label]) => {
        const url = typeof contact[key] === 'string' ? contact[key].trim() : '';
        if (!/^https:\/\//i.test(url)) return;
        const link = el('a', '', label);
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.setAttribute('aria-label', `${label} de Rafael Cabral (nova aba)`);
        container.append(link);
      });
    });
  }

  function showToast(message) {
    const toast = document.querySelector('[data-toast]');
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(showToast.timeout);
    showToast.timeout = setTimeout(() => toast.hidden = true, 4500);
  }

  function setupMenu() {
    const toggle = document.querySelector('[data-menu-toggle]');
    const nav = document.getElementById('menu-principal');
    if (!toggle || !nav) return;
    const close = () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
    };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        close();
        toggle.focus();
      }
    });
    document.addEventListener('click', event => {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) close();
    });
    window.addEventListener('resize', () => {
      if (window.matchMedia('(min-width: 761px)').matches) close();
    });
  }

  function setupStickyHeader() {
    const header = document.querySelector('[data-header]');
    if (!header) return;
    let scheduled = false;
    const update = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
      scheduled = false;
    };
    window.addEventListener('scroll', () => {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(update);
    }, { passive: true });
    update();
  }

  /**
   * Entrada visivel na primeira aparicao. Nao depende de CSS adicionando
   * opacity:0 no mesmo frame que .is-visible (problema comum que apagava
   * as transicoes da versao anterior). Dispara WAAPI apos intersecao.
   * Com JS desativado, todo o conteudo continua visivel.
   */
  function setupReveal() {
    const selectors = [
      '.hero-content > *',
      '.section-top > *',
      '.projects-grid .project-card',
      '.services-section > .section-label',
      '.services-section > .statement',
      '.services-aside',
      '.service-row',
      '.about-copy > *',
      '.about-photo',
      '.contact-section > .section-label',
      '.contact-row > *',
      '.listing-intro > *',
      '.listing-tools > *',
      '.detail-intro > *',
      '.detail-cover',
      '.detail-overview > *',
      '.detail-detail-block > *',
      '.detail-gallery > *',
      '.related-header > *',
      '.site-footer > *:not(.footer-signature)'
    ];
    const nodes = [...new Set(selectors.flatMap(selector => [...document.querySelectorAll(selector)]))];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window) || typeof Element.prototype.animate !== 'function') {
      return; // Conteudo natural, sem ocultar nada.
    }

    const play = element => {
      const children = [...element.parentElement.children];
      const siblingPosition = Math.max(children.indexOf(element), 0);
      const isTile = element.classList.contains('project-card') || element.classList.contains('detail-cover');
      const inHero = element.closest('.hero-content');
      const distance = isTile ? 128 : inHero ? 118 : 96;
      // Entradas mais presentes e cadenciadas para grupos de elementos.
      const delay = isTile ? (siblingPosition % 2) * 260 : (siblingPosition % 3) * 205;
      const frames = [
        { opacity: 0, transform: `translate3d(0,${distance}px,0)` },
        { opacity: 1, transform: 'translate3d(0,0,0)' }
      ];
      const animation = element.animate(frames, {
        duration: isTile ? 1800 : inHero ? 1850 : 1650,
        delay,
        easing: 'cubic-bezier(.35,.3,.25,1)',
        fill: 'both'
      });
      element.dataset.entrance = 'playing';
      animation.finished.then(() => {
        // Ao terminar, o elemento volta a seus estilos naturais (sem flash).
        animation.cancel();
        element.dataset.entrance = 'complete';
      }).catch(() => {});
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        play(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -42px 0px' });

    nodes.forEach(node => observer.observe(node));
  }

  /* Escreve "Rafael Cabral" no rodape, em duas sequencias.
   * O texto e carregado via Adobe Fonts e permanece legivel sem JS.
   * Acionar no scroll evita animacoes fora da area visivel;
   * hover/foco permitem repetir depois de concluida a primeira escrita.
   */
  function setupFooterSignature() {
    const link = document.querySelector('[data-signature]');
    if (!link) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches || !('IntersectionObserver' in window)) return;

    let playing = false;
    let written = false;
    const play = () => {
      if (playing || reduced.matches) return;
      playing = true;
      link.classList.remove('is-writing');
      void link.offsetWidth; // Reinicia as duas sequencias, inclusive no replay de hover.
      link.classList.add('is-writing');
    };
    const last = link.querySelector('.footer-signature__word--last');
    if (last) last.addEventListener('animationend', event => {
      if (event.animationName !== 'signature-ink-write') return;
      link.classList.remove('is-writing');
      playing = false;
      written = true;
    });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        // Espera o Adobe Fonts quando possivel, sem exigir download de fontes.
        const fontPromise = document.fonts && document.fonts.load
          ? document.fonts.load('400 42px "bestia-small"', 'Rafael Cabral').catch(() => [])
          : Promise.resolve([]);
        Promise.race([fontPromise, new Promise(resolve => setTimeout(resolve, 2000))])
          .then(() => { if (link.isConnected) play(); });
      });
    }, { threshold: .5 });
    observer.observe(link);
    link.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse' && written) play();
    });
    link.addEventListener('focus', () => { if (written) play(); });
  }

  const featured = document.getElementById('featured-projects');
  if (featured) renderCards(featured, projects.slice(0, 6));
  const listing = document.getElementById('all-projects');
  if (listing) {
    renderCards(listing, projects);
    const count = document.getElementById('project-count');
    if (count) count.textContent = `${projects.length} projetos`;
  }
  const detail = document.getElementById('project-detail');
  if (detail) renderProjectDetail(detail);
  document.querySelectorAll('[data-year]').forEach(node => node.textContent = new Date().getFullYear());
  configureContact();
  setupMenu();
  setupStickyHeader();
  setupReveal();
  setupFooterSignature();
})();
