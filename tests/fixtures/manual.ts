/**
 * Transcrição do Manual Final 2026 · VIGENTE v2, aba 02 Dev, 2 · 01 (tokens de cor).
 * Extraída por grep do manual offline (`../manual-vigente/`). É a fonte independente
 * dos testes: compare o CSS contra ela, nunca contra o espelho TS.
 */

/** Primitivos de cor de 2 · 01: nome do token (sem `--`) → HEX do manual. */
export const CORES_MANUAL: Readonly<Record<string, string>> = {
  "dg-preto-tinta": "#0B0B0B",
  "dg-cacau-profundo": "#2E2118",
  "dg-caramelo": "#8A5F3A",
  "dg-ocre": "#CCAA66",
  "dg-papel": "#F4F0E8",
  "dg-cacau-fosco": "#644D3D",
  "dg-areia": "#BFB09B",
  "dg-neutro": "#D3CABB",
  "dg-pedra": "#A89E8C",
  "dg-grafite": "#3F3A34",
  "dg-filete-escuro": "#4A423A",
  "dg-trama-papel": "#E6DECE",
  "dg-trama-preto": "#191712",
  "ne-tinta": "#202020",
  "ne-carvao": "#302F2D",
  "ne-madeira": "#876851",
  "ne-pedra": "#847C74",
  "ne-areia": "#A99583",
  "ne-linho": "#E9E1D8",
  "ne-creme": "#EEEAE3",
  "ne-terracota": "#D57D3D",
  "lp-carvao": "#1E1A17",
  "lp-penumbra": "#4A3F36",
  "lp-castanho": "#6B4F3A",
  "lp-areia": "#B7A793",
  "lp-creme": "#F4F0E8",
  "lp-dourado": "#D9A648",
  "mqc-carvao": "#201F1D",
  "mqc-grafite": "#3A3733",
  "mqc-pedra": "#8C857A",
  "mqc-cinza-claro": "#D9D5CC",
  "mqc-off-white": "#F6F3EC",
  "mqc-amarelo": "#F5C242",
  "mqc-ambar": "#C87F1E",
  "adf-preto": "#0B0B0B",
  "adf-cafe": "#2A1F18",
  "adf-couro": "#6F482C",
  "adf-whiskey-sour": "#D39858",
  "adf-areia": "#DDCBBA",
  "adf-cobre": "#A7865D",
  "adf-linha": "#3A2C22",
  "adf-trama": "#33261D",
  "bf-preto": "#0B0B0B",
  "bf-papel": "#F4F0E8",
  "bf-ocre": "#CCAA66",
  "bf-hover-ocre": "#B8964F",
  "bf-fio-cinza": "#6B6156",
  "bf-pedra": "#A89E8C",
  "bf-cacau-fosco": "#644D3D",
  "bf-trama-preto": "#191712",
  "bf-trama-papel": "#E6DECE",
}

export const TOKENS_COMPONENTE = [
  "fundo",
  "card",
  "fio-card",
  "texto",
  "texto-apoio",
  "acento",
  "botao",
  "botao-texto",
  "botao-hover",
  "desabilitado",
  "divisoria",
  "selo-garantia",
] as const

export type TokenComponente = (typeof TOKENS_COMPONENTE)[number]

