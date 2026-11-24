import { expect, test } from "@playwright/test"
import { TEMAS_MANUAL } from "../fixtures/manual"
import { abrirStory, idDaStory, rgb, storiesDoIndice } from "./storybook"

/**
 * CA14 (RF13): todo átomo interativo do manual tem a story "Foco (proposta)", e o foco de
 * teclado é um contorno de 2px na cor do texto, afastado 2px. As próximas tasks acrescentam
 * os átomos delas em INTERATIVOS.
 */

const STORY_FOCO = "Foco (proposta)"

const INTERATIVOS = [
  { titulo: "Atoms/Botao", papel: "button" as const },
  { titulo: "Molecules/CardManual", papel: "link" as const },
  { titulo: "Atoms/IndicadorContinuacao", papel: "button" as const },
]

test("CA14: todo átomo interativo tem a story \"Foco (proposta)\"", async ({ request }) => {
  const stories = await storiesDoIndice(request)
  const semFoco = INTERATIVOS.filter(
    ({ titulo }) => !stories.some((e) => e.title === titulo && e.name === STORY_FOCO),
  ).map(({ titulo }) => titulo)
  expect(semFoco).toEqual([])
})

for (const { titulo, papel } of INTERATIVOS) {
  test(`CA14: ${titulo} recebe foco de teclado com contorno de 2px na cor do texto, afastado 2px`, async ({ page, request }) => {
    const id = await idDaStory(request, titulo, STORY_FOCO)
    for (const tema of ["dg", "dg-claro"] as const) {
      await abrirStory(page, id, tema)
      await page.keyboard.press("Tab")
      const alvo = page.getByRole(papel).first()
      await expect(alvo, tema).toBeFocused()
      await expect.soft(alvo, `${tema} outline`).toHaveCSS("outline-style", "solid")
      await expect.soft(alvo, `${tema} outline`).toHaveCSS("outline-width", "2px")
      await expect.soft(alvo, `${tema} outline`).toHaveCSS("outline-color", rgb(TEMAS_MANUAL[tema].texto))
      await expect.soft(alvo, `${tema} outline`).toHaveCSS("outline-offset", "2px")
    }
  })
}
