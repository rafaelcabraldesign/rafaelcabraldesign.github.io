# Rafael Cabral Design — versão 2.10

Portfólio estático em HTML, CSS e JavaScript hospedado no GitHub Pages, sem infraestrutura paga.

## Novidades da versão 2.10

- **Entrada após o carregamento:** capas, primeira imagem e imagens internas dos cases, Sobre e Serviços ficam invisíveis enquanto a imagem carrega e é decodificada. A animação original inicia quando o bloco pronto entra na área visível; não há quadro com `Carregando...` nem fade adicional da imagem.
- **Layout preservado:** o espaço é reservado pelas proporções dos cards e pelas dimensões do índice. O lazy loading nativo permanece ativo nas imagens não prioritárias. Em modo de movimento reduzido, a imagem aparece sem animação quando estiver pronta.
- **Ausência de imagem:** os cards e as imagens de abertura/apoio sem arquivo utilizável continuam exibindo o aviso de imagem em breve. Uma imagem interna que falhar é retirada da galeria.
- **Conteúdo e publicação:** os JSON individuais, a ordem cronológica e o workflow existente permanecem inalterados. CSS e scripts usam `?v=210` para evitar cache.
- **Próxima versão:** 2.11.

## Atualizar a partir da v2.9

Extraia `portfolio-rafael-cabral-v2.10-atualizacao.zip` e envie os seis arquivos incluídos em um commit, preservando os caminhos. Não altere `.github`, `scripts`, `conteudo` ou os WebP já publicados. Confira a execução de Publicar portfolio na aba Actions.

## Novidades da versão 2.9 (histórico)

- **Um arquivo por projeto:** os 15 cases agora ficam em `conteudo/projetos/`, em JSON. Nome, resumo de abertura, serviços, indústria, ano e parágrafos do texto são independentes de JavaScript.
- **Ordem automática e cronológica:** na home, na página Projetos e em Outros projetos, os cases com resumo ou texto preenchido aparecem primeiro, na ordem do primeiro commit da branch padrão que introduziu conteúdo em cada arquivo. Alterações posteriores não mudam sua posição. CRISFIT e Down Five foram migrados nessa ordem. Os placeholders completam as galerias na ordem de cadastro; o upload de imagens, por si só, não altera a ordem. Se vários cases receberem conteúdo no mesmo commit, a ordem de cadastro resolve o empate (novos arquivos não listados são ordenados pelo slug).
- **Home:** os quatro primeiros cases da ordem automática. `destaquesManuais` começa vazio e permite selecionar quatro cases concluídos quando desejar. A curadoria manual afeta apenas a home.
- **Outros projetos:** até seis cards, excluindo o projeto aberto, seguindo a mesma ordem cronológica.
- **Automação existente:** `scripts/build_pages.py` gera o índice de conteúdo e o índice de imagens nos HTMLs publicados. Se o checkout do Actions for raso, o script busca a ancestralidade do Git com filtro `blob:none`, sem baixar antecipadamente os arquivos históricos de imagem. Não há novas requisições de conteúdo por projeto no navegador, commits automáticos nem alterações de permissões ou workflow.
- **Visual preservado:** CSS, imagens, arraste horizontal, animações, mensagens de carregamento e navegação permanecem inalterados. As páginas carregam os scripts com `?v=29`.
- **Migração:** CRISFIT mantém a descrição de cinco parágrafos; Down Five usa a versão atual de quatro parágrafos fornecida pelo proprietário. O rótulo SEGMENTO de CRISFIT foi mantido via `rotuloIndustria`.
- **Próxima versão:** 2.10.

## Atualizar a partir da v2.8 otimizada

1. Extraia `portfolio-rafael-cabral-v2.9-atualizacao.zip`. Envie todos os arquivos e pastas do ZIP **no mesmo commit**, para a raiz da branch `main` do repositório. Preserve a estrutura das pastas e todos os WebP já enviados.
2. Confirme o sucesso de `Publicar portfolio` na aba Actions. **Não é necessário reenviar nem editar a pasta `.github`**: o workflow da v2.8 já executa `scripts/build_pages.py`, que foi atualizado.
3. Confira a home, a página Projetos e os cases CRISFIT e Down Five. O código-fonte publicado terá os elementos `portfolio-image-index` e `portfolio-content-index` com dados JSON (não `null`).

O ZIP completo reúne os arquivos-base, não os WebP de cases ou as fotos enviados separadamente ao repositório. Prefira o ZIP de atualização. Não apague `assets`, `scripts`, `conteudo` nem `.github`.

## Como editar o conteúdo de um case

Abra `conteudo/projetos/` no GitHub, selecione o JSON do projeto e use o ícone de lápis (Edit this file). Edite apenas o conteúdo desejado e faça o commit na branch padrão.

Exemplo de estrutura para um projeto ainda sem conteúdo:

