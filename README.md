# Portfólio Rafael Cabral — v1.4.23

## Entrada do título e animações com fade sincronizado

A v1.4.22 tornava as palavras do título 100% opacas logo aos 28% do movimento enquanto ainda eram recortadas por máscaras individuais. Isso produzia letras pela metade durante a entrada. **A v1.4.23 elimina esse recorte**: a palavra inteira sobe suavemente por uma distância pequena (`.44em`) e ganha opacidade durante toda a animação, do início ao fim. A ordem das oito palavras e a quebra após a vírgula continuam iguais.

- **Título principal:** deslocamento de `.44em` (em vez de 115%); movimento e fade sincronizados em 1.060 ms, 112 ms de intervalo entre palavras.
- **Seções e cards:** deslocamentos de 28 a 38 px (antes 44 a 58 px); fade acompanha a entrada até 100%, com duração de 1.160 a 1.220 ms, com a mesma curva de aceleracao para posicao e transparencia.
- **Header:** entrada em sequência com fade progressivo durante 980 ms, mantendo o efeito de contraste adaptativo.
- **Menu mobile:** entrada em sequência com 850 ms e deslocamento de 13 px.
- Mantidos o menu mobile, as transições de páginas, os 15 projetos, o carregamento automático de imagens WebP, a Nexa do Adobe Fonts, a assinatura SVG e os links do WhatsApp.

**Sobre a referência:** a animação exata da BerrielBrands não pôde ser medida frame a frame na inspeção, portanto estes valores são uma adaptação intencional do comportamento solicitado, e não uma cópia de valores internos do Framer.

## Atualização no GitHub

Para quem tem a v1.4.22, faça upload dos 6 itens abaixo com os mesmos caminhos (sem excluir pastas ou imagens):

- `index.html`
- `projetos.html`
- `projeto.html`
- `assets/css/styles.css`
- `assets/js/site.js`
- `LEIA-ME.md`

Os HTMLs usam `?v=1423` para recarregar CSS e JavaScript atualizados. Commit sugerido: `Fade e entradas refinadas v1.4.23`.

---

# Portfólio Rafael Cabral — v1.4.22

## Alterações desta versão

- Entradas reimplementadas com `translate` e opacidade curta, sem animar `top`: melhora a fluidez do movimento, especialmente em celulares.
- Título principal entra palavra por palavra da esquerda para a direita, mantendo a quebra de linha depois de `design,`.
- Header: links entram individualmente em sequência (Projetos, Serviços, Sobre, Vamos conversar).
- Menu mobile: monograma à esquerda e controle de fechar no mesmo lugar das duas barras, com os links centralizados logo abaixo da linha superior.
- Estados de hover, efeito adaptativo do header, WhatsApp, 15 projetos, SVG e imagens automáticas preservados.
- Preferência do sistema por movimento reduzido respeitada.

## Como publicar

Atualize `index.html`, `projetos.html`, `projeto.html`, `assets/css/styles.css`, `assets/js/site.js` no repositório GitHub Pages. Não apague `assets/img/` nem os arquivos WebP existentes. Os arquivos HTML usam cache-busting `?v=1422`.

---

# Rafael Cabral Design — Portfólio v1.4.21

Portfólio em HTML, CSS e JavaScript, compatível com o GitHub Pages gratuito. **A partir desta versão, você não precisa editar código para adicionar ou substituir imagens dos 15 projetos ou das seções Sobre e Serviços.**

## Novo na v1.4.21 — Vamos conversar abre o WhatsApp

O link **Vamos conversar** do header (desktop e menu mobile) abre agora diretamente o mesmo WhatsApp dos botoes **Entre em contato**, com a mensagem predefinida: "Olá, Rafael! Gostaria de conversar sobre um projeto.". O visitante confirma o envio da mensagem no WhatsApp.

- A cor, tipografia, hover e comportamento do menu não foram modificados.
- A configuração central de contato continua em `assets/js/conteudo.js`; os quatro links do header e os botoes da pagina inicial usam `data-contact-whatsapp` e sao atualizados pelo mesmo JavaScript.
- O HTML tambem contem o link completo como fallback caso o JavaScript não carregue.
- A conversa abre em nova aba; nao aciona a animacao de saida entre paginas.
- Para atualizar da **v1.4.20**, envie somente `index.html`, `projetos.html` e `projeto.html`. Nao e necessario alterar imagens, CSS ou JS.

## Novo na v1.4.20 — Menu sem verde durante a navegacao

A cor verde fugaz do monograma e dos links ao clicar em Projetos ou Inicio era provocada pelo fade-out aplicado ao `body` inteiro. Isso altera a composicao do header com `mix-blend-mode: difference`, expondo a cor complementar interna usada para produzir o rosa da marca.

