import { readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative } from "node:path"
import { expect, test } from "@playwright/test"
import { hexFoto } from "../../src/design-system/tokens/index"

/**
 * CA12 (RF12, R29): toda cor é token. O HEX só aparece na definição dos tokens
 * (`src/index.css`) e no espelho TS (`src/design-system/tokens/`).
 */

const raiz = join(import.meta.dirname, "../..")
const ler = (rel: string) => readFileSync(join(raiz, rel), "utf8")

function arquivos(pasta: string): string[] {
  const absoluta = join(raiz, pasta)
  return readdirSync(absoluta).flatMap((nome) => {
    const caminho = join(absoluta, nome)
    const rel = relative(raiz, caminho)
    return statSync(caminho).isDirectory() ? arquivos(rel) : [rel]
  })
}

const PERMITIDOS = /^src\/(index\.css$|design-system\/tokens\/)/
const HEX = /#(?:[0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3,4})\b/gi

test("CA12: nenhum HEX em src/ fora de src/index.css e src/design-system/tokens/", () => {
  const achados = arquivos("src")
    .filter((rel) => !PERMITIDOS.test(rel))
    .flatMap((rel) =>
      ler(rel)
        .split("\n")
        .flatMap((linha, i) => [...linha.matchAll(HEX)].map(([hex]) => `${rel}:${i + 1}: ${hex}`)),
    )
  expect(achados).toEqual([])
})

test("CA12: o HEX das fotos de placeholder é o mesmo do primitivo em src/index.css", () => {
  const css = ler("src/index.css")
  const esperado = Object.entries(hexFoto).map(([token, hex]) => [token, hex.toUpperCase()])
  const encontrado = esperado.map(([token]) => [
    token,
    new RegExp(`--${token}:\\s*(#[0-9a-f]{6})\\s*;`, "i").exec(css)?.[1]?.toUpperCase() ?? "ausente",
  ])
  expect(encontrado).toEqual(esperado)
})
