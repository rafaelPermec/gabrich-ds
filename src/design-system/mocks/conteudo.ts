/**
 * Mocks de conteúdo com os textos do manual: listas dos cards (2 · 05.05b), módulos e aulas
 * (2 · 05.17, versão atual, EM APROVAÇÃO), antes e depois (2 · 05.16) e depoimentos (aba 04).
 * Só para stories e páginas de demonstração (R24): não é exportado pelo barrel do design system.
 */
import type { AntesEDepois, Curso, CursoOnline, Depoimento, ListaDoCard, ModulosDoCurso } from "../dados/index"

export const LISTAS_DO_CARD_MOCK: readonly ListaDoCard[] = [
  {
    curso: "adf",
    itens: [
      "e-book com 284 páginas",
      "06 capítulos, do briefing à hora da foto",
      "12 práticas para preencher na tela ou à mão",
      "05 briefings completos de marcas fictícias pra você praticar e aumentar o seu portfólio",
      "exercícios pra você criar o seu modelo de briefing e planejamento da sessão de fotos",
      "suporte para alunos na plataforma da Hotmart",
    ],
  },
  {
    curso: "lp",
    itens: [
      "27 aulas em vídeo, em 08 módulos",
      "aulas práticas de luz dura, luz suave, fotometria e esquemas de luz",
      "produções completas comigo: Natal, mesa montada e fotos com reflexo",
      "análises de esquemas de luz de trabalhos reais",
      "funciona com o equipamento que você tem: flash, luz contínua ou luz natural",
      "1 ano de acesso",
      "suporte para alunos na plataforma da Hotmart",
    ],
  },
  {
    curso: "mqc",
    itens: [
      "14 módulos, 67 conteúdos",
      "do briefing à foto final, com prática no estúdio",
      "exercícios pra você praticar durante todo o curso",
      "02 projetos completos pra você montar o seu portfólio",
      "pós-produção: como eu edito as minhas fotos",
      "bônus: fotografia como negócio, com processos e precificação",
      "1 ano de acesso",
      "suporte para alunos na plataforma da Hotmart",
    ],
  },
  {
    curso: "ne",
    itens: [
      "02 dias de workshop presencial",
      "17 horas de conteúdo",
      "acesso a todos os bônus",
      "certificado de participação",
      "grupo de alunos no WhatsApp",
    ],
  },
]

/** Monte seu combo (2 · 05.12, protótipo): descritivo de cada linha, em Manrope 12. */
export const DESCRITIVOS_COMBO_MOCK: Readonly<Record<CursoOnline, string>> = {
  adf: "o manual de direção criativa: tudo o que você decide antes do clique",
  lp: "27 aulas práticas e análises pra entender a luz de verdade",
  mqc: "fotografia de gastronomia, do briefing à foto final, com fotografia como negócio",
}

/** Monte seu combo (2 · 05.12, protótipo): o que cada curso marcado inclui, no resumo. */
export const INCLUSOS_COMBO_MOCK: Readonly<Record<CursoOnline, string>> = {
  adf: "antes da foto · e-book em PDF, 12 práticas",
  lp: "luz na prática · 27 aulas em vídeo",
  mqc: "mais que um click · 14 módulos, 67 conteúdos",
}