export const TEMAS_MANUAL = {
  "dg": { "fundo": "#0b0b0b", "card": "#0b0b0b", "fio-card": "#6b6156", "texto": "#F4F0E8", "texto-apoio": "#a89e8c", "acento": "#CCAA66", "botao": "#CCAA66", "botao-texto": "#0b0b0b", "botao-hover": "#B8964F", "desabilitado": "#3F3A34", "divisoria": "#3F3A34", "selo-garantia": "#a89e8c" },
  "dg-claro": { "fundo": "#F4F0E8", "card": "#E6DECE", "fio-card": "#a89e8c", "texto": "#0b0b0b", "texto-apoio": "#644D3D", "acento": "#CCAA66", "botao": "#0b0b0b", "botao-texto": "#F4F0E8", "botao-hover": "#CCAA66", "desabilitado": "#D3CABB", "divisoria": "#D3CABB", "selo-garantia": "#a89e8c" },
  "lp": { "fundo": "#1E1A17", "card": "#4A3F36", "fio-card": "#6B4F3A", "texto": "#F4F0E8", "texto-apoio": "#B7A793", "acento": "#D9A648", "botao": "#D9A648", "botao-texto": "#1E1A17", "botao-hover": "#F4F0E8", "desabilitado": "#6B4F3A", "divisoria": "#6B4F3A", "selo-garantia": "#B7A793" },
  "lp-claro": { "fundo": "#F4F0E8", "card": "#F4F0E8", "fio-card": "#B7A793", "texto": "#1E1A17", "texto-apoio": "#6B4F3A", "acento": "#D9A648", "botao": "#1E1A17", "botao-texto": "#F4F0E8", "botao-hover": "#4A3F36", "desabilitado": "#B7A793", "divisoria": "#B7A793", "selo-garantia": "#B7A793" },
  "mqc": { "fundo": "#201F1D", "card": "#3A3733", "fio-card": "#8C857A", "texto": "#F6F3EC", "texto-apoio": "#D9D5CC", "acento": "#F5C242", "botao": "#F5C242", "botao-texto": "#201F1D", "botao-hover": "#F6F3EC", "desabilitado": "#8C857A", "divisoria": "#8C857A", "selo-garantia": "#D9D5CC" },
  "mqc-claro": { "fundo": "#F6F3EC", "card": "#F6F3EC", "fio-card": "#8C857A", "texto": "#201F1D", "texto-apoio": "#3A3733", "acento": "#F5C242", "botao": "#201F1D", "botao-texto": "#F6F3EC", "botao-hover": "#3A3733", "desabilitado": "#D9D5CC", "divisoria": "#D9D5CC", "selo-garantia": "#8C857A" },
  "adf": { "fundo": "#0b0b0b", "card": "#2A1F18", "fio-card": "#3A2C22", "texto": "#DDCBBA", "texto-apoio": "#A7865D", "acento": "#D39858", "botao": "#D39858", "botao-texto": "#0b0b0b", "botao-hover": "#DDCBBA", "desabilitado": "#3A2C22", "divisoria": "#3A2C22", "selo-garantia": "#A7865D" },
  "adf-claro": { "fundo": "#DDCBBA", "card": "#DDCBBA", "fio-card": "#6F482C", "texto": "#0b0b0b", "texto-apoio": "#6F482C", "acento": "#6F482C", "botao": "#6F482C", "botao-texto": "#DDCBBA", "botao-hover": "#2A1F18", "desabilitado": "#A7865D", "divisoria": "#A7865D", "selo-garantia": "#6F482C" },
  "ne": { "fundo": "#302F2D", "card": "#202020", "fio-card": "#847C74", "texto": "#EEEAE3", "texto-apoio": "#A99583", "acento": "#D57D3D", "botao": "#D57D3D", "botao-texto": "#202020", "botao-hover": "#EEEAE3", "desabilitado": "#847C74", "divisoria": "#847C74", "selo-garantia": "#A99583" },
  "ne-claro": { "fundo": "#EEEAE3", "card": "#E9E1D8", "fio-card": "#847C74", "texto": "#202020", "texto-apoio": "#876851", "acento": "#D57D3D", "botao": "#202020", "botao-texto": "#EEEAE3", "botao-hover": "#302F2D", "desabilitado": "#A99583", "divisoria": "#A99583", "selo-garantia": "#847C74" },
} as const satisfies Record<string, Record<TokenComponente, string>>

export type TemaManual = keyof typeof TEMAS_MANUAL

export const TEMAS_SUBMARCA = ["lp", "lp-claro", "mqc", "mqc-claro", "adf", "adf-claro", "ne", "ne-claro"] as const

export const ESTADOS = ["erro", "aviso", "sucesso"] as const

/**
 * 2 · 02 (tokens de tipografia), por marca e nível. Tamanho em px: número fixo ou faixa
 * [mín (375px de tela), máx (1240px)]. Tracking em em, ou "normal". Caixa: "alta" → uppercase;
 * "baixa" → none; "baixa, sempre" → lowercase. Exceção do PRD (decisão de 2026-10-23): o
 * subtítulo da marca mãe é Tenor Sans 400 (o manual traz Black Mango; ela fica só no No Estúdio).
 */
export type NivelTipografico = {
  familia: string
  peso: number
  tamanho: number | readonly [number, number]
  entrelinha: number
  tracking: number | "normal"
  caixa: "uppercase" | "lowercase" | "none"
}

const n = (
  familia: string,
  peso: number,
  tamanho: NivelTipografico["tamanho"],
  entrelinha: number,
  tracking: NivelTipografico["tracking"],
  caixa: NivelTipografico["caixa"] = "none",
): NivelTipografico => ({ familia, peso, tamanho, entrelinha, tracking, caixa })

