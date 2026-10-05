export const colors = {
  ink: '#0B0B0B',
  cocoaDeep: '#2E2118',
  caramel: '#8A5F3A',
  ochre: '#CCAA66',
  paper: '#F4F0E8',
  cocoaMatte: '#644D3D',
  sand: '#BFB09B',
  neutral: '#D3CABB',
  borderDark: '#4A423A',
} as const;

export const fonts = {
  display: "'Urbanist', sans-serif",
  body: "'Manrope', sans-serif",
  sub: "'Tenor Sans', serif",
  mono: "'Space Mono', monospace",
  // submarcas — Black Mango é licenciada: enquanto não houver webfont, cai em Urbanist
  blackMango: "'Black Mango', 'Urbanist', sans-serif",
  montserrat: "'Montserrat', sans-serif",
  archivoNarrow: "'Archivo Narrow', sans-serif",
  parkinsans: "'Parkinsans', sans-serif",
} as const;

export const spacing = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  6: '24px',
  8: '32px',
  12: '48px',
  16: '64px',
  24: '96px',
} as const;

export const radius = {
  none: '0',
  full: '9999px',
} as const;

export const semanticTokens = {
  bgBase: 'var(--bg-base)',
  bgSurface: 'var(--bg-surface)',
  bgSubtle: 'var(--bg-subtle)',
  textPrimary: 'var(--text-primary)',
  textSecondary: 'var(--text-secondary)',
  textMuted: 'var(--text-muted)',
  borderBase: 'var(--border-base)',
  borderStrong: 'var(--border-strong)',
  accentPrimary: 'var(--accent-primary)',
  accentWarm: 'var(--accent-warm)',
} as const;

export const stateColors = {
  error: '#B3261E',
  errorBg: 'rgba(179, 38, 30, 0.08)',
  warning: '#F29900',
  warningBg: 'rgba(242, 153, 0, 0.08)',
  success: '#2E7D32',
  successBg: 'rgba(46, 125, 50, 0.08)',
  info: 'var(--color-ochre)',
  infoBg: 'rgba(204, 170, 102, 0.10)',
} as const;

export type ColorToken = keyof typeof colors;
export type SpacingToken = keyof typeof spacing;
export type DGVertical = 'portfolio' | 'document' | 'course' | 'blackfriday';

// ─── Escopos temáticos (submarcas e Black Friday) ──────────────────────────
// Cada tema vira variáveis --sub-* (ver .sub-scope em index.css), que remapeiam
// os tokens semânticos e as cores cruas para que os componentes existentes se adaptem.
export interface ScopeTheme {
  bg: string;
  surface: string;
  text: string;
  muted: string;
  wire: string;
  accent: string;
  accentInk: string;
  ctaBg: string;
  ctaInk: string;
  fontDisplay: string;
  fontBody: string;
  fontSub: string;
}

export function themeVars(t: ScopeTheme): Record<string, string> {
  return {
    '--sub-bg': t.bg,
    '--sub-surface': t.surface,
    '--sub-text': t.text,
    '--sub-muted': t.muted,
    '--sub-wire': t.wire,
    '--sub-accent': t.accent,
    '--sub-accent-ink': t.accentInk,
    '--sub-cta-bg': t.ctaBg,
    '--sub-cta-ink': t.ctaInk,
    '--sub-font-display': t.fontDisplay,
    '--sub-font-body': t.fontBody,
    '--sub-font-sub': t.fontSub,
  };
}

export type SubmarcaId = 'estudio' | 'luz' | 'click' | 'adf';

export interface Submarca {
  id: SubmarcaId;
  name: string;
  kind: string;
  grafismo: string;
  priceFont: string;
  priceWeight: number;
  theme: ScopeTheme;
  palette: Array<{ name: string; hex: string; role: string }>;
  dont: string[];
}

