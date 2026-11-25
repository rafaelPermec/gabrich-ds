import { expect, test } from "@playwright/test"
import { TEMAS_MANUAL } from "../fixtures/manual"
import { abrirStory, idDaStory, rgb } from "./storybook"

/** CA5, CA6 (RF5, RF6): a etiqueta do manual (2 · 05.02, o Badge), medida no DOM computado das stories. */

const TITULO = "Atoms/Badge"
const TRANSPARENTE = "rgba(0, 0, 0, 0)"

test("CA5: sozinha é traçada; duas ou mais em linha são cheias, com gap de 4 na Black e 8 na marca mãe", async ({ page, request }) => {
  const tema = TEMAS_MANUAL.dg

  await abrirStory(page, await idDaStory(request, TITULO, "Sozinha"), "dg")
  const sozinha = page.getByText("última semana", { exact: true })
  expect(
    await sozinha.evaluate((el) => {
      const e = getComputedStyle(el)
      return {
        fundo: e.backgroundColor,
        texto: e.color,
        fio: `${e.borderTopWidth} ${e.borderTopStyle} ${e.borderTopColor}`,
        raio: e.borderRadius,
        sombra: e.boxShadow,
        familia: e.fontFamily,
        peso: e.fontWeight,
        fonte: e.fontSize,
        caixa: e.textTransform,
        tracking: e.letterSpacing,
        padding: e.padding,
      }
    }),
  ).toEqual({
    fundo: TRANSPARENTE,
    texto: rgb(tema.texto),
    fio: `1px solid ${rgb(tema.texto)}`,
    raio: "0px",
    sombra: "none",
    familia: expect.stringMatching(/^"?Space Mono"?/),
    peso: "400",
    fonte: "9px",
    caixa: "uppercase",
    tracking: "0.72px",
    padding: "4px 8px",
  })

  for (const [story, gap] of [["Grupo da Black", "4px"], ["Grupo da marca mãe", "8px"]] as const) {
    await abrirStory(page, await idDaStory(request, TITULO, story), "dg")
    const etiquetas = page.locator("#storybook-root [data-etiqueta]")
    await expect(etiquetas, story).toHaveCount(2)
    await expect.soft(etiquetas.first().locator(".."), `${story} gap`).toHaveCSS("column-gap", gap)
    for (const etiqueta of await etiquetas.all()) {
      await expect.soft(etiqueta, `${story} cheia`).not.toHaveCSS("background-color", TRANSPARENTE)
      await expect.soft(etiqueta, `${story} fio`).toHaveCSS("border-top-width", "1px")
    }
    // a segunda (sem acento) é cheia na cor do texto, com o texto na cor do fundo
    await expect.soft(etiquetas.nth(1), story).toHaveCSS("background-color", rgb(tema.texto))
    await expect.soft(etiquetas.nth(1), story).toHaveCSS("color", rgb(tema.fundo))
  }

  // cheia em acento: o texto segue o tema mais próximo, mesmo com um tema dentro de outro
  await abrirStory(page, await idDaStory(request, TITULO, "Fundo escuro e claro"), "dg-claro")
  for (const [painel, esperado] of [
    ["dg", TEMAS_MANUAL.dg["botao-texto"]],
    ["dg-claro", TEMAS_MANUAL["dg-claro"].texto],
  ] as const) {
    const noAcento = page.locator(`#storybook-root [data-tema="${painel}"]`).last().getByText("black friday", { exact: true })
    await expect.soft(noAcento, `texto no acento · painel ${painel}`).toHaveCSS("color", rgb(esperado))
  }
})

test("CA6: a etiqueta da marca mãe em peça tem padding 8 × 12 e altura mínima de 28px", async ({ page, request }) => {
  await abrirStory(page, await idDaStory(request, TITULO, "Peça"), "dg")
  const peca = page.locator("#storybook-root [data-etiqueta]").first()
  const lido = await peca.evaluate((el) => {
    const e = getComputedStyle(el)
    return { padding: e.padding, alturaMinima: e.minHeight, altura: el.getBoundingClientRect().height }
  })
  expect(lido.padding).toBe("8px 12px")
  expect(lido.alturaMinima).toBe("28px")
  expect(lido.altura).toBeGreaterThanOrEqual(28)
})