export const TIPOGRAFIA_MANUAL = {
  dg: {
    titulo: n("Urbanist", 900, [32, 72], 0.95, -0.03, "uppercase"),
    "titulo-apoio": n("Urbanist", 300, [32, 72], 0.95, 0, "uppercase"),
    subtitulo: n("Tenor Sans", 400, [24, 40], 1.35, 0),
    corpo: n("Manrope", 400, [15, 17], 1.65, 0),
    intertitulo: n("Manrope", 600, [15, 17], 1.35, 0, "uppercase"),
    rotulo: n("Space Mono", 400, [10, 11], 1.5, 0.2, "uppercase"),
    botao: n("Manrope", 600, [12, 14], 1, 0.16, "uppercase"),
    manuscrita: n("Nothing You Could Do", 400, [28, 54], 1.35, 0, "lowercase"),
  },
  ne: {
    h1: n("Tenor Sans", 400, 64, 0.95, 0),
    h2: n("Black Mango", 400, 38, 1.15, 0),
    h3: n("Black Mango", 400, 24, 1.3, 0),
    apoio: n("Tenor Sans", 400, [16, 24], 1.5, "normal"),
    corpo: n("Manrope", 400, 16, 1.65, 0),
    legenda: n("Space Mono", 400, 11, 1.5, 0.14, "uppercase"),
  },
  lp: {
    h1: n("Montserrat", 200, 60, 1, 0),
    h2: n("Montserrat", 300, 34, 1.2, 0),
    h3: n("Montserrat", 600, 22, 1.35, 0),
    corpo: n("Manrope", 400, 16, 1.7, 0),
    legenda: n("Space Mono", 400, 11, 1.5, 0.14, "uppercase"),
    preco: n("Montserrat", 700, [36, 48], 0.9, -0.02),
  },
  mqc: {
    h1: n("Montserrat", 700, 56, 1.05, 0),
    h2: n("Montserrat", 300, 32, 1.2, 0),
    h3: n("Montserrat", 600, 21, 1.35, 0),
    corpo: n("Manrope", 400, 16, 1.7, 0),
    preco: n("Montserrat", 700, 48, 1, -0.02),
  },
  adf: {
    h1: n("Parkinsans", 700, 64, 0.95, -0.035, "lowercase"),
    h2: n("Parkinsans", 700, 36, 1.05, -0.035),
    h3: n("Parkinsans", 700, 22, 1.2, -0.035),
    corpo: n("Manrope", 400, 16, 1.65, 0),
    rotulo: n("Space Mono", 400, 10, 1.5, 0.2, "uppercase"),
    anotacao: n("Nothing You Could Do", 400, 28, 1.35, 0),
  },
  bf: {
    numero: n("Urbanist", 600, 150, 0.85, -0.02),
    parcela: n("Urbanist", 600, [36, 64], 0.9, -0.02),
    "de-por": n("Manrope", 400, [12, 13], 1.4, 0),
    "a-vista": n("Space Mono", 700, [9, 10], 1.4, 0.04),
    contador: n("Urbanist", 900, [11, 16], 1, 0.04, "uppercase"),
    etiqueta: n("Space Mono", 400, [8.5, 9], 1.3, 0.08, "uppercase"),
    botao: n("Manrope", 600, [13, 14], 1, 0.16, "uppercase"),
    corpo: n("Manrope", 400, [15, 16], 1.65, 0),
    lista: n("Manrope", 300, 11.5, 1.45, 0),
    "quiz-titulo": n("Urbanist", 900, 32, 1, 0),
    "quiz-pergunta": n("Urbanist", 700, 20, 1.25, 0),
  },
} as const satisfies Record<string, Record<string, NivelTipografico>>

export type MarcaTipografia = keyof typeof TIPOGRAFIA_MANUAL

/** 2 · 06: famílias e pesos carregados do Google Fonts (a Black Mango é arquivo próprio). */
export const FONTES_GOOGLE: Readonly<Record<string, readonly number[]>> = {
  Urbanist: [300, 600, 700, 900],
  "Tenor Sans": [400],
  Montserrat: [200, 300, 600, 700],
  Parkinsans: [700],
  Manrope: [300, 400, 600],
  "Space Mono": [400, 700],
  "Nothing You Could Do": [400],
}

