# Rafael Cabral Design — versão 1.5.1

Site estático (HTML, CSS, JS) para GitHub Pages, com Adobe Fonts, 15 projetos e imagens automáticas.

## Correção da versão 1.5.1 — capa exclusiva dos cards

A imagem sem numero (`crisfit.webp`) agora e **exclusiva dos cards** da pagina
inicial, da listagem completa e da grade de outros projetos. Ela **nao entra
no case individual**, mesmo quando existir.

As imagens da pagina individual seguem esta regra para qualquer projeto:

- `<slug>-01.webp`: primeira imagem do case, logo abaixo do titulo/frase.
- `<slug>-02.webp`, `<slug>-03.webp` etc.: galeria interna, apos texto e ficha.
- `<slug>.webp`: capa exclusiva dos cards; se ausente, o card usa `-01.webp`.

Arquivos tanto em `assets/img/projetos/<slug>/` (preferido) quanto em
`assets/img/projetos/` (legado) continuam reconhecidos. Nenhuma imagem precisa
ser renomeada ou reenviada. A abertura mostra o placeholder se `-01.webp` nao
existir, em vez de exibir a capa destinada aos cards.

### Atualizar sobre a versão 1.5

Envie os arquivos de `portfolio-rafael-cabral-v1.5.1-atualizacao.zip` para a
**raiz** do repositorio no GitHub, preservando as pastas.
Somente `assets/js/site.js`, os tres HTMLs e este `README.md` mudaram.
O JavaScript usa `site.js?v=1501` para evitar cache antigo.
Suas imagens WebP existentes permanecem intactas.

## Novidades da versão 1.5

- Títulos dos cards de projeto no mesmo tamanho tipográfico da tag “Projetos selecionados”.
- Ano do projeto à direita do nome, na mesma linha, **sem o rótulo “ANO”**. Se o ano não estiver cadastrado, o espaço fica vazio e apenas o título aparece.
- Removido o efeito de ampliação/zoom no hover tanto das imagens quanto dos placeholders. Mantidos o degradê, a sombra e a revelação do nome/ano.
- Arquivos de instruções passam a se chamar `README.md` e `README.txt` (não `LEIA-ME`).
- Todas as melhorias das versões anteriores preservadas (incluindo o layout dos cases, imagens responsivas, lista sticky, menu mobile e assinatura animada).

## Atualização sobre a versão 1.4.29

Use `portfolio-rafael-cabral-v1.5-atualizacao.zip`.

1. Extraia o ZIP no computador.
2. Abra `github.com/rafaelcabraldesign/rafaelcabraldesign.github.io` na aba **Code**.
3. Clique em **Add file → Upload files**.
4. Envie o **conteúdo extraído** para a raiz do repositório, preservando `assets/js/` e `assets/css/`. Não envie uma pasta `portfolio-rafael-cabral-v1.5/` extra.
5. Confirme com o commit `Portfólio v1.5 — cards e ano`.
6. Confira `https://rafaelcabraldesign.github.io/` após a publicação; se necessário, pressione `Ctrl + Shift + R`.

Arquivos modificados nesta atualização:

- `assets/js/site.js` — exibição do ano nos cards.
- `assets/css/styles.css` — tamanho dos títulos e remoção do zoom.
- `index.html`, `projetos.html`, `projeto.html` — revisão dos sufixos de cache para os arquivos CSS e JS.
- `README.md` — este guia, com o nome padronizado.

**Importante:** O arquivo antigo `LEIA-ME.md` que já existe no GitHub não será removido automaticamente quando você enviar `README.md`. Você pode excluí-lo manualmente do repositório. Isso é apenas uma limpeza de documentação, não interfere no site. Os ZIPs da v1.5 não contêm mais arquivos com o nome `LEIA-ME`.

## Como mostrar o ano em cada card

Abra `assets/js/conteudo.js` e preencha o campo `ano` no respectivo projeto, por exemplo:

```js
{ nome: "CRISFIT", slug: "crisfit", ano: "2024", /* ...outros campos... */ }
```

O card exibe `CRISFIT` à esquerda e `2024` à direita, apenas quando a pessoa passa o mouse por cima. Em telas touch, a informação aparece permanentemente para facilitar a navegação. Sem ano, o card exibe somente o nome. **A versão atual já contém 2024 no CRISFIT; não é necessário editar esse projeto.**

## Como atualizar imagens sem editar código

Opção recomendada, usando uma pasta para cada projeto:

```text
assets/img/projetos/crisfit/
    crisfit.webp       # capa exclusiva dos cards (opcional)
    crisfit-01.webp    # primeira imagem da pagina individual
    crisfit-02.webp    # galeria interna
    crisfit-03.webp    # galeria interna
```

A capa `crisfit.webp` aparece somente nos cards (inicio, todos os projetos e outros projetos). A imagem `crisfit-01.webp` e sempre a abertura da pagina individual. Se a capa exclusiva nao existir, o card usa `-01.webp` como alternativa. A galeria interna comeca no `-02.webp`, procura os arquivos ate `-40.webp` e termina na primeira lacuna. Nao ha duplicacao de imagens no case.

Para **Sobre** e **Serviços**, use `assets/img/sobre.webp` e `assets/img/servicos.webp`. As imagens já enviadas ao repositório **não devem ser excluídas ao atualizar o código**. Arquivos ausentes mantêm os placeholders.

## Textos e páginas

Os conteúdos editáveis estão em `assets/js/conteudo.js` (`nome`, `frase`, `servicos`, `segmento`, `ano`, `texto`). O CRISFIT já tem frase-resumo, serviços, segmento, ano 2024 e texto completo. Os demais projetos aguardam conteúdos.

As páginas são `index.html` (início), `projetos.html` (galeria) e `projeto.html?projeto=slug` (case individual). A seção dos cases usa imagem em largura total, descrições e metadados à esquerda com sticky no desktop e grid de outros projetos.

## Tipografia e hospedagem

Nexa carrega pelo projeto Adobe Fonts `https://use.typekit.net/pwt1xky.css`, sem hospedar arquivos de fontes no repositório. A assinatura do rodapé usa SVG. O site permanece 100% compatível com o GitHub Pages gratuito.
