import { expect, test, type Page } from "@playwright/test"
import { LISTAS_MANUAL, OFERTA_NO_ESTUDIO_MANUAL, type TemaManual } from "../fixtures/manual"
import { abrirStory, idDaStory, rgb, storiesDoIndice } from "../atomos/storybook"

/** CA1, CA2, CA10, CA12 (RF1–RF5, RF12, RF14): CardPreco (2 · 05.05b) no DOM computado das stories. */

const TITULO = "Molecules/CardPreco"

/** Ordem do manual: logo · tipo · etiqueta da Black · "de R$ X por" · 12x · à vista · fio · lista · botão · linha. */
const ORDEM_BLACK = ["logo", "tipo", "etiqueta", "de-por", "parcela", "a-vista", "fio", "lista", "botao", "garantia"]

async function abrirCard(page: Page, request: Parameters<typeof idDaStory>[0], nome: string, tema: TemaManual) {
  await abrirStory(page, await idDaStory(request, TITULO, nome), tema)
  const card = page.locator("[data-card-preco]")
  await expect(card).toHaveCount(1)
  return card
}

const partes = (page: Page) =>
  page.locator("[data-card-preco] > [data-parte]").evaluateAll((els) => els.map((el) => el.getAttribute("data-parte")))

test("CA1: o card do Luz na Prática na Black segue a ordem do manual, com raio 16 e as cores do Luz na Prática", async ({ page, request }) => {
  const card = await abrirCard(page, request, "Luz na Prática · Black · escuro", "lp")
  expect(await partes(page)).toEqual(ORDEM_BLACK)

  await expect(card).toHaveAttribute("data-tema", "lp")
  await expect(card).toHaveCSS("border-top-left-radius", "16px")
  await expect(card).toHaveCSS("box-shadow", "none")
  await expect(card).toHaveCSS("background-color", rgb("#2A241F"))
  await expect(card).toHaveCSS("border-top-color", rgb("#6B4F3A"))
  await expect(card).toHaveCSS("border-top-width", "1px")

  const parte = (nome: string) => card.locator(`> [data-parte="${nome}"]`)
  await expect(parte("tipo")).toHaveText("CURSO ONLINE")
  await expect(parte("tipo")).toHaveCSS("color", rgb("#F4F0E8"))

  const etiquetas = parte("etiqueta").locator("[data-etiqueta]")
  await expect(etiquetas).toHaveText(["-50%", "BLACK FRIDAY"])
  await expect(etiquetas.nth(0)).toHaveCSS("background-color", rgb("#D9A648"))
  await expect(etiquetas.nth(0)).toHaveCSS("color", rgb("#0B0B0B"))
  await expect(etiquetas.nth(1)).toHaveCSS("background-color", rgb("#0B0B0B"))
  await expect(etiquetas.nth(1)).toHaveCSS("color", rgb("#F4F0E8"))
  for (const i of [0, 1]) await expect(etiquetas.nth(i)).toHaveCSS("border-top-left-radius", "0px")

  // "de R$ X por": X riscado é o preço normal; parcela e à vista da Black, em Montserrat 700.
  await expect(parte("de-por")).toHaveText("de R$ 447 por")
  await expect(parte("de-por").locator("s")).toHaveText("447")
  await expect(parte("parcela")).toHaveText("12x R$ 22,44")
  await expect(parte("a-vista")).toHaveText("ou R$ 217 à vista")
  for (const nome of ["parcela", "a-vista"]) {
    await expect(parte(nome)).toHaveCSS("font-family", /^Montserrat/)
    await expect(parte(nome)).toHaveCSS("font-weight", "700")
  }

  await expect(parte("fio")).toHaveCSS("border-top-color", rgb("#6B4F3A"))
  await expect(parte("lista").locator("li")).toHaveText([...LISTAS_MANUAL.lp])

  const botao = parte("botao")
  await expect(botao).toHaveText("garantir com 50%")
  await expect(botao).toHaveCSS("background-color", rgb("#D9A648"))
  await expect(botao).toHaveCSS("color", rgb("#1E1A17"))
  await expect(botao).toHaveCSS("border-top-left-radius", "0px")
  await expect(botao).toHaveCSS("text-transform", "uppercase")
  await expect(parte("garantia")).toHaveText("PAGAMENTO SEGURO · GARANTIA DE 7 DIAS")
})

test("CA2: o card do Antes da Foto fora da Black diz \"quero o e-book\", sem etiqueta nem \"de R$ X por\"", async ({ page, request }) => {
  const card = await abrirCard(page, request, "Antes da Foto · normal · escuro", "adf")
  expect(await partes(page)).toEqual(ORDEM_BLACK.filter((p) => p !== "etiqueta" && p !== "de-por"))
  await expect(card.locator('> [data-parte="tipo"]')).toHaveText("E-BOOK")
  const botao = card.locator('> [data-parte="botao"]')
  await expect(botao).toHaveText("quero o e-book")
  await expect(botao).toHaveCSS("text-transform", "none")
  await expect(card.locator('> [data-parte="parcela"]')).toHaveCSS("font-family", /^Parkinsans/)
})

test("CA10: sem link, o botão aponta para o id de checkout da oferta; com link, para o link", async ({ page, request }) => {
  const esperados: [string, TemaManual, string][] = [
    ["Antes da Foto · normal · escuro", "adf", "#checkout-antes-da-foto"],
    ["Mais que um Click · Black · claro", "mqc-claro", "#checkout-bf26-mais-que-um-click"],
    ["Com link de checkout", "lp", "https://pay.hotmart.com/exemplo-luz-na-pratica"],
  ]
  for (const [nome, tema, href] of esperados) {
    const card = await abrirCard(page, request, nome, tema)
    await expect.soft(card.locator('> [data-parte="botao"]'), nome).toHaveAttribute("href", href)
  }
})

test("CA12 + CA3: o No Estúdio mostra 12x e à vista do dado, sem \"de R$ X por\" nem Black, e o botão vai ao checkout dele", async ({ page, request }) => {
  const nomes = (await storiesDoIndice(request)).filter((e) => e.title === TITULO).map((e) => e.name)
  expect(nomes.filter((n) => n.startsWith("No Estúdio")).sort()).toEqual(["No Estúdio · normal · claro", "No Estúdio · normal · escuro"])

  const card = await abrirCard(page, request, "No Estúdio · normal · escuro", "ne")
  expect(await partes(page)).toEqual(["logo", "tipo", "vagas", "parcela", "a-vista", "fio", "lista", "botao", "garantia"])
  const parte = (nome: string) => card.locator(`> [data-parte="${nome}"]`)
  await expect(parte("tipo")).toHaveText("WORKSHOP FOTOGRAFIA DE PRODUTOS")
  await expect(parte("vagas")).toHaveText("VAGAS LIMITADAS PARA O WORKSHOP PRESENCIAL")
  await expect(parte("vagas")).toHaveCSS("color", rgb("#D57D3D"))
  await expect(parte("parcela")).toHaveText("12x R$ 160,00")
  await expect(parte("a-vista")).toHaveText("ou R$ 1.547,00 à vista")
  await expect(parte("parcela")).toHaveCSS("font-family", /^Urbanist/)
  await expect(parte("parcela")).toHaveCSS("text-align", "center")
  await expect(parte("a-vista")).toHaveCSS("font-weight", "600")
  const botao = parte("botao")
  await expect(botao).toHaveText("quero me inscrever no workshop")
  await expect(botao).toHaveAttribute("href", OFERTA_NO_ESTUDIO_MANUAL.checkout)
  await expect(card.locator("[data-etiqueta]")).toHaveCount(0)
})
