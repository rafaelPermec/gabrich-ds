export const colors = {
  ink: "#0B0B0B",
  cocoaDeep: "#2E2118",
  caramel: "#8A5F3A",
  ochre: "#CCAA66",
  paper: "#F4F0E8",
  cocoaMatte: "#644D3D",
  sand: "#BFB09B",
  neutral: "#D3CABB",
  borderDark: "#4A423A",
} as const

export const fonts = {
  display: "'Urbanist', sans-serif",
  body: "'Manrope', sans-serif",
  sub: "'Tenor Sans', serif",
  mono: "'Space Mono', monospace",
  // submarcas — Black Mango: arquivo próprio em public/fonts (só no No Estúdio)
  blackMango: "'Black Mango', 'Urbanist', sans-serif",
  montserrat: "'Montserrat', sans-serif",
  parkinsans: "'Parkinsans', sans-serif",
} as const

export const spacing = {
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  6: "24px",
  8: "32px",
  12: "48px",
  16: "64px",
  24: "96px",
} as const

export const radius = {
  none: "0",
  full: "9999px",
} as const

export const semanticTokens = {
  bgBase: "var(--bg-base)",
  bgSurface: "var(--bg-surface)",
  bgSubtle: "var(--bg-subtle)",
  textPrimary: "var(--text-primary)",
  textSecondary: "var(--text-secondary)",
  textMuted: "var(--text-muted)",
  borderBase: "var(--border-base)",
  borderStrong: "var(--border-strong)",
  accentPrimary: "var(--accent-primary)",
  accentWarm: "var(--accent-warm)",
} as const

export const stateColors = {
  error: "#B3261E",
  errorBg: "rgba(179, 38, 30, 0.08)",
  warning: "#F29900",
  warningBg: "rgba(242, 153, 0, 0.08)",
  success: "#2E7D32",
  successBg: "rgba(46, 125, 50, 0.08)",
  info: "var(--color-ochre)",
  infoBg: "rgba(204, 170, 102, 0.10)",
} as const

export const fontSizes = {
  xs: "10px",
  sm: "12px",
  base: "15px",
  md: "17px",
  lg: "21px",
  xl: "28px",
  "2xl": "36px",
  "3xl": "48px",
  "4xl": "64px",
  display: "80px",
} as const

export const lineHeights = {
  tight: 0.9,
  snug: 1.1,
  normal: 1.35,
  relaxed: 1.65,
} as const

export const letterSpacing = {
  tight: "-0.03em",
  normal: "0",
  wide: "0.1em",
  wider: "0.16em",
  widest: "0.2em",
} as const

export const overlayTokens = {
  overlayHeavy: "var(--overlay-heavy)",
  overlayMid: "var(--overlay-mid)",
  gradientInkOverlay: "var(--gradient-ink-overlay)",
  bgSubtleAlpha: "var(--bg-subtle-alpha)",
  bgHover: "var(--bg-hover)",
  accentSubtle: "var(--accent-subtle)",
  accentMid: "var(--accent-mid)",
  skeletonShimmer: "var(--skeleton-shimmer)",
} as const

export type ColorToken = keyof typeof colors
export type SpacingToken = keyof typeof spacing
export type FontSizeToken = keyof typeof fontSizes
export type DGVertical = "portfolio" | "document" | "course" | "blackfriday"

// ─── Escopos temáticos (submarcas e Black Friday) ──────────────────────────
// Cada tema vira variáveis --sub-* (ver .sub-scope em index.css), que remapeiam
// os tokens semânticos e as cores cruas para que os componentes existentes se adaptem.
export interface ScopeTheme {
  bg: string
  surface: string
  text: string
  muted: string
  wire: string
  accent: string
  accentInk: string
  ctaBg: string
  ctaInk: string
  fontDisplay: string
  fontBody: string
  fontSub: string
}

