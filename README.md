# Rafael Cabral Design — versão 2.0.2

Portfólio estático em HTML, CSS e JavaScript hospedado no GitHub Pages, sem infraestrutura paga.

## Novidades da versão 2.0.2

- **Cards selecionados maiores:** no desktop, cada capa utiliza metade da largura útil da tela, como na grade original de duas colunas, e a altura ocupa melhor a área vertical durante o scroll horizontal.
- **Ver todos os projetos:** link posicionado exatamente 20 px abaixo da base dos cards, reproduzindo o respiro de 20 px entre “(Projetos selecionados)” e os cards.
- **Sem mudanças nos cases, no carregamento das imagens nem na experiência mobile.**


- **Header sem barra cinza:** fundo `rgba(0,0,0,...)` que permanece preto sobre a página, preservando o desfoque sobre fotografias.
- **Botão Vamos conversar:** recebe a mesma animação de roleta (fundo e texto subindo dentro da máscara) dos botões da página.
- **Hero + Projetos selecionados integrados:** no desktop, o scroll vertical avança por um trilho horizontal, com seção sticky até o último projeto. Depois, a rolagem volta ao fluxo normal até Serviços.
- **Fallback de acessibilidade:** mobile, telas mais baixas e usuários com `prefers-reduced-motion` permanecem com apresentação vertical.
- **GitHub Pages:** apenas HTML, CSS e JavaScript, sem bibliotecas pagas.

- **Tema preto `#000000` em todas as páginas**, com textos principais em branco e secundários em cinzas claros.
- **Cabeçalho compacto** inspirado na navegação de Kristián Ulrych: nome *Rafael Cabral* à esquerda, *Designer Gráfico* em cinza ao lado, navegação à direita e botão *Vamos conversar* com fundo claro.
- **Blur verdadeiro no cabeçalho**, usando `backdrop-filter` com transparência que fica mais evidente quando a página é rolada. A versão anterior usava inversão de cores com `mix-blend-mode`; ela foi removida do menu.
- **Tipografia Nexa ajustada proporcionalmente**: navegação, textos, botões e títulos com medidas menores, mantendo a hierarquia e a legibilidade.
- **Botões retangulares com cantos arredondados discretos (9–10 px)**, sem perder o efeito de roleta nos botões de conteúdo.
- **Menu mobile** com duas barras que se transformam suavemente em X; painel escuro com links centralizados abaixo do cabeçalho.
- Conteúdos e imagens de todos os 15 projetos, assinatura SVG animada, seções e navegação existentes preservados.

## Instalação a partir da v2.0

1. Baixe `portfolio-rafael-cabral-v2.0.2-atualizacao.zip` e extraia-o.
2. Entre no repositório `rafaelcabraldesign/rafaelcabraldesign.github.io`.
3. Em **Add file → Upload files**, envie os arquivos extraídos para a raiz do repositório, preservando `assets/css/`.
4. Confirme o commit `Portfolio v2.0.2 — tamanho e espacamento dos cards`.
5. Reabra o site; se o estilo antigo estiver em cache, pressione **Ctrl + Shift + R**. As páginas usam `styles.css?v=2002`.

**Não apague a pasta `assets` existente.** O ZIP de atualização substitui só os arquivos de mesmo nome e caminho. As imagens `.webp` já enviadas por você ao GitHub são preservadas.

## Organização do site

- `index.html`: abertura e projetos selecionados em trilho horizontal (desktop), Serviços, Sobre e Contato.
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

## Comportamento do showcase horizontal

A seção inicial utiliza `data-horizontal-showcase` e um trilho controlado em `assets/js/site.js` por uma função `setupHorizontalShowcase()`. O valor de deslocamento é calculado a partir da largura real dos cards carregados. A seção fica fixa abaixo do header até que todos os projetos selecionados sejam percorridos, então libera a rolagem vertical para Serviços. A altura é recalculada ao redimensionar e ao carregar fontes.

Para testar, abra o site num desktop de pelo menos 900 px de largura e 620 px de altura, role até o final da faixa de projetos e confira a passagem para Serviços. No celular e com preferência por movimento reduzido, tudo continua empilhado e vertical.
