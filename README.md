# Rafael Cabral Design — Portfólio v1.4.7

Site estático para GitHub Pages (HTML, CSS e JavaScript). Usa Nexa e Bestia Small pelo projeto oficial Adobe Fonts `https://use.typekit.net/pwt1xky.css`.

## O que mudou na v1.4.7

- O link **Topo** do rodapé foi substituído pela assinatura **Rafael Cabral** usando `font-family: "bestia-small"` em todas as três páginas.
- A assinatura é revelada em duas etapas, primeiro **Rafael**, depois **Cabral**, com ritmo levemente irregular para sugerir escrita com caneta.
- A animação começa quando a assinatura entra na tela. Em desktop, pode ser repetida ao passar o mouse; também se repete quando o link recebe foco pelo teclado.
- A assinatura continua sendo um link que **leva ao topo da própria página**. Seu rótulo acessível identifica essa função.
- Em smartphones, o rodapé é empilhado para evitar colisão com o copyright e o e-mail.
- Com JavaScript indisponível ou preferências de movimento reduzido, a assinatura aparece completa, sem depender de animação.
- Não foram alterados os 14 projetos, a estrutura das páginas, os textos e os links de contato.

**Precisão do efeito:** esta v1.4.7 faz uma *revelação caligráfica* da fonte. Ela não traça cada movimento real da ponta da caneta. Para essa fidelidade, envie um SVG com os caminhos de escrita individualizados (idealmente traçados centrais por letra/gesto). Um SVG que contenha somente contornos preenchidos ainda precisará ter os caminhos de escrita preparados.

## Arquivos modificados na v1.4.7

- `index.html`, `projetos.html`, `projeto.html`: assinatura no lugar do link Topo, cache atualizado.
- `assets/css/styles.css`: tipografia Bestia, animação caligráfica e layout responsivo do rodapé.
- `assets/js/site.js`: acionamento quando o rodapé entra em cena, replay no hover/foco e respeito à preferência de movimento reduzido.
- `LEIA-ME.md`: este guia.

Nenhum arquivo de fonte foi incluído. O link do Adobe Fonts já está no `<head>` das três páginas.

## Como atualizar no GitHub Pages

1. Faça backup do repositório atual com **Code → Download ZIP**.
2. Extraia `portfolio-rafael-cabral-v1.4.7-atualizacao.zip`.
3. Em `rafaelcabraldesign.github.io`, acesse **Add file → Upload files**.
4. Arraste **os arquivos extraídos**, mantendo a hierarquia `assets/css` e `assets/js`; não envie a pasta externa do ZIP.
5. Substitua as versões anteriores e confirme com **Commit changes**. Sugestão de mensagem: `Assinatura animada no rodapé v1.4.7`.
6. Abra `https://rafaelcabraldesign.github.io/`, role até o rodapé e teste a animação. Se aparecer a versão antiga, faça `Ctrl + Shift + R`.

## Fonte e licença

O seu kit Adobe Fonts `pwt1xky` inclui `nexa`, `nexa-text` e `bestia-small` (peso 400, estilo normal). A assinatura usa a Bestia; as demais seções continuam usando a Nexa.

É necessário manter a licença/assinatura elegível e o projeto web publicado no Adobe Fonts. Não envie fontes locais `.otf` ou `.woff` para o GitHub.

## Ajustes futuros da assinatura

Em `assets/css/styles.css`:

- `.footer-signature__text`: controla o tamanho (`font-size`), a família e o espaçamento entre palavras (`gap`).
- `.footer-signature.is-writing .footer-signature__word--first/--last`: controlam a duração e o intervalo de cada palavra.
- `@keyframes signature-ink-write`: controla a forma de revelação horizontal.

Em `assets/js/site.js`, `setupFooterSignature()` controla o acionamento da animação e o replay no hover/foco. Preserve a verificação de movimento reduzido.

## Outras edições do portfólio

- `assets/js/conteudo.js`: edite os 14 projetos, capas, galerias, e-mail e WhatsApp.
- `assets/img/projetos/`: salve as capas e galerias dos trabalhos.
- `index.html`: textos das seções Serviços, Sobre e Contato.

As páginas de projetos continuam com placeholders até o envio das imagens definitivas.
