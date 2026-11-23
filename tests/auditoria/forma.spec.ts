import { readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative } from "node:path"
import { expect, test } from "@playwright/test"
import { FORMA_MANUAL } from "../fixtures/manual"

/**
 * CA7, CA8, CA9 (RF7–RF9, R3–R9): espaçamento, raio e fio como texto do código-fonte.
 * Os componentes genéricos ficam como estão (RF14) e os do manual (Button, Badge, Card,
 * ActionDisk, Typography, Divider) entram na auditoria no PRD atomos-manual-v2: por isso
 * raio e espessura de fio olham só o que é do manual v2 e o app de documentação.
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

const codigo = (rel: string) => /\.(css|tsx?|mdx)$/.test(rel)

/** Fora dos genéricos e dos componentes do manual: tokens, Fundamentos e o app de documentação. */
const ESCOPO_FORMA = [
  "src/index.css",
  ...["src/design-system/fundamentos", "src/pages", "src/docs", "src/app"].flatMap(arquivos),
].filter(codigo)

/** Declarações `propriedade: valor` (CSS) e `propriedade: "valor"` (estilo inline em TSX). */
function declaracoes(texto: string, propriedade: RegExp) {
  const css = [...texto.matchAll(/(?<![\w-])([a-z-]+)\s*:\s*([^;{}]+?)\s*(?=;|\})/g)].map(([, p, v]) => [p!, v!] as const)
  const tsx = [...texto.matchAll(/\b([a-zA-Z]+)\s*:\s*"([^"]*)"/g)].map(
    ([, p, v]) => [p!.replace(/[A-Z]/g, (l) => `-${l.toLowerCase()}`), v!] as const,
  )
  return [...css, ...tsx].filter(([p]) => propriedade.test(p))
}

/** Trechos de `src/index.css` sob os cabeçalhos "── Manual vigente". */
function secoesDoManual(css: string): string {
  return css
    .split(/(?=\/\* ──)/)
    .filter((secao) => secao.startsWith("/* ── Manual vigente"))
    .join("\n")
}

test("CA7: os tokens de 2 · 03 existem com os valores do manual", () => {
  const css = secoesDoManual(ler("src/index.css"))
  const esperado = Object.entries(FORMA_MANUAL)
  const encontrado = esperado.map(([nome]) => {
    const valor = new RegExp(`--${nome}:\\s*([^;]+);`).exec(css)?.[1]?.trim()
    return [nome, valor ?? "ausente"]
  })
  expect(encontrado).toEqual(esperado)
})

test("CA7: tokens, temas e Fundamentos sem espaçamento fora de --esp-*", () => {
  const escopo = {
    "src/index.css (manual vigente)": secoesDoManual(ler("src/index.css")),
    ...Object.fromEntries(arquivos("src/design-system/fundamentos").filter(codigo).map((rel) => [rel, ler(rel)])),
  }
  const permitido = /^(0|auto|var\(--esp-\d+\)|var\(--gutter\)|var\(--dobra(-desktop|-mobile)?\))$/
  const achados: string[] = []
  for (const [rel, texto] of Object.entries(escopo)) {
    for (const [p, v] of declaracoes(texto, /^(padding|margin|gap|row-gap|column-gap)(-[a-z]+)*$/)) {
      if (!v.split(/\s+/).every((parte) => permitido.test(parte))) achados.push(`${rel}: ${p}: ${v}`)
    }
    for (const [uso] of texto.matchAll(/var\(--space-[\w-]+\)/g)) achados.push(`${rel}: ${uso}`)
  }
  expect(achados).toEqual([])
})

test("CA8: fora dos genéricos, todo raio é --raio-reto, --raio-card ou --raio-disco", () => {
  const permitido = /^var\(--raio-(reto|card|disco)\)$/
  const achados: string[] = []
  for (const rel of ESCOPO_FORMA) {
    for (const [p, v] of declaracoes(ler(rel), /^border(-[a-z]+)*-radius$/)) {
      if (!v.split(/\s+/).every((parte) => permitido.test(parte))) achados.push(`${rel}: ${p}: ${v}`)
    }
  }
  expect(achados).toEqual([])
})

test("CA9: nenhuma sombra em src/", () => {
  const achados = arquivos("src")
    .filter(codigo)
    .flatMap((rel) =>
      [...ler(rel).matchAll(/(box-shadow|boxShadow|text-shadow|textShadow|drop-shadow|--sombra[\w-]*|--shadow[\w-]*)/g)].map(
        ([trecho]) => `${rel}: ${trecho}`,
      ),
    )
  expect(achados).toEqual([])
})

/** Exceções nomeadas: desenho de logo, não fio. Saem quando o wordmark virar imagem (R19). */
const EXCECOES_FIO: Readonly<Record<string, RegExp>> = {
  "src/pages/verticals/Submarcas.module.css": /^0\.09em$/,
}

test("CA9: fora dos genéricos, todo fio usa var(--fio)", () => {
  const achados: string[] = []
  for (const rel of ESCOPO_FORMA) {
    const propriedades = /^border(-(top|right|bottom|left|block|inline)(-(start|end))?)?(-width)?$/
    for (const [p, v] of declaracoes(ler(rel), propriedades)) {
      if (/^(none|0)(\s|$)/.test(v) || EXCECOES_FIO[rel]?.test(v)) continue
      const espessuras = v.match(/(?<![\w-])\d*\.?\d+(px|em|rem)\b|var\(--border-[\w-]+\)/g) ?? []
      const temFio = v.includes("var(--fio)")
      const outraEspessura = espessuras.some((e) => !/^var\(--border-(base|strong)\)$/.test(e))
      if (!temFio || outraEspessura) achados.push(`${rel}: ${p}: ${v}`)
    }
  }
  expect(achados).toEqual([])
})