export const submarcas: Record<SubmarcaId, Submarca> = {
  estudio: {
    id: 'estudio',
    name: 'no estúdio',
    kind: 'workshop presencial',
    grafismo: 'retícula de pontos',
    priceFont: fonts.blackMango,
    priceWeight: 800,
    theme: {
      bg: '#302F2D', surface: '#202020', text: '#EEEAE3', muted: '#A99583',
      wire: 'color-mix(in srgb, #EEEAE3 22%, #302F2D)',
      accent: '#D57D3D', accentInk: '#202020', ctaBg: '#D57D3D', ctaInk: '#202020',
      fontDisplay: fonts.blackMango, fontBody: fonts.body, fontSub: fonts.sub,
    },
    palette: [
      { name: 'tinta', hex: '#202020', role: 'texto no claro, fundo de card' },
      { name: 'carvão', hex: '#302F2D', role: 'base de toda peça' },
      { name: 'madeira', hex: '#876851', role: 'apoio quente, nunca texto' },
      { name: 'pedra', hex: '#847C74', role: 'visor, marca d’água' },
      { name: 'areia', hex: '#A99583', role: 'rótulo e texto de apoio' },
      { name: 'linho', hex: '#E9E1D8', role: 'papelaria, bloco claro' },
      { name: 'creme', hex: '#EEEAE3', role: 'texto no escuro' },
      { name: 'terracota', hex: '#D57D3D', role: 'acento de ação' },
    ],
    dont: ['Terracota na tipografia da logo', 'Dois botões terracota na mesma dobra', 'Segoe UI em título ou capa'],
  },
  luz: {
    id: 'luz',
    name: 'luz na prática',
    kind: 'curso online',
    grafismo: 'persiana',
    priceFont: fonts.montserrat,
    priceWeight: 700,
    theme: {
      bg: '#1E1A17', surface: '#4A3F36', text: '#F4F0E8', muted: '#B7A793',
      wire: 'color-mix(in srgb, #F4F0E8 20%, #1E1A17)',
      accent: '#D9A648', accentInk: '#1E1A17', ctaBg: '#D9A648', ctaInk: '#1E1A17',
      fontDisplay: fonts.montserrat, fontBody: fonts.montserrat, fontSub: fonts.montserrat,
    },
    palette: [
      { name: 'carvão', hex: '#1E1A17', role: 'base: luz no escuro' },
      { name: 'penumbra', hex: '#4A3F36', role: 'meio-tom, seção escura' },
      { name: 'castanho', hex: '#6B4F3A', role: 'apoio quente' },
      { name: 'areia', hex: '#B7A793', role: 'rótulo e texto secundário' },
      { name: 'creme', hex: '#F4F0E8', role: 'texto no escuro' },
      { name: 'dourado', hex: '#D9A648', role: 'fio, filete, uma palavra — nunca fundo' },
    ],
    dont: ['Inverter os pesos (LUZ NA é sempre o leve)', 'Dourado sobre creme', 'Laranja ou terracota — esse calor é do No Estúdio'],
  },
  click: {
    id: 'click',
    name: 'mais que um click',
    kind: 'curso online',
    grafismo: 'papel milimetrado',
    priceFont: fonts.archivoNarrow,
    priceWeight: 700,
    theme: {
      bg: '#201F1D', surface: '#3A3733', text: '#F6F3EC', muted: '#8C857A',
      wire: 'color-mix(in srgb, #F6F3EC 20%, #201F1D)',
      accent: '#F5C242', accentInk: '#201F1D', ctaBg: '#F5C242', ctaInk: '#201F1D',
      fontDisplay: fonts.montserrat, fontBody: fonts.montserrat, fontSub: fonts.montserrat,
    },
    palette: [
      { name: 'carvão', hex: '#201F1D', role: 'base da página' },
      { name: 'grafite', hex: '#3A3733', role: 'card e bloco' },
      { name: 'pedra', hex: '#8C857A', role: 'apoio neutro' },
      { name: 'cinza claro', hex: '#D9D5CC', role: 'filete e legenda' },
      { name: 'off-white', hex: '#F6F3EC', role: 'texto e fundo claro' },
      { name: 'amarelo', hex: '#F5C242', role: 'cantos da logo e ação' },
      { name: 'âmbar', hex: '#C87F1E', role: 'só estado confirmado' },
    ],
    dont: ['Trocar a cor dos cantos da logo', 'Âmbar em botão de ação', 'Tipografia amarela sobre carvão'],
  },
  adf: {
    id: 'adf',
    name: 'antesdafoto.',
    kind: 'e-book + masterclass',
    grafismo: 'ficha de briefing',
    priceFont: fonts.parkinsans,
    priceWeight: 700,
    theme: {
      bg: '#0B0B0B', surface: '#2A1F18', text: '#DDCBBA',
      muted: 'color-mix(in srgb, #DDCBBA 68%, #0B0B0B)',
      wire: 'color-mix(in srgb, #DDCBBA 20%, #0B0B0B)',
      accent: '#D39858', accentInk: '#0B0B0B', ctaBg: '#D39858', ctaInk: '#0B0B0B',
      fontDisplay: fonts.parkinsans, fontBody: fonts.body, fontSub: fonts.body,
    },
    palette: [
      { name: 'preto', hex: '#0B0B0B', role: 'base de toda peça' },
      { name: 'café', hex: '#2A1F18', role: 'card, bloco, ficha' },
      { name: 'couro', hex: '#6F482C', role: 'acento no claro' },
      { name: 'whiskey sour', hex: '#D39858', role: 'ponto, fita, botão' },
      { name: 'areia', hex: '#DDCBBA', role: 'texto no escuro, página clara' },
    ],
    dont: ['“adf.” ou qualquer sigla do nome', 'Tenor Sans (não entra neste produto)', 'Degradê com whiskey sour'],
  },
};

// Black Friday: duas bases, mesma paleta da marca mãe, raio 0 em tudo (exceto quiz)
export const bfThemes = {
  preto: {
    bg: '#0B0B0B', surface: '#191712', text: '#F4F0E8', muted: '#A89E8C', wire: '#6B6156',
    accent: '#CCAA66', accentInk: '#0B0B0B', ctaBg: '#CCAA66', ctaInk: '#0B0B0B',
    fontDisplay: fonts.display, fontBody: fonts.body, fontSub: fonts.sub,
  },
  papel: {
    bg: '#F4F0E8', surface: '#E6DECE', text: '#0B0B0B', muted: '#644D3D', wire: '#A89E8C',
    accent: '#CCAA66', accentInk: '#0B0B0B', ctaBg: '#0B0B0B', ctaInk: '#F4F0E8',
    fontDisplay: fonts.display, fontBody: fonts.body, fontSub: fonts.sub,
  },
} satisfies Record<string, ScopeTheme>;

export type BFBase = keyof typeof bfThemes;

// Next.js font migration note:
// In a Next.js App Router project, replace the Google Fonts @import in index.css with:
// import { Urbanist, Tenor_Sans, Manrope, Space_Mono } from 'next/font/google'
