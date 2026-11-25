import { expect, test, type Locator } from "@playwright/test"
import { TEMAS_MANUAL, type TemaManual } from "../fixtures/manual"
import { abrirStory, idDaStory, rgb } from "./storybook"

/** CA9 (RF8, R14) e CA10 (RF9): SeloDesconto (2 · 05.06) e SeloGarantia (2 · 05.07) no DOM computado. */

const DESCONTO = "Atoms/SeloDesconto"
const GARANTIA = "Atoms/SeloGarantia"
const OCRE = rgb(TEMAS_MANUAL.dg.acento)

const fonte = (el: Element) => {
  const e = getComputedStyle(el)
  return {
    familia: e.fontFamily.split(",")[0]!.replace(/["']/g, ""),
    peso: e.fontWeight,
    corpo: e.fontSize,
    tracking: e.letterSpacing,
    caixa: e.textTransform,
  }
}

const caixa = (alvo: Locator) =>
  alvo.evaluate((el) => {
    const e = getComputedStyle(el)
    return {
      lado: [el.getBoundingClientRect().width, el.getBoundingClientRect().height],
      minimo: e.minWidth,
      raio: e.borderRadius,
      fio: `${e.borderTopWidth} ${e.borderTopStyle}`,
      sombra: e.boxShadow,
    }
  })

test("CA9: o selo de desconto só aparece nas fases da Black; o quadrado mede 120 com fio ocre (preto no papel) e a linha tem duas etiquetas cheias", async ({ page, request }) => {
  const dg = TEMAS_MANUAL.dg
  await abrirStory(page, await idDaStory(request, DESCONTO, "Fases"), "dg")
  for (const fase of ["normal", "lista-de-espera", "encerrada"]) {
    await expect.soft(page.getByTestId(`fase-${fase}`), `${fase}: nada`).toBeEmpty()
  }
  for (const fase of ["aberta", "ultima-semana", "ultimas-24h"]) {
    await expect.soft(page.getByTestId(`fase-${fase}`), `${fase}: selo`).toHaveText("50% black friday")
  }

  await abrirStory(page, await idDaStory(request, DESCONTO, "Formas"), "dg")
  const quadrado = page.getByTestId("quadrado")
  expect(await caixa(quadrado)).toEqual({ lado: [120, 120], minimo: "88px", raio: "0px", fio: "1px solid", sombra: "none" })
  await expect(quadrado).toHaveCSS("border-top-color", OCRE)
  const [numero, rotulo] = await quadrado.locator(":scope > *").all()
  await expect(numero!).toHaveText("50%")
  expect(await numero!.evaluate(fonte)).toEqual({ familia: "Urbanist", peso: "600", corpo: "44px", tracking: "-0.88px", caixa: "none" })
  await expect(numero!).toHaveCSS("color", rgb(dg.texto))
  await expect(rotulo!).toHaveText("black friday")
  expect(await rotulo!.evaluate(fonte)).toEqual({ familia: "Space Mono", peso: "400", corpo: "7.5px", tracking: "0.9px", caixa: "uppercase" })
  await expect(rotulo!).toHaveCSS("color", OCRE)

  const etiquetas = page.getByTestId("linha").locator("[data-etiqueta]")
  await expect(etiquetas).toHaveText(["−50%", "black friday"])
  await expect(etiquetas.nth(0)).toHaveCSS("background-color", OCRE)
  await expect(etiquetas.nth(1)).toHaveCSS("background-color", rgb(dg.texto))

  // no papel: fio e rótulo em preto (a cor do texto do dg-claro)
  const claro = TEMAS_MANUAL["dg-claro"]
  await abrirStory(page, await idDaStory(request, DESCONTO, "No papel"), "dg-claro")
  const papel = page.getByTestId("quadrado")
  await expect(papel).toHaveCSS("border-top-color", rgb(claro.texto))
  await expect(papel.getByText("black friday", { exact: true })).toHaveCSS("color", rgb(claro.texto))
  await expect(papel.getByText("50%", { exact: true })).toHaveCSS("color", rgb(claro.texto))
})

test("CA10: o selo de garantia diz \"7 dias de garantia\", tem raio 0, nunca usa ocre e mostra o placeholder no lugar do ícone", async ({ page, request }) => {
  test.slow() // percorre os 10 temas
  const id = await idDaStory(request, GARANTIA, "Formas")
  for (const tema of Object.keys(TEMAS_MANUAL) as TemaManual[]) {
    const cores = TEMAS_MANUAL[tema]
    await abrirStory(page, id, tema)
    for (const forma of ["linha", "quadrado"] as const) {
      const selo = page.getByTestId(forma)
      const rotulo = `${tema} · ${forma}`
      await expect.soft(selo, rotulo).toHaveText("7 dias de garantia")
      await expect.soft(selo, rotulo).toHaveCSS("border-radius", "0px")
      await expect.soft(selo, rotulo).toHaveCSS("border-top-color", rgb(cores["selo-garantia"]))
      const usadas = await selo.evaluate((raiz) =>
        [raiz, ...raiz.querySelectorAll("*")].flatMap((el) => {
          const e = getComputedStyle(el)
          return [e.color, e.backgroundColor, e.borderTopColor, e.stroke, e.fill]
        }),
      )
      expect.soft(usadas, `${rotulo}: sem ocre`).not.toContain(OCRE)
    }
  }

  // medidas no dg
  await abrirStory(page, id, "dg")
  const linha = page.getByTestId("linha")
  const lidoLinha = await linha.evaluate((el) => {
    const e = getComputedStyle(el)
    return { padding: e.padding, gap: e.columnGap, fio: `${e.borderTopWidth} ${e.borderTopStyle}` }
  })
  expect(lidoLinha).toEqual({ padding: "12px 16px", gap: "12px", fio: "1px solid" })
  const placeholder = linha.locator('[data-placeholder="icone-aprovacao"]')
  await expect(placeholder).toHaveAttribute("aria-hidden", "true")
  expect(await placeholder.evaluate((el) => [el.getBoundingClientRect().width, el.getBoundingClientRect().height])).toEqual([22, 22])
  expect(await linha.getByText("7 dias de garantia", { exact: true }).evaluate(fonte)).toEqual({
    familia: "Space Mono",
    peso: "400",
    corpo: "9px",
    tracking: "0.9px",
    caixa: "uppercase",
  })

  const quadrado = page.getByTestId("quadrado")
  expect(await caixa(quadrado)).toEqual({ lado: [120, 120], minimo: "88px", raio: "0px", fio: "1px solid", sombra: "none" })
  expect(await quadrado.getByText("7", { exact: true }).evaluate(fonte)).toMatchObject({ familia: "Urbanist", peso: "600" })
})
