# Rafael Cabral Design — Portfólio v1.4.12

Site estático para GitHub Pages, em HTML, CSS e JavaScript. Nexa é carregada diretamente pelo Adobe Fonts (https://use.typekit.net/pwt1xky.css). As fontes não são incluídas no pacote.

## Mudanças da v1.4.12

1. **Animação de entrada sem piscar.** Antes havia uma janela de tempo em que o elemento aparecia normalmente, era ocultado pelo JavaScript e só então começava o movimento. Agora o navegador recebe a classe `motion-ready` ainda no `<head>` e o CSS oculta apenas os elementos animáveis desde o primeiro frame. Eles aparecem apenas durante a primeira animação. Se o JavaScript estiver desativado ou a pessoa preferir menos movimento, o conteúdo aparece normalmente.
2. **Transição de saída nas páginas internas.** Ao clicar em links entre página inicial, galeria e cases, a página inteira sai com um `fade-out` uniforme de 460 ms e leve deslocamento para cima antes de carregar a próxima. Links externos, WhatsApp, e-mail, âncoras internas e novos separadores não são interceptados. O histórico (Voltar/Avançar) é tratado com `pageshow`.
3. **Serviços: agora são cinco.** Removido `Comunicação para Redes` por sobrepor `Materiais de Marca`; `Experiências Digitais` passa a ocupar a posição 05. Os demais títulos e descrições permanecem inalterados.
4. Atualizados o CSS para `?v=1410` e o JS para `?v=1410` em todas as páginas, evitando problemas com versões em cache.

## Atualizar no GitHub Pages (a partir da v1.4.9)

1. Faça backup do repositório (Code > Download ZIP).
2. Extraia `portfolio-rafael-cabral-v1.4.12-atualizacao.zip` no seu computador.
3. Abra o repositório `rafaelcabraldesign.github.io` no GitHub e escolha **Add file > Upload files**.
4. Arraste **os arquivos que estão dentro da pasta extraída**, preservando as subpastas `assets/css/` e `assets/js/`, para substituir os arquivos existentes nos mesmos caminhos.
5. Confirme o commit com a mensagem: `Animações e navegação sem piscar v1.4.12`.
6. Acesse o site publicado e pressione Ctrl + Shift + R para atualizar os arquivos do cache.

## Personalização posterior

- Para atualizar as imagens, edite os dados de cada trabalho em `assets/js/conteudo.js`. No projeto Lara Land, informe `imagem: "assets/img/projetos/lara-land.webp"` somente depois de enviar a imagem para esta pasta.
- Para ajustar a duração da escrita, mude `totalDuration = 1850` em `setupFooterSignature()` dentro de `assets/js/site.js`.
- O desenho final da assinatura usa os caminhos vetoriais enviados por Rafael. A cópia original está em `assets/img/assinatura.svg`, sem alterações.
- Com JavaScript desativado ou preferência por movimento reduzido, a assinatura permanece completamente visível.
- Os textos, cores, contato e os 14 projetos anteriores foram preservados.


## Alteracoes v1.4.12 - assinatura

- Corrigida a piscada da assinatura durante atualizacao, navegacao e restauracao do historico: ela comeca invisivel **antes da primeira pintura** e somente aparece quando o rodape entra em tela e a animacao comeca.
- Escrita mais rapida: aproximadamente **1,1 segundo**, antes 1,85 segundo.
- Ao passar o mouse a cor muda para rosa, sem repetir a escrita.
- Nos tres HTMLs, a versao de CSS/JS muda para `v=1411` para evitar cache.
- Fallback de acessibilidade: se movimentos reduzidos estiverem ativos, a assinatura aparece pronta.

**Para publicar:** substitua `index.html`, `projetos.html`, `projeto.html`, `assets/css/styles.css`, `assets/js/site.js`. Nao e necessario reenviar fontes nem os SVGs.


## Ajuste v1.4.12 — Rodape sem salto

- Mantivemos a entrada vertical dos textos e links com os tempos e distancias anteriores.
- `overflow: clip` no rodape impede que o `translateY` dos filhos acrescente area rolavel ao final da pagina.
- O observador usa o proprio rodape, que tem posicao estatica, para iniciar a entrada conjunta dos textos; nao depende da posicao animada dos filhos.
- A escrita SVG so comeca **depois** que a entrada dos textos e links termina e a assinatura esta na area visivel.
- Hover da assinatura apenas altera sua cor, sem reiniciar a escrita.
- Arquivos alterados: `assets/css/styles.css`, `assets/js/site.js`, `index.html`, `projetos.html` e `projeto.html`; o guia tambem foi atualizado.


## Ajuste v1.4.13 — Sincronismo do rodape

- A assinatura SVG comeca no **mesmo evento** em que os textos e links do rodape iniciam suas entradas, nao no fim delas.
- Permanecem identicos: a escrita de 1,1 segundo, a animacao vertical dos textos, o hover rosa e o clique para o topo.
- Mantido `overflow: clip` do rodape da v1.4.12 para impedir salto no limite da pagina.
- Na restauracao do historico, a escrita pode comecar imediatamente se a entrada do rodape ja tiver sido acionada.
- O JS recebe `?v=1413` nos tres arquivos HTML, evitando o cache da versao anterior.
- Arquivos modificados: `assets/js/site.js`, `index.html`, `projetos.html`, `projeto.html` e `LEIA-ME.md`.
