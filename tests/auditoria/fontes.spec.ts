import { readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative } from "node:path"
import { expect, test } from "@playwright/test"

/** CA5 (RF5, R19, R20): a Balgin não é declarada nem importada como fonte em `src/` nem em `public/`. */

const raiz = join(import.meta.dirname, "../..")

function arquivos(pasta: string): string[] {
  try {
    return readdirSync(pasta).flatMap((nome) => {
      const caminho = join(pasta, nome)
      return statSync(caminho).isDirectory() ? arquivos(caminho) : [caminho]
    })
  } catch (erro) {
    if ((erro as NodeJS.ErrnoException).code === "ENOENT") return []
    throw erro
  }
}

test("CA5: nenhum @font-face, @import ou arquivo de fonte da Balgin", () => {
  const achados: string[] = []
  for (const caminho of [...arquivos(join(raiz, "src")), ...arquivos(join(raiz, "public"))]) {
    const rel = relative(raiz, caminho)
    if (/balgin/i.test(rel) && /\.(otf|ttf|woff2?)$/i.test(rel)) achados.push(`${rel}: arquivo de fonte`)
    if (!/\.(css|tsx?|mdx|html)$/.test(caminho)) continue
    const texto = readFileSync(caminho, "utf8")
    const declaracoes = [
      ...texto.matchAll(/@font-face\s*\{[^}]*\}/gi),
      ...texto.matchAll(/@import[^;]*;/gi),
      ...texto.matchAll(/fonts\.googleapis\.com[^'")\s]*/gi),
    ]
    for (const [trecho] of declaracoes) {
      if (/balgin/i.test(trecho)) achados.push(`${rel}: ${trecho.slice(0, 80)}`)
    }
  }
  expect(achados).toEqual([])
})