/** 2 · 03: espaçamento, grid, dobra, raio e fio, como o manual declara (grep do manual offline). */
export const FORMA_MANUAL: Readonly<Record<string, string>> = {
  "esp-1": "4px",
  "esp-2": "8px",
  "esp-3": "12px",
  "esp-4": "16px",
  "esp-6": "24px",
  "esp-8": "32px",
  "esp-12": "48px",
  "esp-16": "64px",
  "esp-24": "96px",
  container: "1240px",
  colunas: "12",
  gutter: "24px",
  "dobra-desktop": "96px",
  "dobra-mobile": "64px",
  "raio-reto": "0",
  "raio-card": "16px",
  "raio-disco": "50%",
  fio: "1px",
}

/**
 * 2 · 05.05c (tabela de preços oficial), 2 · 05.12 (porcentagens fixas e tabela do combo) e
 * 2 · 07 (ids de checkout), como o manual declara (grep do manual offline). Valores em reais.
 */
export const OFERTAS_MANUAL = [
  { slug: "antes-da-foto", precoNormal: 197, parcelaNormal: 20.37, precoBlack: 97, parcelaBlack: 10.03, descontoBlack: 51, checkout: "#checkout-antes-da-foto", checkoutBlack: "#checkout-bf26-antes-da-foto" },
  { slug: "luz-na-pratica", precoNormal: 447, parcelaNormal: 46.23, precoBlack: 217, parcelaBlack: 22.44, descontoBlack: 51, checkout: "#checkout-luz-na-pratica", checkoutBlack: "#checkout-bf26-luz-na-pratica" },
  { slug: "mais-que-um-click", precoNormal: 997, parcelaNormal: 103.11, precoBlack: 497, parcelaBlack: 51.4, descontoBlack: 50, checkout: "#checkout-mais-que-um-click", checkoutBlack: "#checkout-bf26-mais-que-um-click" },
  { slug: "luz-antes-da-foto", precoNormal: 577, parcelaNormal: 59.68, precoBlack: 287, parcelaBlack: 29.68, descontoCombo: 10, descontoBlack: 55, checkout: "#checkout-luz-antes-da-foto", checkoutBlack: "#checkout-bf26-luz-antes-da-foto" },
  { slug: "click-antes-da-foto", precoNormal: 1077, parcelaNormal: 111.39, precoBlack: 537, parcelaBlack: 55.54, descontoCombo: 10, descontoBlack: 55, checkout: "#checkout-click-antes-da-foto", checkoutBlack: "#checkout-bf26-click-antes-da-foto" },
  { slug: "click-luz", precoNormal: 1297, parcelaNormal: 134.14, precoBlack: 647, parcelaBlack: 66.91, descontoCombo: 10, descontoBlack: 55, checkout: "#checkout-click-luz", checkoutBlack: "#checkout-bf26-click-luz" },
  { slug: "completo", precoNormal: 1397, parcelaNormal: 144.48, precoBlack: 697, parcelaBlack: 72.09, descontoCombo: 15, descontoBlack: 57, checkout: "#checkout-completo", checkoutBlack: "#checkout-bf26-completo" },
] as const

/** Protótipo `NE Pagina - Manual v2` (card de preço): workshop presencial, sem Black. Valores em reais. */
export const OFERTA_NO_ESTUDIO_MANUAL = { slug: "no-estudio", preco: 1547, parcela: 160, checkout: "#checkout-no-estudio" } as const

/** 2 · 05.12, tabela completa: preço separado e "você economiza" de cada oferta, fora e na Black. */
export const ECONOMIA_MANUAL: Readonly<Record<string, { separado: number; economiaNormal?: number; economiaBlack: number }>> = {
  "antes-da-foto": { separado: 197, economiaBlack: 100 },
  "luz-na-pratica": { separado: 447, economiaBlack: 230 },
  "mais-que-um-click": { separado: 997, economiaBlack: 500 },
  "luz-antes-da-foto": { separado: 644, economiaNormal: 67, economiaBlack: 357 },
  "click-antes-da-foto": { separado: 1194, economiaNormal: 117, economiaBlack: 657 },
  "click-luz": { separado: 1444, economiaNormal: 147, economiaBlack: 797 },
  completo: { separado: 1641, economiaNormal: 244, economiaBlack: 944 },
}

