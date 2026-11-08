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
  // Convenção de arquivos: só adicionar WebP ao GitHub, sem editar o JS.
  // Se um caminho manual estiver preenchido em conteudo.js, ele tem prioridade.
  const projectCoverSource = project => (typeof project.imagem === 'string' && project.imagem.trim())
    || `assets/img/projetos/${project.slug}.webp`;
  const numberedProjectSource = (project, number) =>
    `assets/img/projetos/${project.slug}-${String(number).padStart(2, '0')}.webp`;
  const names = { instagram: 'Instagram', behance: 'Behance', linkedin: 'LinkedIn' };

  function cover(project, index) {
    const link = el('a', 'project-cover');
    link.href = projectLink(project);
    link.setAttribute('aria-label', `Ver projeto ${project.nome}`);

    // Tentativa automatica de carregar assets/img/projetos/<slug>.webp.
    // A capa so e exibida quando o download termina com sucesso.
    const img = el('img');
    img.alt = ''; // O nome do projeto ja e anunciado pelo proprio link.
    img.loading = 'lazy';
    img.decoding = 'async';
    img.addEventListener('load', () => link.classList.add('has-image'), { once: true });
    img.addEventListener('error', () => img.remove(), { once: true });
    link.append(img, el('span', 'placeholder-center', 'Imagem em breve'));
    img.src = projectCoverSource(project);

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

  /* O GitHub Pages e estatico: ele nao tem uma API de listagem de imagens.
   * Para manter a edicao sem codigo, tentamos os numeros em ordem crescente.
   * O primeiro arquivo ausente encerra a busca (01, 02, 03... sem lacunas).
   */
  async function populateProjectGallery(project, gallery) {
    const manual = Array.isArray(project.galeria) ? project.galeria.filter(Boolean) : [];
    const sources = manual.length ? manual : null;
    const maxImages = 40; // limite de seguranca; pode receber 01 a 40.
    for (let index = 0; index < (sources ? sources.length : maxImages); index++) {
      const src = sources ? sources[index] : numberedProjectSource(project, index + 1);
      const loaded = await new Promise(resolve => {
        const image = new Image();
        image.decoding = 'async';
        image.onload = () => resolve(image);
        image.onerror = () => resolve(null);
        image.src = src;
      });
      // Com a convencao automatica, a primeira lacuna significa fim da galeria.
      if (!loaded) { if (sources) continue; else break; }
      loaded.alt = `${project.nome} — aplicação visual ${index + 1}`;
      loaded.decoding = 'async';
      loaded.loading = 'lazy';
      gallery.append(loaded);
      gallery.hidden = false;
      document.dispatchEvent(new CustomEvent('portfolio:reveal-added', {
        detail: { elements: [loaded] }
      }));
    }
  }

  /* Fotos fixas: `sobre.webp` e `servicos.webp` sao opcionais e substituem
   * os placeholders quando presentes na pasta assets/img/.
   */
  function setupAutoSectionImages() {
    document.querySelectorAll('[data-auto-image]').forEach(frame => {
      const source = frame.dataset.autoImage;
      if (!source) return;
      const image = el('img', 'auto-section-image');
      image.alt = frame.dataset.autoAlt || 'Imagem de apoio';
      image.loading = 'lazy';
      image.decoding = 'async';
      image.addEventListener('load', () => {
        frame.classList.add('has-image');
        frame.setAttribute('aria-label', image.alt);
      }, { once: true });
      image.addEventListener('error', () => image.remove(), { once: true });
      frame.prepend(image);
      image.src = source;
    });
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
    const heroPlaceholder = el('span', 'detail-placeholder', 'Imagem do projeto em breve');
    hero.append(heroPlaceholder);
    const img = el('img');
    img.alt = `Capa do projeto ${project.nome}`;
    img.decoding = 'async';
    // Evita mostrar um icone de imagem quebrada se ainda nao existir a capa.
    img.style.visibility = 'hidden';
    img.addEventListener('load', () => {
      heroPlaceholder.remove();
      img.style.visibility = 'visible';
    }, { once: true });
    img.addEventListener('error', () => img.remove(), { once: true });
    hero.append(img);
    img.src = projectCoverSource(project);

    const overview = el('div', 'detail-overview');
    overview.append(el('h2', '', 'O projeto'));
    overview.append(el('p', '', project.resumo || 'Este case está em preparação. Em breve, este espaço reunirá a apresentação do projeto, suas imagens e os detalhes do processo criativo.'));

    container.append(intro, hero, overview);
    const context = makeDetailBlock('Contexto', project.contexto);
    const solution = makeDetailBlock('Solução', project.solucao);
    if (context) container.append(context);
    if (solution) container.append(solution);

    // O navegador nao consegue listar arquivos do GitHub Pages.
    // Detectamos <slug>-01.webp, -02.webp... sequencialmente, ate a primeira falta.
    // Nao mostramos uma galeria vazia quando ainda nao ha arquivos.
    const gallery = el('div', 'detail-gallery');
    gallery.hidden = true;
    gallery.setAttribute('aria-label', `Imagens do projeto ${project.nome}`);
    container.append(gallery);
    populateProjectGallery(project, gallery);

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
    const header = document.querySelector('[data-header]');
    if (!toggle || !nav) return;
    const close = () => {
      nav.classList.remove('is-open');
      header?.classList.remove('is-menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
    };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      nav.classList.toggle('is-open', open);
      header?.classList.toggle('is-menu-open', open);
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
      '.related-header > *'
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

    const observeReveal = element => {
      if (!element || !element.parentElement || element.dataset.entrance) return;
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
    };
    nodes.forEach(observeReveal);
    // As imagens numeradas entram no DOM apos o primeiro carregamento.
    document.addEventListener('portfolio:reveal-added', event => {
      (event.detail?.elements || []).forEach(observeReveal);
    });
    // O rodape precisa de um unico gatilho de entrada para nao gerar
    // rolagem adicional: filhos transformados nao sao observados separados.
    // Preservamos os mesmos tempos, distancias, atrasos e keyframes.
    const footer = document.querySelector('.site-footer');
    const footerItems = footer
      ? [...footer.children].filter(node => !node.matches('.footer-signature'))
      : [];
    let footerObserver = null;
    if (footer && footerItems.length) {
      footer.dataset.entrance = 'pending';
      let remaining = footerItems.length;
      const finishFooter = () => {
        if (footer.dataset.entrance === 'complete') return;
        footer.dataset.entrance = 'complete';
        footer.dispatchEvent(new Event('footer-entrance-complete'));
      };

      for (const item of footerItems) {
        const position = [...footer.children].indexOf(item);
        item.style.setProperty('--reveal-delay', `${(position % 3) * 130}ms`);
        item.style.setProperty('--reveal-distance', '90px');
        item.style.setProperty('--reveal-duration', '1420ms');
        item.dataset.entrance = 'pending';
        item.addEventListener('animationend', event => {
          if (event.target !== item || event.animationName !== 'reveal-enter') return;
          item.dataset.entrance = 'complete';
          if (--remaining === 0) finishFooter();
        });
      }

      footerObserver = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        footerObserver.disconnect();
        footer.dataset.entrance = 'playing';
        footerItems.forEach(item => {
          item.dataset.entrance = 'playing';
          item.classList.add('is-revealed');
        });
        // Mesmo gatilho para textos, links e escrita SVG: sem esperar o animationend.
        footer.dispatchEvent(new Event('footer-entrance-start'));
      }, { threshold: .02, rootMargin: '0px 0px -16px 0px' });
      footerObserver.observe(footer);
    }

    root.classList.add('motion-initialized');

    // Se a pessoa ativar 'reduzir movimento' durante a sessao, revelar tudo.
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = event => {
      if (event.matches) {
        observer.disconnect();
        if (footerObserver) footerObserver.disconnect();
        if (footer) {
          footer.dataset.entrance = 'complete';
          footer.dispatchEvent(new Event('footer-entrance-complete'));
        }
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
    // O SVG comeca no mesmo instante em que o observador aciona a entrada
    // dos outros itens do rodape. Nao alteramos os keyframes nem os tempos.
    // Usar o mesmo evento evita diferenca de sincronismo entre observadores.
    const footer = link.closest('.site-footer');
    const startWithFooter = () => {
      if (started) return;
      started = true;
      link.classList.add('is-writing');
      // Fallback para manter a assinatura completa mesmo sem animationend.
      window.setTimeout(complete, Math.ceil(elapsed) + 120);
    };
    if (footer) {
      footer.addEventListener('footer-entrance-start', startWithFooter, { once: true });
      // Garante o comportamento ao restaurar pagina/scroll do historico.
      if (footer.dataset.entrance === 'playing' || footer.dataset.entrance === 'complete') {
        startWithFooter();
      }
    } else {
      startWithFooter();
    }

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
  setupAutoSectionImages();
  setupMenu();
  setupStickyHeader();
  setupReveal();
  setupPageTransitions();
  setupFooterSignature();
})();
