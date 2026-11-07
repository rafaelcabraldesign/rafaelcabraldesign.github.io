# Portfólio Rafael Cabral — versão 1.4.1

Site estático e responsivo, construído com HTML, CSS e JavaScript, preparado para GitHub Pages. Não precisa de hospedagem paga, React, npm, build ou assinatura.

## Mudanças na versão 1.3

- Aumentadas as escalas do título principal, descrição de abertura, textos de navegação e serviços, com peso editorial regular e espaçamento revisado para se aproximar da proporção da referência BerrielBrands.
- Menus em tamanho equivalente ao texto comum, também em mobile.
- Entradas realmente animadas por `IntersectionObserver` + `Element.animate()` (Web Animations API), com deslocamento vertical, opacidade e sequência; respeito a `prefers-reduced-motion` e conteúdo sempre visível sem JavaScript.
- Removidas as setas dentro de botões preenchidos e capas de projetos.
- Nome do projeto revelado **somente no hover/foco** com fade e deslocamento; em celulares, fica visível porque não há hover.
- Links do rodapé com o mesmo sublinhado animado do menu.
- Nos cases individuais, removidos: navegação anterior/próximo, tag `(Projeto)` e link `Todos os projetos`.
- Cases agora encerram com a galeria **Outros projetos**, listando todos os demais trabalhos em cards com 3 colunas no desktop e responsividade em telas menores.
- Mantidos os 14 projetos, os placeholders, os textos aprovados, os links de WhatsApp/e-mail, o header sticky, a largura ultrawide e o favicon rosa.

## O que está incluído

- `index.html` — página inicial com Projetos, Serviços, Sobre e Contato.
- `projetos.html` — galeria com os 14 projetos.
- `projeto.html` — página individual compartilhada, identificada pelo endereço `?projeto=...`.
- `assets/css/styles.css` — cores, tipografia, grid, responsividade e microinterações.
- `assets/js/conteudo.js` — **principal arquivo para editar projetos e dados de contato**.
- `assets/js/site.js` — interações, navegação mobile e geração dos cards.
- `assets/img/icone.svg` — monograma vetorial original adaptado para a cor Black Russian.
- `assets/img/projetos/` — onde entram as imagens dos seus projetos.

## Contato (configurado)

O link **"Entre em contato"** na abertura e na secao Contato abre o WhatsApp **+55 (34) 99716-7187**, em nova aba, com a mensagem predefinida:

> Ola, Rafael! Gostaria de conversar sobre um projeto.

O WhatsApp abre a conversa com o texto preenchido; o visitante precisa tocar em **enviar** para encaminhar a mensagem.

O link **"E-mail"** aparece no rodapé das três páginas; ao clicar, abre `mailto:rafaelcdesign@outlook.com`. O link **"Vamos conversar"** do menu continua rolando para a seção Contato, enquanto o botão **"Entre em contato"** abre o WhatsApp.

Se quiser alterar os dados, abra `assets/js/conteudo.js` e edite os campos:

```js
contato: {
  email: "rafaelcdesign@outlook.com",
  whatsapp: "5534997167187",
  mensagemWhatsApp: "Olá, Rafael! Gostaria de conversar sobre um projeto.",
  instagram: "",
  behance: "",
  linkedin: ""
},
```

No WhatsApp, o numero deve incluir **55** (codigo do Brasil) e o DDD, sem pontuacao. As redes sociais sao opcionais; links vazios nao aparecem. O formulario de contato nao e necessario, e o site nao depende de servicos pagos.

## Como alterar imagens e detalhes dos projetos

1. Salve a capa em `assets/img/projetos/`, preferencialmente como `.webp`.
2. Abra `assets/js/conteudo.js` e localize o projeto pelo nome.
3. Troque `imagem: ""` pelo caminho, por exemplo:

```js
{ nome: "CRISFIT", slug: "crisfit",
  imagem: "assets/img/projetos/crisfit.webp",
  categoria: "Identidade visual",
  ano: "",
  resumo: "Texto sobre o projeto, quando estiver pronto.",
  contexto: "",
  solucao: "",
  galeria: []
},
```

Os valores em `categoria` e `resumo` acima são **exemplos de preenchimento**, não informações afirmadas sobre o projeto.

4. Para uma página de projeto com mais imagens, preencha o campo `galeria`:

```js
galeria: [
  "assets/img/projetos/crisfit-detalhe-01.webp",
  "assets/img/projetos/crisfit-detalhe-02.webp"
]
```

5. Mantenha os nomes de arquivos sem espaços, símbolos especiais e letras acentuadas, quando possível.
6. Lembre-se de fazer o upload da imagem **e também** salvar a alteração em `conteudo.js` no GitHub.

Por padrão, a página inicial apresenta os **primeiros seis projetos** do arquivo `conteudo.js`. A página `projetos.html` apresenta todos os 14, mantendo a ordem da lista. Para mudar os destaques, reorganize os objetos no arquivo.

## Como testar localmente

Pode abrir `index.html` diretamente no navegador, porque não há dependência de carregamento de JSON externo. Para testar como em uma hospedagem real, use um servidor local simples, se já tiver Python instalado:

```bash
python -m http.server 8000
```

Acesse `http://localhost:8000`.