export const MODULOS_LP_MOCK: ModulosDoCurso = {
  curso: "lp",
  numeracao: "continua",
  modulos: [
    {
      numero: 1,
      nome: "luz é tudo!",
      aulas: [
        { numero: 1, titulo: "Equipamento é ferramenta", resumo: "Por que o curso não é sobre equipamento, e por que a luz decide a leitura, a textura e a mensagem da foto." },
        { numero: 2, titulo: "Perdendo o medo das sombras", resumo: "Sombra não é o que sobra depois de montar a luz. Como planejar sombras que trazem volume, textura e história." },
      ],
    },
    {
      numero: 2,
      nome: "como controlar a luz?",
      aulas: [
        { numero: 3, titulo: "Modificadores de luz", resumo: "Softbox, octabox, strip, sombrinha, snoot e luz direta testados na mesma cena, com a mesma potência e configuração." },
        { numero: 4, titulo: "Análise de efeitos dos modificadores", resumo: "As fotos lado a lado: como o tamanho e o formato da fonte mudam a sombra e os realces." },
        { numero: 5, titulo: "Acessórios de iluminação", resumo: "Rebatedor (branco, dourado e prata), bloqueador e difusor, inclusive versões improvisadas como isopor." },
        { numero: 6, titulo: "Análise dos efeitos dos acessórios", resumo: "O que cada acessório fez na foto e quando usar cada um." },
        { numero: 7, titulo: "O que muda a sua luz", resumo: "Distância, altura, direção e potência, uma de cada vez." },
        { numero: 8, titulo: "Análise de controle de luz", resumo: "Comparação das variações, e como usar distância e potência quando o equipamento não ajuda." },
      ],
    },
    {
      numero: 3,
      nome: "efeitos de luz dura e luz suave",
      aulas: [
        { numero: 9, titulo: "Construção de efeitos de luz", resumo: "Como criar luz dura e luz suave, e tudo que existe entre as duas, com uma ou mais fontes. Luz suave em cenário escuro e luz dura em cenário claro." },
        { numero: 10, titulo: "Análise de efeitos de luz", resumo: "As fotos comparadas: contraste, transição de sombra e a história que cada luz conta." },
      ],
    },
    {
      numero: 4,
      nome: "fotometria",
      aulas: [
        { numero: 11, titulo: "Como configurar sua câmera", resumo: "Lentes, velocidade, abertura e ISO decididos pelo efeito que você quer. Balanço de branco em Kelvin e como “bater o branco”." },
        { numero: 12, titulo: "Fotometrando na prática", resumo: "A mesma cena configurada para movimento, fundo desfocado ou tudo em foco, e o balanço de branco ajustado ao vivo." },
      ],
    },
    {
      numero: 5,
      nome: "esquemas de luz",
      aulas: [
        { numero: 13, titulo: "Pontos de luz", resumo: "Luz principal, preenchimento, fundo e destaque: o papel de cada uma." },
        { numero: 14, titulo: "Análise dos pontos de luz", resumo: "Cada luz isolada e depois somada, pra ver como a foto é construída." },
        { numero: 15, titulo: "Esquema de luz frontal", resumo: "Quando funciona, quando achata a imagem e como evitar isso." },
        { numero: 16, titulo: "Esquema de luz lateral", resumo: "O esquema mais usado em gastronomia, e como montá-lo com pouco equipamento." },
        { numero: 17, titulo: "Esquema de contraluz", resumo: "Recorte, silhueta e como trazer informação de volta para o produto." },
        { numero: 18, titulo: "Análise de esquemas de luz", resumo: "Os três esquemas comparados e o cuidado com as sombras em cada um." },
      ],
    },
    {
      numero: 6,
      nome: "luz natural",
      aulas: [
        { numero: 19, titulo: "Como controlar a luz natural", resumo: "Clima, estação, horário e localização, e por que na luz natural quem se move é o cenário." },
        { numero: 20, titulo: "Fotografando com luz natural na prática", resumo: "A mesma foto feita com flash e depois só com a janela, em versão dura, suave e contraluz." },
      ],
    },
    {
      numero: 7,
      nome: "fotografe comigo",
      aulas: [
        { numero: 21, titulo: "Iluminação para fotos de Natal", resumo: "Um Natal claro e um noturno, com o efeito do pisca-pisca e das velas." },
        { numero: 22, titulo: "Fotografia de mesa montada", resumo: "Como iluminar cenários maiores em top view, com uma versão suave e uma marcada." },
        { numero: 23, titulo: "Fotografando com reflexos", resumo: "Como trabalhar o reflexo em garrafas em vez de só tentar apagá-lo." },
      ],
    },
    {
      numero: 8,
      nome: "análises de trabalhos reais",
      aulas: [
        { numero: 24, titulo: "Fotografia de produtos", resumo: "A luz de um projeto real para uma marca de produtos de cabelo." },
        { numero: 25, titulo: "Fotografia conceitual de bebida", resumo: "O pôr do sol criado com luz de estúdio para um projeto da ESPM." },
        { numero: 26, titulo: "Luz criativa para chocolates", resumo: "Como ressaltar textura e criar sombras que interagem com o cenário." },
        { numero: 27, titulo: "Esquemas de luz em restaurantes", resumo: "Espaço limitado, luz ambiente e luz natural no fim de tarde: como montei a luz fora do estúdio." },
      ],
    },
  ],
}

