# Rafael Cabral Design — versão 2.3

Portfólio estático em HTML, CSS e JavaScript hospedado no GitHub Pages, sem infraestrutura paga.

## Novidades da versão 2.3

- **Grab no desktop:** na abertura da página inicial, segure o botão esquerdo do mouse sobre o título, espaço livre ou card e arraste para a esquerda (avançar) ou direita (voltar). O cursor muda de `grab` para `grabbing` e o progresso acompanha a posição do scroll vertical já existente.
- **Navegação preservada:** um clique normal no card abre o case; um arraste de pelo menos 6 px não abre o link. Botões e demais links da abertura continuam clicáveis, sem iniciar um arraste. O movimento é limitado ao início e fim da seção; a roda do mouse continua permitindo avançar para Serviços.
- **Responsividade:** grab apenas enquanto a seção horizontal estiver ativa e presa ao topo em desktop com mouse. Mobile, toque e preferência por movimento reduzido conservam o comportamento anterior. Soltar o mouse, cancelar o gesto, mudar de aba ou redimensionar encerra o arraste.
- **Cache:** as três páginas usam `styles.css?v=23` e `site.js?v=23`; `conteudo.js?v=22` permanece inalterado. Os quatro destaques, Down Five e demais dados permanecem intactos.
- **Próxima versão:** 2.4.

## Histórico — versão 2.2

- **Down Five:** resumo de abertura, serviços (Identidade Visual, Design de Mascote), indústria (E-sports), ano (2023) e descrição completa, preservada em cinco parágrafos.
- **Projetos selecionados:** CRISFIT e Down Five fixos nas duas primeiras posições. As duas vagas restantes priorizam automaticamente os cases que tenham `texto` ou `resumo` preenchido em `assets/js/conteudo.js`. Enquanto faltarem cases preenchidos, os placeholders completam os quatro cards. Havendo mais de dois cases elegíveis além dos fixos, a ordem original da lista define a prioridade. A galeria completa mantém os 15 projetos na ordem anterior.
- **Imagens:** basta enviar `down-five.webp` e as imagens `down-five-01.webp`, `down-five-02.webp` etc. para `assets/img/projetos/down-five/`. A capa permanece exclusiva dos cards; a apresentação individual começa na imagem numerada 01. O upload das imagens por si só não altera a prioridade dos destaques.
- **Cache:** os três HTMLs carregam `conteudo.js?v=22` e `site.js?v=22`; o CSS permanece na versão 21, sem alteração visual.
- **Próxima versão:** 2.3.

## Histórico — versão 2.1

- **Símbolo no cabeçalho:** dimensão ajustada de `0.86em` para `1.07em` — valor intermediário entre os dois tamanhos anteriores (`0.86em` e `1.28em`), mantendo o SVG original e o hover rosa.
- **Cases — grade editorial:** a introdução e o bloco de informações usam duas colunas de largura igual, com divisão centrada no eixo da página, e espaçamento entre colunas adaptativo de 56 a 96 px.
- **Texto da direita:** removido o limite de largura de 960 px para ocupar integralmente a segunda coluna, respeitando a margem direita do site.
- **Mobile:** as colunas continuam empilhadas; o comportamento sticky da lista no desktop e os demais estilos foram preservados.
- **Cache:** as três páginas referenciam `styles.css?v=21`.
- **Próximas versões:** incrementos simples como `2.2`, `2.3`, etc.

## Histórico — versão 2.0.17

- **Ícone do cabeçalho em escala tipográfica:** o símbolo `assets/img/icone.svg` agora mede `0.86em`, para acompanhar visualmente a altura das letras de “Rafael Cabral” em desktop e mobile.
- **Sem alterações** na fonte, no peso, no espaçamento do cabeçalho, nas animações ou nas demais seções.
- **Cache:** as três páginas carregam `styles.css?v=2017`.

## Alterações anteriores — v2.0.16

- **Ícone ao lado do nome:** o símbolo original `assets/img/icone.svg` agora aparece imediatamente à esquerda de “Rafael Cabral” no cabeçalho das três páginas, alinhado verticalmente ao nome.
- **Hover preservado:** o símbolo e o nome assumem o rosa `#d60b52`; o sublinhado animado continua restrito ao nome, sem passar por baixo do símbolo.
- **Versionamento:** os três HTMLs usam `styles.css?v=2016` para atualizar os estilos sem interferir nas demais animações e funcionalidades.

