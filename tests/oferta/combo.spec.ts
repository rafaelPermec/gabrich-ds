import { expect, test, type Page } from "@playwright/test"
import { ECONOMIA_MANUAL, OFERTAS_MANUAL, type TemaManual } from "../fixtures/manual"
import { abrirStory, idDaStory } from "../atomos/storybook"

/** CA5–CA9 (RF7–RF11): Monte seu combo / Monte a sua Black Friday (2 · 05.12) no DOM das stories. */

const TITULO = "Organisms/MonteSeuCombo"

async function abrirCombo(page: Page, request: Parameters<typeof idDaStory>[0], nome: string, tema: TemaManual) {
  await abrirStory(page, await idDaStory(request, TITULO, nome), tema)
  const combo = page.locator("[data-monte-seu-combo]")
  await expect(combo).toHaveCount(1)
  return combo
}

test("CA5: na página do Luz na Prática, o Luz na Prática vem primeiro e marcado; os outros na ordem do manual, desmarcados", async ({ page, request }) => {
  const combo = await abrirCombo(page, request, "Luz na Prática · 1 curso · normal", "lp")
  const itens = combo.getByRole("checkbox")
  await expect(itens).toHaveCount(3)
  await expect(itens.nth(0)).toHaveAccessibleName(/^Luz na Prática/)
  await expect(itens.nth(1)).toHaveAccessibleName(/^Antes da Foto/)
  await expect(itens.nth(2)).toHaveAccessibleName(/^Mais que um Click/)
  await expect(itens.nth(0)).toBeChecked()
  await expect(itens.nth(1)).not.toBeChecked()
  await expect(itens.nth(2)).not.toBeChecked()
})

test("CA6: clicar em qualquer ponto da linha (anel, logo, descritivo ou borda) marca e desmarca; Tab e Espaço também; linha com 44px no mínimo", async ({ page, request }) => {
  const combo = await abrirCombo(page, request, "Luz na Prática · 1 curso · normal", "lp")
  const linha = combo.locator('label[data-curso="adf"]')
  const caixa = combo.getByRole("checkbox", { name: /^Antes da Foto/ })
  const box = (await linha.boundingBox())!
  expect(box.height).toBeGreaterThanOrEqual(44)

  // Quatro pontos da linha: canto esquerdo (anel), logo, descritivo e o fim à direita.
  const pontos: [number, number][] = [[4, box.height / 2], [48, 14], [box.width / 2, box.height - 8], [box.width - 4, box.height / 2]]
  let marcado = false
  for (const [x, y] of pontos) {
    await linha.click({ position: { x, y } })
    marcado = !marcado
    await expect(caixa, `clique em (${Math.round(x)}, ${Math.round(y)})`).toBeChecked({ checked: marcado })
  }

  await caixa.focus()
  await page.keyboard.press("Space")
  await expect(caixa).toBeChecked({ checked: !marcado })
  await expect(combo.getByRole("checkbox", { name: /^Luz na Prática/ })).toBeChecked()
})

type OfertaDoManual = { precoNormal: number; precoBlack: number; descontoCombo?: number; descontoBlack: number; checkout: string; checkoutBlack: string }
const oferta = (slug: string): OfertaDoManual => OFERTAS_MANUAL.find((o) => o.slug === slug)!
/** "R$ 1.641" com o espaço não separável do Intl, como o formatador do DS. */
const reais = (valor: number) => `R$\u00a0${valor.toLocaleString("pt-BR")}`

test("CA7: Luz na Prática + Antes da Foto fora da Black mostra preço separado R$ 644, desconto combo 10%, R$ 577 e você economiza R$ 67", async ({ page, request }) => {
  const combo = await abrirCombo(page, request, "Luz na Prática · 2 cursos · normal", "lp")
  const resumo = combo.locator('[data-parte="resumo"]')
  const esperada = oferta("luz-antes-da-foto")
  const economia = ECONOMIA_MANUAL["luz-antes-da-foto"]!

  await expect(resumo).toHaveAttribute("aria-live", "polite")
  await expect(resumo.locator('[data-linha="separado"]')).toHaveText(`preço separado${reais(economia.separado)}`)
  await expect(resumo.locator('[data-linha="separado"] s')).toHaveCount(0)
  await expect(resumo.locator('[data-linha="desconto"]')).toHaveText(`desconto combo${esperada.descontoCombo}%`)
  await expect(resumo.locator('[data-parte="parcela"]')).toHaveText(`12x R$\u00a059,68`)
  await expect(resumo.locator('[data-parte="a-vista"]')).toHaveText(`ou ${reais(esperada.precoNormal)} à vista`)
  await expect(resumo.locator('[data-parte="economia"]')).toHaveText(`você economiza ${reais(economia.economiaNormal!)}`)
  const botao = resumo.locator('[data-parte="botao"]')
  await expect(botao).toHaveText("quero o combo")
  await expect(botao).toHaveAttribute("href", esperada.checkout)
})

test("CA8: o Completo na Black mostra R$ 1.641 riscado, −57%, R$ 697 e você economiza R$ 944", async ({ page, request }) => {
  const combo = await abrirCombo(page, request, "Luz na Prática · 3 cursos · Black", "lp")
  const resumo = combo.locator('[data-parte="resumo"]')
  const esperada = oferta("completo")
  const economia = ECONOMIA_MANUAL.completo!

  await expect(combo.locator('[data-parte="titulo"]')).toHaveText("monte a sua black friday")
  await expect(resumo.locator('[data-linha="separado"] s')).toHaveText(reais(economia.separado))
  await expect(resumo.locator('[data-linha="desconto"]')).toHaveText(`desconto combo + black friday\u2212${esperada.descontoBlack}%`)
  await expect(resumo.locator('[data-parte="a-vista"]')).toHaveText(`ou ${reais(esperada.precoBlack)} à vista`)
  await expect(resumo.locator('[data-parte="economia"]')).toHaveText(`você economiza ${reais(economia.economiaBlack)}`)
  const botao = resumo.locator('[data-parte="botao"]')
  await expect(botao).toHaveText("quero o completo")
  await expect(botao).toHaveAttribute("href", esperada.checkoutBlack)
})

test("CA9: sem nada marcado, o resumo diz \"marque pelo menos um curso.\" e o botão está desabilitado", async ({ page, request }) => {
  const combo = await abrirCombo(page, request, "Luz na Prática · nada marcado · normal", "lp")
  await expect(combo.getByRole("checkbox", { checked: true })).toHaveCount(0)
  const resumo = combo.locator('[data-parte="resumo"]')
  await expect(resumo).toContainText("marque pelo menos um curso.")
  const botao = resumo.locator('[data-parte="botao"]')
  await expect(botao).toBeDisabled()
  await expect(botao).not.toHaveAttribute("href")
  await expect(resumo.locator('[data-parte="a-vista"]')).toHaveCount(0)
})