export function themeVars(t: ScopeTheme): Record<string, string> {
  return {
    "--sub-bg": t.bg,
    "--sub-surface": t.surface,
    "--sub-text": t.text,
    "--sub-muted": t.muted,
    "--sub-wire": t.wire,
    "--sub-accent": t.accent,
    "--sub-accent-ink": t.accentInk,
    "--sub-cta-bg": t.ctaBg,
    "--sub-cta-ink": t.ctaInk,
    "--sub-font-display": t.fontDisplay,
    "--sub-font-body": t.fontBody,
    "--sub-font-sub": t.fontSub,
  }
}

export type SubmarcaId = "estudio" | "luz" | "click" | "adf"

export interface Submarca {
  id: SubmarcaId
  name: string
  kind: string
  grafismo: string
  priceFont: string
  priceWeight: number
  theme: ScopeTheme
  palette: Array<{ name: string; hex: string; role: string }>
  dont: string[]
}

export const submarcas: Record<SubmarcaId, Submarca> = {
  estudio: {
    id: "estudio",
    name: "no estúdio",
    kind: "workshop presencial",
    grafismo: "retícula de pontos",
    priceFont: fonts.blackMango,
    priceWeight: 800,
    theme: {
      bg: "#302F2D",
      surface: "#202020",
      text: "#EEEAE3",
      muted: "#A99583",
      wire: "color-mix(in srgb, #EEEAE3 22%, #302F2D)",
      accent: "#D57D3D",
      accentInk: "#202020",
      ctaBg: "#D57D3D",
      ctaInk: "#202020",
      fontDisplay: fonts.blackMango,
      fontBody: fonts.body,
      fontSub: fonts.sub,
    },
    palette: [
      { name: "tinta", hex: "#202020", role: "texto no claro, fundo de card" },
      { name: "carvão", hex: "#302F2D", role: "base de toda peça" },
      { name: "madeira", hex: "#876851", role: "apoio quente, nunca texto" },
      { name: "pedra", hex: "#847C74", role: "visor, marca d’água" },
      { name: "areia", hex: "#A99583", role: "rótulo e texto de apoio" },
      { name: "linho", hex: "#E9E1D8", role: "papelaria, bloco claro" },
      { name: "creme", hex: "#EEEAE3", role: "texto no escuro" },
      { name: "terracota", hex: "#D57D3D", role: "acento de ação" },
    ],
    dont: [
      "Terracota na tipografia da logo",
      "Dois botões terracota na mesma dobra",
      "Segoe UI em título ou capa",
    ],
  },
  luz: {
    id: "luz",
    name: "luz na prática",
    kind: "curso online",
    grafismo: "persiana",
    priceFont: fonts.montserrat,
    priceWeight: 700,
    theme: {
      bg: "#1E1A17",
      surface: "#4A3F36",
      text: "#F4F0E8",
      muted: "#B7A793",
      wire: "color-mix(in srgb, #F4F0E8 20%, #1E1A17)",
      accent: "#D9A648",
      accentInk: "#1E1A17",
      ctaBg: "#D9A648",
      ctaInk: "#1E1A17",
      fontDisplay: fonts.montserrat,
      fontBody: fonts.montserrat,
      fontSub: fonts.montserrat,
    },
    palette: [
      { name: "carvão", hex: "#1E1A17", role: "base: luz no escuro" },
      { name: "penumbra", hex: "#4A3F36", role: "meio-tom, seção escura" },
      { name: "castanho", hex: "#6B4F3A", role: "apoio quente" },
      { name: "areia", hex: "#B7A793", role: "rótulo e texto secundário" },
      { name: "creme", hex: "#F4F0E8", role: "texto no escuro" },
      {
        name: "dourado",
        hex: "#D9A648",
        role: "fio, filete, uma palavra — nunca fundo",
      },
    ],
    dont: [
      "Inverter os pesos (LUZ NA é sempre o leve)",
      "Dourado sobre creme",
      "Laranja ou terracota — esse calor é do No Estúdio",
    ],
  },
  click: {
    id: "click",
    name: "mais que um click",
    kind: "curso online",
    grafismo: "papel milimetrado",
    priceFont: fonts.montserrat,
    priceWeight: 700,
    theme: {
      bg: "#201F1D",
      surface: "#3A3733",
      text: "#F6F3EC",
      muted: "#8C857A",
      wire: "color-mix(in srgb, #F6F3EC 20%, #201F1D)",
      accent: "#F5C242",
      accentInk: "#201F1D",
      ctaBg: "#F5C242",
      ctaInk: "#201F1D",
      fontDisplay: fonts.montserrat,
      fontBody: fonts.montserrat,
      fontSub: fonts.montserrat,
    },
    palette: [
      { name: "carvão", hex: "#201F1D", role: "base da página" },
      { name: "grafite", hex: "#3A3733", role: "card e bloco" },
      { name: "pedra", hex: "#8C857A", role: "apoio neutro" },
      { name: "cinza claro", hex: "#D9D5CC", role: "filete e legenda" },
      { name: "off-white", hex: "#F6F3EC", role: "texto e fundo claro" },
      { name: "amarelo", hex: "#F5C242", role: "cantos da logo e ação" },
      { name: "âmbar", hex: "#C87F1E", role: "só estado confirmado" },
    ],
    dont: [
      "Trocar a cor dos cantos da logo",
      "Âmbar em botão de ação",
      "Tipografia amarela sobre carvão",
    ],
  },
  adf: {
    id: "adf",
    name: "antesdafoto.",
    kind: "e-book + masterclass",
    grafismo: "ficha de briefing",
    priceFont: fonts.parkinsans,
    priceWeight: 700,
    theme: {
      bg: "#0B0B0B",
      surface: "#2A1F18",
      text: "#DDCBBA",
      muted: "color-mix(in srgb, #DDCBBA 68%, #0B0B0B)",
      wire: "color-mix(in srgb, #DDCBBA 20%, #0B0B0B)",
      accent: "#D39858",
      accentInk: "#0B0B0B",
      ctaBg: "#D39858",
      ctaInk: "#0B0B0B",
      fontDisplay: fonts.parkinsans,
      fontBody: fonts.body,
      fontSub: fonts.body,
    },
    palette: [
      { name: "preto", hex: "#0B0B0B", role: "base de toda peça" },
      { name: "café", hex: "#2A1F18", role: "card, bloco, ficha" },
      { name: "couro", hex: "#6F482C", role: "acento no claro" },
      { name: "whiskey sour", hex: "#D39858", role: "ponto, fita, botão" },
      { name: "areia", hex: "#DDCBBA", role: "texto no escuro, página clara" },
    ],
    dont: [
      "“adf.” ou qualquer sigla do nome",
      "Tenor Sans (não entra neste produto)",
      "Degradê com whiskey sour",
    ],
  },
}

