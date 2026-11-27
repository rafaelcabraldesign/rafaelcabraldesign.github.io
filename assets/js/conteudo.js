/*
 * Rafael Cabral Design - v2.9
 * Edite conteudo/projetos/<slug>.json para cada case.
 * Contato e destaques manuais: conteudo/config.json.
 * O GitHub Actions incorpora os dados no HTML publicado. Este arquivo apenas
 * le o indice gerado; nao ha uma requisicao por projeto nem dados duplicados.
 * Para visualizar localmente, execute scripts/build_pages.py antes de servir.
 */
(() => {
  'use strict';
  const empty = { contato: {}, projetos: [], destaquesManuais: [] };
  try {
    const data = JSON.parse(document.getElementById('portfolio-content-index')?.textContent || 'null');
    if (!data || !Array.isArray(data.projetos)) {
      console.warn('Portfolio: gere o site com scripts/build_pages.py para carregar os projetos.');
      window.PORTFOLIO_CONTEUDO = empty;
      return;
    }
    window.PORTFOLIO_CONTEUDO = data;
  } catch (error) {
    console.error('Portfolio: indice de conteudo invalido.', error);
    window.PORTFOLIO_CONTEUDO = empty;
  }
})();
