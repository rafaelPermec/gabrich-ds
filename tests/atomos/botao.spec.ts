import { expect, test } from "@playwright/test"
import { TEMAS_MANUAL, TEMAS_SUBMARCA } from "../fixtures/manual"
import { abrirStory, idDaStory, rgb } from "./storybook"

/** CA1–CA4 (RF1–RF4): o Botao do manual (2 · 05.01), medido no DOM computado das stories. */

const TITULO = "Atoms/Botao"
const TRANSPARENTE = "rgba(0, 0, 0, 0)"

test("CA1: os três tamanhos têm altura, padding, tipografia e raio do manual, sem seta", async ({ page, request }) => {
  await abrirStory(page, await idDaStory(request, TITULO, "Tamanhos"))
  const esperado = {
    grande: { altura: 56, padding: 24, fonte: 14 },
    médio: { altura: 48, padding: 24, fonte: 13 },
    pequeno: { altura: 44, padding: 16, fonte: 12 },
  }
  for (const [nome, medida] of Object.entries(esperado)) {
    const botao = page.getByRole("button", { name: nome, exact: true })
    const lido = await botao.evaluate((el) => {
      const e = getComputedStyle(el)
      const depois = getComputedStyle(el, "::after").content
      const antes = getComputedStyle(el, "::before").content
      return {
        altura: el.getBoundingClientRect().height,
        paddingEsq: e.paddingLeft,
        paddingDir: e.paddingRight,
        familia: e.fontFamily,
        peso: e.fontWeight,
        fonte: e.fontSize,
        caixa: e.textTransform,
        tracking: e.letterSpacing,
        raio: e.borderRadius,
        seta: el.querySelectorAll("svg, img").length + (depois !== "none" ? 1 : 0) + (antes !== "none" ? 1 : 0),
      }
    })
    expect.soft(lido, nome).toEqual({
      altura: medida.altura,
      paddingEsq: `${medida.padding}px`,
      paddingDir: `${medida.padding}px`,
      familia: expect.stringMatching(/^"?Manrope"?/),
      peso: "600",
      fonte: `${medida.fonte}px`,
      caixa: "uppercase",
      tracking: `${+(medida.fonte * 0.16).toFixed(2)}px`,
      raio: "0px",
      seta: 0,
    })
  }
})

test("CA2: hover e toque trocam só o fundo para --botao-hover; o tamanho não muda", async ({ page, request }) => {
  await abrirStory(page, await idDaStory(request, TITULO, "Padrão"), "dg")
  const botao = page.getByRole("button", { name: "quero garantir" })
  const medir = () =>
    botao.evaluate((el) => {
      const e = getComputedStyle(el)
      const { width, height } = el.getBoundingClientRect()
      return { fundo: e.backgroundColor, texto: e.color, borda: e.borderColor, transform: e.transform, width, height }
    })
  const tema = TEMAS_MANUAL.dg
  const antes = await medir()
  expect(antes.fundo).toBe(rgb(tema.botao))

  await botao.hover()
  const emHover = await medir()
  expect(emHover).toEqual({ ...antes, fundo: rgb(tema["botao-hover"]) })

  await page.mouse.down()
  expect(await medir(), "pressionado").toEqual({ ...antes, fundo: rgb(tema["botao-hover"]) })
  await page.mouse.up()
})

test("CA3: desabilitado não tem preenchimento, tem fio de 1px e texto em --desabilitado", async ({ page, request }) => {
  await abrirStory(page, await idDaStory(request, TITULO, "Desabilitado"), "dg")
  const tema = TEMAS_MANUAL.dg
  const botoes = page.locator("#storybook-root button")
  await expect(botoes).not.toHaveCount(0)
  for (const botao of await botoes.all()) {
    await expect(botao).toBeDisabled()
    await expect(botao).toHaveCSS("background-color", TRANSPARENTE)
    await expect(botao).toHaveCSS("border-top-width", "1px")
    await expect(botao).toHaveCSS("border-top-style", "solid")
    await expect(botao).toHaveCSS("border-top-color", rgb(tema.desabilitado))
    await expect(botao).toHaveCSS("color", rgb(tema.desabilitado))
    await expect(botao).toHaveCSS("box-shadow", "none")
  }
})

test("CA4: a variante ação tem o fundo na cor de ação de cada curso", async ({ page, request }) => {
  test.slow() // percorre os 8 temas das submarcas
  const id = await idDaStory(request, TITULO, "Variantes")
  for (const tema of TEMAS_SUBMARCA) {
    await abrirStory(page, id, tema)
    const acao = page.getByRole("button", { name: "ação", exact: true })
    await expect.soft(acao, tema).toHaveCSS("background-color", rgb(TEMAS_MANUAL[tema].acento))
  }
})

test("CA4: com largura total, ocupa a coluna abaixo de 768px e segue o texto acima", async ({ page, request }) => {
  const id = await idDaStory(request, TITULO, "Largura total")
  const larguras = async () =>
    page.getByRole("button", { name: "quero garantir" }).evaluate((el) => ({
      botao: el.getBoundingClientRect().width,
      coluna: el.parentElement!.clientWidth - parseFloat(getComputedStyle(el.parentElement!).paddingLeft) - parseFloat(getComputedStyle(el.parentElement!).paddingRight),
    }))

  await page.setViewportSize({ width: 375, height: 720 })
  await abrirStory(page, id)
  const celular = await larguras()
  expect(celular.botao).toBe(celular.coluna)

  await page.setViewportSize({ width: 1280, height: 720 })
  const desktop = await larguras()
  expect(desktop.botao).toBeLessThan(desktop.coluna)
})

test("decisão 2026-11-24: nos temas claros, a ação tem texto --texto e, no hover, vira o hover do sólido", async ({ page, request }) => {
  const id = await idDaStory(request, TITULO, "Variantes")
  for (const tema of ["dg-claro", "lp-claro", "mqc-claro", "ne-claro"] as const) {
    await abrirStory(page, id, tema)
    const t = TEMAS_MANUAL[tema]
    const acao = page.getByRole("button", { name: "ação", exact: true })
    await expect.soft(acao, `${tema} padrão`).toHaveCSS("color", rgb(t.texto))
    await acao.hover()
    await expect.soft(acao, `${tema} hover fundo`).toHaveCSS("background-color", rgb(t["botao-hover"]))
    await expect.soft(acao, `${tema} hover texto`).toHaveCSS("color", rgb(t["botao-texto"]))
    await page.mouse.move(0, 0)
  }
})