// Black Friday: duas bases, mesma paleta da marca mãe, raio 0 em tudo (exceto quiz)
export const bfThemes = {
  preto: {
    bg: "#0B0B0B",
    surface: "#191712",
    text: "#F4F0E8",
    muted: "#A89E8C",
    wire: "#6B6156",
    accent: "#CCAA66",
    accentInk: "#0B0B0B",
    ctaBg: "#CCAA66",
    ctaInk: "#0B0B0B",
    fontDisplay: fonts.display,
    fontBody: fonts.body,
    fontSub: fonts.sub,
  },
  papel: {
    bg: "#F4F0E8",
    surface: "#E6DECE",
    text: "#0B0B0B",
    muted: "#644D3D",
    wire: "#A89E8C",
    accent: "#CCAA66",
    accentInk: "#0B0B0B",
    ctaBg: "#0B0B0B",
    ctaInk: "#F4F0E8",
    fontDisplay: fonts.display,
    fontBody: fonts.body,
    fontSub: fonts.sub,
  },
} satisfies Record<string, ScopeTheme>

export type BFBase = keyof typeof bfThemes

// Next.js font migration note:
// In a Next.js App Router project, replace the Google Fonts @import in index.css with:
// import { Urbanist, Tenor_Sans, Manrope, Space_Mono } from 'next/font/google'

// ── Manual vigente (fonte da verdade: src/index.css) ─────────────────────────────────
// Os objetos guardam o nome da custom property, não o HEX, para não duplicar valores.

