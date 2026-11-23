import { readFileSync } from "node:fs"
import { join } from "node:path"
import { expect, test } from "@playwright/test"
import { CORES_MANUAL } from "../fixtures/manual"

/** CA1 (RF1): toda cor de 2 · 01 existe em `src/index.css` com o nome e o HEX do manual. */

const css = readFileSync(join(import.meta.dirname, "../../src/index.css"), "utf8")

/** Declarações `--nome: #HEX` do bloco `:root` sob o comentário "Manual vigente · 2 · 01". */
function primitivosDoCss(): Map<string, string> {
  const inicio = css.indexOf("Manual vigente · 2 · 01")
  expect(inicio, "bloco dos primitivos do manual vigente em src/index.css").toBeGreaterThan(-1)
  const bloco = css.slice(inicio, css.indexOf("}", inicio))
  const declaracoes = bloco.matchAll(/--([a-z-]+):\s*(#[0-9a-f]{6})\s*;/gi)
  return new Map([...declaracoes].map(([, nome, hex]) => [nome!, hex!.toUpperCase()]))
}

test("CA1: todas as cores de 2 · 01 existem com o nome e o HEX do manual", () => {
  const primitivos = primitivosDoCss()
  const esperado = Object.entries(CORES_MANUAL).map(([nome, hex]) => [nome, hex.toUpperCase()])
  const encontrado = esperado.map(([nome]) => [nome, primitivos.get(nome!) ?? "ausente"])
  expect(encontrado).toEqual(esperado)
})
