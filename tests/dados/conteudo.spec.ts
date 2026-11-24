import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { expect, test } from "@playwright/test"
import { validarConteudo, type Curso } from "../../src/design-system/dados/index"
import {
  ANTES_E_DEPOIS_MOCK,
  DEPOIMENTOS_MOCK,
  LISTAS_DO_CARD_MOCK,
  MODULOS_LP_MOCK,
  MODULOS_MQC_MOCK,
} from "../../src/design-system/mocks/conteudo"
import { ANTES_E_DEPOIS_MANUAL, LISTAS_MANUAL, MODULOS_MANUAL } from "../fixtures/manual"

/** Formatos e mocks de conteúdo, sem navegador. Valores esperados: transcrição do manual. */

const raiz = join(import.meta.dirname, "../..")

test("CA8: módulos, aulas, listas dos cards e antes e depois dos mocks batem com o manual, na mesma ordem", () => {
  const resumoDosModulos = (mock: typeof MODULOS_LP_MOCK) =>
    mock.modulos.map((m) => {
      const grupos: Record<string, number[]> = {}
      for (const a of m.aulas) if (a.grupo) (grupos[a.grupo] ??= []).push(a.numero)
      return {
        numero: m.numero,
        nome: m.nome,
        quantidade: m.aulas.length,
        ...(m.etiqueta ? { etiqueta: m.etiqueta } : {}),
        aulas: m.aulas.map((a) => a.titulo),
        ...(Object.keys(grupos).length ? { grupos } : {}),
      }
    })
  expect(resumoDosModulos(MODULOS_LP_MOCK)).toEqual(MODULOS_MANUAL.lp)
  expect(resumoDosModulos(MODULOS_MQC_MOCK)).toEqual(MODULOS_MANUAL.mqc)

  // Numeração das aulas: contínua no Luz na Prática (01 a 27), recomeça em cada módulo no Mais que um Click.
  expect(MODULOS_LP_MOCK.modulos.flatMap((m) => m.aulas.map((a) => a.numero))).toEqual(
    Array.from({ length: 27 }, (_, i) => i + 1),
  )
  expect(MODULOS_MQC_MOCK.modulos.map((m) => m.aulas.map((a) => a.numero))).toEqual(
    MODULOS_MQC_MOCK.modulos.map((m) => Array.from({ length: m.aulas.length }, (_, i) => i + 1)),
  )

  expect(Object.fromEntries(LISTAS_DO_CARD_MOCK.map((l) => [l.curso, l.itens]))).toEqual(LISTAS_MANUAL)
  expect(ANTES_E_DEPOIS_MOCK.map(({ nome, legenda }) => ({ nome, legenda }))).toEqual(ANTES_E_DEPOIS_MANUAL)
})

test("CA9: nenhum mock nem o espelho dos tokens fala em masterclass; os cursos online não falam em certificado nem encontro ao vivo", () => {
  // Validação por curso: todo mock de conteúdo passa.
  const mocks: [string, Curso, unknown][] = [
    ...LISTAS_DO_CARD_MOCK.map((l): [string, Curso, unknown] => [`lista ${l.curso}`, l.curso, l]),
    ["módulos lp", "lp", MODULOS_LP_MOCK],
    ["módulos mqc", "mqc", MODULOS_MQC_MOCK],
    ...DEPOIMENTOS_MOCK.map((d, i): [string, Curso, unknown] => [`depoimento ${i}`, d.curso, d]),
    ...ANTES_E_DEPOIS_MOCK.map((a): [string, Curso, unknown] => [`antes e depois ${a.nome}`, "mqc", a]),
  ]
  expect(mocks.map(([nome, curso, dado]) => [nome, validarConteudo(dado, curso)])).toEqual(
    mocks.map(([nome]) => [nome, []]),
  )

  // A validação rejeita os termos proibidos de cada curso e aceita o certificado do No Estúdio.
  const casos: [string, Curso, string, boolean][] = [
    ["masterclass no Antes da Foto", "adf", "e-book + Masterclass ao vivo", false],
    ["masterclass no No Estúdio", "ne", "bônus: master class de luz", false],
    ["certificado nos cursos online", "lp", "certificado de conclusão", false],
    ["encontro ao vivo nos cursos online", "mqc", "encontro mensal ao vivo com a Débora", false],
    ["certificado no No Estúdio", "ne", "certificado de participação", true],
    ["\"ao vivo\" fora de encontro", "lp", "o balanço de branco ajustado ao vivo", true],
  ]
  expect(casos.map(([caso, curso, texto]) => [caso, validarConteudo({ itens: [texto] }, curso).length === 0])).toEqual(
    casos.map(([caso, , , aceito]) => [caso, aceito]),
  )

  // Varredura do texto: mocks e espelho dos tokens.
  const arquivos = [
    ...readdirSync(join(raiz, "src/design-system/mocks")).map((nome) => `src/design-system/mocks/${nome}`),
    "src/design-system/tokens/index.ts",
  ]
  const achados = arquivos.flatMap((rel) =>
    readFileSync(join(raiz, rel), "utf8")
      .split("\n")
      .flatMap((linha, i) => (/master\s*-?\s*class/i.test(linha) ? [`${rel}:${i + 1}`] : [])),
  )
  expect(achados).toEqual([])
  expect(validarConteudo(readFileSync(join(raiz, "src/design-system/tokens/index.ts"), "utf8"), "adf")).toEqual([])
})