export const MODULOS_MQC_MOCK: ModulosDoCurso = {
  curso: "mqc",
  numeracao: "por-modulo",
  modulos: [
    {
      numero: 1,
      nome: "Introdução",
      aulas: [
        { numero: 1, titulo: "Porque você está aqui!", resumo: "Quem eu sou, como cheguei na fotografia de gastronomia e como o curso foi pensado para você aprender praticando." },
        { numero: 2, titulo: "Quero fotografar gastronomia, por onde eu começo?", resumo: "Os tipos de cliente, produto e veiculação que existem nesse mercado, e por que cada foto precisa de um projeto." },
      ],
    },
    {
      numero: 2,
      nome: "Primeiros passos!",
      aulas: [
        { numero: 1, titulo: "Porque o briefing é tão importante?", resumo: "O documento que guia todas as decisões estéticas da foto, e como ele muda a história que você conta." },
        { numero: 2, titulo: "O briefing completo", resumo: "As informações que você precisa ter do cliente, do produto e do consumidor antes de começar a criar." },
        { numero: 3, titulo: "Porque fazer um pré-briefing?", resumo: "O que perguntar quando o cliente só pede \"um orçamento\", para conseguir precificar com segurança." },
        { numero: 4, titulo: "E agora? Como criar um briefing?", resumo: "Como o briefing chega até você, por agência ou direto do cliente, e como construir esse documento junto com ele." },
        { numero: 5, titulo: "Exercício | Criando um briefing do zero!", resumo: "Monte o seu primeiro briefing completo, do primeiro contato com o cliente ao documento final." },
        { numero: 6, titulo: "Exercício | Dois briefings, um produto!", resumo: "O mesmo produto com dois briefings diferentes, para você ver como cada um muda a foto." },
      ],
    },
    {
      numero: 3,
      nome: "Como funciona o mercado?",
      aulas: [
        { numero: 1, titulo: "Como fotografar para cardápios?", resumo: "O que uma foto de cardápio precisa comunicar, e por que nela a informação vem antes do cenário." },
        { numero: 2, titulo: "Fotografando para aplicativos", resumo: "Como criar fotos para delivery que passam a informação rápido e fazem a pessoa querer pedir." },
        { numero: 3, titulo: "A liberdade criativa das redes sociais!", resumo: "O tipo de foto que mais permite criar, e como ela ajuda a marca a fazer parte da vida do consumidor." },
        { numero: 4, titulo: "O fundo infinito", resumo: "Fotos de produto para embalagem, e-commerce, catálogo e ponto de venda, e como valorizar o produto sem cenário." },
        { numero: 5, titulo: "Além do prato: fotografia de gastronomia na publicidade", resumo: "Como funciona uma produção publicitária, do briefing completo à equipe e à pós-produção." },
        { numero: 6, titulo: "Material extra | Produção de fotos para o McDonald's", resumo: "Os bastidores de uma produção real para uma grande marca." },
        { numero: 7, titulo: "Exercício | Fotos diferentes para veiculações diferentes!", resumo: "Um briefing fictício fotografado comigo, com cada decisão de fundo, cena e luz explicada." },
        { numero: 8, titulo: "Exercício | Novo normal", resumo: "Um exercício para criar fotos pensadas para um novo contexto de consumo." },
      ],
    },
    {
      numero: 4,
      nome: "Hora de criar: contando uma história!",
      aulas: [
        { numero: 1, titulo: "Bagagem criativa: pesquisa e referências para transmitir sensações", resumo: "Como montar repertório e buscar referências que traduzem a sensação que a foto precisa passar." },
        { numero: 2, titulo: "Como contar uma história?", resumo: "O que significa contar uma história com uma foto de comida, e como cada decisão estética conta uma parte dela." },
        { numero: 3, titulo: "Organizando as ideias em um planejamento criativo", resumo: "Como passar as ideias para um planejamento que o cliente entende e aprova antes da sessão." },
        { numero: 4, titulo: "Exercício | Como contar uma história?", resumo: "Crie a narrativa de uma foto a partir de um briefing." },
        { numero: 5, titulo: "Exercício | Bagagem criativa", resumo: "Monte a sua pesquisa de referências para um projeto." },
        { numero: 6, titulo: "Exercício | História pessoal", resumo: "Uma foto que conta uma história sua, para treinar a narrativa com um tema que você conhece bem." },
      ],
    },
    {
      numero: 5,
      nome: "Escolhendo uma paleta de cores que traz sensações!",
      aulas: [
        { numero: 1, titulo: "A temperatura das cores", resumo: "Cores quentes e frias, e o que cada temperatura muda na sensação da foto." },
        { numero: 2, titulo: "O sentimento de cada cor", resumo: "O significado das cores na gastronomia, e como o contexto e as combinações mudam o que cada cor comunica." },
        { numero: 3, titulo: "Combinações cromáticas", resumo: "O círculo cromático na prática: as combinações harmônicas e como escolher a paleta do projeto." },
        { numero: 4, titulo: "Exercício | Paleta de cores", resumo: "Defina a paleta de cores de um projeto a partir do produto e da história que ele precisa contar." },
      ],
    },
    {
      numero: 6,
      nome: "Como montar uma cena interessante?",
      aulas: [
        { numero: 1, titulo: "O que é composição?", resumo: "Como a organização visual da foto direciona a leitura de quem vê e ajuda a contar a história." },
        { numero: 2, titulo: "Posicionamentos", resumo: "Onde posicionar o elemento principal da cena, e o que cada posicionamento comunica." },
        { numero: 3, titulo: "Profundidade de campo", resumo: "Como usar o foco e o desfoque para direcionar o olhar sem perder a informação importante." },
        { numero: 4, titulo: "Perspectiva", resumo: "Como a perspectiva mostra tamanho, porção e contexto do alimento." },
        { numero: 5, titulo: "Ângulos e enquadramentos", resumo: "Os ângulos queridinhos da fotografia de gastronomia, e como escolher o que mais valoriza cada produto." },
        { numero: 6, titulo: "Exercício | Testando composições de cena", resumo: "Monte a mesma cena com composições diferentes e compare o que muda em cada uma." },
      ],
    },
    {
      numero: 7,
      nome: "Aplicando técnicas",
      aulas: [
        { numero: 1, titulo: "Prática | Cores e composição", resumo: "Eu monto cenários com picolés, testando paletas e composições diferentes na prática." },
      ],
    },
    {
      numero: 8,
      nome: "Produção é tudo!",
      aulas: [
        { numero: 1, titulo: "O que é a pré-produção?", resumo: "Tudo o que precisa estar decidido e pronto antes da sessão, para chegar ao set com a foto já criada." },
        { numero: 2, titulo: "Como utilizar objetos de produção?", resumo: "Como escolher objetos de cena e ingredientes que fazem sentido para a história, e não só deixam a foto bonita." },
        { numero: 3, titulo: "Prática | Montando cenários diferentes", resumo: "Três produções diferentes com o mesmo cupcake, cada uma contando uma história." },
      ],
    },
    {
      numero: 9,
      nome: "Luz, câmera...",
      aulas: [
        { numero: 1, titulo: "A luz também conta uma história", resumo: "Por que a luz é a ferramenta mais poderosa da fotografia, e por que você não precisa ter medo das sombras." },
        { numero: 2, titulo: "Prática | Luz natural", resumo: "Como fotografar com luz natural, posicionando o set em relação à janela." },
        { numero: 3, titulo: "Prática | Controlando a luz natural", resumo: "Difusores e rebatedores para suavizar e controlar a luz natural." },
        { numero: 4, titulo: "Prática | Luz artificial", resumo: "Como trabalho com flash, e o controle de intensidade e direção que ele dá." },
        { numero: 5, titulo: "Prática | Como direcionar a luz", resumo: "Os efeitos de luz que mudam conforme a posição e o direcionamento da fonte de luz." },
        { numero: 6, titulo: "Prática | Luz dura x luz suave", resumo: "Como construir cada uma, e quando usar cada uma de acordo com a história." },
        { numero: 7, titulo: "Prática | Esquemas de luz para fotografia de gastronomia", resumo: "Os esquemas de luz que eu mais uso, para trazer volume e textura para o alimento." },
      ],
    },
    {
      numero: 10,
      nome: "Ação!",
      aulas: [
        { numero: 1, titulo: "Prática | Briefing 01", resumo: "Uma sessão de fotos completa comigo, a partir de um briefing, do cenário ao clique final." },
        { numero: 2, titulo: "Prática | Briefing 02", resumo: "Uma segunda sessão completa, com um briefing diferente e novas decisões de cena e luz." },
      ],
    },
    {
      numero: 11,
      nome: "Edite comigo!",
      aulas: [
        { numero: 1, titulo: "Edite comigo!", resumo: "Por que a pós-produção é estratégica e não corretiva, e por que fotografar em RAW." },
        { numero: 2, titulo: "Organizando o fluxo de trabalho", resumo: "Como organizo as pastas do cliente e o catálogo do Lightroom, da seleção à entrega." },
        { numero: 3, titulo: "Edite comigo no Lightroom | Briefing 01", resumo: "O tratamento de cor e luz das fotos do briefing 01, inclusive a edição em lote." },
        { numero: 4, titulo: "Edite comigo no Lightroom! | Briefing 02", resumo: "O tratamento de cor e luz das fotos do briefing 02." },
        { numero: 5, titulo: "Edite comigo no Photoshop!", resumo: "Os ajustes finos que faço no Photoshop para finalizar a foto." },
        { numero: 6, titulo: "Exportando as fotos!", resumo: "Como exportar e nomear os arquivos para cada uso e entregar organizado." },
      ],
    },
    {
      numero: 12,
      nome: "Criando o seu projeto",
      aulas: [
        { numero: 1, titulo: "Tem cliente pra você! | Projeto 01", resumo: "O briefing de um restaurante italiano e o planejamento que eu criei para ele, com cada decisão explicada.", grupo: "PROJETO 01" },
        { numero: 2, titulo: "Quem é o cliente? | Projeto 01", resumo: "Agora é a sua vez: entender o cliente e definir a história que as fotos vão contar.", grupo: "PROJETO 01" },
        { numero: 3, titulo: "Pré-produção | Projeto 01", resumo: "Separe objetos, fundos e ingredientes, e organize tudo antes da sessão.", grupo: "PROJETO 01" },
        { numero: 4, titulo: "Bora fotografar? | Projeto 01", resumo: "Monte a cena, a luz e faça as fotos do seu projeto.", grupo: "PROJETO 01" },
        { numero: 5, titulo: "Editando suas fotos! | Projeto 01", resumo: "Edite e finalize as fotos para entregar ao cliente.", grupo: "PROJETO 01" },
        { numero: 6, titulo: "Briefing | Projeto 02", resumo: "Um novo briefing, para você desenvolver um segundo projeto do início ao fim.", grupo: "PROJETO 02" },
        { numero: 7, titulo: "Pré-produção | Projeto 02", resumo: "O planejamento e a organização da cena do segundo projeto.", grupo: "PROJETO 02" },
        { numero: 8, titulo: "Sessão de fotos! | Projeto 02", resumo: "A sessão de fotos do segundo projeto.", grupo: "PROJETO 02" },
        { numero: 9, titulo: "Edite suas fotos! | Projeto 02", resumo: "O tratamento das fotos do segundo projeto, do equilíbrio de cor à finalização.", grupo: "PROJETO 02" },
      ],
    },
    {
      numero: 13,
      nome: "\"EU\"presa: a fotografia como negócio",
      aulas: [
        { numero: 1, titulo: "Eu sou uma empresa?", resumo: "Como começar a enxergar a sua fotografia como um negócio." },
        { numero: 2, titulo: "Entendendo meus processos", resumo: "Um olhar para dentro: quem você é como empresa e quais são os seus objetivos, sem copiar o mercado." },
        { numero: 3, titulo: "O fluxo de trabalho", resumo: "Atendimento, proposta, contrato e entrega: as etapas que fazem o cliente querer voltar." },
        { numero: 4, titulo: "Preço x valor", resumo: "A diferença entre o que você cobra e o que você entrega, e as formas de precificar cada projeto." },
        { numero: 5, titulo: "Fazendo as contas!", resumo: "Custos, separação entre pessoa física e empresa, e a conta para não pagar para trabalhar." },
        { numero: 6, titulo: "Exercício | \"Eu\"presa", resumo: "Organize os seus processos e faça as contas do seu próprio negócio." },
      ],
    },
    {
      numero: 14,
      nome: "Débora Gabrich indica!",
      etiqueta: "MATERIAL EXTRA",
      aulas: [
        { numero: 1, titulo: "Material extra | Boas dicas para você usar no seu dia a dia!", resumo: "Indicações que eu uso no meu trabalho e recomendo para o seu dia a dia." },
      ],
    },
  ],
}

