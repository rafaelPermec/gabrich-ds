/**
 * CA3 (RF4, RF5): dado de oferta fora do formato quebra o `pnpm typecheck`.
 * Cada `@ts-expect-error` exige um erro na linha seguinte: se o tipo afrouxar, o typecheck falha.
 */
import type { Oferta } from "../../src/design-system/dados/index"

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
