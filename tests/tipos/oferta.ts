/**
 * CA3 (RF4, RF5): dado de oferta fora do formato quebra o `pnpm typecheck`.
 * Cada `@ts-expect-error` exige um erro na linha seguinte: se o tipo afrouxar, o typecheck falha.
 */
import type { Oferta, OfertaPresencial } from "../../src/design-system/dados/index"

const valida = {
  slug: "completo",
  nome: "Completo",
  cursos: ["lp", "mqc", "adf"],
  precoNormal: 1397,
  precoBlack: 697,
  descontoBlack: 57,
  checkout: "#checkout-completo",
  checkoutBlack: "#checkout-bf26-completo",
} satisfies Oferta

const { precoBlack: _semPrecoBlack, ...semPrecoBlack } = valida

export const casos: Oferta[] = [
  valida,
  // @ts-expect-error: sem preço da Black
  semPrecoBlack,
  // @ts-expect-error: preço como texto
  { ...valida, precoNormal: "1397" },
  // @ts-expect-error: curso fora dos cursos online
  { ...valida, cursos: ["ne"] },
  // @ts-expect-error: id da Black sem o prefixo bf26
  { ...valida, checkoutBlack: "#checkout-completo" },
  // @ts-expect-error: id sem o prefixo de checkout
  { ...valida, checkout: "completo" },
]

/** RF14: o No Estúdio não tem preço da Black nem roda sem preço. */
const noEstudio = {
  slug: "no-estudio",
  nome: "No Estúdio",
  curso: "ne",
  preco: 1547,
  checkout: "#checkout-no-estudio",
} satisfies OfertaPresencial

const { preco: _semPreco, ...semPreco } = noEstudio

export const casosPresenciais: OfertaPresencial[] = [
  noEstudio,
  // @ts-expect-error: No Estúdio sem preço
  semPreco,
  // @ts-expect-error: No Estúdio com preço da Black
  { ...noEstudio, precoBlack: 773 },
]
