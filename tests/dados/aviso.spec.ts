import { expect, test, type Page } from "@playwright/test"

/**
 * RF5: no Storybook (modo aviso), dado inválido mostra o aviso e o conteúdo continua visível.
 * Fora dele (modo console), não há aviso e o problema vai para o console.
 */

const STORY = "/iframe.html?viewMode=story&id=atoms-avisodadoinvalido--"

async function abrir(page: Page, story: string) {
  await page.goto(`${STORY}${story}`)
  await expect(page.getByTestId("conteudo-validado")).toBeVisible()
}

test("CA3: oferta inválida mostra o aviso e o conteúdo continua visível", async ({ page }) => {
  await abrir(page, "oferta-invalida")
  const aviso = page.getByRole("alert")
  await expect(aviso).toBeVisible()
  await expect(aviso).toContainText("precoBlack menor que precoNormal")
  await expect(aviso).toContainText("descontoBlack: inteiro entre 0 e 100")
})

test("CA4: campanha inválida mostra o aviso; no modo console, só o console", async ({ page }) => {
  await abrir(page, "campanha-invalida")
  await expect(page.getByRole("alert")).toContainText("inicioUltimaSemana antes de abertura")

  const erros: string[] = []
  page.on("console", (msg) => {
    if (msg.type() === "error") erros.push(msg.text())
  })
  await abrir(page, "modo-console")
  await expect.poll(() => erros.join("\n")).toContain("inicioUltimaSemana antes de abertura")
  await expect(page.getByRole("alert")).toHaveCount(0)
  expect(erros.filter((e) => e.includes("inicioUltimaSemana antes de abertura"))).toHaveLength(1)
})
