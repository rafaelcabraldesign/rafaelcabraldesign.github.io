# Rafael Cabral Design — Portfólio v1.4.9

Site estático para GitHub Pages, em HTML, CSS e JavaScript. Nexa é carregada diretamente pelo Adobe Fonts (https://use.typekit.net/pwt1xky.css). As fontes não são incluídas no pacote.

## Mudanças da v1.4.9

1. A assinatura SVG do rodapé agora é desenhada em aproximadamente **1,85 segundo**, em vez de 4,2 segundos. A escrita é executada **uma única vez**, ao entrar na área visível. No hover, apenas a cor muda para rosa; não há repetição.
2. Adicionado **Lara Land** como o **15º projeto** em `assets/js/conteudo.js`, com a URL `projeto.html?projeto=lara-land`. Imagem, descrição, categoria e demais informações permanecem vazias até serem fornecidas.
3. A página `projetos.html` agora indica 15 projetos. Na página individual de cada trabalho, a grade "Outros projetos" mostra os **14 demais projetos**, incluindo Lara Land.
4. Atualizados os parâmetros de cache dos scripts (`conteudo.js?v=149` e `site.js?v=149`) nas três páginas.

## Atualizar no GitHub Pages (a partir da v1.4.8)

1. Faça backup do repositório (Code > Download ZIP).
2. Extraia `portfolio-rafael-cabral-v1.4.9-atualizacao.zip` no seu computador.
3. Abra o repositório `rafaelcabraldesign.github.io` no GitHub e escolha **Add file > Upload files**.
4. Arraste **os arquivos que estão dentro da pasta extraída**, preservando a subpasta `assets/js/`, para substituir os arquivos existentes nos mesmos caminhos.
5. Confirme o commit com a mensagem: `Assinatura mais rápida e Lara Land v1.4.9`.
6. Acesse o site publicado e pressione Ctrl + Shift + R para atualizar os arquivos do cache.

## Personalização posterior

- Para atualizar as imagens, edite os dados de cada trabalho em `assets/js/conteudo.js`. No projeto Lara Land, informe `imagem: "assets/img/projetos/lara-land.webp"` somente depois de enviar a imagem para esta pasta.
- Para ajustar a duração da escrita, mude `totalDuration = 1850` em `setupFooterSignature()` dentro de `assets/js/site.js`.
- O desenho final da assinatura usa os caminhos vetoriais enviados por Rafael. A cópia original está em `assets/img/assinatura.svg`, sem alterações.
- Com JavaScript desativado ou preferência por movimento reduzido, a assinatura permanece completamente visível.
- Os textos, cores, contato e os 14 projetos anteriores foram preservados.