A v1.4.20 conserva o fade de 460 ms, mas agora clareia a pagina com uma cortina branca posicionada acima do conteudo. O `body` nao muda de opacidade: o header transparente continua invertendo cores ate ficar encoberto pela cortina. Durante a saida o hover e neutralizado para impedir o verde complementar mesmo em navegadores que reordenam as camadas de composicao. Nenhuma alteracao em imagens, conteudos, fontes, hovers ou regras de navegacao foi feita.

Atualizacao em relacao a v1.4.19: apenas `assets/css/styles.css` e os tres HTMLs para forcar o CSS novo via `?v=1420`. Envie o conteudo do ZIP de atualizacao ao GitHub sem apagar a pasta `assets/img`.

## Novo na v1.4.19 — Animação de textos mais nítida

O movimento vertical das entradas de textos (títulos, menus, parágrafos, serviços, botões e links) agora usa deslocamento visual com `position: relative` / `top` em vez de `translate3d`. Isso reduz a suavização temporária dos caracteres, especialmente na Nexa, porque o navegador redesenha os glifos ao longo do movimento. O deslocamento, os tempos e as curvas do movimento permanecem; a opacidade dos textos atinge 100% no primeiro quarto da entrada para evitar a sensação de letras desbotadas durante todo o movimento. Elementos puramente visuais (capas e imagens) continuam com transformações aceleradas.

O header transparente e a inversão de cores foram preservados. A animação de saída continua um fade-out de 460 ms, agora sem deslocar a página inteira por `transform`, evitando borrões adicionais. O efeito roleta dos botões e a revelação dos nomes dos projetos foram mantidos, mas os movimentos de texto também foram transferidos de `transform` para `top`.

O texto ainda possui um fade breve no início da entrada, então poderá parecer mais claro apenas nos primeiros instantes. Isso **não** é desfoque; o objetivo da correção é manter as bordas dos caracteres mais definidas durante o movimento.

Arquivos alterados: `assets/css/styles.css`, `assets/js/site.js`, os três HTML (versões de cache) e este guia. Não altere as imagens da pasta `assets/img/`; elas são preservadas.

## Anterior na v1.4.18 — Header adaptativo sem fundo

O header continua preso ao topo, transparente. A propriedade `mix-blend-mode: difference`, combinada com a cor-base `#ffffeb`, produz **exatamente Black Russian `#000014` em fundo branco puro** para monograma, links e menu fechado. Em fundos escuros ou imagens, o contraste continua adaptativo por pixel, sem criar faixa branca. Em fundos que nao sao brancos puros, o resultado varia conforme a cor de cada pixel, uma limitacao natural da mesclagem CSS. A cor de hover segue a referencia rosa em fundos claros. Em imagens muito coloridas, o resultado do hover e naturalmente adaptativo (mistura de cor).

No celular, o menu aberto utiliza um painel branco para garantir leitura e navegacao; ao fechar, retorna automaticamente ao modo transparente/invertido. O efeito depende do suporte do navegador a `mix-blend-mode` (navegadores modernos).

Historico da v1.4.18: o header foi ajustado sem precisar reenviar as imagens. Na v1.4.19, o JavaScript tambem recebe uma atualizacao para reconhecer a nova animacao de textos.

## 1. Onde enviar as imagens

| O que vai aparecer no site | Onde colocar e como nomear |
| --- | --- |
| Imagem da seção Sobre | `assets/img/sobre.webp` |
| Imagem da seção Serviços | `assets/img/servicos.webp` |
| Capa de um projeto | `assets/img/projetos/NOME-DO-PROJETO.webp` |
| Imagens internas de um projeto | `assets/img/projetos/NOME-DO-PROJETO-01.webp`, `-02.webp` etc. |

Use sempre arquivos **WebP reais**, em letras minúsculas e com hífens exatamente como nos exemplos. Não basta mudar a extensão de um JPG para `.webp`: é necessário converter a imagem para esse formato.

### Nome exato das capas dos 15 projetos

| Projeto | Nome do arquivo (dentro de `assets/img/projetos/`) |
| --- | --- |
| CRISFIT | `crisfit.webp` |
| Neto Motors | `neto-motors.webp` |
| Juliana Vitorino | `juliana-vitorino.webp` |
| Salto Energia | `salto-energia.webp` |
| Uber Brindes | `uber-brindes.webp` |
| Mariana Morais | `mariana-morais.webp` |
| Iná Game Studio | `ina-game-studio.webp` |
| Poiôô Kids | `poioo-kids.webp` |
| Artes do meu Brasil | `artes-do-meu-brasil.webp` |
| Funil Exponencial | `funil-exponencial.webp` |
| Ita Corretora de Seguros | `ita-corretora-de-seguros.webp` |
| Eagle Investment | `eagle-investment.webp` |
| Agrofixa | `agrofixa.webp` |
| Down Five | `down-five.webp` |
| Lara Land | `lara-land.webp` |

