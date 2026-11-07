# Rafael Cabral Design — Portfólio v1.4.5

Site estático em HTML, CSS e JavaScript, compatível com GitHub Pages. Esta revisão **integra a Nexa pelo Adobe Fonts**, sem instalar ou hospedar arquivos `.otf` no GitHub.

## Atualização v1.4.3 — Nexa via Adobe Fonts

Projeto web Adobe Fonts confirmado: `https://use.typekit.net/pwt1xky.css`.

O código CSS publicado pela Adobe inclui as famílias `nexa` e `nexa-text`, com pesos normais **400 (Regular)** e **700 (Bold)**, além de suas versões itálicas. A interface utiliza `nexa` em peso **400**, preservando a hierarquia leve e editorial aprovada na v1.4.2. `Helvetica Neue`/Arial ficam como alternativas caso a fonte online não carregue.

O `<head>` das três páginas agora contém o link oficial da Adobe; as declarações locais `@font-face` foram removidas de `assets/css/styles.css`, assim como os preloads de `.otf`. **Nenhum arquivo de fonte é distribuído.** A publicação via Adobe Fonts depende de assinatura elegível ativa e projeto web publicado na Adobe.

Importante: os arquivos `Trial` enviados anteriormente tinham licença "Personal Use Only". Não faça upload desses `.otf` ao repositório. Caso já os tenha enviado, recomendamos excluí-los da pasta `assets/fonts/`; o site não precisa mais deles.

## Conteúdo do site

- `index.html`: página inicial com projetos em destaque, Serviços, Sobre e Contato.
- `projetos.html`: galeria completa com 14 projetos.
- `projeto.html`: página individual por endereço `?projeto=slug` com grade de outros trabalhos.
- `assets/css/styles.css`: cores, tipografia, layout e interações.
- `assets/js/conteudo.js`: projetos, imagens e dados de contato editáveis.
- `assets/js/site.js`: renderização de cards, animações e navegação.
- `assets/img/icone.svg`: monograma original; `assets/img/favicon.svg`: favicon rosa.

## Contato

- WhatsApp: +55 (34) 99716-7187, com a mensagem inicial “Olá, Rafael! Gostaria de conversar sobre um projeto.” O visitante confirma o envio.
- E-mail: `rafaelcdesign@outlook.com`, link no rodapé.
- Menu “Vamos conversar” rola até a seção Contato; botões “Entre em contato” abrem o WhatsApp.

Os dados de contato e redes sociais são configuráveis no início de `assets/js/conteudo.js`.

## Atualizar imagens de projetos

1. Coloque sua imagem (de preferência `.webp`) em `assets/img/projetos/`.
2. Em `assets/js/conteudo.js`, localize o projeto e altere o campo `imagem` para um caminho como `assets/img/projetos/crisfit.webp`.
3. Para incluir imagens na página do case, preencha o array `galeria` com os caminhos correspondentes.
4. Envie ao GitHub **a imagem e o arquivo `conteudo.js` alterado** no mesmo repositório.

Enquanto as imagens não forem fornecidas, os cards exibem placeholders neutros. Não são utilizados projetos fictícios nem fotos de outros profissionais.

## Publicar atualização sobre v1.4.4 no GitHub

1. Faça backup do repositório atual (Code → Download ZIP).
2. Extraia `portfolio-rafael-cabral-v1.4.5-atualizacao.zip` no computador.
3. Na página principal do repositório `rafaelcabraldesign.github.io`, selecione **Add file → Upload files**.
4. Envie os **arquivos extraídos**, preservando as pastas e sem adicionar uma pasta intermediária.
5. Confirme a substituição dos arquivos e faça o commit, por exemplo `Ajuste de tipografia e cards v1.4.4`.
6. Abra `https://rafaelcabraldesign.github.io` e atualize sem cache (`Ctrl + Shift + R`).

Se ainda não houver GitHub Pages configurado, use Settings → Pages → Deploy from a branch → `main` → `/(root)`.

**Esta versão não requer upload de arquivos de fonte.** Se o navegador exibir uma fonte alternativa, confirme que o projeto `pwt1xky` continua publicado na sua conta Adobe Fonts e que a assinatura está ativa.

## Observações

- Mantidas as decisões das versões anteriores: header sticky, responsividade, 14 projetos, animação de entrada, cards arredondados, hover de projetos e botões com efeito de roleta.
- As páginas individuais ainda contêm placeholders e estão sinalizadas para não indexação enquanto não estiverem concluídas.
- A seção Sobre permanece em primeira pessoa; a comunicação de estúdio continua no plural nas demais seções.
- Repositório público e GitHub Pages não exigem hospedagem paga. A fonte, entretanto, é carregada via serviço Adobe Fonts associado à sua conta.

## Atualização v1.4.4 — elementos de interface e capas

- Ajustado `--type-ui` para 18–20 px conforme a largura: menu, botões, tags de seção, links de navegação, link de contato e textos de Serviços usam a mesma escala.
- Em smartphones, os botões e links se reorganizam sem ultrapassar a largura da tela.
- A camada de degradê sobre os cards foi suavizada e alterada para preto translúcido, com quatro pontos de interpolação. O foco é preservar as imagens futuras, mantendo os nomes legíveis ao passar o mouse ou navegar com teclado. Em dispositivos touch, o nome continua sempre visível.
- O CSS passa a usar `styles.css?v=144` nas três páginas para evitar cache da versão anterior.

**A atualização inclui apenas os arquivos HTML, CSS e este guia; não contém fontes nem altera o conteúdo dos projetos.**

## Atualização v1.4.5 — hover dos links e CTA da seção Contato

- O link **Ver todos os projetos** usa um sublinhado animado que cresce da esquerda para a direita, oculto no estado inicial e exibido apenas em hover ou foco pelo teclado. A mesma regra se aplica aos demais links com classe `.text-link`.
- O antigo link textual **Entre em contato** no final da página foi substituído por um botão cinza arredondado idêntico ao botão da abertura, com animação vertical de preenchimento e texto. O destino continua sendo o WhatsApp configurado no script.
- Atualizado o parâmetro de cache `styles.css?v=145` nas três páginas.
- Não foram modificados textos, projetos, fonte Adobe, páginas individuais ou destinos de contato.

Para atualizar a v1.4.4 no GitHub: descompacte o ZIP de atualização e substitua `index.html`, `projetos.html`, `projeto.html`, `assets/css/styles.css` e `LEIA-ME.md`.
