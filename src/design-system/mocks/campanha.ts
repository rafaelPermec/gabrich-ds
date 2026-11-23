/**
 * Mock das datas da campanha 2026 (PRD dados-dinamicos-e-mocks, decisão de 2026-11-23).
 * O manual ainda traz as datas antigas. Só para stories e páginas de demonstração (R24):
 * não é exportado pelo barrel do design system.
 */
import type { DatasDaCampanha } from "../dados/index"

export const CAMPANHA_2026_MOCK: DatasDaCampanha = {
  inicioLista: "2026-11-01T00:00:00-03:00",
  abertura: "2026-11-24T00:00:00-03:00",
  // A última semana começa na abertura: a fase "aberta" não ocorre em 2026.
  inicioUltimaSemana: "2026-11-24T00:00:00-03:00",
  inicioUltimas24h: "2026-11-30T00:00:00-03:00",
  // Fim da Black em 30/11 23h59: instante exclusivo.
  fimBlack: "2026-12-01T00:00:00-03:00",
  // Encerramento até 08/12 23h59: instante exclusivo.
  fimEncerramento: "2026-12-09T00:00:00-03:00",
}