/** 2 · 05.05b, lista oficial de cada curso, na ordem do manual (sem a numeração "01 · "). */
export const LISTAS_MANUAL: Readonly<Record<"adf" | "lp" | "mqc" | "ne", readonly string[]>> = {
  adf: [
    "e-book com 284 páginas",
    "06 capítulos, do briefing à hora da foto",
    "12 práticas para preencher na tela ou à mão",
    "05 briefings completos de marcas fictícias pra você praticar e aumentar o seu portfólio",
    "exercícios pra você criar o seu modelo de briefing e planejamento da sessão de fotos",
    "suporte para alunos na plataforma da Hotmart",
  ],
  lp: [
    "27 aulas em vídeo, em 08 módulos",
    "aulas práticas de luz dura, luz suave, fotometria e esquemas de luz",
    "produções completas comigo: Natal, mesa montada e fotos com reflexo",
    "análises de esquemas de luz de trabalhos reais",
    "funciona com o equipamento que você tem: flash, luz contínua ou luz natural",
    "1 ano de acesso",
    "suporte para alunos na plataforma da Hotmart",
  ],
  mqc: [
    "14 módulos, 67 conteúdos",
    "do briefing à foto final, com prática no estúdio",
    "exercícios pra você praticar durante todo o curso",
    "02 projetos completos pra você montar o seu portfólio",
    "pós-produção: como eu edito as minhas fotos",
    "bônus: fotografia como negócio, com processos e precificação",
    "1 ano de acesso",
    "suporte para alunos na plataforma da Hotmart",
  ],
  ne: [
    "02 dias de workshop presencial",
    "17 horas de conteúdo",
    "acesso a todos os bônus",
    "certificado de participação",
    "grupo de alunos no WhatsApp",
  ],
}

/**
 * 2 · 05.17, textos completos (versão atual, EM APROVAÇÃO): módulo, quantidade declarada no
 * cabeçalho e títulos das aulas na ordem. Grupos: "PROJETO 01"/"PROJETO 02" do módulo 12 do MqC.
 */
export type ModuloManual = { numero: number; nome: string; quantidade: number; etiqueta?: string; aulas: readonly string[]; grupos?: Readonly<Record<string, readonly number[]>> }