## Publicação em https://rafaelcabraldesign.github.io

1. Entre na conta GitHub `rafaelcabraldesign`.
2. Abra o repositório **`rafaelcabraldesign.github.io`**; se ele ainda não existir, crie um repositório público com esse nome exato.
3. Se já houver um site publicado, faça antes uma cópia dos arquivos atuais.
4. Descompacte o ZIP deste projeto. Faça upload dos **arquivos internos** para a raiz do repositório, preservando a estrutura `assets/...`. Não faça upload só do ZIP.
5. Clique em **Commit changes** ao terminar.
6. Vá em **Settings → Pages → Build and deployment**.
7. Em **Source**, escolha **Deploy from a branch**.
8. Em **Branch**, escolha **main** e a pasta **/(root)**, depois clique em **Save**.
9. Acesse `https://rafaelcabraldesign.github.io` para verificar.

A publicação costuma acontecer após o processamento do GitHub Pages. Alterações futuras também precisam de um commit.

### Atualizações futuras no GitHub, sem terminal

- Textos, projetos, WhatsApp, e-mail e redes: `assets/js/conteudo.js` → ícone de lápis → editar → **Commit changes**.
- Aparência: `assets/css/styles.css` → editar → **Commit changes**.
- Imagens: entrar em `assets/img/projetos/` → **Add file → Upload files** → selecionar novos arquivos → **Commit changes**.
- HTML/estrutura: edite `index.html`, `projetos.html` ou `projeto.html` apenas quando necessário.

### Observações

- A prévia utiliza somente **placeholders neutros**. Nenhuma imagem de um projeto real foi inventada.
- Os casos ainda estão em preparação e por isso `projeto.html` foi marcado como `noindex`. Remova a meta tag `robots` quando as páginas individuais estiverem concluídas.
- A seção **Sobre** está em primeira pessoa do singular, como definido. Serviços e apresentação institucional permanecem no plural.
- A fonte visual padrao agora e **Nexa**, configurada em tres pesos no CSS. Os arquivos de fonte devem ser adicionados separadamente em `assets/fonts/`. Sem eles, o navegador usa Helvetica/Arial como fallback. Confirme a permissao de hospedagem web na licenca original antes do upload publico.
- O monograma é o original do arquivo vetorial fornecido, com cor normal `#000014` e hover `#D60B52`.
- Na hospedagem GitHub Pages gratuita, o repositório deve ser público.


## Ajustes na versao 1.4
- Botões de abertura: animação de roleta vertical com máscara; botão escuro revela rosa, botão cinza revela cinza mais escuro.
- Serviços: imagem ocupa exatamente a metade esquerda da grade no desktop, lista na metade direita; número à esquerda, nome e descrição à direita.
- Todas as capas das galerias principal e completa possuem proporções uniformes em duas colunas no desktop.
- Link Projetos no menu da página inicial abre `projetos.html`.
- Transições de entrada ampliadas, com deslocamento vertical visível e duração aproximada de 1,4 a 1,6 segundo; desativadas quando o usuário prefere movimento reduzido.
- Tipografia de navegação, rodapé e lista de serviços ampliada e harmonizada, com pesos diferentes para título/descrição.

### Importante para atualizações via GitHub
Se usar o ZIP de atualização, **extraia** seu conteúdo e carregue `index.html`, `projetos.html`, `projeto.html`, `assets/css/styles.css` e `assets/js/site.js`, mantendo a árvore de pastas. No commit, confira se a pasta `assets` não foi colocada dentro de uma pasta adicional e se o site recebe CSS/JS `?v=14` (controle de cache).


## Tipografia Nexa (ajuste v1.4.1)

A v1.4.1 aplica a Nexa a todas as paginas sem alterar os textos nem a estrutura dos projetos.
O CSS define **Nexa Light** para peso 300, **Nexa Regular** para peso 400 e **Nexa Bold** para peso 700. Os textos auxiliares da abertura usam Nexa Light; os titulos editoriais usam Regular e o menu e rodape usam Bold, seguindo os pesos configurados.

**Os arquivos de fonte nao estao no ZIP.** Para ativar a Nexa no GitHub Pages:

1. Confira a permissao/licenca de uso web e auto-hospedagem dos arquivos Nexa.
2. No repositorio, abra `assets` e crie uma pasta chamada `fonts`, caso ela ainda nao exista. O pacote inclui `assets/fonts/LEIA-ME.txt` para facilitar.
3. Entre em `assets/fonts/` no GitHub, clique em **Add file → Upload files** e envie separadamente os arquivos **Nexa Light.otf**, **Nexa Regular.otf** e **Nexa Bold.otf** que voce forneceu.
4. Conclua com **Commit changes**. Os nomes devem ficar exatamente assim, com os espacos.
5. Envie o ZIP de atualizacao (HTML, CSS, instrucao) para o repositorio; confirme o commit.
6. Atualize o site com Ctrl + Shift + R. Se os arquivos nao forem encontrados, o CSS cai em Helvetica/Arial.

Para performance, posteriormente podemos usar arquivos WOFF2 devidamente licenciados para web.
O CSS da v1.4.1 tem `?v=141` nos links HTML para evitar que o cache carregue a tipografia antiga.
