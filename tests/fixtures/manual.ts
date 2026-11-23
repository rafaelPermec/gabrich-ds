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
