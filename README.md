# Rafael Cabral Design — versão 1.5

Site estático (HTML, CSS, JS) para GitHub Pages, com Adobe Fonts, 15 projetos e imagens automáticas.

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
    crisfit.webp       # capa específica (opcional)
    crisfit-01.webp    # primeira imagem, ou capa se não existir crisfit.webp
    crisfit-02.webp
    crisfit-03.webp
```

A capa aparece nas grades e na abertura do case. Se a imagem `-01.webp` for usada como capa por ausência do arquivo específico, ela não aparece duplicada na galeria interna. A galeria procura até 40 arquivos numerados sequencialmente e para no primeiro número ausente.

Para **Sobre** e **Serviços**, use `assets/img/sobre.webp` e `assets/img/servicos.webp`. As imagens já enviadas ao repositório **não devem ser excluídas ao atualizar o código**. Arquivos ausentes mantêm os placeholders.

## Textos e páginas

Os conteúdos editáveis estão em `assets/js/conteudo.js` (`nome`, `frase`, `servicos`, `segmento`, `ano`, `texto`). O CRISFIT já tem frase-resumo, serviços, segmento, ano 2024 e texto completo. Os demais projetos aguardam conteúdos.

As páginas são `index.html` (início), `projetos.html` (galeria) e `projeto.html?projeto=slug` (case individual). A seção dos cases usa imagem em largura total, descrições e metadados à esquerda com sticky no desktop e grid de outros projetos.

## Tipografia e hospedagem

Nexa carrega pelo projeto Adobe Fonts `https://use.typekit.net/pwt1xky.css`, sem hospedar arquivos de fontes no repositório. A assinatura do rodapé usa SVG. O site permanece 100% compatível com o GitHub Pages gratuito.
