import { expect, test } from "@playwright/test"
import {
  destinoDoCheckout,
  formatarMoeda,
  formatarParcela,
  ofertaDaSelecao,
  resumoDePreco,
  validarOferta,
  validarOfertaPresencial,
  type CursoOnline,
  type Oferta,
} from "../../src/design-system/dados/index"
import { OFERTA_NO_ESTUDIO_MOCK, OFERTAS_MOCK, PRECOS_NORMAIS_MOCK } from "../../src/design-system/mocks/ofertas"
import { ECONOMIA_MANUAL, OFERTA_NO_ESTUDIO_MANUAL, OFERTAS_MANUAL } from "../fixtures/manual"

/** Funções puras do módulo de dados (oferta), sem navegador. Valores esperados: manual. */

const NBSP = " "
const oferta = (slug: string): Oferta => {
  const achada = OFERTAS_MOCK.find((o) => o.slug === slug)
  if (!achada) throw new Error(`mock ausente: ${slug}`)
  return achada
}

test("CA1: os mocks de oferta passam na validação; dado fora do formato é rejeitado", () => {
  expect(OFERTAS_MOCK.map((o) => [o.slug, validarOferta(o)])).toEqual(
    OFERTAS_MOCK.map((o) => [o.slug, []]),
  )
  const base = oferta("completo")
  const invalidas: Record<string, unknown> = {
    "sem preço da Black": { ...base, precoBlack: undefined },
    "preço como texto": { ...base, precoNormal: "1397" },
    "porcentagem fracionada": { ...base, descontoBlack: 57.5 },
    "porcentagem acima de 100": { ...base, descontoCombo: 120 },
    "Black acima do normal": { ...base, precoBlack: 1500 },
    "id de outra oferta": { ...base, checkout: "#checkout-outro" },
    "id da Black sem bf26": { ...base, checkoutBlack: "#checkout-completo" },
    "sem cursos": { ...base, cursos: [] },
    "nulo": null,
  }
  const rejeitadas = Object.fromEntries(
    Object.entries(invalidas).map(([caso, o]) => [caso, validarOferta(o).length > 0]),
  )
  expect(rejeitadas).toEqual(Object.fromEntries(Object.keys(invalidas).map((caso) => [caso, true])))
})

test("CA5: parcela ausente aparece como \"12x a confirmar\"", () => {
  const { parcelaBlack: _, ...semParcela } = oferta("completo")
  expect(formatarParcela(resumoDePreco(semParcela, PRECOS_NORMAIS_MOCK, true).parcela)).toBe("12x a confirmar")
  expect(formatarParcela(undefined)).toBe("12x a confirmar")
  expect(formatarParcela(144.48)).toBe(`12x R$${NBSP}144,48`)
})

test("CA6: preço separado e \"você economiza\" batem com a tabela de 2 · 05.12", () => {
  const resumos = (emBlack: boolean) =>
    OFERTAS_MOCK.map((o) => {
      const { precoSeparado, economia } = resumoDePreco(o, PRECOS_NORMAIS_MOCK, emBlack)
      return [o.slug, precoSeparado, economia]
    })
  expect(resumos(false)).toEqual(
    OFERTAS_MOCK.map((o) =>
      o.cursos.length === 1
        ? [o.slug, undefined, undefined]
        : [o.slug, ECONOMIA_MANUAL[o.slug].separado, ECONOMIA_MANUAL[o.slug].economiaNormal],
    ),
  )
  expect(resumos(true)).toEqual(
    OFERTAS_MOCK.map((o) => [o.slug, ECONOMIA_MANUAL[o.slug].separado, ECONOMIA_MANUAL[o.slug].economiaBlack]),
  )
  const lpAdf = resumoDePreco(oferta("luz-antes-da-foto"), PRECOS_NORMAIS_MOCK, true)
  expect([lpAdf.preco, lpAdf.economia ?? 0].map(formatarMoeda)).toEqual([`R$${NBSP}287`, `R$${NBSP}357`])
})

test("CA7: os mocks de oferta têm os preços, parcelas, porcentagens e ids do manual", () => {
  const campos = (o: Oferta) => ({
    slug: o.slug,
    precoNormal: o.precoNormal,
    parcelaNormal: o.parcelaNormal,
    precoBlack: o.precoBlack,
    parcelaBlack: o.parcelaBlack,
    ...(o.descontoCombo === undefined ? {} : { descontoCombo: o.descontoCombo }),
    descontoBlack: o.descontoBlack,
    checkout: o.checkout,
    checkoutBlack: o.checkoutBlack,
  })
  expect(OFERTAS_MOCK.map(campos)).toEqual(OFERTAS_MANUAL)
})

