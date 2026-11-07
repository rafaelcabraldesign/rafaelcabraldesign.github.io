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
   * Elementos com entrada sao ocultados pelo CSS desde o primeiro frame.
   * Aqui somente ativamos a animacao ao cruzar o viewport. Nao usamos
   * WAAPI + cancel(), que gerava um frame visivel antes de reiniciar.
   */
  function setupReveal() {
    const root = document.documentElement;
    if (!root.classList.contains('motion-ready') || !('IntersectionObserver' in window)) {
      root.classList.remove('motion-ready');
      return;
    }
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

    const observer = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        observer.unobserve(target);
        target.dataset.entrance = 'playing';
        target.classList.add('is-revealed');
      });
    }, { threshold: .08, rootMargin: '0px 0px -24px 0px' });

    for (const element of nodes) {
      const siblings = [...element.parentElement.children];
      const position = Math.max(siblings.indexOf(element), 0);
      const isCard = element.classList.contains('project-card');
      const isHero = !!element.closest('.hero-content');
      const delay = isCard ? (position % 2) * 155 : (position % 3) * 130;
      const distance = isCard ? 120 : isHero ? 105 : 90;
      element.style.setProperty('--reveal-delay', `${delay}ms`);
      element.style.setProperty('--reveal-distance', `${distance}px`);
      element.style.setProperty('--reveal-duration', `${isCard ? 1550 : isHero ? 1580 : 1420}ms`);
      element.dataset.entrance = 'pending';
      element.addEventListener('animationend', event => {
        if (event.animationName === 'reveal-enter') element.dataset.entrance = 'complete';
      });
      observer.observe(element);
    }
    root.classList.add('motion-initialized');

    // Se a pessoa ativar 'reduzir movimento' durante a sessao, revelar tudo.
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = event => {
      if (event.matches) {
        observer.disconnect();
        root.classList.remove('motion-ready');
      }
    };
    if (preference.addEventListener) preference.addEventListener('change', onChange);
  }

  /**
   * Funde a pagina inteira antes de sair, sem afetar links externos,
   * WhatsApp, e-mail, downloads, nova aba ou navegacao por âncoras.
   */
  function setupPageTransitions() {
    let navigating = false;
    window.addEventListener('pageshow', () => {
      navigating = false;
      document.body.classList.remove('is-page-leaving');
    });
    document.addEventListener('click', event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target.closest('a[href]');
      if (!anchor || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return;
      let url;
      try { url = new URL(anchor.href, window.location.href); } catch (_) { return; }
      if (!['http:', 'https:', 'file:'].includes(url.protocol)) return;
      if (url.origin !== location.origin) return;
      const current = new URL(location.href);
      if (url.pathname === current.pathname && url.search === current.search) return; // hash / scroll
      if (navigating || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      navigating = true;
      event.preventDefault();
      document.body.classList.add('is-page-leaving');
      window.setTimeout(() => window.location.assign(url.href), 465);
    });
  }

  /* Assinatura SVG: inicia visivel apenas quando o rodape esta estabilizado
   * e a assinatura entra no viewport. Evita o flash de layout ao recarregar,
   * navegar ou restaurar a posicao de rolagem. Hover apenas muda de cor.
   */
  function setupFooterSignature() {
    const link = document.querySelector('[data-signature]');
    if (!link) return;
    const finishStatic = () => {
      link.classList.remove('is-prepared', 'is-writing');
      link.classList.add('is-complete');
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      finishStatic();
      return;
    }
    const traces = [...link.querySelectorAll('[data-sig-trace]')];
    if (!traces.length) { finishStatic(); return; }

    // Distribui os 1.100 ms entre os doze tracos, preservando o ritmo de caneta.
    // O calculo ocorre ANTES de exibir o SVG, para impedir um frame sem mascara.
    let lengths;
    try { lengths = traces.map(trace => trace.getTotalLength()); }
    catch (_) { finishStatic(); return; }
    const weights = lengths.map(length => Math.sqrt(Math.max(1, length)));
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    const totalDuration = 1100;
    const pauseBetweenLetters = 6;
    const drawableTime = totalDuration - pauseBetweenLetters * (traces.length - 1);
    let elapsed = 0;
    traces.forEach((trace, index) => {
      const duration = drawableTime * (weights[index] / totalWeight);
      trace.style.setProperty('--signature-path-length', `${lengths[index] + 2}px`);
      trace.style.setProperty('--signature-duration', `${duration.toFixed(2)}ms`);
      trace.style.setProperty('--signature-delay', `${elapsed.toFixed(2)}ms`);
      elapsed += duration + pauseBetweenLetters;
    });
    link.classList.add('is-prepared');

    let started = false;
    let completed = false;
    const complete = () => {
      if (completed) return;
      completed = true;
      link.classList.remove('is-writing', 'is-prepared');
      link.classList.add('is-complete');
    };
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      if (started) return;
      started = true;
      observer.disconnect();
      link.classList.add('is-writing');
      // Fallback para nunca deixar a assinatura invisivel se a animacao nao disparar.
      window.setTimeout(complete, Math.ceil(elapsed) + 120);
    }, { threshold: .25, rootMargin: '0px 0px -20px 0px' });

    // Espera carregamento, fontes e dois frames: evita observar o rodape
    // antes da pagina de projetos receber os cards e antes da restauracao do scroll.
    const observeWhenReady = () => {
      const observe = () => requestAnimationFrame(() => requestAnimationFrame(() => observer.observe(link)));
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(observe, observe);
      } else observe();
    };
    if (document.readyState === 'complete') observeWhenReady();
    else window.addEventListener('load', observeWhenReady, { once: true });

    traces[traces.length - 1].addEventListener('animationend', event => {
      if (event.animationName === 'signature-stroke-draw') complete();
    }, { once: true });
    window.addEventListener('pagehide', () => { if (started) complete(); });
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
  setupPageTransitions();
  setupFooterSignature();
})();
