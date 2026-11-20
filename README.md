# Rafael Cabral Design — versão 1.5.3

Portfólio estático em HTML, CSS e JavaScript, hospedado gratuitamente no GitHub Pages. Tipografia Nexa pelo Adobe Fonts (`pwt1xky.css`), 15 projetos, assinatura animada no rodapé e imagens de cases carregadas por convenção de nomes.

## Atualização v1.5.3 — header corrigido

- **Avatar circular** no canto superior esquerdo, com a foto preto e branco em estado normal e a versão colorida exclusivamente no hover ou foco pelo teclado.
- A fotografia não usa `mix-blend-mode`, filtros, negativo nem rotação. Foi posicionada em camada separada porque o header utiliza inversão de cores nos textos para preservar contraste sobre imagens.
- **Menu alinhado à direita**: Projetos, Serviços e Sobre imediatamente antes de Vamos conversar, como na referência enviada.
- **Vamos conversar** apresenta borda fina arredondada, continua abrindo o mesmo WhatsApp com a mensagem predefinida. Menus e animações foram mantidos.
- **Menu mobile** mantém a foto à esquerda, o botão de fechar na posição original e os links centralizados abaixo.
- As imagens de avatar permanecem em `assets/img/header-avatar-bw.webp` e `assets/img/header-avatar-color.webp`, sem alterações nesta versão.
- Versões anteriores continham documentação com número incorreto; este README foi reescrito para refletir a versão real **1.5.3**.

### Atualizar a partir da v1.5.2

1. Baixe `portfolio-rafael-cabral-v1.5.3-atualizacao.zip` e extraia o conteúdo.
2. No repositório `rafaelcabraldesign/rafaelcabraldesign.github.io`, abra **Code → Add file → Upload files**.
3. Envie **o conteúdo extraído** para a raiz (não a pasta que o contém). Os únicos arquivos alterados são `index.html`, `projetos.html`, `projeto.html`, `assets/css/styles.css` e `README.md`.
4. Confirme o commit `Header e README v1.5.3`.
5. Atualize o site e, se necessário, pressione **Ctrl + Shift + R**. Os HTMLs usam `styles.css?v=1503` para atualizar o cache.

**Não apague a pasta `assets` do GitHub e não exclua suas imagens WebP.** O upload substitui somente arquivos de mesmo nome/caminho. No ZIP completo existem os avatares e os arquivos estruturais, mas ele não contém os projetos reais enviados por você separadamente ao GitHub.

## Pastas e imagens automáticas

```text
assets/
├── css/styles.css
├── js/conteudo.js
├── js/site.js
└── img/
    ├── header-avatar-bw.webp
    ├── header-avatar-color.webp
    ├── sobre.webp                # opcional
    ├── servicos.webp             # opcional
    └── projetos/
        └── crisfit/
            ├── crisfit.webp       # capa apenas para os cards
            ├── crisfit-01.webp    # primeira imagem do case individual
            ├── crisfit-02.webp    # segunda imagem depois do texto
            └── crisfit-03.webp    # terceira imagem e assim por diante
```

Arquivos de case numerados são reconhecidos em sequência até `-40.webp`. Uma lacuna interrompe a sequência. A estrutura antiga de imagens diretamente em `assets/img/projetos/` também permanece compatível.

## Conteúdos dos projetos

Edite `assets/js/conteudo.js` para ajustar `nome`, `slug`, `frase`, `servicos`, `segmento`, `ano` e `texto` de cada projeto. O CRISFIT já possui descrição, serviços, segmento e ano 2024. Os demais projetos aguardam seus conteúdos.

- `index.html`: página inicial, Projetos selecionados, Serviços, Sobre e Contato.
- `projetos.html`: galeria de todos os projetos.
- `projeto.html?projeto=crisfit`: página individual do projeto.

Nas páginas individuais, o título divide a abertura com a frase-resumo; em seguida, aparece a primeira imagem numerada e depois a ficha Serviços/Segmento/Ano à esquerda, texto à direita e a galeria vertical em largura total. A ficha acompanha a rolagem no desktop dentro da seção de texto.

## Observações

- A foto do header agora é sempre exibida em sua tonalidade original. A inversão cromática foi preservada **somente para os elementos do menu**.
- Use o ZIP de atualização para cada nova versão e preserve as imagens personalizadas já existentes no GitHub.
- O portfólio utiliza somente tecnologias compatíveis com GitHub Pages, sem servidor de aplicação ou assinatura de hospedagem.
