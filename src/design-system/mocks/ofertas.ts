/**
 * Mocks das 7 ofertas online, com os valores do manual (2 · 05.05c, 2 · 05.12 e 2 · 07), e do
 * workshop No Estúdio (protótipo `NE Pagina - Manual v2`).
 * Só para stories e páginas de demonstração (R24): não é exportado pelo barrel do design system.
 */
import type { CursoOnline, Oferta, OfertaPresencial, PrecosNormaisDosCursos } from "../dados/index"

export const OFERTAS_MOCK: readonly Oferta[] = [
  {
    slug: "antes-da-foto",
    nome: "Antes da Foto",
    cursos: ["adf"],
    precoNormal: 197,
    parcelaNormal: 20.37,
    precoBlack: 97,
    parcelaBlack: 10.03,
    descontoBlack: 51,
    checkout: "#checkout-antes-da-foto",
    checkoutBlack: "#checkout-bf26-antes-da-foto",
  },
  {
    slug: "luz-na-pratica",
    nome: "Luz na Prática",
    cursos: ["lp"],
    precoNormal: 447,
    parcelaNormal: 46.23,
    precoBlack: 217,
    parcelaBlack: 22.44,
    descontoBlack: 51,
    checkout: "#checkout-luz-na-pratica",
    checkoutBlack: "#checkout-bf26-luz-na-pratica",
  },
  {
    slug: "mais-que-um-click",
    nome: "Mais que um Click",
    cursos: ["mqc"],
    precoNormal: 997,
    parcelaNormal: 103.11,
    precoBlack: 497,
    parcelaBlack: 51.4,
    descontoBlack: 50,
    checkout: "#checkout-mais-que-um-click",
    checkoutBlack: "#checkout-bf26-mais-que-um-click",
  },
  {
    slug: "luz-antes-da-foto",
    nome: "Luz na Prática + Antes da Foto",
    cursos: ["lp", "adf"],
    precoNormal: 577,
    parcelaNormal: 59.68,
    precoBlack: 287,
    parcelaBlack: 29.68,
    descontoCombo: 10,
    descontoBlack: 55,
    checkout: "#checkout-luz-antes-da-foto",
    checkoutBlack: "#checkout-bf26-luz-antes-da-foto",
  },
  {
    slug: "click-antes-da-foto",
    nome: "Mais que um Click + Antes da Foto",
    cursos: ["mqc", "adf"],
    precoNormal: 1077,
    parcelaNormal: 111.39,
    precoBlack: 537,
    parcelaBlack: 55.54,
    descontoCombo: 10,
    descontoBlack: 55,
    checkout: "#checkout-click-antes-da-foto",
    checkoutBlack: "#checkout-bf26-click-antes-da-foto",
  },
  {
    slug: "click-luz",
    nome: "Mais que um Click + Luz na Prática",
    cursos: ["mqc", "lp"],
    precoNormal: 1297,
    parcelaNormal: 134.14,
    precoBlack: 647,
    parcelaBlack: 66.91,
    descontoCombo: 10,
    descontoBlack: 55,
    checkout: "#checkout-click-luz",
    checkoutBlack: "#checkout-bf26-click-luz",
  },
  {
    slug: "completo",
    nome: "Completo",
    cursos: ["lp", "mqc", "adf"],
    precoNormal: 1397,
    parcelaNormal: 144.48,
    precoBlack: 697,
    parcelaBlack: 72.09,
    descontoCombo: 15,
    descontoBlack: 57,
    checkout: "#checkout-completo",
    checkoutBlack: "#checkout-bf26-completo",
  },
]

const precoNormalDoCurso = (curso: CursoOnline): number => {
  const unico = OFERTAS_MOCK.find((o) => o.cursos.length === 1 && o.cursos[0] === curso)
  if (!unico) throw new Error(`mock sem a oferta do curso ${curso}`)
  return unico.precoNormal
}

/** Preço normal de cada curso, lido das ofertas de curso único acima (sem repetir valores). */
export const PRECOS_NORMAIS_MOCK: PrecosNormaisDosCursos = {
  lp: precoNormalDoCurso("lp"),
  mqc: precoNormalDoCurso("mqc"),
  adf: precoNormalDoCurso("adf"),
}

export const OFERTA_NO_ESTUDIO_MOCK: OfertaPresencial = {
  slug: "no-estudio",
  nome: "No Estúdio",
  curso: "ne",
  preco: 1547,
  parcela: 160,
  checkout: "#checkout-no-estudio",
}
