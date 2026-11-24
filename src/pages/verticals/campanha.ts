/**
 * Campanha da demonstração Black Friday: datas e desconto vêm dos mocks (R24); aqui só se formata.
 */
import {
  DATAS_DA_CAMPANHA,
  type DatasDaCampanha,
  type FaseDaCampanha,
} from "../../design-system/dados/index"
import {
  CAMPANHA_2026_MOCK,
  DESCONTO_DA_CAMPANHA_2026_MOCK,
} from "../../design-system/mocks/campanha"

export const CAMPANHA = CAMPANHA_2026_MOCK
export const DESCONTO = DESCONTO_DA_CAMPANHA_2026_MOCK

const diaMesBrasilia = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  day: "2-digit",
  month: "2-digit",
})
/** "24.11": dia e mês do instante, no horário de Brasília. */
const diaMes = (instante: number) =>
  diaMesBrasilia.format(instante).replace("/", ".")
const inicio = (campo: keyof DatasDaCampanha) =>
  diaMes(Date.parse(CAMPANHA[campo]))
/** Último dia antes de uma data de fim, que é exclusiva. */
export const ate = (campo: keyof DatasDaCampanha) =>
  diaMes(Date.parse(CAMPANHA[campo]) - 1)

export type FaseDaPeca = Exclude<FaseDaCampanha, "normal">

/** Período da fase pelas datas da campanha; datas iguais pulam a fase. */
export function periodo(fase: FaseDaPeca): string {
  const i = DATAS_DA_CAMPANHA.findIndex(([, abre]) => abre === fase)
  const de = Date.parse(CAMPANHA[DATAS_DA_CAMPANHA[i]![0]])
  const fim = Date.parse(CAMPANHA[DATAS_DA_CAMPANHA[i + 1]![0]]) - 1
  if (fim < de) return "não ocorre nesta campanha"
  return diaMes(de) === diaMes(fim)
    ? `${diaMes(de)} até 23h59`
    : `${diaMes(de)} – ${diaMes(fim)}`
}

/** Para a página de Verticais: o cabeçalho do caso Black Friday. */
export const bfMeta = {
  medium: `campanha 2026 · ${inicio("inicioLista")} → ${ate("fimBlack")} · feed, site, e-mail, páginas`,
  lede: `${DESCONTO}% em todos os produtos, à vista ou em até 12x. Zero canto arredondado, um único acento (ocre) e cinco fases que mudam o que a peça pode mostrar.`,
  regraDoContador: `Contador só em ${periodo("lista-de-espera")} e ${inicio("inicioUltimaSemana")} – ${ate("fimBlack")}`,
}
