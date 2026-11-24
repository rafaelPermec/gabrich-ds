/**
 * Formato de oferta e as funções puras que leem dele (RF1, RF6, RF7, RF11).
 * Preços e parcelas chegam no dado, em reais; as porcentagens vêm prontas e nunca são calculadas (R16, R17).
 */

/** Cursos online: Luz na Prática, Mais que um Click e Antes da Foto. */
export type CursoOnline = "lp" | "mqc" | "adf"

export const CURSOS_ONLINE: readonly CursoOnline[] = ["lp", "mqc", "adf"]

export type IdCheckout = `#checkout-${string}`
export type IdCheckoutBlack = `#checkout-bf26-${string}`

/** Uma das ofertas online (curso único ou combo), fora e dentro da Black Friday. */
export type Oferta = {
  slug: string
  nome: string
  cursos: readonly CursoOnline[]
  /** À vista, fora da Black. */
  precoNormal: number
  /** Valor de cada uma das 12 parcelas, fora da Black. Sem ela: "12x a confirmar". */
  parcelaNormal?: number
  /** À vista, na Black. */
  precoBlack: number
  /** Valor de cada uma das 12 parcelas, na Black. Sem ela: "12x a confirmar". */
  parcelaBlack?: number
  /** % do "desconto combo" fora da Black (só combos), inteiro. */
  descontoCombo?: number
  /** % do desconto da Black (combo + Black ou Black do curso único), inteiro. */
  descontoBlack: number
  checkout: IdCheckout
  checkoutBlack: IdCheckoutBlack
  linkNormal?: string
  linkBlack?: string
}

/** Preço normal à vista de cada curso online, base do "preço separado". */
export type PrecosNormaisDosCursos = Readonly<Record<CursoOnline, number>>

export type ResumoDePreco = {
  preco: number
  parcela?: number
  /** Soma dos preços normais dos cursos; ausente no curso único fora da Black. */
  precoSeparado?: number
  /** Preço separado − preço da oferta; ausente no curso único fora da Black. */
  economia?: number
}

const centavos = (valor: number) => Math.round(valor * 100) / 100

/** RF7: preço, parcela, preço separado e "você economiza" da oferta, fora ou na Black. */
export function resumoDePreco(
  oferta: Oferta,
  precosNormaisDosCursos: PrecosNormaisDosCursos,
  emBlack: boolean,
): ResumoDePreco {
  const preco = emBlack ? oferta.precoBlack : oferta.precoNormal
  const parcela = emBlack ? oferta.parcelaBlack : oferta.parcelaNormal
  if (!emBlack && oferta.cursos.length === 1) return { preco, parcela }
  const precoSeparado = centavos(oferta.cursos.reduce((soma, curso) => soma + precosNormaisDosCursos[curso], 0))
  return { preco, parcela, precoSeparado, economia: centavos(precoSeparado - preco) }
}

/** RF11: o link da Hotmart, quando existe; senão, o id de checkout da oferta. */
export function destinoDoCheckout(oferta: Oferta, emBlack: boolean): string {
  return emBlack ? (oferta.linkBlack ?? oferta.checkoutBlack) : (oferta.linkNormal ?? oferta.checkout)
}