/** Os 10 temas do manual (2 · 01), aplicados por `data-tema`. */
export const temas = [
  "dg",
  "dg-claro",
  "lp",
  "lp-claro",
  "mqc",
  "mqc-claro",
  "adf",
  "adf-claro",
  "ne",
  "ne-claro",
] as const satisfies readonly string[]

export type Tema = (typeof temas)[number]

/** Camada de campanha, combinável com `dg`/`dg-claro` por `data-campanha`. */
export type Campanha = "bf"

/** Primitivos de cor de 2 · 01, por marca: `cores.dg.ocre` → `"var(--dg-ocre)"`. */
export const cores = {
  dg: {
    pretoTinta: "var(--dg-preto-tinta)",
    cacauProfundo: "var(--dg-cacau-profundo)",
    caramelo: "var(--dg-caramelo)",
    ocre: "var(--dg-ocre)",
    papel: "var(--dg-papel)",
    cacauFosco: "var(--dg-cacau-fosco)",
    areia: "var(--dg-areia)",
    neutro: "var(--dg-neutro)",
    pedra: "var(--dg-pedra)",
    grafite: "var(--dg-grafite)",
    fileteEscuro: "var(--dg-filete-escuro)",
    tramaPapel: "var(--dg-trama-papel)",
    tramaPreto: "var(--dg-trama-preto)",
  },
  ne: {
    tinta: "var(--ne-tinta)",
    carvao: "var(--ne-carvao)",
    madeira: "var(--ne-madeira)",
    pedra: "var(--ne-pedra)",
    areia: "var(--ne-areia)",
    linho: "var(--ne-linho)",
    creme: "var(--ne-creme)",
    terracota: "var(--ne-terracota)",
  },
  lp: {
    carvao: "var(--lp-carvao)",
    penumbra: "var(--lp-penumbra)",
    castanho: "var(--lp-castanho)",
    areia: "var(--lp-areia)",
    creme: "var(--lp-creme)",
    dourado: "var(--lp-dourado)",
  },
  mqc: {
    carvao: "var(--mqc-carvao)",
    grafite: "var(--mqc-grafite)",
    pedra: "var(--mqc-pedra)",
    cinzaClaro: "var(--mqc-cinza-claro)",
    offWhite: "var(--mqc-off-white)",
    amarelo: "var(--mqc-amarelo)",
    ambar: "var(--mqc-ambar)",
  },
  adf: {
    preto: "var(--adf-preto)",
    cafe: "var(--adf-cafe)",
    couro: "var(--adf-couro)",
    whiskeySour: "var(--adf-whiskey-sour)",
    areia: "var(--adf-areia)",
    cobre: "var(--adf-cobre)",
    linha: "var(--adf-linha)",
    trama: "var(--adf-trama)",
  },
  bf: {
    preto: "var(--bf-preto)",
    papel: "var(--bf-papel)",
    ocre: "var(--bf-ocre)",
    hoverOcre: "var(--bf-hover-ocre)",
    fioCinza: "var(--bf-fio-cinza)",
    pedra: "var(--bf-pedra)",
    cacauFosco: "var(--bf-cacau-fosco)",
    tramaPreto: "var(--bf-trama-preto)",
    tramaPapel: "var(--bf-trama-papel)",
  },
} as const

/** Tokens de componente: mesmo nome em todos os temas; o `data-tema` troca o valor. */
export const tokensComponente = {
  fundo: "var(--fundo)",
  card: "var(--card)",
  fioCard: "var(--fio-card)",
  texto: "var(--texto)",
  textoApoio: "var(--texto-apoio)",
  acento: "var(--acento)",
  botao: "var(--botao)",
  botaoTexto: "var(--botao-texto)",
  botaoHover: "var(--botao-hover)",
  desabilitado: "var(--desabilitado)",
  divisoria: "var(--divisoria)",
  seloGarantia: "var(--selo-garantia)",
} as const

/** Estados por tema: nunca vermelho (R21, ADR 0004). */
export const tokensEstado = {
  erro: "var(--erro)",
  aviso: "var(--aviso)",
  sucesso: "var(--sucesso)",
} as const

