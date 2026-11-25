import { expect, test, type Locator } from "@playwright/test"
import { TEMAS_MANUAL } from "../fixtures/manual"
import { abrirStory, idDaStory, rgb } from "./storybook"

/** CA7, CA8 (RF7) e CA12 (RF11): CardManual (2 · 05.03) e IndicadorContinuacao (2 · 05.09) no DOM computado. */

const CARD = "Molecules/CardManual"
const INDICADOR = "Atoms/IndicadorContinuacao"
/** Menor disco de ação (ActionDisk sm). */
const MENOR_DISCO_DE_ACAO = 52

/** Posição, tamanho e transform: o que não pode mudar no hover. */
const geometria = (alvo: Locator) =>
  alvo.evaluate((el) => {
    const { x, y, width, height } = el.getBoundingClientRect()
    return { x, y, width, height, transform: getComputedStyle(el).transform }
  })

test("CA7: o card recorta a foto no raio de 16, tem fio de 1px sem sombra e, no hover, só troca fio e rótulo", async ({ page, request }) => {
  const tema = TEMAS_MANUAL.dg
  await abrirStory(page, await idDaStory(request, CARD, "Com foto"), "dg")
  const card = page.getByRole("article").first()
  const lido = await card.evaluate((el) => {
    const e = getComputedStyle(el)
    const caixa = el.getBoundingClientRect()
    const foto = el.querySelector("img")!.getBoundingClientRect()
    return {
      raio: e.borderRadius,
      recorte: e.overflow,
      fio: `${e.borderTopWidth} ${e.borderTopStyle}`,
      sombra: e.boxShadow,
      // a foto sangra até o fio: encosta no topo e nas laterais por dentro da borda
      fotoNoFio: [foto.top - caixa.top, foto.left - caixa.left, caixa.right - foto.right],
    }
  })
  expect(lido).toEqual({ raio: "16px", recorte: "hidden", fio: "1px solid", sombra: "none", fotoNoFio: [1, 1, 1] })
  await expect(card).toHaveCSS("border-top-color", rgb(tema["fio-card"]))

  await abrirStory(page, await idDaStory(request, CARD, "Clicável"), "dg")
  const link = page.getByRole("link").first()
  const rotulo = link.getByText("ensaio", { exact: true })
  await expect(rotulo).toHaveCSS("color", rgb(tema["texto-apoio"]))
  const antes = await geometria(link)
  await link.hover()
  await expect(link).toHaveCSS("border-top-color", rgb(tema.texto))
  await expect(rotulo).toHaveCSS("color", rgb(tema.acento))
  expect(await geometria(link), "nada se move").toEqual(antes)
})

test("CA8: o padding do card é 24 (32 em 6 colunas, 20 abaixo de 768px) e o gap interno é 12", async ({ page, request }) => {
  const corpo = () =>
    page.getByRole("article").first().getByRole("heading").locator("..").evaluate((el) => {
      const e = getComputedStyle(el)
      return { padding: [e.paddingTop, e.paddingRight, e.paddingBottom, e.paddingLeft], gap: e.rowGap }
    })
  const lados = (px: number) => Array(4).fill(`${px}px`)

  await page.setViewportSize({ width: 1280, height: 900 })
  await abrirStory(page, await idDaStory(request, CARD, "Padrão"))
  expect(await corpo(), "padrão").toEqual({ padding: lados(24), gap: "12px" })

  await abrirStory(page, await idDaStory(request, CARD, "Colunas 6"))
  expect(await corpo(), "6 colunas").toEqual({ padding: lados(32), gap: "12px" })

  await page.setViewportSize({ width: 375, height: 800 })
  expect(await corpo(), "6 colunas no celular").toEqual({ padding: lados(20), gap: "12px" })
  await abrirStory(page, await idDaStory(request, CARD, "Padrão"))
  expect(await corpo(), "padrão no celular").toEqual({ padding: lados(20), gap: "12px" })
})

test("CA12: o indicador mede 30/38/44, é menor que o disco de ação, clica em 44px e pinta hover e desabilitado", async ({ page, request }) => {
  const tema = TEMAS_MANUAL.dg
  await abrirStory(page, await idDaStory(request, INDICADOR, "Tamanhos"), "dg")
  for (const [nome, lado] of [["mínimo", 30], ["padrão", 38], ["capa", 44]] as const) {
    const indicador = page.getByRole("button", { name: nome, exact: true })
    const lido = await indicador.evaluate((el) => {
      const e = getComputedStyle(el)
      const { width, height, left, top } = el.getBoundingClientRect()
      const area = getComputedStyle(el, "::before")
      // 21px do centro fica fora do disco de 30/38, mas dentro da área de 44
      const alvo = document.elementFromPoint(left + width / 2, top + height / 2 + 21)
      return {
        lado: [width, height],
        raio: e.borderRadius,
        fio: `${e.borderTopWidth} ${e.borderTopStyle}`,
        fundo: e.backgroundColor,
        seta: getComputedStyle(el.querySelector("svg path")!).strokeWidth,
        area: [area.width, area.height],
        clicaEm44: alvo === el,
      }
    })
    expect.soft(lido, nome).toEqual({
      lado: [lado, lado],
      raio: "50%",
      fio: "1px solid",
      fundo: "rgba(0, 0, 0, 0)",
      seta: "1.4px",
      area: ["44px", "44px"],
      clicaEm44: true,
    })
    expect.soft(lado, `${nome} < disco de ação`).toBeLessThan(MENOR_DISCO_DE_ACAO)
  }

  const padrao = page.getByRole("button", { name: "padrão", exact: true })
  const seta = padrao.locator("svg path")
  await expect(padrao).toHaveCSS("border-top-color", rgb(tema.texto))
  await expect(seta).toHaveCSS("stroke", rgb(tema.texto))
  const antes = await geometria(padrao)
  await padrao.hover()
  await expect(padrao).toHaveCSS("border-top-color", rgb(tema.acento))
  await expect(seta).toHaveCSS("stroke", rgb(tema.acento))
  expect(await geometria(padrao), "nada se move").toEqual(antes)

  await abrirStory(page, await idDaStory(request, INDICADOR, "Desabilitado"), "dg")
  const desabilitado = page.getByRole("button").first()
  await expect(desabilitado).toBeDisabled()
  await desabilitado.hover({ force: true })
  await expect(desabilitado).toHaveCSS("border-top-color", rgb(tema.desabilitado))
  await expect(desabilitado.locator("svg path")).toHaveCSS("stroke", rgb(tema.desabilitado))
})
