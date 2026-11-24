import { expect, type APIRequestContext, type Page } from "@playwright/test"
import type { TemaManual } from "../fixtures/manual"

/** Acesso às stories dos átomos do manual: índice do Storybook e abertura com o tema da toolbar. */

export type EntradaIndice = { id: string; title: string; name: string; type: "story" | "docs" }
type Indice = { entries: Record<string, EntradaIndice> }

export async function storiesDoIndice(request: APIRequestContext): Promise<EntradaIndice[]> {
  const indice = (await (await request.get("/index.json")).json()) as Indice
  return Object.values(indice.entries).filter((e) => e.type === "story")
}

export async function idDaStory(request: APIRequestContext, titulo: string, nome: string): Promise<string> {
  const story = (await storiesDoIndice(request)).find((e) => e.title === titulo && e.name === nome)
  expect(story, `story ${titulo} › ${nome}`).toBeDefined()
  return story!.id
}

/** Abre a story no tema da toolbar (`data-tema`) e espera a renderização e as fontes. */
export async function abrirStory(page: Page, id: string, tema: TemaManual = "dg") {
  await page.goto(`/iframe.html?id=${id}&viewMode=story&globals=tema:${tema};campanha:nenhuma`)
  await expect(page.locator(`#storybook-root [data-tema="${tema}"]`).first()).toBeAttached()
  await page.waitForFunction(() => (document.querySelector("#storybook-root")?.childElementCount ?? 0) > 0)
  await page.evaluate(async () => {
    await document.fonts.ready
  })
}

/** `#RRGGBB` → `rgb(r, g, b)`, como o navegador devolve em estilos computados. */
export function rgb(hex: string): string {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
  return `rgb(${r}, ${g}, ${b})`
}