/** Subfontes de 2 · 02 por marca e nível: `font`, `letter-spacing` e `text-transform`. */
export const subfontes = {
  dg: {
    titulo: { font: "var(--dg-titulo)", tracking: "var(--dg-titulo-tracking)", caixa: "var(--dg-titulo-caixa)" },
    tituloApoio: { font: "var(--dg-titulo-apoio)", tracking: "var(--dg-titulo-apoio-tracking)", caixa: "var(--dg-titulo-apoio-caixa)" },
    subtitulo: { font: "var(--dg-subtitulo)", tracking: "var(--dg-subtitulo-tracking)", caixa: "var(--dg-subtitulo-caixa)" },
    corpo: { font: "var(--dg-corpo)", tracking: "var(--dg-corpo-tracking)", caixa: "var(--dg-corpo-caixa)" },
    intertitulo: { font: "var(--dg-intertitulo)", tracking: "var(--dg-intertitulo-tracking)", caixa: "var(--dg-intertitulo-caixa)" },
    rotulo: { font: "var(--dg-rotulo)", tracking: "var(--dg-rotulo-tracking)", caixa: "var(--dg-rotulo-caixa)" },
    botao: { font: "var(--dg-botao)", tracking: "var(--dg-botao-tracking)", caixa: "var(--dg-botao-caixa)" },
    manuscrita: { font: "var(--dg-manuscrita)", tracking: "var(--dg-manuscrita-tracking)", caixa: "var(--dg-manuscrita-caixa)" },
  },
  ne: {
    h1: { font: "var(--ne-h1)", tracking: "var(--ne-h1-tracking)", caixa: "var(--ne-h1-caixa)" },
    h2: { font: "var(--ne-h2)", tracking: "var(--ne-h2-tracking)", caixa: "var(--ne-h2-caixa)" },
    h3: { font: "var(--ne-h3)", tracking: "var(--ne-h3-tracking)", caixa: "var(--ne-h3-caixa)" },
    apoio: { font: "var(--ne-apoio)", tracking: "var(--ne-apoio-tracking)", caixa: "var(--ne-apoio-caixa)" },
    corpo: { font: "var(--ne-corpo)", tracking: "var(--ne-corpo-tracking)", caixa: "var(--ne-corpo-caixa)" },
    legenda: { font: "var(--ne-legenda)", tracking: "var(--ne-legenda-tracking)", caixa: "var(--ne-legenda-caixa)" },
  },
  lp: {
    h1: { font: "var(--lp-h1)", tracking: "var(--lp-h1-tracking)", caixa: "var(--lp-h1-caixa)" },
    h2: { font: "var(--lp-h2)", tracking: "var(--lp-h2-tracking)", caixa: "var(--lp-h2-caixa)" },
    h3: { font: "var(--lp-h3)", tracking: "var(--lp-h3-tracking)", caixa: "var(--lp-h3-caixa)" },
    corpo: { font: "var(--lp-corpo)", tracking: "var(--lp-corpo-tracking)", caixa: "var(--lp-corpo-caixa)" },
    legenda: { font: "var(--lp-legenda)", tracking: "var(--lp-legenda-tracking)", caixa: "var(--lp-legenda-caixa)" },
    preco: { font: "var(--lp-preco)", tracking: "var(--lp-preco-tracking)", caixa: "var(--lp-preco-caixa)" },
  },
  mqc: {
    h1: { font: "var(--mqc-h1)", tracking: "var(--mqc-h1-tracking)", caixa: "var(--mqc-h1-caixa)" },
    h2: { font: "var(--mqc-h2)", tracking: "var(--mqc-h2-tracking)", caixa: "var(--mqc-h2-caixa)" },
    h3: { font: "var(--mqc-h3)", tracking: "var(--mqc-h3-tracking)", caixa: "var(--mqc-h3-caixa)" },
    corpo: { font: "var(--mqc-corpo)", tracking: "var(--mqc-corpo-tracking)", caixa: "var(--mqc-corpo-caixa)" },
    preco: { font: "var(--mqc-preco)", tracking: "var(--mqc-preco-tracking)", caixa: "var(--mqc-preco-caixa)" },
  },
  adf: {
    h1: { font: "var(--adf-h1)", tracking: "var(--adf-h1-tracking)", caixa: "var(--adf-h1-caixa)" },
    h2: { font: "var(--adf-h2)", tracking: "var(--adf-h2-tracking)", caixa: "var(--adf-h2-caixa)" },
    h3: { font: "var(--adf-h3)", tracking: "var(--adf-h3-tracking)", caixa: "var(--adf-h3-caixa)" },
    corpo: { font: "var(--adf-corpo)", tracking: "var(--adf-corpo-tracking)", caixa: "var(--adf-corpo-caixa)" },
    rotulo: { font: "var(--adf-rotulo)", tracking: "var(--adf-rotulo-tracking)", caixa: "var(--adf-rotulo-caixa)" },
    anotacao: { font: "var(--adf-anotacao)", tracking: "var(--adf-anotacao-tracking)", caixa: "var(--adf-anotacao-caixa)" },
  },
  bf: {
    numero: { font: "var(--bf-numero)", tracking: "var(--bf-numero-tracking)", caixa: "var(--bf-numero-caixa)" },
    parcela: { font: "var(--bf-parcela)", tracking: "var(--bf-parcela-tracking)", caixa: "var(--bf-parcela-caixa)" },
    dePor: { font: "var(--bf-de-por)", tracking: "var(--bf-de-por-tracking)", caixa: "var(--bf-de-por-caixa)" },
    aVista: { font: "var(--bf-a-vista)", tracking: "var(--bf-a-vista-tracking)", caixa: "var(--bf-a-vista-caixa)" },
    contador: { font: "var(--bf-contador)", tracking: "var(--bf-contador-tracking)", caixa: "var(--bf-contador-caixa)" },
    etiqueta: { font: "var(--bf-etiqueta)", tracking: "var(--bf-etiqueta-tracking)", caixa: "var(--bf-etiqueta-caixa)" },
    botao: { font: "var(--bf-botao)", tracking: "var(--bf-botao-tracking)", caixa: "var(--bf-botao-caixa)" },
    corpo: { font: "var(--bf-corpo)", tracking: "var(--bf-corpo-tracking)", caixa: "var(--bf-corpo-caixa)" },
    lista: { font: "var(--bf-lista)", tracking: "var(--bf-lista-tracking)", caixa: "var(--bf-lista-caixa)" },
    quizTitulo: { font: "var(--bf-quiz-titulo)", tracking: "var(--bf-quiz-titulo-tracking)", caixa: "var(--bf-quiz-titulo-caixa)" },
    quizPergunta: { font: "var(--bf-quiz-pergunta)", tracking: "var(--bf-quiz-pergunta-tracking)", caixa: "var(--bf-quiz-pergunta-caixa)" },
  },
} as const

/** 2 · 03: escala de espaçamento (o sufixo é o múltiplo de 4). Guarda o nome do token, não o valor. */
export const esp = {
  1: "var(--esp-1)",
  2: "var(--esp-2)",
  3: "var(--esp-3)",
  4: "var(--esp-4)",
  6: "var(--esp-6)",
  8: "var(--esp-8)",
  12: "var(--esp-12)",
  16: "var(--esp-16)",
  24: "var(--esp-24)",
} as const

/** 2 · 03: grid e dobra. `dobra` alterna entre desktop (96px) e celular (64px) abaixo de 768px. */
export const grid = {
  container: "var(--container)",
  colunas: "var(--colunas)",
  gutter: "var(--gutter)",
  dobra: "var(--dobra)",
  dobraDesktop: "var(--dobra-desktop)",
  dobraMobile: "var(--dobra-mobile)",
} as const

/** 2 · 03: os três raios (R3–R6). */
export const raio = {
  reto: "var(--raio-reto)",
  card: "var(--raio-card)",
  disco: "var(--raio-disco)",
} as const

/** 2 · 03: o fio é sempre 1px (R7). Não existe token de sombra (R8). */
export const fio = "var(--fio)" as const