```json
{
  "nome": "Neto Motors",
  "resumo": "",
  "servicos": "",
  "industria": "",
  "ano": "",
  "texto": [],
  "imagem": "",
  "galeria": []
}
```

- `resumo`: texto breve ao lado do título.
- `servicos`, `industria`, `ano`: ficha técnica. Mantenha o ano entre aspas.
- `texto`: um item entre aspas por parágrafo, separados por vírgulas. Por exemplo, `"texto": ["Primeiro parágrafo.", "Segundo parágrafo."]`. Aspas internas devem ser escapadas como `\"`. Não coloque vírgula após o último item.
- `imagem` e `galeria`: opcionais. Deixe vazios para usar a convenção automática de imagens.
- `rotuloIndustria`: opcional. O valor `"SEGMENTO"` preserva esse rótulo onde desejado; os demais usam INDÚSTRIA quando a indústria estiver preenchida.

**A ordenação usa o primeiro commit com `resumo` ou `texto` não vazio**, não o ano do projeto, a data do arquivo, a posição no JSON ou o último commit de edição. Se o conteúdo for removido, o case volta aos placeholders; se for restaurado, recupera a posição de sua primeira publicação. Preserve o histórico da branch padrão. A ordem não é regravada nos arquivos pelo build.

### Incluir um novo projeto

Crie um arquivo `conteudo/projetos/nome-do-projeto.json` com a estrutura acima (o nome do arquivo, sem `.json`, vira o slug do case). Use letras minúsculas sem acentos, números e hífens. Não precisa alterar JavaScript ou registrar o novo arquivo em outra lista. A galeria detecta o JSON e a pasta de imagens correspondente automaticamente. `ordemCadastro` em `conteudo/config.json` só define a ordem dos placeholders e desempates no mesmo commit; novos slugs não listados entram no final dos placeholders em ordem alfabética.

### Escolher os quatro destaques quando terminar os cases

Em `conteudo/config.json`, mantenha por enquanto:

```json
"destaquesManuais": []
```

Quando quiser fazer a curadoria, substitua a lista vazia por quatro slugs de projetos preenchidos, na ordem desejada. Exemplo de sintaxe (somente depois de preencher todos os selecionados):

```json
"destaquesManuais": ["down-five", "crisfit", "neto-motors", "lara-land"]
```

As páginas Projetos e Outros projetos continuam cronológicas. Para voltar à seleção automática, use `[]`. A validação do build exige uma lista vazia ou quatro slugs distintos com conteúdo; uma configuração inválida impede a publicação e preserva o site anterior.

## Organização do site

```text
conteudo/
├── config.json                 # contato, ordem de cadastro e destaques manuais
└── projetos/
    ├── crisfit.json
    ├── down-five.json
    ├── neto-motors.json
    └── ...                     # um JSON por case
assets/
├── css/styles.css              # estilos e animações
├── js/conteudo.js              # leitor do índice publicado, não editar cases aqui
├── js/site.js                  # renderização e navegação
└── img/projetos/               # imagens existentes, manter estrutura
scripts/build_pages.py           # gera os índices e os HTMLs publicados
.github/workflows/portfolio-pages.yml # publicação existente
index.html
projetos.html
projeto.html
```

## Imagens automáticas (regra da v2.8 preservada)

```text
assets/img/
├── sobre.webp
├── servicos.webp
└── projetos/
    └── down-five/
        ├── down-five.webp       # capa dos cards
        ├── down-five-01.webp    # primeira imagem, acima da descrição
        ├── down-five-04.webp    # galeria, após a descrição
        └── down-five-08.webp    # lacunas são permitidas, sem teto de numeração
```

Mantenha extensão `.webp` e nomes minúsculos. O GitHub Actions gera o índice com os arquivos existentes e suas dimensões, e o navegador carrega as imagens progressivamente. Nenhum cadastro manual de imagens é necessário. A estrutura plana antiga também continua compatível.

## Pré-visualização local

O conteúdo dos cases agora é gerado no build. Não abra os HTMLs-fonte diretamente para visualizar a galeria: execute `python3 scripts/build_pages.py --output _site` e depois `python3 -m http.server 8000 --directory _site`. Use um diretório de saída novo a cada build ou remova a saída anterior. Sem um repositório Git com histórico completo, a prévia usa a ordem de cadastro; a publicação no Actions usa a ordem cronológica real. Não envie `_site` para o GitHub. O site publicado permanece no GitHub Pages com o workflow já configurado.

## Histórico de versões

As notas abaixo descrevem o comportamento em cada versão anterior. Quando houver diferenças, prevalecem as instruções da versão 2.10 acima.

## Histórico — versão 2.8 (otimizada)

