import { expect, test } from "@playwright/test"
import { TEMAS_MANUAL } from "../fixtures/manual"
import { abrirStory, idDaStory, rgb } from "./storybook"

/** CA11 (RF10) e CA13 (RF12): Marcador (2 · 05.08) e LogoCurso no DOM computado. */

const MARCADOR = "Atoms/Marcador"
const LOGO = "Atoms/LogoCurso"

test("CA11: ponto de 7px no acento com gap de 8, disco numerado de 20px em Space Mono 9 e anel de 20px com fio de 1,5px", async ({ page, request }) => {
  const tema = TEMAS_MANUAL.dg
  await abrirStory(page, await idDaStory(request, MARCADOR, "Tipos"), "dg")

  const ponto = page.getByTestId("ponto")
  const lidoPonto = await ponto.evaluate((el) => {
    const e = getComputedStyle(el)
    const texto = el.nextElementSibling!.getBoundingClientRect()
    return {
      lado: [e.width, e.height],
      raio: e.borderRadius,
      gap: Math.round(texto.left - el.getBoundingClientRect().right),
    }
  })
  expect(lidoPonto).toEqual({ lado: ["7px", "7px"], raio: "50%", gap: 8 })
  await expect(ponto).toHaveCSS("background-color", rgb(tema.acento))

  const numero = page.getByTestId("numero")
  await expect(numero).toHaveText("02")
  const lidoNumero = await numero.evaluate((el) => {
    const e = getComputedStyle(el)
    return {
      lado: [e.width, e.height],
      raio: e.borderRadius,
      fio: `${e.borderTopWidth} ${e.borderTopStyle}`,
      fonte: [e.fontFamily.split(",")[0]!.replace(/["']/g, ""), e.fontSize],
      fundo: e.backgroundColor,
    }
  })
  expect(lidoNumero).toEqual({
    lado: ["20px", "20px"],
    raio: "50%",
    fio: "1px solid",
    fonte: ["Space Mono", "9px"],
    fundo: "rgba(0, 0, 0, 0)",
  })
  await expect(numero).toHaveCSS("color", rgb(tema.texto))

  for (const [id, marcado] of [["selecao-marcada", true], ["selecao", false]] as const) {
    const anel = page.getByTestId(id)
    await expect(anel, `${id} é só visual`).toHaveAttribute("aria-hidden", "true")
    const lido = await anel.evaluate((el) => {
      const e = getComputedStyle(el)
      const circulo = el.querySelector("svg circle")!
      const anelSvg = circulo.closest("svg")!.getBoundingClientRect()
      const miolo = el.querySelector(":scope > span") ? getComputedStyle(el.querySelector(":scope > span")!) : null
      return {
        lado: [e.width, e.height],
        raio: e.borderRadius,
        // anel em SVG (o Chrome arredonda borda de 1,5px para 1px em tela 1x), do tamanho do marcador
        anel: [anelSvg.width, anelSvg.height, getComputedStyle(circulo).strokeWidth, getComputedStyle(circulo).fill],
        ponto: miolo && miolo.display !== "none" ? [miolo.width, miolo.height, miolo.borderRadius] : null,
      }
    })
    expect.soft(lido, id).toEqual({
      lado: ["20px", "20px"],
      raio: "50%",
      anel: [20, 20, "1.5px", "none"],
      ponto: marcado ? ["8px", "8px", "50%"] : null,
    })
    await expect.soft(anel.locator("circle"), id).toHaveCSS("stroke", rgb(tema.texto))
  }
  await expect(page.getByTestId("selecao-marcada").locator("span")).toHaveCSS("background-color", rgb(tema.acento))
})

test("CA13: a logo de cada curso é uma máscara de SVG que assume a cor do texto no tema claro e no escuro", async ({ page, request }) => {
  test.slow() // percorre os 10 temas
  const id = await idDaStory(request, LOGO, "Cursos")
  const cursos = ["Luz na Prática", "Mais que um Click", "Antes da Foto", "No Estúdio"]
  for (const tema of ["dg", "dg-claro", "lp", "lp-claro", "mqc", "mqc-claro", "adf", "adf-claro", "ne", "ne-claro"] as const) {
    await abrirStory(page, id, tema)
    for (const curso of cursos) {
      for (const logo of await page.getByRole("img", { name: curso, exact: true }).all()) {
        await expect.soft(logo, `${tema} · ${curso}`).toHaveCSS("background-color", rgb(TEMAS_MANUAL[tema].texto))
      }
    }
  }

  // cada curso nas duas variantes, com SVG servido e tamanho visível
  const logos = await page.getByRole("img").evaluateAll((els) =>
    els.map((el) => {
      const e = getComputedStyle(el)
      const { width, height } = el.getBoundingClientRect()
      return { nome: el.getAttribute("aria-label"), mascara: /url\("?([^")]+)"?\)/.exec(e.maskImage)?.[1] ?? "", width, height }
    }),
  )
  expect(logos.map((l) => l.nome).sort()).toEqual([...cursos, ...cursos].sort())
  for (const logo of logos) {
    expect.soft(logo.width * logo.height, `${logo.nome} visível`).toBeGreaterThan(0)
    const resposta = await page.request.get(logo.mascara)
    expect.soft(resposta.ok(), `${logo.nome}: ${logo.mascara}`).toBe(true)
    expect.soft(await resposta.text(), `${logo.nome} é SVG`).toContain("<svg")
  }
})
