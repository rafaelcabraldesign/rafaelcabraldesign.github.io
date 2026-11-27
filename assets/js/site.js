/* Funcionalidades do site. Os conteudos editaveis estao em conteudo/projetos/. */
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
  // O build do GitHub Actions inclui o inventario real no HTML. Sem uma
  // requisicao extra, o navegador sabe quais arquivos existem e suas dimensoes.
  // Se o HTML ainda nao passou pelo build, o fallback antigo continua utilizavel.
  let imageIndex = null;
  try {
    const index = JSON.parse(document.getElementById('portfolio-image-index')?.textContent || 'null');
    if (index?.version === 1 && index.files && typeof index.files === 'object' && !Array.isArray(index.files)) {
      imageIndex = new Map(Object.entries(index.files));
    }
  } catch (_) { /* HTML sem indice valido: usar fallback. */ }
  if (!imageIndex) console.warn('Portfolio: indice de imagens ausente. Publique pelo workflow GitHub Actions para ativar a otimizacao.');

  const projectFolder = project => `assets/img/projetos/${project.slug}`;
  const flatFolder = 'assets/img/projetos';
  const knownSources = sources => imageIndex ? sources.filter(path => imageIndex.has(path)) : sources;
  // Campos manuais externos (ou outros formatos) continuam permitidos.
  const manualAvailable = path => !imageIndex || !/^assets\/img\/.*\.webp$/.test(path) || imageIndex.has(path);
  const imageDimensions = path => imageIndex?.get(path);
  const applyImageDimensions = (image, source) => {
    const size = imageDimensions(source);
    if (Array.isArray(size) && size[0] > 0 && size[1] > 0) {
      image.width = size[0];
      image.height = size[1];
      image.style.aspectRatio = `auto ${size[0]} / ${size[1]}`;
    } else {
      image.removeAttribute('width');
      image.removeAttribute('height');
      image.style.removeProperty('aspect-ratio');
    }
  };
  const galleryCandidates = (project, number) => {
    const suffix = String(number).padStart(2, '0');
    return knownSources([
      `${projectFolder(project)}/${project.slug}-${suffix}.webp`,
      `${flatFolder}/${project.slug}-${suffix}.webp`
    ]);
  };
  // Numero crescente, sem teto artificial; subpasta individual tem prioridade
  // sobre o caminho plano legado. Variantes do mesmo numero nao se repetem.
  function indexedGallery(project) {
    if (!imageIndex) return [];
    const entries = new Map();
    for (const folder of [projectFolder(project), flatFolder]) {
      const prefix = `${folder}/${project.slug}-`;
      for (const path of imageIndex.keys()) {
        if (!path.startsWith(prefix)) continue;
        const match = /^(\d+)\.webp$/.exec(path.slice(prefix.length));
        if (!match) continue;
        const number = Number(match[1]);
        if (!Number.isSafeInteger(number) || number < 1) continue;
        if (!entries.has(number)) entries.set(number, []);
        entries.get(number).push(path);
      }
    }
    // Preferir nomes canonicos (-01, -02, ...) dentro de cada pasta.
    for (const [number, paths] of entries) {
      paths.sort((a, b) => {
        const rank = path => (path.startsWith(`${projectFolder(project)}/`) ? 0 : 2)
          + (path.endsWith(`-${String(number).padStart(2, '0')}.webp`) ? 0 : 1);
        return rank(a) - rank(b) || a.localeCompare(b);
      });
    }
    return [...entries].sort(([a], [b]) => a - b).map(([number, paths]) => ({number, paths}));
  }
  const heroCandidates = project => imageIndex
    ? (indexedGallery(project).find(entry => entry.number === 1)?.paths || [])
    : galleryCandidates(project, 1);
  const coverCandidates = project => [...new Set([
    ...(typeof project.imagem === 'string' && project.imagem.trim() && manualAvailable(project.imagem.trim()) ? [project.imagem.trim()] : []),
    ...knownSources([
      `${projectFolder(project)}/${project.slug}.webp`,
      `${flatFolder}/${project.slug}.webp`
    ]),
    ...heroCandidates(project)
  ])];
  // Carrega a primeira imagem existente. Se nenhuma existir, mantem o placeholder.
  function loadWithFallback(image, sources) {
    return new Promise(resolve => {
      let cursor = 0;
      const clean = () => {
        image.removeEventListener('load', onLoad);
        image.removeEventListener('error', onError);
      };
      const onLoad = async () => {
        const source = image.getAttribute('src');
        clean();
        // Espera a decodificacao, quando suportada, antes de revelar a imagem.
        try { if (typeof image.decode === 'function') await image.decode(); }
        catch (_) { /* O evento load continua sendo o fallback do navegador. */ }
        resolve(source);
      };
      const onError = () => attempt();
      const attempt = () => {
        if (cursor >= sources.length) { clean(); resolve(null); return; }
        const source = sources[cursor++];
        applyImageDimensions(image, source);
        image.src = source;
      };
      image.addEventListener('load', onLoad);
      image.addEventListener('error', onError);
      attempt();
    });
  }
  const names = { instagram: 'Instagram', behance: 'Behance', linkedin: 'LinkedIn' };

  function cover(project, index) {
    const link = el('a', 'project-cover');
    link.href = projectLink(project);
    link.setAttribute('aria-label', `Ver projeto ${project.nome}`);

    // Permite capa explicita ou a primeira imagem numerada como fallback.
    const img = el('img');
    img.alt = ''; // O nome do projeto ja e anunciado pelo proprio link.
    img.loading = 'lazy';
    img.decoding = 'async';
    const placeholder = el('span', 'placeholder-center', 'Carregando...');
    link.dataset.imageState = 'loading';
    link.append(img, placeholder);
    loadWithFallback(img, coverCandidates(project)).then(src => {
      link.dataset.imageState = src ? 'loaded' : 'missing';
      if (src) link.classList.add('has-image');
      else {
        img.remove();
        placeholder.textContent = 'Imagem em breve';
      }
    });

    // Nome e ano dividem a mesma linha. Anos nao cadastrados nao aparecem.
    const caption = el('div', 'cover-meta');
    const captionLine = el('div', 'cover-meta-line');
    captionLine.append(el('h3', 'project-title', project.nome));
    const year = String(project.ano ?? '').trim();
    if (year) captionLine.append(el('span', 'project-year', year));
    caption.append(captionLine);
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

  /* As imagens indexadas entram no DOM em ordem numerica, com dimensoes
   * conhecidas antes do download. O navegador carrega apenas as proximas
   * da area visivel; nao ha pre-download com new Image() no fluxo normal.
   */
  function appendLazyGalleryImage(project, gallery, number, paths) {
    if (!paths.length) return;
    const frame = el('div', 'detail-gallery-frame');
    const image = el('img');
    image.alt = `${project.nome} — aplicação visual ${number}`;
    image.loading = 'lazy';
    image.decoding = 'async';
    applyImageDimensions(image, paths[0]);
    if (!imageDimensions(paths[0])) frame.classList.add('unknown-image-size');
    const note = el('span', 'gallery-loading-note', 'Carregando...');
    frame.dataset.imageState = 'loading';
    frame.append(image, note);
    gallery.append(frame);
    gallery.hidden = false;
    document.dispatchEvent(new CustomEvent('portfolio:reveal-added', {
      detail: { elements: [frame] }
    }));
    loadWithFallback(image, paths).then(result => {
      if (result) {
        frame.dataset.imageState = 'loaded';
        frame.classList.remove('unknown-image-size');
        note.remove();
      } else {
        frame.remove();
        gallery.hidden = !gallery.children.length;
      }
    });
  }

  async function populateProjectGallery(project, gallery, heroSourcePromise) {
    const manual = Array.isArray(project.galeria) ? project.galeria.filter(path => typeof path === 'string' && path.trim()) : [];
    if (manual.length) {
      const heroSource = await heroSourcePromise;
      const seen = new Set(heroSource ? [new URL(heroSource, document.baseURI).href] : []);
      manual.forEach((source, index) => {
        if (!manualAvailable(source)) return;
        const url = new URL(source, document.baseURI).href;
        if (seen.has(url)) return;
        seen.add(url);
        appendLazyGalleryImage(project, gallery, index + 1, [source]);
      });
      return;
    }
    if (imageIndex) {
      indexedGallery(project).filter(entry => entry.number > 1).forEach(({number, paths}) => {
        appendLazyGalleryImage(project, gallery, number, paths);
      });
      return;
    }
    // Modo de contingencia: somente se Pages ainda nao estiver usando o
    // workflow. Aceita lacunas ate 40, em lotes de quatro, mas faz sondagens.
    // O build indexado elimina completamente este caminho.
    for (let start = 2; start <= 40; start += 4) {
      const batch = Array.from({length: Math.min(4, 41 - start)}, (_, i) => start + i);
      const loaded = await Promise.all(batch.map(async number => {
        const image = new Image();
        image.decoding = 'async';
        image.alt = `${project.nome} — aplicação visual ${number}`;
        const result = await loadWithFallback(image, galleryCandidates(project, number));
        return result ? image : null;
      }));
      const images = loaded.filter(Boolean);
      if (images.length) {
        gallery.append(...images);
        gallery.hidden = false;
        document.dispatchEvent(new CustomEvent('portfolio:reveal-added', {detail: {elements: images}}));
      }
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
      const note = frame.querySelector('.placeholder-note');
      const missingNote = note?.dataset.imageMissing || note?.textContent || 'Imagem em breve';
      frame.dataset.imageState = 'loading';
      if (note) note.textContent = 'Carregando...';
      frame.prepend(image);
      loadWithFallback(image, knownSources([source])).then(result => {
        frame.dataset.imageState = result ? 'loaded' : 'missing';
        if (result) {
          frame.classList.add('has-image');
          frame.setAttribute('aria-label', image.alt);
        } else {
          image.remove();
          if (note) note.textContent = missingNote;
        }
      });
    });
  }

  function appendParagraphs(container, text) {
    const blocks = String(text || '')
      .split(/\n\s*\n/)
      .map(block => block.trim())
      .filter(Boolean);
    blocks.forEach(block => container.append(el('p', '', block)));
    return blocks.length > 0;
  }

  function createSpecRow(label, value) {
    const row = el('div', 'detail-spec-row');
    const term = el('dt', '', label);
    const description = el('dd', '', value || '—');
    row.append(term, description);
    return row;
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
    const headingGroup = el('div', 'detail-heading');
    headingGroup.append(el('h1', '', project.nome));
    intro.append(headingGroup);
    intro.append(el('p', 'detail-summary', project.frase || 'Apresentação do projeto em preparação.'));

    const hero = el('div', 'detail-cover');
    const heroPlaceholder = el('span', 'detail-placeholder', 'Carregando...');
    hero.dataset.imageState = 'loading';
    hero.append(heroPlaceholder);
    const img = el('img');
    img.alt = `Primeira imagem do projeto ${project.nome}`;
    img.decoding = 'async';
    img.hidden = true;
    hero.append(img);
    const heroPaths = heroCandidates(project);
    const heroSize = imageDimensions(heroPaths[0]);
    if (heroSize) {
      heroPlaceholder.style.aspectRatio = `${heroSize[0]} / ${heroSize[1]}`;
      heroPlaceholder.style.minHeight = '0';
    }
    img.fetchPriority = 'high';
    const heroSourcePromise = loadWithFallback(img, heroPaths).then(src => {
      hero.dataset.imageState = src ? 'loaded' : 'missing';
      if (src) {
        heroPlaceholder.remove();
        img.hidden = false;
      } else {
        img.remove();
        heroPlaceholder.textContent = 'Imagem do projeto em breve';
      }
      return src;
    });

    const meta = el('section', 'detail-meta');
    const specs = el('dl', 'detail-specs');
    [
      createSpecRow('SERVIÇOS', project.servicos),
      createSpecRow(project.industria ? 'INDÚSTRIA' : 'SEGMENTO', project.industria || project.segmento || project.categoria),
      createSpecRow('ANO', project.ano)
    ].filter(Boolean).forEach(row => specs.append(row));

    const description = el('div', 'detail-description');
    const hasDescription = appendParagraphs(
      description,
      project.texto || project.resumo || 'Este case está em preparação. Em breve, este espaço reunirá a apresentação do projeto, suas imagens e os detalhes do processo criativo.'
    );
    if (!hasDescription) {
      description.append(el('p', '', 'Este case está em preparação. Em breve, este espaço reunirá a apresentação do projeto, suas imagens e os detalhes do processo criativo.'));
    }

    meta.append(specs, description);

    container.append(intro, hero, meta);

    // O inventario e gerado durante a publicacao pelo GitHub Actions.
    // A primeira imagem (-01.webp) fica acima da descricao do case.
    // A galeria comeca em -02.webp, sem repetir a abertura nem incluir slug.webp.
    // Nao mostramos uma galeria vazia quando ainda nao ha arquivos.
    const gallery = el('div', 'detail-gallery');
    gallery.hidden = true;
    gallery.setAttribute('aria-label', `Imagens do projeto ${project.nome}`);
    container.append(gallery);
    populateProjectGallery(project, gallery, heroSourcePromise);

    // Relacionados: ate seis cases, preenchidos primeiro, sem incluir o case atual.
    const others = prioritizeProjectsWithContent(projects.filter(item => item.slug !== project.slug)).slice(0, 6);
    if (others.length) {
      const related = el('section', 'related-projects');
      related.setAttribute('aria-labelledby', 'related-title');
      const relatedHeader = el('div', 'related-header');
      const relatedTitle = el('h2', '', 'Outros projetos');
      relatedTitle.id = 'related-title';
      relatedHeader.append(relatedTitle, el('span', 'related-counter', `01 — ${String(others.length).padStart(2,'0')}`));
      const relatedGrid = el('div', 'projects-grid projects-grid--related');
      renderCards(relatedGrid, others);
      const relatedFooter = el('div', 'related-footer');
      const moreLink = el('a', 'text-link', 'Ver todos os projetos ');
      moreLink.href = 'projetos.html';
      const arrow = el('span', '', '↗');
      arrow.setAttribute('aria-hidden', 'true');
      moreLink.append(arrow);
      relatedFooter.append(moreLink);
      related.append(relatedHeader, relatedGrid, relatedFooter);
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
      // LinkedIn vem primeiro, imediatamente antes de E-mail.
      const linkedin = typeof contact.linkedin === 'string' ? contact.linkedin.trim() : '';
      if (/^https:\/\//i.test(linkedin)) {
        const linkedinLink = el('a', '', 'LinkedIn');
        linkedinLink.href = linkedin;
        linkedinLink.target = '_blank';
        linkedinLink.rel = 'noopener noreferrer';
        linkedinLink.setAttribute('aria-label', 'LinkedIn de Rafael Cabral (nova aba)');
        container.append(linkedinLink);
      }
      if (email) {
        const emailLink = el('a', '', 'E-mail');
        emailLink.href = `mailto:${email}`;
        emailLink.setAttribute('aria-label', `Enviar e-mail para ${email}`);
        container.append(emailLink);
      }
      Object.entries(names).forEach(([key, label]) => {
        if (key === 'linkedin') return; // Ja exibido antes de E-mail.
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

  function setupHeroWordEntrance() {
    const title = document.getElementById('hero-title');
    if (!title || !title.querySelector('.hero-word')) return;
    if (!document.documentElement.classList.contains('motion-ready')) return;
    // O estado inicial oculto ja veio no CSS; iniciar apenas apos montar o DOM.
    requestAnimationFrame(() => title.classList.add('is-word-animated'));
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
      document.body.classList.remove('mobile-menu-open');
    };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      nav.classList.toggle('is-open', open);
      header?.classList.toggle('is-menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      document.body.classList.toggle('mobile-menu-open', open);
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
      '.hero-content > :not(h1)',
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
      '.detail-meta > *',
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
      const delay = isCard ? (position % 2) * 95 : (position % 3) * 75;
      // Deslocamentos curtos: fade acompanha o deslocamento, sem recortar os glifos.
      const distance = isCard ? 38 : isHero ? 30 : 28;
      element.style.setProperty('--reveal-delay', `${delay}ms`);
      element.style.setProperty('--reveal-distance', `${distance}px`);
      element.style.setProperty('--reveal-duration', `${isCard ? 820 : isHero ? 780 : 760}ms`);
      element.dataset.entrance = 'pending';
      element.addEventListener('animationend', event => {
        if (['reveal-enter'].includes(event.animationName)) element.dataset.entrance = 'complete';
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
        item.style.setProperty('--reveal-delay', `${(position % 3) * 75}ms`);
        item.style.setProperty('--reveal-distance', '28px');
        item.style.setProperty('--reveal-duration', '760ms');
        item.dataset.entrance = 'pending';
        item.addEventListener('animationend', event => {
          if (event.target !== item || !['reveal-enter'].includes(event.animationName)) return;
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


  /* Hero e galeria selecionada em uma unica secao horizontal fixada.
   * O scroll vertical nativo controla o deslocamento: nao interceptamos
   * wheel nem touch, preservando rolagem, historico e acessibilidade.
   * Layout vertical permanece como fallback no mobile/movimento reduzido. */
  function setupHorizontalShowcase() {
    const section = document.querySelector('[data-horizontal-showcase]');
    if (!section) return;
    const sticky = section.querySelector('[data-showcase-sticky]');
    const track = section.querySelector('[data-showcase-track]');
    const projectsPanel = section.querySelector('.showcase-projects');
    const header = document.querySelector('[data-header]');
    if (!sticky || !track || !projectsPanel) return;

    const query = window.matchMedia('(min-width: 900px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)');
    let distance = 0;
    let scheduled = false;
    let measureScheduled = false;
    let active = false;
    let progress = 0;
    let drag = null;
    let dragFrame = 0;
    let ignoreClickUntil = 0;
    const dragThreshold = 6;
    const mouseQuery = window.matchMedia('(any-pointer: fine)');
    const root = document.documentElement;

    const getHeaderHeight = () => header?.getBoundingClientRect().height || 74;
    const refreshPosition = () => {
      if (!active) return;
      // A secao comeca imediatamente abaixo do cabecalho sticky.
      const rect = section.getBoundingClientRect();
      const headerHeight = getHeaderHeight();
      progress = Math.max(0, Math.min(distance, headerHeight - rect.top));
      track.style.setProperty('--showcase-x', `${-progress}px`);
      // O grab so fica disponivel enquanto o showcase estiver preso ao topo.
      const pinned = rect.top <= headerHeight + 2 &&
        rect.bottom >= headerHeight + sticky.clientHeight - 2;
      sticky.classList.toggle('is-grab-ready', mouseQuery.matches && distance > 0 && pinned);
    };
    const onScroll = () => {
      if (!active || scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(() => {
        scheduled = false;
        refreshPosition();
      });
    };
    const measure = () => {
      active = query.matches;
      if (!active) {
        finishDrag();
        sticky.classList.remove('is-grab-ready');
        section.style.removeProperty('height');
        track.style.removeProperty('--showcase-x');
        sticky.style.removeProperty('--showcase-link-top');
        return;
      }
      // Extensao horizontal = largura total do trilho menos o viewport.
      const stickyHeight = sticky.getBoundingClientRect().height;
      distance = Math.max(0, Math.ceil(track.scrollWidth - sticky.clientWidth));
      section.style.height = `${Math.ceil(stickyHeight + distance)}px`;

      // Mantem o link "Ver todos" exatamente 20px abaixo da imagem,
      // mesmo em alturas de tela diferentes ou ao mudar as fontes.
      // Medir o grid, nao o card: o card pode estar se deslocando na animacao
      // de entrada e causaria um espacamento incorreto durante o primeiro frame.
      const cardGrid = projectsPanel.querySelector('.projects-grid--featured');
      if (cardGrid?.children.length) {
        const linkTop = cardGrid.getBoundingClientRect().bottom
          - sticky.getBoundingClientRect().top + 20;
        sticky.style.setProperty('--showcase-link-top', `${Math.round(linkTop)}px`);
      }
      refreshPosition();
    };
    const requestMeasure = () => {
      if (measureScheduled) return;
      measureScheduled = true;
      window.requestAnimationFrame(() => {
        measureScheduled = false;
        measure();
      });
    };

    // Grab com mouse: o scroll vertical continua sendo a unica fonte de
    // progresso. Arrastar para a esquerda avanca; para a direita, retorna.
    // Nao capturamos a roda nem alteramos o scroll de toque/mobile.
    function applyDragPosition() {
      dragFrame = 0;
      if (!drag?.moved || !active) return;
      const next = Math.max(0, Math.min(distance, drag.startProgress + drag.startX - drag.lastX));
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const targetY = Math.max(0, sectionTop - getHeaderHeight() + next);
      window.scrollTo({ top: targetY, left: 0, behavior: 'instant' });
      refreshPosition();
    }

    function finishDrag() {
      if (!drag) return;
      const current = drag;
      drag = null;
      if (dragFrame) window.cancelAnimationFrame(dragFrame);
      dragFrame = 0;
      sticky.classList.remove('is-grab-pressed');
      root.classList.remove('is-showcase-dragging');
      // Suprime somente o clique sintetizado no fim do gesto, nao cliques
      // intencionais seguintes, nem navegacao via teclado.
      if (current.moved || current.displaced) ignoreClickUntil = performance.now() + 500;
      if (sticky.hasPointerCapture?.(current.id)) {
        try { sticky.releasePointerCapture(current.id); } catch (_) {}
      }
    }

    sticky.addEventListener('pointerdown', event => {
      // Um novo clique real sempre pode abrir o projeto ou um botao.
      if (event.pointerType === 'mouse' && event.button === 0) ignoreClickUntil = 0;
      if (!active || !sticky.classList.contains('is-grab-ready') || drag ||
          event.pointerType !== 'mouse' || event.button !== 0 || !event.isPrimary ||
          event.ctrlKey || event.metaKey || event.altKey || event.shiftKey ||
          document.body.classList.contains('is-page-leaving')) return;
      if (event.target.closest('a:not(.project-cover), button, input, select, textarea, [contenteditable="true"]')) return;
      refreshPosition();
      if (!sticky.classList.contains('is-grab-ready')) return;
      drag = { id: event.pointerId, startX: event.clientX, startY: event.clientY,
        lastX: event.clientX, startProgress: progress, moved: false, displaced: false };
      sticky.classList.add('is-grab-pressed');
    });
    // Impede o ghost de arrastar imagens/links do navegador, mas mantem cliques.
    sticky.addEventListener('dragstart', event => {
      if (drag) event.preventDefault();
    });
    window.addEventListener('pointermove', event => {
      if (!drag || event.pointerId !== drag.id) return;
      if (!(event.buttons & 1)) { finishDrag(); return; }
      const dx = event.clientX - drag.startX;
      const dy = event.clientY - drag.startY;
      if (Math.hypot(dx, dy) >= dragThreshold) drag.displaced = true;
      if (!drag.moved && Math.abs(dx) < dragThreshold) return;
      if (!drag.moved) {
        drag.moved = true;
        root.classList.add('is-showcase-dragging');
        try { sticky.setPointerCapture(event.pointerId); } catch (_) {}
        window.getSelection()?.removeAllRanges();
      }
      if (event.cancelable) event.preventDefault();
      drag.lastX = event.clientX;
      if (!dragFrame) dragFrame = window.requestAnimationFrame(applyDragPosition);
    }, { passive: false });
    window.addEventListener('pointerup', event => {
      if (!drag || event.pointerId !== drag.id) return;
      if (drag.moved && active) {
        drag.lastX = event.clientX;
        if (dragFrame) window.cancelAnimationFrame(dragFrame);
        applyDragPosition();
      }
      finishDrag();
    });
    window.addEventListener('pointercancel', event => {
      if (drag?.id === event.pointerId) finishDrag();
    });
    sticky.addEventListener('lostpointercapture', event => {
      if (drag?.id === event.pointerId) finishDrag();
    });
    window.addEventListener('blur', finishDrag);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) finishDrag();
    });
    window.addEventListener('wheel', finishDrag, { passive: true });
    window.addEventListener('resize', finishDrag, { passive: true });
    window.addEventListener('keydown', event => {
      if (event.key === 'Escape') finishDrag();
    });
    sticky.addEventListener('click', event => {
      if (event.detail !== 0 && performance.now() < ignoreClickUntil) {
        event.preventDefault();
        event.stopImmediatePropagation();
        ignoreClickUntil = 0;
      }
    }, true);

    // Inicia apos renderizar cards; recomputa quando dimensoes/fontes mudam.
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', requestMeasure, { passive: true });
    window.addEventListener('pageshow', requestMeasure);
    if (query.addEventListener) query.addEventListener('change', requestMeasure);
    if (mouseQuery.addEventListener) mouseQuery.addEventListener('change', () => {
      if (!mouseQuery.matches) finishDrag();
      requestMeasure();
    });
    if (document.fonts?.ready) document.fonts.ready.then(requestMeasure);
    if (window.ResizeObserver) {
      const observer = new ResizeObserver(requestMeasure);
      observer.observe(track);
      observer.observe(sticky);
    }

    // O botao do hero pula para o inicio da galeria, sem causar um salto
    // incorreto de âncora dentro de um elemento transformado.
    section.querySelectorAll('[data-scroll-to-projects]').forEach(link => {
      link.addEventListener('click', event => {
        if (!active) return;
        event.preventDefault();
        const panelOffset = projectsPanel.offsetLeft - track.offsetLeft;
        const desiredX = Math.min(distance, Math.max(0, panelOffset));
        const sectionDocumentTop = section.getBoundingClientRect().top + window.scrollY;
        const targetY = sectionDocumentTop - getHeaderHeight() + desiredX;
        history.replaceState(null, '', '#projetos');
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      });
    });
  }

  // O build ordena os cases pela primeira publicacao de conteudo, com os
  // preenchidos antes dos placeholders. Filtrar nao altera essa ordem.
  const hasProjectContent = project => [project.texto, project.frase]
    .some(value => typeof value === 'string' && value.trim().length > 0);

  function prioritizeProjectsWithContent(items) {
    return [
      ...items.filter(hasProjectContent),
      ...items.filter(project => !hasProjectContent(project))
    ];
  }

  // Em modo automatico, as tres galerias seguem exatamente a mesma ordem.
  // A futura curadoria manual e exclusiva da home; lista vazia = automatico.
  function selectFeaturedProjects() {
    const ordered = prioritizeProjectsWithContent(projects);
    const manualSlugs = Array.isArray(data.destaquesManuais) ? data.destaquesManuais : [];
    const manual = [...new Set(manualSlugs)]
      .map(slug => ordered.find(project => project.slug === slug && hasProjectContent(project)))
      .filter(Boolean);
    if (manual.length === 4) return manual;
    return ordered.slice(0, 4);
  }

  const featured = document.getElementById('featured-projects');
  if (featured) renderCards(featured, selectFeaturedProjects());
  const listing = document.getElementById('all-projects');
  if (listing) {
    renderCards(listing, prioritizeProjectsWithContent(projects));
    const count = document.getElementById('project-count');
    if (count) count.textContent = `${projects.length} projetos`;
  }
  const detail = document.getElementById('project-detail');
  if (detail) renderProjectDetail(detail);
  document.querySelectorAll('[data-year]').forEach(node => node.textContent = new Date().getFullYear());
  configureContact();
  setupAutoSectionImages();
  setupMenu();
  setupHeroWordEntrance();
  setupStickyHeader();
  setupHorizontalShowcase();
  setupReveal();
  setupPageTransitions();
  setupFooterSignature();
})();