export const ANTES_E_DEPOIS_MOCK: readonly AntesEDepois[] = [
  {
    nome: "Cristielen Souza",
    legenda: "Aluna Mais que um Click e Luz na Prática",
    fotoAntes: "assets/antes-depois/aluno-01-cristielen-antes.jpg",
    fotoDepois: "assets/antes-depois/aluno-01-cristielen-depois.jpg",
  },
  {
    nome: "Laura Dicker",
    legenda: "Aluna Mais que um Click, Luz na Prática, Aulas virtuais",
    fotoAntes: "assets/antes-depois/aluno-02-laura-antes.jpg",
    fotoDepois: "assets/antes-depois/aluno-02-laura-depois.jpg",
  },
  {
    nome: "Bruna Doti",
    legenda: "Aluna Mais que um Click, Luz na Prática, No Estúdio e Antes da Foto",
    fotoAntes: "assets/antes-depois/aluno-03-bruna-antes.jpg",
    fotoDepois: "assets/antes-depois/aluno-03-bruna-depois.jpg",
  },
  {
    nome: "Estúdio Buzz",
    legenda: "Aluna Mais que um Click e Luz na Prática",
    fotoAntes: "assets/antes-depois/aluno-04-estudiobuzz-antes.jpg",
    fotoDepois: "assets/antes-depois/aluno-04-estudiobuzz-depois.jpg",
  },
]
const video = (curso: Depoimento["curso"], youtubeId: string, legenda?: string): Depoimento => ({
  curso,
  midia: legenda ? { tipo: "video", youtubeId, legenda } : { tipo: "video", youtubeId },
})
const print = (curso: Depoimento["curso"], arquivo: string, nome?: string): Depoimento => ({
  curso,
  ...(nome ? { nome } : {}),
  midia: { tipo: "print", arquivo: `assets/depoimentos/${arquivo}` },
})