test("CA10: sem link, o checkout é o id da oferta; com link, é o link", () => {
  const completo = oferta("completo")
  expect([destinoDoCheckout(completo, true), destinoDoCheckout(completo, false)]).toEqual([
    "#checkout-bf26-completo",
    "#checkout-completo",
  ])
  const comLink = { ...completo, linkBlack: "https://pay.exemplo/bf", linkNormal: "https://pay.exemplo/n" }
  expect([destinoDoCheckout(comLink, true), destinoDoCheckout(comLink, false)]).toEqual([
    "https://pay.exemplo/bf",
    "https://pay.exemplo/n",
  ])
})

test("CA11: moeda no formato brasileiro, inteiro sem centavos e fração com 2 casas", () => {
  expect([1397, 144.48, 20.3, 97, 0.5].map(formatarMoeda)).toEqual(
    ["1.397", "144,48", "20,30", "97", "0,50"].map((v) => `R$${NBSP}${v}`),
  )
})

test("RF7: a seleção acha a oferta das 7 combinações, em qualquer ordem; nada marcado ou oferta ausente dá undefined", () => {
  const selecoes: readonly (readonly CursoOnline[])[] = [
    ["adf"],
    ["lp"],
    ["mqc"],
    ["adf", "lp"],
    ["adf", "mqc"],
    ["lp", "mqc"],
    ["adf", "mqc", "lp"],
  ]
  expect(selecoes.map((cursos) => ofertaDaSelecao(OFERTAS_MOCK, cursos)?.slug)).toEqual([
    "antes-da-foto",
    "luz-na-pratica",
    "mais-que-um-click",
    "luz-antes-da-foto",
    "click-antes-da-foto",
    "click-luz",
    "completo",
  ])
  const semCompleto = OFERTAS_MOCK.filter((o) => o.slug !== "completo")
  expect([ofertaDaSelecao(OFERTAS_MOCK, []), ofertaDaSelecao(semCompleto, ["lp", "mqc", "adf"])]).toEqual([
    undefined,
    undefined,
  ])
})

test("CA12: o mock do No Estúdio tem os valores do manual e passa na validação; dado fora do formato é rejeitado", () => {
  const { slug, preco, parcela, checkout } = OFERTA_NO_ESTUDIO_MOCK
  expect({ slug, preco, parcela, checkout }).toEqual(OFERTA_NO_ESTUDIO_MANUAL)
  expect(validarOfertaPresencial(OFERTA_NO_ESTUDIO_MOCK)).toEqual([])
  const invalidas: Record<string, unknown> = {
    "sem preço": { ...OFERTA_NO_ESTUDIO_MOCK, preco: undefined },
    "parcela negativa": { ...OFERTA_NO_ESTUDIO_MOCK, parcela: -160 },
    "curso online": { ...OFERTA_NO_ESTUDIO_MOCK, curso: "lp" },
    "id de outra oferta": { ...OFERTA_NO_ESTUDIO_MOCK, checkout: "#checkout-outro" },
    "link vazio": { ...OFERTA_NO_ESTUDIO_MOCK, link: " " },
    "nulo": null,
  }
  const rejeitadas = Object.fromEntries(
    Object.entries(invalidas).map(([caso, o]) => [caso, validarOfertaPresencial(o).length > 0]),
  )
  expect(rejeitadas).toEqual(Object.fromEntries(Object.keys(invalidas).map((caso) => [caso, true])))
})

test("CA10: o checkout do No Estúdio é o id ou o link, com ou sem Black", () => {
  const comLink = { ...OFERTA_NO_ESTUDIO_MOCK, link: "https://pay.exemplo/ne" }
  expect([
    destinoDoCheckout(OFERTA_NO_ESTUDIO_MOCK, false),
    destinoDoCheckout(OFERTA_NO_ESTUDIO_MOCK, true),
    destinoDoCheckout(comLink, false),
  ]).toEqual(["#checkout-no-estudio", "#checkout-no-estudio", "https://pay.exemplo/ne"])
})
