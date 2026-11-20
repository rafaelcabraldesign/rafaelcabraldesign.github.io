# Rafael Cabral Design — versão 2.0

Portfólio estático em HTML, CSS e JavaScript hospedado no GitHub Pages, sem infraestrutura paga.

## Novidades da versão 2.0

- **Tema preto `#000000` em todas as páginas**, com textos principais em branco e secundários em cinzas claros.
- **Cabeçalho compacto** inspirado na navegação de Kristián Ulrych: nome *Rafael Cabral* à esquerda, *Designer Gráfico* em cinza ao lado, navegação à direita e botão *Vamos conversar* com fundo claro.
- **Blur verdadeiro no cabeçalho**, usando `backdrop-filter` com transparência que fica mais evidente quando a página é rolada. A versão anterior usava inversão de cores com `mix-blend-mode`; ela foi removida do menu.
- **Tipografia Nexa ajustada proporcionalmente**: navegação, textos, botões e títulos com medidas menores, mantendo a hierarquia e a legibilidade.
- **Botões retangulares com cantos arredondados discretos (9–10 px)**, sem perder o efeito de roleta nos botões de conteúdo.
- **Menu mobile** com duas barras que se transformam suavemente em X; painel escuro com links centralizados abaixo do cabeçalho.
- Conteúdos e imagens de todos os 15 projetos, assinatura SVG animada, seções e navegação existentes preservados.

## Instalação a partir da v1.5.3

1. Baixe `portfolio-rafael-cabral-v2.0-atualizacao.zip` e extraia-o.
2. Entre no repositório `rafaelcabraldesign/rafaelcabraldesign.github.io`.
3. Em **Add file → Upload files**, envie os arquivos extraídos para a raiz do repositório, preservando `assets/css/`.
4. Confirme o commit `Portfolio v2.0 — tema escuro e novo header`.
5. Reabra o site; se o estilo antigo estiver em cache, pressione **Ctrl + Shift + R**. As páginas usam `styles.css?v=2000`.

**Não apague a pasta `assets` existente.** O ZIP de atualização substitui só os arquivos de mesmo nome e caminho. As imagens `.webp` já enviadas por você ao GitHub são preservadas.

## Organização do site

- `index.html`: página inicial, Projetos selecionados, Serviços, Sobre e Contato.
- `projetos.html`: galeria dos projetos.
- `projeto.html?projeto=crisfit`: página individual do case CRISFIT (o mesmo modelo é utilizado nos demais).
- `assets/css/styles.css`: design system, tema, animações e responsividade.
- `assets/js/conteudo.js`: textos e informações dos 15 projetos e links de contato.
- `assets/js/site.js`: renderização dos cards, dos cases e das galerias, além de animações e navegação.

### Imagens automáticas

```text
assets/img/
├── sobre.webp                   # opcional
├── servicos.webp                # opcional
└── projetos/
    └── crisfit/
        ├── crisfit.webp         # apenas capa nos cards
        ├── crisfit-01.webp      # primeira imagem da página individual
        ├── crisfit-02.webp      # segunda imagem do case
        └── crisfit-03.webp      # terceira imagem, etc.
```

As imagens internas carregam de `-01.webp` em diante, até 40 arquivos consecutivos. Se faltar uma imagem, a sequência se encerra. A convenção antiga, com arquivos diretamente em `assets/img/projetos/`, também é suportada.

## Compatibilidade e manutenção

- Fonte Nexa carregada pelo kit Adobe Fonts `https://use.typekit.net/pwt1xky.css`.
- Conteúdos e links (inclusive o WhatsApp com mensagem predefinida) permanecem configurados no JavaScript e no HTML.
- O favicon continua em `assets/img/favicon.svg`; o nome substitui a antiga foto circular **somente no cabeçalho**. Os arquivos de avatar anteriores podem permanecer guardados sem serem usados.
- Respeita `prefers-reduced-motion` para usuários que reduzem animações.
- Testar após publicar: menu mobile, links WhatsApp, cases com imagens reais e rolagem das galerias.

O ZIP completo reúne apenas os arquivos-base do projeto. Ele não inclui arquivos enviados separadamente ao seu GitHub, como imagens reais de cases ou fotografias da seção Sobre.
