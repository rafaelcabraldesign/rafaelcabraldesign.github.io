# Portfólio Rafael Cabral — versão 1.3

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
- Foi utilizada uma família de fontes de sistema (Helvetica/Arial) para evitar licenciamento pendente. O uso de Nexa no site precisa de confirmação da licença web.
- O monograma é o original do arquivo vetorial fornecido, com cor normal `#000014` e hover `#D60B52`.
- Na hospedagem GitHub Pages gratuita, o repositório deve ser público.
