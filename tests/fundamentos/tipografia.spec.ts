import { expect, test, type Page } from "@playwright/test"
import {
  FONTES_GOOGLE,
  TIPOGRAFIA_MANUAL,
  type MarcaTipografia,
  type NivelTipografico,
} from "../fixtures/manual"

/** CA4, CA5, CA6: tokens de subfonte (2 · 02) e fontes baixadas (2 · 06), na story Fundamentos/Tipografia. */

type EntradaIndice = { id: string; title: string; name: string; type: "story" | "docs" }
type Indice = { entries: Record<string, EntradaIndice> }

const TELA_MIN = 375
const TELA_MAX = 1240

let idTipografia = ""

test.beforeAll(async ({ request }) => {
  const indice = (await (await request.get("/index.json")).json()) as Indice
  const story = Object.values(indice.entries).find(
    (e) => e.type === "story" && e.title === "Fundamentos/Visão geral" && e.name === "Tipografia",
  )
  expect(story, "story Fundamentos/Visão geral › Tipografia").toBeDefined()
  idTipografia = story!.id
})

async function abrirTipografia(page: Page) {
  await page.goto(`/iframe.html?id=${idTipografia}&viewMode=story`)
  await page.waitForFunction(() => (document.querySelector("#storybook-root")?.childElementCount ?? 0) > 0)
  await page.evaluate(async () => {
    await Promise.all([...document.fonts].map((fonte) => fonte.load().catch(() => fonte)))
    await document.fonts.ready
  })
}

function tamanhoNaTela(nivel: NivelTipografico, largura: number): number {
  if (typeof nivel.tamanho === "number") return nivel.tamanho
  return largura === TELA_MIN ? nivel.tamanho[0] : nivel.tamanho[1]
}

const arredonda = (valor: number) => Math.round(valor * 10) / 10

/** `letter-spacing: 0` pode voltar como "normal"; `-0` vira `0`. */
function trackingLido(lido: number | "normal", nivel: NivelTipografico): number | "normal" {
  if (lido === "normal") return nivel.tracking === 0 ? 0 : "normal"
  return arredonda(lido) || 0
}

for (const largura of [TELA_MIN, TELA_MAX]) {
  test(`CA4: cada nível de 2 · 02 tem família, peso, tamanho, entrelinha, tracking e caixa do manual (${largura}px)`, async ({ page }) => {
    await page.setViewportSize({ width: largura, height: 900 })
    await abrirTipografia(page)

    for (const marca of Object.keys(TIPOGRAFIA_MANUAL) as MarcaTipografia[]) {
      const niveis: Record<string, NivelTipografico> = TIPOGRAFIA_MANUAL[marca]
      for (const [nome, nivel] of Object.entries(niveis)) {
        const amostra = page.getByTestId(`nivel-${marca}-${nome}`)
        const lido = await amostra.evaluate((el) => {
          const e = getComputedStyle(el)
          return {
            familia: e.fontFamily.split(",")[0]!.replace(/["']/g, "").trim(),
            peso: Number(e.fontWeight),
            tamanho: parseFloat(e.fontSize),
            entrelinha: parseFloat(e.lineHeight),
            tracking: e.letterSpacing === "normal" ? ("normal" as const) : parseFloat(e.letterSpacing),
            caixa: e.textTransform,
          }
        })
        const tamanho = tamanhoNaTela(nivel, largura)
        const esperado = {
          familia: nivel.familia,
          peso: nivel.peso,
          tamanho: arredonda(tamanho),
          entrelinha: arredonda(tamanho * nivel.entrelinha),
          tracking: nivel.tracking === "normal" ? "normal" : arredonda(nivel.tracking * tamanho),
          caixa: nivel.caixa,
        }
        const obtido = {
          ...lido,
          tamanho: arredonda(lido.tamanho),
          entrelinha: arredonda(lido.entrelinha),
          // `letter-spacing: 0` pode voltar como "normal"
          tracking: trackingLido(lido.tracking, nivel),
        }
        expect.soft(obtido, `--${marca}-${nome} em ${largura}px`).toEqual(esperado)
      }
    }
  })
}

test("CA5+CA6: só as fontes e os pesos de 2 · 06 são pedidos; sem Balgin nem Archivo; Black Mango local", async ({ page }) => {
  const urls: string[] = []
  page.on("request", (pedido) => urls.push(pedido.url()))
  await abrirTipografia(page)

  const proibidas = urls.filter((url) => /balgin|archivo/i.test(decodeURIComponent(url)))
  expect(proibidas, "nenhuma Balgin nem Archivo Narrow").toEqual([])

  const pedidosGoogle = urls.filter((url) => url.startsWith("https://fonts.googleapis.com/css2"))
  expect(pedidosGoogle.length, "um pedido ao Google Fonts").toBe(1)
  const familias: Record<string, number[]> = {}
  for (const familia of new URL(pedidosGoogle[0]!).searchParams.getAll("family")) {
    const [nome, eixos] = familia.split(":")
    const pesos = eixos ? eixos.replace(/^wght@/, "").split(";").map(Number) : [400]
    familias[nome!] = pesos
  }
  expect(familias).toEqual(FONTES_GOOGLE)

  const blackMango = await page.evaluate(async () => {
    await document.fonts.load('16px "Black Mango"')
    return document.fonts.check('16px "Black Mango"') && [...document.fonts].some(
      (f) => f.family.replace(/["']/g, "") === "Black Mango" && f.status === "loaded",
    )
  })
  expect(blackMango, "Black Mango carregada do arquivo local").toBe(true)
  expect(urls.some((url) => new URL(url).pathname === "/fonts/BlackMango-Regular.otf")).toBe(true)
})