/**
 * Depoimentos das páginas dos cursos (aba 04): vídeos do YouTube e prints como enviados. O nome
 * vem do arquivo, quando ele traz; nos outros prints, o nome está na imagem.
 */
export const DEPOIMENTOS_MOCK: readonly Depoimento[] = [
  video("mqc", "IqUJ7S26M_M", "aluna do Mais que um Click"),
  video("lp", "YNqsShoqs0o", "aluna do Luz na Prática"),
  video("ne", "QJ34iLO5fY4", "alunos do No Estúdio"),
  video("mqc", "wUWE5UuGETk"),
  video("mqc", "molz3qQGXNI"),
  print("adf", "adf-dep-01-ana-clara.png", "Ana Clara"),
  print("adf", "adf-dep-02-bruna-correa.png", "Bruna Correa"),
  print("adf", "adf-dep-03-jorge.png", "Jorge"),
  print("lp", "lnp-dep-01-aluna.png"),
  print("lp", "lnp-dep-02-aluna.png"),
  print("lp", "lnp-dep-03-aluna.jpg"),
  print("lp", "lnp-dep-04-lorenzo.jpg", "Lorenzo"),
  print("lp", "lnp-dep-05-nathalia.jpg", "Nathália"),
  print("lp", "lnp-dep-06-aluna.jpg"),
  print("mqc", "mqc-dep-01-aluna.png"),
  print("mqc", "mqc-dep-02-aluna.png"),
  print("mqc", "mqc-dep-03-aluna.png"),
  print("mqc", "mqc-dep-04-cristielen.jpg", "Cristielen"),
  print("mqc", "mqc-dep-05-aluna.jpg"),
  print("mqc", "mqc-dep-06-isasilveirap.jpg", "isasilveirap"),
  print("ne", "noestudio-dep-01-ana-clara.png", "Ana Clara"),
  print("ne", "noestudio-dep-02-bruna-correa.png", "Bruna Correa"),
  print("ne", "noestudio-dep-03-jorge.png", "Jorge"),
  print("ne", "noestudio-dep-04-leticia.png", "Letícia"),
  print("ne", "noestudio-dep-05-joao-augusto.png", "João Augusto"),
  print("ne", "noestudio-dep-06-aluna-2019.jpg"),
  print("ne", "noestudio-dep-07-aluna.jpg"),
]

/** Itens da lista oficial do card de preço do curso, do mock. */
export function listaDoCardMock(curso: Curso): readonly string[] {
  const achada = LISTAS_DO_CARD_MOCK.find((l) => l.curso === curso)
  if (!achada) throw new Error(`mock sem a lista do curso ${curso}`)
  return achada.itens
}