- **Índice automático de imagens:** o GitHub Actions executa `scripts/build_pages.py` em cada publicação da branch padrão. O script identifica os WebP realmente presentes e suas dimensões, incorpora o inventário aos três HTMLs publicados e envia o site ao GitHub Pages. Não há commits automáticos, chamadas à API do GitHub pelo navegador, serviços externos, nem cadastro manual de imagens.
- **Numeração livre:** os arquivos numerados são ordenados pelo número, mesmo com lacunas (por exemplo, 01, 02, 04, 08, 100). Não existe mais o limite de 40 no fluxo indexado. `-01.webp` continua na abertura e `-02.webp` em diante após a descrição. A capa sem número continua exclusiva dos cards, com fallback para a imagem 01.
- **Carregamento progressivo:** as imagens da galeria recebem `loading="lazy"`, dimensões intrínsecas para reservar o espaço e `decoding="async"`. Não há sondagens de arquivos inexistentes no modo indexado. A primeira imagem do case tem prioridade alta; as demais são solicitadas conforme a proximidade da área visível, a critério do navegador. Capas, Sobre e Serviços consultam o mesmo índice.
- **Compatibilidade:** a pasta individual tem prioridade sobre a estrutura plana antiga. Se o site ainda for publicado diretamente da branch, sem executar o build, o carregador de contingência aceita lacunas até 40 e mantém a busca em lotes de quatro (sem a otimização). Ative o GitHub Actions conforme abaixo para eliminar as sondagens.
- **Visual e conteúdo:** preservados, incluindo a seção Outros projetos com até seis cards, os quatro destaques, o arraste, os cursores e a mensagem `Carregando...`. Os HTMLs usam `?v=28-opt` para evitar cache da versão 2.7 ou do primeiro pacote 2.8.
- **Próxima versão:** 2.9.

## Histórico — versão 2.7

- **Outros projetos:** até seis cards por case, mantendo a prioridade dos projetos preenchidos e excluindo o case aberto. A contagem acompanha o número de cards exibidos.
- **Ver todos os projetos:** link para `projetos.html` abaixo da galeria de relacionados, alinhado à direita e com 20 px de espaçamento após os cards. Reutiliza a tipografia, a seta e o hover do link da página inicial.
- **Galerias:** a página inicial continua com quatro destaques e a página Projetos mantém todos os trabalhos. O grid responsivo existente dos relacionados foi preservado.
- **Cache:** as três páginas carregam `styles.css?v=27` e `site.js?v=27`; `conteudo.js?v=22` permanece inalterado.
- **Próxima versão:** 2.8.

## Histórico — versão 2.6

- **Cursor:** seta normal sobre o conteúdo arrastável; `pointer` sobre links, botões e capas clicáveis, inclusive seus textos e imagens. Durante o arraste efetivo, o cursor volta temporariamente à seta e, ao soltar, recupera o comportamento convencional.
- **Carregamento:** preserva `Carregando...` com inicial maiúscula nos cinco pontos de exibição, incluindo a correção manual feita após a versão 2.5.
- **Cache:** as três páginas carregam `styles.css?v=26` e `site.js?v=26`; `conteudo.js?v=22` permanece inalterado.
- **Próxima versão:** 2.7.

## Histórico — versão 2.5

- **Arraste na página inicial:** mantém a navegação horizontal por mouse e o scroll sincronizado, mas utiliza a seta normal no conteúdo arrastável, inclusive durante o gesto. Links e botões de ação mantêm o cursor de clique convencional.
- **Imagens:** capas, primeira imagem de cada case e fotos de Sobre e Serviços mostram `carregando...` durante a busca e carregamento. A indicação de imagem em breve aparece somente após falharem os caminhos disponíveis. Ao carregar, a imagem substitui o aviso. A galeria numerada continua exibindo somente imagens encontradas, sem criar quadros vazios.
- **Cache:** as três páginas carregam `styles.css?v=25` e `site.js?v=25`; `conteudo.js?v=22` permanece inalterado.
- **Próxima versão:** 2.6.

## Histórico — versão 2.4

- **Página Projetos e Outros projetos:** os cases com `texto` ou `resumo` preenchido aparecem automaticamente antes dos cases em preparação. Dentro de cada grupo, mantém-se a ordem original de `assets/js/conteudo.js`.
- **Seleção inicial:** mantém quatro cards, com CRISFIT e Down Five nas primeiras posições fixas e as demais vagas priorizando cases preenchidos, como na versão anterior.
- **Outros projetos:** continua exibindo todos os demais trabalhos, excluindo apenas o case aberto. Os 15 projetos seguem disponíveis na galeria completa.
- **Atualizações futuras:** basta preencher a descrição em `conteudo.js` para promover o case nas galerias. O upload isolado de imagens não determina a prioridade.
- **Cache:** as três páginas carregam `site.js?v=24`. CSS (`v=23`) e dados (`v=22`) permanecem inalterados.
- **Próxima versão:** 2.5.

## Histórico — versão 2.3

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

