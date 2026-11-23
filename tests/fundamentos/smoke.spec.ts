import { expect, test } from "@playwright/test"

/** CA13 (RF13): a página Fundamentos mostra cores, temas, tipografia, espaçamento, raio e fio. */

type EntradaIndice = { id: string; title: string; name: string; type: "story" | "docs" }
type Indice = { entries: Record<string, EntradaIndice> }

const SECOES = ["Cores", "Temas", "Tipografia", "Espaco", "Raio", "Fio"] as const

test("CA13: as 6 seções de Fundamentos existem e renderizam", async ({ page, request }) => {
  const indice = (await (await request.get("/index.json")).json()) as Indice
  const stories = Object.values(indice.entries).filter(
    (e) => e.type === "story" && e.title === "Fundamentos/Visão geral",
  )
  expect(stories.map((e) => e.name).sort()).toEqual([...SECOES].sort())

  for (const story of stories) {
    await page.goto(`/iframe.html?id=${story.id}&viewMode=story`)
    await expect(page.locator("#storybook-root h2").first(), story.name).toBeVisible()
    await expect(page.locator(".sb-show-errordisplay"), story.name).toHaveCount(0)
  }
})
