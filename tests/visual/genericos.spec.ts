import { expect, test, type Page } from "@playwright/test"
import { GENERICOS, TEMAS_GENERICOS } from "../fixtures/genericos"

/** CA14 (RF14): as stories dos genéricos não mudam de visual com a troca dos tokens. */

type EntradaIndice = { id: string; title: string; type: "story" | "docs" }
type Indice = { entries: Record<string, EntradaIndice> }

async function abrirStory(page: Page, id: string, tema: string) {
  await page.goto(`/iframe.html?id=${id}&viewMode=story&globals=theme:${tema};vertical:none`)
  await page.waitForFunction(
    () => (document.querySelector("#storybook-root")?.childElementCount ?? 0) > 0,
  )
  // `fonts.ready` não espera fontes ainda não pedidas; carregar todas as declaradas
  // garante o mesmo texto em toda execução.
  await page.evaluate(async () => {
    await Promise.all([...document.fonts].map((fonte) => fonte.load().catch(() => fonte)))
    await document.fonts.ready
  })
}

for (const titulo of GENERICOS) {
  test(`${titulo} mantém o visual nos temas antigos`, async ({ page, request }) => {
    const resposta = await request.get("/index.json")
    const indice = (await resposta.json()) as Indice
    const stories = Object.values(indice.entries).filter(
      (entrada) => entrada.type === "story" && entrada.title === titulo,
    )
    expect(stories.length, `${titulo} sem stories no Storybook`).toBeGreaterThan(0)

    for (const tema of TEMAS_GENERICOS) {
      for (const story of stories) {
        await abrirStory(page, story.id, tema)
        await expect
          .soft(page, `${story.id} (${tema})`)
          .toHaveScreenshot(`${story.id}--${tema}.png`, { fullPage: true })
      }
    }
  })
}