## Alterações anteriores — v2.0.15

- **Correção específica da tag (Portfólio):** a página `projetos.html` aplica `#bfc0c9` diretamente à tag, para que ela permaneça cinza mesmo caso uma versão antiga do CSS ainda esteja em cache.
- **CSS reforçado:** `.listing-intro > .section-label.section-label--tag` recebe a mesma cor via `var(--muted)`, sem alterar outras etiquetas ou textos.
- **Cache:** as três páginas usam `styles.css?v=2015`; caso o GitHub Pages ainda mostre a versão anterior, atualize forçadamente a página depois do commit.

## Alterações anteriores — v2.0.14

- As cinco tags editoriais entre parenteses (`Projetos selecionados`, `Serviços`, `Sobre`, `Contato` e `Portfólio`) agora usam `var(--muted)` (`#bfc0c9`), o mesmo cinza dos textos corridos.
- O numero da listagem de projetos e os demais elementos com `.section-label` nao foram alterados.
- `styles.css?v=2014` em todas as tres paginas para evitar cache antigo. Nenhuma alteracao nas animacoes, tamanhos ou conteudo dos projetos.

## Alterações anteriores — v2.0.13

- **Título principal:** apresentação em primeira pessoa, com localização e áreas de atuação: “Sou designer gráfico em Uberlândia. Crio identidades visuais, sites e experiências digitais.”
- **Subtítulo sem redundância:** destaca método de trabalho: “Do primeiro conceito à entrega, cada decisão é guiada por pesquisa, estratégia e atenção aos detalhes.”
- **Tratamento editorial:** Uberlândia em itálico e sublinhado discreto; entrada palavra por palavra mantida, com intervalos de 50 ms entre as 12 palavras para evitar uma abertura longa.
- **Metadados:** descrição da página e descrição para compartilhamento atualizadas.
- **Arquivos:** `index.html` e `assets/css/styles.css`; versão do CSS `styles.css?v=2013` para evitar cache antigo. Nenhum case, conteúdo de projeto ou imagem foi alterado.

## Alterações anteriores — v2.0.12

- **Seção Sobre:** a fotografia ocupa uma coluna menor no desktop (de 41% para 35% da área de colunas), tem largura máxima de 800 px e altura reduzida. Em telas intermediárias, o layout é empilhado para preservar o enquadramento; no mobile, a imagem continua abaixo do texto com altura menor. O recorte e os cantos arredondados foram mantidos.
- **Botão Explorar projetos:** o destino passou de `#projetos` para `projetos.html`. O atributo `data-scroll-to-projects` foi removido do botão para não acionar o deslocamento horizontal programático; a animação de saída entre páginas continua funcionando.
- **Título principal:** preservado nesta entrega. Uma opção de título mais comercial será proposta separadamente para aprovação.
- **Cache CSS:** `styles.css?v=2012` nos três HTMLs para exibir o ajuste de proporções sem cache antigo.

## Alterações anteriores — v2.0.11

- **Página de projetos:** a descrição editorial foi reescrita para comunicar o trabalho com identidades visuais e experiências digitais, substituindo o texto provisório sobre publicação progressiva das imagens.
- **Escopo:** apenas o texto de introdução em `projetos.html` foi alterado; título, hierarquia tipográfica, fundo, cards, conteúdo e animações permanecem os mesmos.

## Alterações anteriores — v2.0.10

- **Cabeçalho em meio-termo:** opacidade preta ajustada de 75% para **45%** no topo e de 85% para **60%** durante a rolagem. O blur permanece inalterado; o menu mobile aberto mantém 96% de opacidade.
- **CSS sem cache antigo:** as três páginas agora carregam `styles.css?v=2010`. Nenhum arquivo JavaScript ou imagem foi alterado.

## Alterações anteriores — v2.0.9

- **Cabeçalho mais escuro para leitura:** preto com 75% de opacidade no estado padrão e 85% durante a rolagem, sobrepondo fotografias claras sem perder o `backdrop-filter: blur(...)`.
- **Sem alteração nas animações, cores dos links e botões.** As páginas HTML usam `styles.css?v=2009` para renovar o cache.

## Alterações anteriores — v2.0.8

