# Rafael Cabral Design — Portfólio v1.4.16

Portfólio em HTML, CSS e JavaScript, compatível com o GitHub Pages gratuito. **A partir desta versão, você não precisa editar código para adicionar ou substituir imagens dos 15 projetos ou das seções Sobre e Serviços.**

## 1. Onde enviar as imagens

| O que vai aparecer no site | Onde colocar e como nomear |
| --- | --- |
| Imagem da seção Sobre | `assets/img/sobre.webp` |
| Imagem da seção Serviços | `assets/img/servicos.webp` |
| Capa de um projeto | `assets/img/projetos/NOME-DO-PROJETO.webp` |
| Imagens internas de um projeto | `assets/img/projetos/NOME-DO-PROJETO-01.webp`, `-02.webp` etc. |

Use sempre arquivos **WebP reais**, em letras minúsculas e com hífens exatamente como nos exemplos. Não basta mudar a extensão de um JPG para `.webp`: é necessário converter a imagem para esse formato.

### Nome exato das capas dos 15 projetos

| Projeto | Nome do arquivo (dentro de `assets/img/projetos/`) |
| --- | --- |
| CRISFIT | `crisfit.webp` |
| Neto Motors | `neto-motors.webp` |
| Juliana Vitorino | `juliana-vitorino.webp` |
| Salto Energia | `salto-energia.webp` |
| Uber Brindes | `uber-brindes.webp` |
| Mariana Morais | `mariana-morais.webp` |
| Iná Game Studio | `ina-game-studio.webp` |
| Poiôô Kids | `poioo-kids.webp` |
| Artes do meu Brasil | `artes-do-meu-brasil.webp` |
| Funil Exponencial | `funil-exponencial.webp` |
| Ita Corretora de Seguros | `ita-corretora-de-seguros.webp` |
| Eagle Investment | `eagle-investment.webp` |
| Agrofixa | `agrofixa.webp` |
| Down Five | `down-five.webp` |
| Lara Land | `lara-land.webp` |

O nome é reutilizado automaticamente nos cards da página inicial, na página com todos os projetos, na capa do case individual e nos cards de outros projetos.

### Como adicionar as imagens internas dos cases

Por exemplo, para apresentar três imagens do projeto CRISFIT:

```
assets/img/projetos/crisfit-01.webp
assets/img/projetos/crisfit-02.webp
assets/img/projetos/crisfit-03.webp
```

A ordem é numérica. **Não pule números.** Se `crisfit-02.webp` não existir, o site interromperá a busca depois de `crisfit-01.webp` e não exibirá `crisfit-03.webp`. É possível adicionar até **40 imagens numeradas por case**, sem editar o código.

A capa `crisfit.webp` é independente da galeria numerada.

Como o GitHub Pages não fornece uma lista de arquivos do diretório, o JavaScript verifica os arquivos em sequência. É normal o navegador registrar um pedido 404 para o primeiro número que não existe; o visitante não vê erro, apenas a galeria com as imagens disponíveis.

**Quando não existe arquivo:** o site preserva o placeholder. A seção de galeria interna nem aparece quando nenhuma imagem numerada foi enviada.

## 2. Como atualizar as imagens pelo GitHub (sem código)

1. Prepare a arte em WebP. Para capas, experimente imagens de **1600 a 2200 px na dimensão maior** e tente mantê-las abaixo de **500 KB**, preservando a qualidade visual.
2. Renomeie o arquivo conforme a tabela acima.
3. No GitHub, abra o repositório `rafaelcabraldesign.github.io` e navegue até a pasta `assets/img/` ou `assets/img/projetos/`.
4. Clique em **Add file → Upload files** dentro da pasta correta.
5. Envie a imagem; se o mesmo nome já existir, substitua o arquivo anterior.
6. Confirme em **Commit changes** e abra o site publicado. Se continuar vendo a imagem antiga, use `Ctrl + Shift + R` ou aguarde a publicação do GitHub Pages.

Para excluir ou trocar imagens, basta remover ou substituir o arquivo correspondente no GitHub. **Não precisa alterar `index.html`, `projeto.html` ou os arquivos JavaScript.**

Se uma imagem não aparecer: confira a grafia exata, a pasta, a extensão WebP verdadeira e se o GitHub Pages concluiu a publicação.

## 3. Como publicar a v1.4.16

Você pode usar o **ZIP completo** para uma instalação limpa ou o **ZIP de atualização** para substituir apenas os nove arquivos modificados ou acrescentados à v1.4.15:

- `index.html`
- `projetos.html`
- `projeto.html`
- `assets/js/site.js`
- `assets/js/conteudo.js`
- `assets/css/styles.css`
- `assets/img/LEIA-ME.txt`
- `assets/img/projetos/LEIA-ME.txt`
- `LEIA-ME.md`

Extraia o ZIP, faça o upload dos arquivos internos para os mesmos caminhos do repositório e use o commit `Imagens automaticas v1.4.16`.

O GitHub Pages deve continuar apontando para a branch de publicação e para `/(root)` conforme a configuração que já funciona no seu site.

## 4. O que continua editável por código

- **Nomes de projetos, ordem, textos e descrições dos cases:** `assets/js/conteudo.js`.
- **Textos fixos das seções Sobre, Serviços e Contato:** `index.html`.
- **Cores e estilos:** `assets/css/styles.css`.
- **Comportamento das animações e navegação:** `assets/js/site.js`.

Para imagens, **não é mais necessário** fazer essas alterações. Os campos opcionais `imagem` e `galeria` no arquivo de conteúdo continuam existindo apenas para casos especiais em que você quiser escolher um caminho manual fora da convenção automática.

## 5. O que foi preservado

- A direção de arte branca, minimalista e editorial.
- 15 projetos, incluindo Lara Land.
- Nexa pelo Adobe Fonts (kit `pwt1xky`), sem redistribuir arquivos de fonte.
- Monograma, favicon, assinatura SVG do rodapé e animações de entrada/saída.
- Contato WhatsApp e e-mail.
- Responsividade para celulares, tablets, desktop e ultrawide.

O ZIP não contém imagens fictícias nem arquivos de fontes licenciadas. As imagens sintéticas utilizadas na validação são temporárias e **não** fazem parte da publicação.
