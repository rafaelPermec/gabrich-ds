import { expect, test } from "@playwright/test"
import { faseDaCampanha, validarCampanha, type DatasDaCampanha } from "../../src/design-system/dados/index"
import { CAMPANHA_2026_MOCK } from "../../src/design-system/mocks/campanha"

/**
 * Funções puras do módulo de dados (campanha), sem navegador.
 * As datas levam o offset de Brasília: o resultado não depende do fuso da máquina
 * (rode também com `TZ=UTC pnpm exec playwright test tests/dados`).
 */

/** Campanha com as seis datas distintas, para cada fase ter janela própria. */
const DATAS: DatasDaCampanha = {
  inicioLista: "2026-11-01T00:00:00-03:00",
  abertura: "2026-11-17T00:00:00-03:00",
  inicioUltimaSemana: "2026-11-24T00:00:00-03:00",
  inicioUltimas24h: "2026-11-30T00:00:00-03:00",
  fimBlack: "2026-12-01T00:00:00-03:00",
  fimEncerramento: "2026-12-09T00:00:00-03:00",
}

const em = (iso: string) => new Date(iso)
const antes = (iso: string) => new Date(Date.parse(iso) - 1)

test("CA2: a fase sai das datas recebidas, fechada no início e aberta no fim", () => {
  const casos: [string, Date][] = [
    ["normal", antes(DATAS.inicioLista)],
    ["lista-de-espera", em(DATAS.inicioLista)],
    ["lista-de-espera", antes(DATAS.abertura)],
    ["aberta", em(DATAS.abertura)],
    ["aberta", antes(DATAS.inicioUltimaSemana)],
    ["ultima-semana", em(DATAS.inicioUltimaSemana)],
    ["ultima-semana", antes(DATAS.inicioUltimas24h)],
    ["ultimas-24h", em(DATAS.inicioUltimas24h)],
    ["ultimas-24h", antes(DATAS.fimBlack)],
    ["encerrada", em(DATAS.fimBlack)],
    ["encerrada", antes(DATAS.fimEncerramento)],
    ["normal", em(DATAS.fimEncerramento)],
    ["normal", em("2027-01-01T00:00:00-03:00")],
  ]
  expect(casos.map(([, agora]) => faseDaCampanha(DATAS, agora))).toEqual(casos.map(([fase]) => fase))

  // Abertura e última semana na mesma data (como no mock 2026): a fase "aberta" não ocorre.
  const mesmoDia = CAMPANHA_2026_MOCK
  expect(mesmoDia.abertura).toBe(mesmoDia.inicioUltimaSemana)
  expect(faseDaCampanha(mesmoDia, antes(mesmoDia.abertura))).toBe("lista-de-espera")
  expect(faseDaCampanha(mesmoDia, em(mesmoDia.abertura))).toBe("ultima-semana")
  // 30/11 23h59 em Brasília ainda é Black; 01/12 00h00 já é encerramento.
  expect(faseDaCampanha(mesmoDia, em("2026-11-30T23:59:00-03:00"))).toBe("ultimas-24h")
  expect(faseDaCampanha(mesmoDia, em("2026-12-01T00:00:00-03:00"))).toBe("encerrada")
})

test("CA4: o mock 2026 passa na validação; datas ausentes, fora do formato ou fora de ordem são rejeitadas", () => {
  expect(validarCampanha(CAMPANHA_2026_MOCK)).toEqual([])
  expect(validarCampanha(DATAS)).toEqual([])

  const invalidas: Record<string, unknown> = {
    "abertura depois do fim da Black": { ...DATAS, abertura: "2026-12-02T00:00:00-03:00" },
    "fim do encerramento antes do fim da Black": { ...DATAS, fimEncerramento: "2026-11-30T00:00:00-03:00" },
    "sem início da lista": { ...DATAS, inicioLista: undefined },
    "sem offset de Brasília": { ...DATAS, abertura: "2026-11-17T00:00:00Z" },
    "data inexistente": { ...DATAS, abertura: "2026-13-40T00:00:00-03:00" },
    "dia inexistente no mês": { ...DATAS, inicioLista: "2026-02-30T00:00:00-03:00" },
    "data como número": { ...DATAS, fimBlack: Date.parse(DATAS.fimBlack) },
    "nulo": null,
  }
  const rejeitadas = Object.fromEntries(
    Object.entries(invalidas).map(([caso, c]) => [caso, validarCampanha(c).length > 0]),
  )
  expect(rejeitadas).toEqual(Object.fromEntries(Object.keys(invalidas).map((caso) => [caso, true])))
})