- **Legibilidade do cabeçalho:** o fundo com blur agora usa preto com opacidade um pouco maior no estado normal (`rgba(0,0,0,.16)`) e ao rolar (`rgba(0,0,0,.32)`), melhorando a leitura do menu sobre imagens muito claras sem perder o efeito de desfoque.
- **Cache:** os HTMLs referenciam `styles.css?v=2008`, `site.js?v=2008` e `conteudo.js?v=2008`.

## Alterações anteriores — v2.0.7

- **Links do cabeçalho:** Rafael Cabral, Projetos, Serviços e Sobre agora ficam rosa `#d60b52` no hover/foco, acompanhando o sublinhado animado. O botão "Vamos conversar" conserva a roleta de preenchimento branco.
- **Rodapé:** `LinkedIn` aparece imediatamente à esquerda de `E-mail`, com o mesmo efeito de sublinhado e rosa no hover. O link abre `https://www.linkedin.com/in/rafaelcabraldesign/` em outra aba.
- **Dados editáveis:** o perfil LinkedIn foi registrado em `assets/js/conteudo.js`, sem link duplicado. A alteração vale para as três páginas.
- **Cache:** os HTMLs referenciam `styles.css?v=2007`, `site.js?v=2007` e `conteudo.js?v=2007`.

## Alterações anteriores — v2.0.6

- **Contorno de “Vamos conversar” no cabeçalho:** o estado normal agora usa `1px solid #94949a`, exatamente como o botão secundário “Entre em contato”. A borda anterior usava branco puro e parecia mais forte.
- **Hover preservado:** o fundo branco continua subindo de baixo para cima, com texto preto após a roleta. Tamanhos, bordas arredondadas, navegação, projetos e animações permanecem inalterados.
- **Cache:** o CSS agora utiliza `styles.css?v=2006` nas três páginas, para evitar que o navegador carregue a regra anterior.

## Alterações anteriores — v2.0.5

- **Botões de contorno sem pontos pretos:** ao concluir o preenchimento animado, o próprio botão assume a mesma cor da animação, eliminando as frestas escuras nos cantos. A roleta e o movimento de baixo para cima são mantidos.
- **Nome no cabeçalho:** o sublinhado desenhado no hover usa o rosa da marca `#d60b52` e o nome permanece branco.
- **Projetos selecionados:** reduzidos de seis para **quatro** na página inicial; o trilho horizontal calcula automaticamente o novo percurso. A galeria "Todos os projetos" continua com 15 cases.
- **Cache:** `styles.css?v=2006` e `site.js?v=2005` nos três HTMLs.

## Alterações anteriores — v2.0.4

- **Header com blur perceptível:** transparente sobre preto (`rgba(0,0,0,.08)`), passando para preto com 24% de opacidade na rolagem; o menu aberto mantém 96% de opacidade para legibilidade.
- **Escala tipográfica unificada:** menu, rodapé, botões e links compartilham `--type-ui`; texto corrido e títulos seguem uma hierarquia proporcional menor e mais consistente.
- **Botão do header:** usa exatamente o mesmo tamanho de fonte e altura de 42 px dos outros botões, mantendo o hover de roleta e a borda branca.
- **Seleção de texto:** fundo rosa escuro `#560421` com texto branco.

## Alterações anteriores — v2.0.3

- **CTA do cabeçalho:** contorno branco e fundo transparente no estado normal. No hover e no foco, o fundo branco sobe e o texto rola para cima, ficando preto, exatamente como no botão secundário “Entre em contato”. Mantidas as dimensões, os demais estilos e o destino WhatsApp.

## Alterações anteriores — v2.0.2

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

## Instalação a partir da v2.2

1. Baixe `portfolio-rafael-cabral-v2.3-atualizacao.zip` e extraia-o.
2. Entre no repositório `rafaelcabraldesign/rafaelcabraldesign.github.io`.
3. Em **Add file → Upload files**, envie `index.html`, `projeto.html`, `projetos.html`, `README.md`, `assets/css/styles.css` e `assets/js/site.js` para os mesmos caminhos na raiz do repositório.
4. Confirme o commit `Portfólio v2.3 — grab no showcase horizontal`.
5. Reabra o site e pressione **Ctrl + Shift + R** caso os scripts anteriores ainda estejam em cache.

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
