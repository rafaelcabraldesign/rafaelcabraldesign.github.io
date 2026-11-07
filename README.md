# Rafael Cabral Design — Portfólio v1.4.8

Site estático para GitHub Pages com HTML, CSS e JavaScript. Usa Nexa pelo projeto Adobe Fonts `https://use.typekit.net/pwt1xky.css`.

## O que mudou na v1.4.8

- Substituímos a versão anterior (texto Bestia com revelação horizontal) pela **assinatura original em SVG** enviada por Rafael Cabral.
- A assinatura é apresentada discretamente no centro do rodapé, apenas um pouco maior que os links de navegação (aproximadamente 21–26 px de altura visual, conforme a tela).
- A animação desenha a assinatura **letra por letra, acompanhando percursos reconstruídos de traço central**, em vez de apenas deslocar uma máscara retangular. O arquivo enviado possui contornos de letras preenchidos, não linhas de escrita; por isso, a sequência reproduz de maneira aproximada o movimento da caneta, preservando exatamente o desenho final.
- A animação é executada **uma única vez**, quando o rodapé entra na área visível, em aproximadamente 4,2 segundos.
- Ao passar o mouse ou focar com teclado, **somente a cor muda** de Black Russian (`#000014`) para Razzmatazz (`#D60B52`), sem reiniciar a animação.
- O link ainda permite voltar ao topo da página. Com JavaScript desativado ou preferências de movimento reduzido, a assinatura aparece completa e sem animação.
- O efeito está presente nas três páginas (`index.html`, `projetos.html` e `projeto.html`).

## Arquivos de atualização

- `index.html`, `projetos.html`, `projeto.html`: SVG original embutido e máscaras para animação individual das letras.
- `assets/css/styles.css`: escala discreta, animação das máscaras e hover apenas de cor.
- `assets/js/site.js`: acionamento único na entrada do rodapé, sem evento de replay.
- `assets/img/assinatura.svg`: cópia **inalterada** do arquivo enviado. Guarde-a para substituir a assinatura no futuro.
- `LEIA-ME.md`: instruções de atualização.

O SVG está embutido no HTML para permitir controlar diretamente as máscaras dos traços. O arquivo `assets/img/assinatura.svg` é mantido como referência e não depende de carregamento externo. A assinatura **não precisa da fonte Bestia** para funcionar, embora a Bestia continue disponível no seu kit Adobe Fonts.

## Atualizar no GitHub Pages

1. Faça backup da versão atual do repositório (**Code → Download ZIP**).
2. Extraia `portfolio-rafael-cabral-v1.4.8-atualizacao.zip`.
3. Entre no repositório `rafaelcabraldesign.github.io` e use **Add file → Upload files**.
4. Envie os arquivos **dentro** da pasta extraída, preservando a estrutura `assets/css`, `assets/js` e `assets/img`.
5. Confirme a substituição e finalize com **Commit changes**. Mensagem sugerida: `Assinatura SVG animada v1.4.8`.
6. Acesse o site, faça `Ctrl + Shift + R` e role até o rodapé para conferir a animação. Ela não recomeça ao passar o mouse, mas será executada novamente ao recarregar a página, como uma nova visita.

## Ajustes futuros

- **Escala:** altere `width` em `.site-footer > .footer-signature`, dentro de `assets/css/styles.css`. Há uma regra específica para mobile.
- **Duração total:** altere `totalDuration = 4200` em `setupFooterSignature()`, dentro de `assets/js/site.js`.
- **Cor do hover:** utiliza o token `--accent`, definido no CSS.
- **Alterar o desenho:** parta de `assets/img/assinatura.svg`. Ao alterar os contornos das letras, as máscaras da versão embutida no HTML também precisarão ser reconstruídas.
- **Demais projetos e links:** continuam editáveis em `assets/js/conteudo.js`.

Não incluímos arquivos proprietários de fonte no pacote. A família Nexa continua carregada pelo Adobe Fonts.
