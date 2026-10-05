/**
 * Fixtures compartilhadas pelas stories do Storybook.
 * Não é exportado pelo barrel do design system (`src/design-system/index.ts`).
 */
import type { SVGProps } from 'react';

const base: SVGProps<SVGSVGElement> = {
  width: '100%',
  height: '100%',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export const IconArrow = () => (
  <svg {...base}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export const IconPlus = () => (
  <svg {...base}><path d="M12 5v14M5 12h14" /></svg>
);

export const IconCamera = () => (
  <svg {...base}>
    <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
    <circle cx="12" cy="13" r="3.5" />
  </svg>
);

export const IconClock = () => (
  <svg {...base}><circle cx="12" cy="12" r="9" /><path d="M12 8v5l3 3" /></svg>
);

export const IconHome = () => (
  <svg {...base}><path d="M4 11l8-7 8 7v9H4z" /><path d="M10 20v-6h4v6" /></svg>
);

export const IconInstagram = () => (
  <svg {...base}>
    <rect x="4" y="4" width="16" height="16" />
    <circle cx="12" cy="12" r="3.5" />
    <circle cx="17" cy="7" r="0.6" fill="currentColor" />
  </svg>
);

/** Placeholder de foto em SVG (data URI) — fotos nunca levam raio. */
export const photo = (label = 'foto', bg = '#2E2118', fg = '#CCAA66') =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000"><rect width="800" height="1000" fill="${bg}"/><text x="400" y="510" font-family="Space Mono, monospace" font-size="28" letter-spacing="6" fill="${fg}" text-anchor="middle">${label.toUpperCase()}</text></svg>`,
  )}`;

export const projectRows = [
  { projeto: 'Linha Cacau', cliente: 'Chocolates Serra', fotos: 48, status: 'Entregue' },
  { projeto: 'Still Joias', cliente: 'Atelier Ouro', fotos: 32, status: 'Em edição' },
  { projeto: 'Catálogo Verão', cliente: 'Casa Linho', fotos: 120, status: 'Agendado' },
  { projeto: 'Cosméticos Base', cliente: 'Pele Nua', fotos: 64, status: 'Entregue' },
  { projeto: 'Café Origem', cliente: 'Torra Lenta', fotos: 24, status: 'Em edição' },
  { projeto: 'Vinhos Reserva', cliente: 'Adega Sul', fotos: 40, status: 'Entregue' },
  { projeto: 'Cerâmica Mão', cliente: 'Barro Vivo', fotos: 36, status: 'Agendado' },
];
