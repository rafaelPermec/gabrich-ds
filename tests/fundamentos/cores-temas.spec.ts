import { expect, test, type Page } from "@playwright/test"
import {
  ESTADOS,
  TEMAS_MANUAL,
  TEMAS_SUBMARCA,
  TOKENS_COMPONENTE,
  type TemaManual,
} from "../fixtures/manual"

/**
 * CA2, CA3, CA10, CA11: os temas `data-tema` e a camada `data-campanha="bf"`, aplicados pela
 * toolbar do Storybook (globals `tema` e `campanha`) na story Fundamentos/Cores.
 */

type EntradaIndice = { id: string; title: string; name: string; type: "story" | "docs" }
type Indice = { entries: Record<string, EntradaIndice> }

let idCores = ""

test.beforeAll(async ({ request }) => {
  const indice = (await (await request.get("/index.json")).json()) as Indice
  const story = Object.values(indice.entries).find(
    (e) => e.type === "story" && e.title === "Fundamentos/Visão geral" && e.name === "Cores",
  )
  expect(story, "story Fundamentos/Visão geral › Cores").toBeDefined()
  idCores = story!.id
})

/** Abre a story com o tema da toolbar e devolve os tokens resolvidos no escopo do tema. */
async function tokensSob(page: Page, tema: TemaManual, campanha?: "bf") {
  const globals = [`tema:${tema}`, `campanha:${campanha ?? "nenhuma"}`].join(";")
  await page.goto(`/iframe.html?id=${idCores}&viewMode=story&globals=${globals}`)
  const escopo = page.locator(`#storybook-root [data-tema="${tema}"]`).first()
  await expect(escopo).toBeAttached()
  if (campanha) await expect(escopo).toHaveAttribute("data-campanha", campanha)
  const nomes = [...TOKENS_COMPONENTE, ...ESTADOS]
  return escopo.evaluate((el, lista) => {
    const estilo = getComputedStyle(el)
    return Object.fromEntries(
      lista.map((nome) => [nome, estilo.getPropertyValue(`--${nome}`).trim().toUpperCase()]),
    )
  }, nomes)
}

/** `#RRGGBB` → `rgb(r, g, b)`, como o navegador devolve em estilos computados. */
function rgb(hex: string): string {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
  return `rgb(${r}, ${g}, ${b})`
}

/** Vermelho: matiz entre 330° e 20°, com saturação perceptível. */
function ehVermelho(hex: string): boolean {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) as [number, number, number]
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const croma = max - min
  if (croma < 0.15) return false
  let matiz: number
  if (max === r) matiz = (((g - b) / croma) % 6) * 60
  else if (max === g) matiz = ((b - r) / croma + 2) * 60
  else matiz = ((r - g) / croma + 4) * 60
  if (matiz < 0) matiz += 360
  return matiz >= 330 || matiz <= 20
}

test("CA2+CA3: cada tema da toolbar define os 12 tokens de componente com os valores do manual", async ({ page }) => {
  test.slow() // percorre os 10 temas na story; sob carga paralela passa dos 30 s
  for (const tema of Object.keys(TEMAS_MANUAL) as TemaManual[]) {
    const tokens = await tokensSob(page, tema)
    const esperado = Object.fromEntries(
      TOKENS_COMPONENTE.map((nome) => [nome, TEMAS_MANUAL[tema][nome].toUpperCase()]),
    )
    const lido = Object.fromEntries(TOKENS_COMPONENTE.map((nome) => [nome, tokens[nome]]))
    expect.soft(lido, `tema ${tema}`).toEqual(esperado)
    // CA2: as amostras do tema da toolbar pintam fundo, texto e acento do tema.
    for (const nome of ["fundo", "texto", "acento"] as const) {
      const amostra = page.getByTestId(`amostra-${nome}`).locator("span").first()
      await expect.soft(amostra, `amostra --${nome} em ${tema}`).toHaveCSS("background-color", rgb(esperado[nome]!))
    }
  }
})

test("CA10: estados das submarcas e do dg (com e sem bf) apontam para texto ou acento, nunca vermelho", async ({ page }) => {
  test.slow() // percorre os 10 temas na story; sob carga paralela passa dos 30 s
  const casos: [TemaManual, "bf" | undefined][] = [
    ...TEMAS_SUBMARCA.map((tema): [TemaManual, undefined] => [tema, undefined]),
    ["dg", undefined],
    ["dg-claro", undefined],
    ["dg", "bf"],
    ["dg-claro", "bf"],
  ]
  for (const [tema, campanha] of casos) {
    const tokens = await tokensSob(page, tema, campanha)
    const rotulo = campanha ? `${tema}+${campanha}` : tema
    for (const estado of ESTADOS) {
      const valor = tokens[estado]!
      expect.soft(valor, `${rotulo} --${estado} definido`).toMatch(/^#[0-9A-F]{6}$/)
      expect.soft([tokens.texto, tokens.acento], `${rotulo} --${estado} = texto ou acento`).toContain(valor)
      expect.soft(ehVermelho(valor), `${rotulo} --${estado} = ${valor} não é vermelho`).toBe(false)
    }
  }
})

test("CA11: dg e dg-claro com a camada bf têm base preto ou papel e acento ocre", async ({ page }) => {
  const dg = await tokensSob(page, "dg", "bf")
  const dgClaro = await tokensSob(page, "dg-claro", "bf")
  const ocre = "#CCAA66"
  expect({ fundo: dg.fundo, acento: dg.acento }).toEqual({ fundo: "#0B0B0B", acento: ocre })
  expect({ fundo: dgClaro.fundo, acento: dgClaro.acento }).toEqual({ fundo: "#F4F0E8", acento: ocre })
})