O nome é reutilizado automaticamente nos cards da página inicial, na página com todos os projetos, na capa do case individual e nos cards de outros projetos.

### Como adicionar as imagens internas dos cases

Por exemplo, para apresentar três imagens do projeto CRISFIT:

```
assets/img/projetos/crisfit-01.webp
assets/img/projetos/crisfit-02.webp
assets/img/projetos/crisfit-03.webp
```

A ordem é numérica. **Não pule números.** Se `crisfit-02.webp` não existir, o site interromperá a busca depois de `crisfit-01.webp` e não exibirá `crisfit-03.webp`. É possível adicionar até **40 imagens numeradas por case**, sem editar o código.

A capa `crisfit.webp` é independente da galeria numerada.

Como o GitHub Pages não fornece uma lista de arquivos do diretório, o JavaScript verifica os arquivos em sequência. É normal o navegador registrar um pedido 404 para o primeiro número que não existe; o visitante não vê erro, apenas a galeria com as imagens disponíveis.

**Quando não existe arquivo:** o site preserva o placeholder. A seção de galeria interna nem aparece quando nenhuma imagem numerada foi enviada.

## 2. Como atualizar as imagens pelo GitHub (sem código)

1. Prepare a arte em WebP. Para capas, experimente imagens de **1600 a 2200 px na dimensão maior** e tente mantê-las abaixo de **500 KB**, preservando a qualidade visual.
2. Renomeie o arquivo conforme a tabela acima.
3. No GitHub, abra o repositório `rafaelcabraldesign.github.io` e navegue até a pasta `assets/img/` ou `assets/img/projetos/`.
4. Clique em **Add file → Upload files** dentro da pasta correta.
5. Envie a imagem; se o mesmo nome já existir, substitua o arquivo anterior.
6. Confirme em **Commit changes** e abra o site publicado. Se continuar vendo a imagem antiga, use `Ctrl + Shift + R` ou aguarde a publicação do GitHub Pages.

Para excluir ou trocar imagens, basta remover ou substituir o arquivo correspondente no GitHub. **Não precisa alterar `index.html`, `projeto.html` ou os arquivos JavaScript.**

Se uma imagem não aparecer: confira a grafia exata, a pasta, a extensão WebP verdadeira e se o GitHub Pages concluiu a publicação.

## 3. Como publicar a v1.4.19

Para quem ja esta usando a **v1.4.18**, utilize o ZIP de atualizacao e substitua somente estes **seis arquivos**, preservando os caminhos:

- `index.html`
- `projetos.html`
- `projeto.html`
- `assets/css/styles.css`
- `assets/js/site.js`
- `LEIA-ME.md`

O CSS e o JavaScript usam a versao `1419` nos HTMLs para evitar cache. Nao e necessario atualizar capas, projetos, fontes ou outros arquivos. Use a mensagem de commit `Melhoria da nitidez das animacoes v1.4.19`.

Para uma instalacao do zero, utilize o ZIP completo. O GitHub Pages deve continuar configurado para a branch de publicacao e o caminho `/(root)`.

## 4. O que continua editável por código

- **Nomes de projetos, ordem, textos e descrições dos cases:** `assets/js/conteudo.js`.
- **Textos fixos das seções Sobre, Serviços e Contato:** `index.html`.
- **Cores e estilos:** `assets/css/styles.css`.
- **Comportamento das animações e navegação:** `assets/js/site.js`.

Para imagens, **não é mais necessário** fazer essas alterações. Os campos opcionais `imagem` e `galeria` no arquivo de conteúdo continuam existindo apenas para casos especiais em que você quiser escolher um caminho manual fora da convenção automática.

## 5. O que foi preservado

- A direção de arte branca, minimalista e editorial.
- 15 projetos, incluindo Lara Land.
- Nexa pelo Adobe Fonts (kit `pwt1xky`), sem redistribuir arquivos de fonte.
- Monograma, favicon, assinatura SVG do rodapé e animações de entrada/saída.
- Contato WhatsApp e e-mail.
- Responsividade para celulares, tablets, desktop e ultrawide.

O ZIP não contém imagens fictícias nem arquivos de fontes licenciadas. As imagens sintéticas utilizadas na validação são temporárias e **não** fazem parte da publicação.
