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

  function cover(project, index, className = 'project-cover') {
    const link = el('a', className);
    link.href = projectLink(project);
    link.setAttribute('aria-label', `Ver projeto ${project.nome}`);

    if (project.imagem) {
      const img = el('img');
      img.src = project.imagem;
      img.alt = `Imagem de apresentação do projeto ${project.nome}`;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.addEventListener('error', () => {
        img.remove();
        const note = el('span', 'placeholder-center', 'Imagem em breve');
        link.append(note);
      }, { once: true });
      link.append(img);
    } else {
      link.append(el('span', 'placeholder-center', 'Imagem em breve'));
      link.append(el('span', 'cover-count', String(index + 1).padStart(2, '0')));
    }

    const arrow = el('span', 'cover-arrow', '↗');
    arrow.setAttribute('aria-hidden', 'true');
    link.append(arrow);
    return link;
  }

  function renderCards(container, items) {
    const fragment = document.createDocumentFragment();
    items.forEach(project => {
      const index = projects.indexOf(project);
      const card = el('article', 'project-card');
      card.append(cover(project, index));

      const info = el('div', 'project-info');
      const titleGroup = el('div');
      const title = el('h3', 'project-title');
      const titleLink = el('a', '', project.nome);
      titleLink.href = projectLink(project);
      title.append(titleLink);
      titleGroup.append(title);

      if (project.categoria) titleGroup.append(el('p', 'project-category', project.categoria));
      info.append(titleGroup);
      if (project.ano) info.append(el('span', 'project-year', project.ano));
      card.append(info);
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
    const next = projects[(index + 1) % projects.length];
    const prev = projects[(index - 1 + projects.length) % projects.length];

    const breadcrumb = el('div', 'project-breadcrumb');
    const all = el('a', '', '← Todos os projetos');
    all.href = 'projetos.html';
    const nextBreadcrumb = el('a', '', `Próximo projeto ↗`);
    nextBreadcrumb.href = projectLink(next);
    breadcrumb.append(all, nextBreadcrumb);

    const intro = el('div', 'detail-intro');
    const headingGroup = el('div');
    headingGroup.append(el('p', 'section-label', '(Projeto)'));
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

    container.append(breadcrumb, intro, hero, overview);
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

    const nextWrap = el('div', 'next-project');
    const label = el('span', '', 'Próximo projeto');
    const link = el('a', '', `${next.nome} ↗`);
    link.href = projectLink(next);
    nextWrap.append(label, link);
    container.append(nextWrap);
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
        const emailLink = el('a', '', email);
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

  function setupReveal() {
    const nodes = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach(node => node.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .04, rootMargin: '0px 0px -30px 0px' });
    nodes.forEach(node => observer.observe(node));
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
  setupReveal();
})();