export const MODULOS_MANUAL: Readonly<Record<"lp" | "mqc", readonly ModuloManual[]>> = {
  lp: [
    { numero: 1, nome: "luz é tudo!", quantidade: 2, aulas: [
      "Equipamento é ferramenta",
      "Perdendo o medo das sombras",
    ] },
    { numero: 2, nome: "como controlar a luz?", quantidade: 6, aulas: [
      "Modificadores de luz",
      "Análise de efeitos dos modificadores",
      "Acessórios de iluminação",
      "Análise dos efeitos dos acessórios",
      "O que muda a sua luz",
      "Análise de controle de luz",
    ] },
    { numero: 3, nome: "efeitos de luz dura e luz suave", quantidade: 2, aulas: [
      "Construção de efeitos de luz",
      "Análise de efeitos de luz",
    ] },
    { numero: 4, nome: "fotometria", quantidade: 2, aulas: [
      "Como configurar sua câmera",
      "Fotometrando na prática",
    ] },
    { numero: 5, nome: "esquemas de luz", quantidade: 6, aulas: [
      "Pontos de luz",
      "Análise dos pontos de luz",
      "Esquema de luz frontal",
      "Esquema de luz lateral",
      "Esquema de contraluz",
      "Análise de esquemas de luz",
    ] },
    { numero: 6, nome: "luz natural", quantidade: 2, aulas: [
      "Como controlar a luz natural",
      "Fotografando com luz natural na prática",
    ] },
    { numero: 7, nome: "fotografe comigo", quantidade: 3, aulas: [
      "Iluminação para fotos de Natal",
      "Fotografia de mesa montada",
      "Fotografando com reflexos",
    ] },
    { numero: 8, nome: "análises de trabalhos reais", quantidade: 4, aulas: [
      "Fotografia de produtos",
      "Fotografia conceitual de bebida",
      "Luz criativa para chocolates",
      "Esquemas de luz em restaurantes",
    ] },
  ],
  mqc: [
    { numero: 1, nome: "Introdução", quantidade: 2, aulas: [
      "Porque você está aqui!",
      "Quero fotografar gastronomia, por onde eu começo?",
    ] },
    { numero: 2, nome: "Primeiros passos!", quantidade: 6, aulas: [
      "Porque o briefing é tão importante?",
      "O briefing completo",
      "Porque fazer um pré-briefing?",
      "E agora? Como criar um briefing?",
      "Exercício | Criando um briefing do zero!",
      "Exercício | Dois briefings, um produto!",
    ] },
    { numero: 3, nome: "Como funciona o mercado?", quantidade: 8, aulas: [
      "Como fotografar para cardápios?",
      "Fotografando para aplicativos",
      "A liberdade criativa das redes sociais!",
      "O fundo infinito",
      "Além do prato: fotografia de gastronomia na publicidade",
      "Material extra | Produção de fotos para o McDonald's",
      "Exercício | Fotos diferentes para veiculações diferentes!",
      "Exercício | Novo normal",
    ] },
    { numero: 4, nome: "Hora de criar: contando uma história!", quantidade: 6, aulas: [
      "Bagagem criativa: pesquisa e referências para transmitir sensações",
      "Como contar uma história?",
      "Organizando as ideias em um planejamento criativo",
      "Exercício | Como contar uma história?",
      "Exercício | Bagagem criativa",
      "Exercício | História pessoal",
    ] },
    { numero: 5, nome: "Escolhendo uma paleta de cores que traz sensações!", quantidade: 4, aulas: [
      "A temperatura das cores",
      "O sentimento de cada cor",
      "Combinações cromáticas",
      "Exercício | Paleta de cores",
    ] },
    { numero: 6, nome: "Como montar uma cena interessante?", quantidade: 6, aulas: [
      "O que é composição?",
      "Posicionamentos",
      "Profundidade de campo",
      "Perspectiva",
      "Ângulos e enquadramentos",
      "Exercício | Testando composições de cena",
    ] },
    { numero: 7, nome: "Aplicando técnicas", quantidade: 1, aulas: [
      "Prática | Cores e composição",
    ] },
    { numero: 8, nome: "Produção é tudo!", quantidade: 3, aulas: [
      "O que é a pré-produção?",
      "Como utilizar objetos de produção?",
      "Prática | Montando cenários diferentes",
    ] },
    { numero: 9, nome: "Luz, câmera...", quantidade: 7, aulas: [
      "A luz também conta uma história",
      "Prática | Luz natural",
      "Prática | Controlando a luz natural",
      "Prática | Luz artificial",
      "Prática | Como direcionar a luz",
      "Prática | Luz dura x luz suave",
      "Prática | Esquemas de luz para fotografia de gastronomia",
    ] },
    { numero: 10, nome: "Ação!", quantidade: 2, aulas: [
      "Prática | Briefing 01",
      "Prática | Briefing 02",
    ] },
    { numero: 11, nome: "Edite comigo!", quantidade: 6, aulas: [
      "Edite comigo!",
      "Organizando o fluxo de trabalho",
      "Edite comigo no Lightroom | Briefing 01",
      "Edite comigo no Lightroom! | Briefing 02",
      "Edite comigo no Photoshop!",
      "Exportando as fotos!",
    ] },
    { numero: 12, nome: "Criando o seu projeto", quantidade: 9, grupos: { "PROJETO 01": [1, 2, 3, 4, 5], "PROJETO 02": [6, 7, 8, 9] }, aulas: [
      "Tem cliente pra você! | Projeto 01",
      "Quem é o cliente? | Projeto 01",
      "Pré-produção | Projeto 01",
      "Bora fotografar? | Projeto 01",
      "Editando suas fotos! | Projeto 01",
      "Briefing | Projeto 02",
      "Pré-produção | Projeto 02",
      "Sessão de fotos! | Projeto 02",
      "Edite suas fotos! | Projeto 02",
    ] },
    { numero: 13, nome: "\"EU\"presa: a fotografia como negócio", quantidade: 6, aulas: [
      "Eu sou uma empresa?",
      "Entendendo meus processos",
      "O fluxo de trabalho",
      "Preço x valor",
      "Fazendo as contas!",
      "Exercício | \"Eu\"presa",
    ] },
    { numero: 14, nome: "Débora Gabrich indica!", quantidade: 1, etiqueta: "MATERIAL EXTRA", aulas: [
      "Material extra | Boas dicas para você usar no seu dia a dia!",
    ] },
  ],
}

/** 2 · 05.16 e aba 04 (páginas do Luz na Prática e do Mais que um Click): os 4 cards de antes e depois. */
export const ANTES_E_DEPOIS_MANUAL = [
  { nome: "Cristielen Souza", legenda: "Aluna Mais que um Click e Luz na Prática" },
  { nome: "Laura Dicker", legenda: "Aluna Mais que um Click, Luz na Prática, Aulas virtuais" },
  { nome: "Bruna Doti", legenda: "Aluna Mais que um Click, Luz na Prática, No Estúdio e Antes da Foto" },
  { nome: "Estúdio Buzz", legenda: "Aluna Mais que um Click e Luz na Prática" },
] as const
