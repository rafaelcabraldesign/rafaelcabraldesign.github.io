/*
 * CONTEUDO DO PORTFOLIO — RAFAEL CABRAL
 *
 * Edite apenas os campos entre aspas para atualizar o site.
 * Campos vazios nao aparecem publicamente. Nunca publique dados sigilosos.
 * Campos extras por projeto: frase, servicos, segmento (ou industria) e texto.
 * Destaques: os slugs em destaquesFixos aparecem primeiro; os demais
 * sao priorizados quando sua descricao (texto ou resumo) estiver preenchida.
 *
 * IMAGENS AUTOMATICAS (sem editar este arquivo):
 * - Capa do projeto: assets/img/projetos/<slug>.webp
 * - Imagens do case: assets/img/projetos/<slug>-01.webp, -02.webp, ...
 * - Sobre: assets/img/sobre.webp
 * - Servicos: assets/img/servicos.webp
 *
 * Os numeros podem ter lacunas: o GitHub Actions gera o indice em ordem numerica.
 * Se nao existir uma imagem, o placeholder continua aparecendo.
 * Os campos imagem e galeria abaixo sao opcionais e funcionam como
 * substituicoes manuais APENAS se voce quiser mudar esta convencao.

 */

window.PORTFOLIO_CONTEUDO = {
  contato: {
    email: "rafaelcdesign@outlook.com",
    // Numero com codigo do pais (55), sem espacos, parenteses ou hifen.
    whatsapp: "5534997167187",
    // Texto que aparece preenchido no WhatsApp. O visitante decide quando enviar.
    mensagemWhatsApp: "Olá, Rafael! Gostaria de conversar sobre um projeto.",
    // Opcional: links completos (https://...) de suas redes. Vazios nao aparecem.
    instagram: "",
    behance: "",
    linkedin: "https://www.linkedin.com/in/rafaelcabraldesign/"
  },
  destaquesFixos: ["crisfit", "down-five"],
  projetos: [
    { nome: "CRISFIT", slug: "crisfit", imagem: "", categoria: "", ano: "2024", frase: "CRISFIT é uma marca de moda fitness que combina energia, estilo e liberdade de movimento, valorizando a individualidade e a diversidade de cada corpo.", servicos: "NAMING, IDENTIDADE VISUAL", segmento: "MODA FITNESS / VESTUÁRIO ESPORTIVO", texto: `CRISFIT nasceu da união entre o nome da cliente Cristiane e o universo da moda fitness. O projeto partiu da proposta de construir uma marca de personalidade forte, capaz de unir energia, estilo e diversidade em uma identidade visual contemporânea e reconhecível.

O desenvolvimento começou pela criação de um nome simples, sonoro e de fácil assimilação. A partir dele, foi desenhada uma assinatura tipográfica personalizada, com formas geométricas marcantes e uma construção visual que equilibra impacto, simplicidade e versatilidade.

A paleta combina o coral vibrante, que representa energia, o azul-escuro, responsável pelo contraste, e o cinza-azulado, que acrescenta leveza. Esses elementos se conectam a um sistema de grafismos modulares, formado por curvas, recortes e composições geométricas que exploram diferentes formas e movimentos.

A linguagem visual também incorpora a diversidade como parte essencial da expressão da marca. Fotografias, mensagens e composições gráficas reforçam a ideia de que cada pessoa possui seu próprio ritmo, sua própria identidade e sua maneira de se movimentar.

O resultado é um sistema visual expressivo e adaptável, explorado em aplicações para vestuário, etiquetas, embalagens, acessórios e experiências digitais, demonstrando a capacidade da identidade de manter sua personalidade em diferentes pontos de contato.`, resumo: "", contexto: "", solucao: "", galeria: [] },
    { nome: "Neto Motors", slug: "neto-motors", imagem: "", categoria: "", ano: "", resumo: "", contexto: "", solucao: "", galeria: [] },
    { nome: "Juliana Vitorino", slug: "juliana-vitorino", imagem: "", categoria: "", ano: "", resumo: "", contexto: "", solucao: "", galeria: [] },
    { nome: "Salto Energia", slug: "salto-energia", imagem: "", categoria: "", ano: "", resumo: "", contexto: "", solucao: "", galeria: [] },
    { nome: "Uber Brindes", slug: "uber-brindes", imagem: "", categoria: "", ano: "", resumo: "", contexto: "", solucao: "", galeria: [] },
    { nome: "Mariana Morais", slug: "mariana-morais", imagem: "", categoria: "", ano: "", resumo: "", contexto: "", solucao: "", galeria: [] },
    { nome: "Iná Game Studio", slug: "ina-game-studio", imagem: "", categoria: "", ano: "", resumo: "", contexto: "", solucao: "", galeria: [] },
    { nome: "Poiôô Kids", slug: "poioo-kids", imagem: "", categoria: "", ano: "", resumo: "", contexto: "", solucao: "", galeria: [] },
    { nome: "Artes do meu Brasil", slug: "artes-do-meu-brasil", imagem: "", categoria: "", ano: "", resumo: "", contexto: "", solucao: "", galeria: [] },
    { nome: "Funil Exponencial", slug: "funil-exponencial", imagem: "", categoria: "", ano: "", resumo: "", contexto: "", solucao: "", galeria: [] },
    { nome: "Ita Corretora de Seguros", slug: "ita-corretora-de-seguros", imagem: "", categoria: "", ano: "", resumo: "", contexto: "", solucao: "", galeria: [] },
    { nome: "Eagle Investment", slug: "eagle-investment", imagem: "", categoria: "", ano: "", resumo: "", contexto: "", solucao: "", galeria: [] },
    { nome: "Agrofixa", slug: "agrofixa", imagem: "", categoria: "", ano: "", resumo: "", contexto: "", solucao: "", galeria: [] },
    { nome: "Down Five", slug: "down-five", imagem: "", categoria: "", ano: "2023", frase: "Down Five é uma equipe de e-sports que combina a intensidade da competição com irreverência e uma identidade visual inspirada na cultura gamer e no streetwear.", servicos: "Identidade Visual, Design de Mascote", industria: "E-sports", texto: `O projeto da Down Five teve como objetivo desenvolver uma identidade visual que traduzisse a intensidade do universo competitivo dos e-sports, combinando personalidade, irreverência e presença visual. A proposta buscou estabelecer uma linguagem capaz de representar a equipe dentro e fora do ambiente gamer.

O logotipo foi desenvolvido a partir da integração das iniciais DW e do número 5 em uma composição geométrica que remete a um escudo. Seus traços angulares, proporções verticais e estrutura compacta conferem força à assinatura, favorecendo seu reconhecimento em diferentes escalas e aplicações.

A paleta cromática combina rosa vibrante, preto, branco e tons de prata, estabelecendo uma identidade de alto contraste que rompe com as convenções visuais do segmento. Grafismos inspirados em chamas contrapõem a rigidez geométrica do logotipo, acrescentando energia, movimento e dinamismo à composição.

Para ampliar a personalidade da marca, foi criado Dudu, um shih-tzu de chupeta com expressão provocativa e estética inspirada na cultura gamer e streetwear. O contraste entre sua aparência carismática e sua atitude competitiva introduz humor e irreverência à identidade, tornando o personagem um elemento central na comunicação da equipe.

O sistema visual foi pensado para se desdobrar em uniformes, vestuário casual, acessórios, merchandising e comunicação digital. A combinação entre geometria, ilustração e expressividade estabelece um universo visual próprio, que conecta competitividade, entretenimento e cultura gamer.`, resumo: "", contexto: "", solucao: "", galeria: [] },
    { nome: "Lara Land", slug: "lara-land", imagem: "", categoria: "", ano: "", resumo: "", contexto: "", solucao: "", galeria: [] }
  ]
};
