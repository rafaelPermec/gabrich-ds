import { readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative } from "node:path"
import { expect, test } from "@playwright/test"

/**
 * CA12 (RF1–RF3, R16, R17): preço, parcela, porcentagem e data só chegam como dado. No código do
 * design system e das páginas de demonstração, esses valores ficam só nos mocks.
 * CA9 (RF10), estendido às páginas de demonstração: masterclass não existe; certificado e
 * encontro ao vivo só no No Estúdio, que os recebe pela lista oficial do mock.
 */

const raiz = join(import.meta.dirname, "../..")

function arquivos(pasta: string): string[] {
  const absoluta = join(raiz, pasta)
  return readdirSync(absoluta).flatMap((nome) => {
    const caminho = join(absoluta, nome)
    const rel = relative(raiz, caminho)
    return statSync(caminho).isDirectory() ? arquivos(rel) : [rel]
  })
}

/** Comentários documentam exemplos ("R$ 1.397", "2026-11-24T00:00:00-03:00"); só o código conta. */
const semComentarios = (codigo: string) =>
  codigo.replace(/\/\*[\s\S]*?\*\//g, (bloco) => bloco.replace(/[^\n]/g, "")).replace(/(^|[^:])\/\/.*$/gm, "$1")

const VARRIDOS = [...arquivos("src/design-system"), ...arquivos("src/pages/verticals")].filter((rel) =>
  /\.tsx?$/.test(rel),
)

/** Mocks (R24) e stories, que são mock por definição (com os auxiliares de `storyFixtures`). */
const FORA_DO_CA12 = /^src\/design-system\/(mocks\/|utils\/storyFixtures\.tsx$)|\.stories\.tsx$/
/** Literal que é só um comprimento CSS (`width: "100%"`, `x: "-100%"`) não é porcentagem de dado. */
const semComprimentoCss = (codigo: string) => codigo.replace(/(["'])-?\d+(\.\d+)?%\1/g, "")
/** A validação nomeia os termos que ela proíbe. */
const FORA_DO_CA9 = /^src\/design-system\/(mocks\/|dados\/validacao\.ts$)/

const VALORES_FIXOS: [string, RegExp][] = [
  ["preço", /R\$\s*\d/],
  ["parcela", /\b\d+\s*x\s*(R\$\s*)?\d/i],
  ["porcentagem", /\d\s*%/],
  ["data ISO", /\b\d{4}-\d{2}-\d{2}\b/],
  ["data dd.mm / dd/mm", /\b[0-3]\d[./][01]\d\b/],
]

const TERMOS_PROIBIDOS: [string, RegExp][] = [
  ["masterclass", /master\s*-?\s*class/i],
  ["certificado", /certificad[oa]/i],
  ["encontro ao vivo", /encontros?\b[^.;\n]{0,30}\bao vivo/i],
]

const achar = (lista: string[], padroes: [string, RegExp][], limpar: (codigo: string) => string) =>
  lista.flatMap((rel) =>
    limpar(readFileSync(join(raiz, rel), "utf8"))
      .split("\n")
      .flatMap((linha, i) => padroes.filter(([, re]) => re.test(linha)).map(([nome]) => `${rel}:${i + 1}: ${nome}`)),
  )

test("CA12 + CA9: nenhum preço, parcela, porcentagem, data nem item inexistente fixo no DS e nas páginas de demonstração fora dos mocks", () => {
  expect
    .soft(achar(VARRIDOS.filter((rel) => !FORA_DO_CA12.test(rel)), VALORES_FIXOS, (codigo) => semComprimentoCss(semComentarios(codigo))), "CA12")
    .toEqual([])
  expect
    .soft(achar(VARRIDOS.filter((rel) => !FORA_DO_CA9.test(rel)), TERMOS_PROIBIDOS, (codigo) => codigo), "CA9")
    .toEqual([])
})
