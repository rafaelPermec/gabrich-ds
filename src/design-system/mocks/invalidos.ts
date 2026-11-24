/**
 * Mocks inválidos de propósito, só para as stories do aviso de dado inválido (RF5).
 * Passam no typecheck (o formato está certo) e falham na validação de conteúdo.
 * Só para stories (R24): não é exportado pelo barrel do design system.
 */
import type { DatasDaCampanha, Oferta } from "../dados/index"
import { CAMPANHA_2026_MOCK } from "./campanha"
import { OFERTAS_MOCK } from "./ofertas"

const [antesDaFoto] = OFERTAS_MOCK
if (!antesDaFoto) throw new Error("OFERTAS_MOCK vazio")

/** Preço da Black acima do normal e porcentagem com fração. */
export const OFERTA_INVALIDA_MOCK: Oferta = {
  ...antesDaFoto,
  precoBlack: 297,
  descontoBlack: 50.5,
}

/** Abertura depois do fim da Black (CA4). */
export const CAMPANHA_INVALIDA_MOCK: DatasDaCampanha = {
  ...CAMPANHA_2026_MOCK,
  abertura: "2026-12-02T00:00:00-03:00",
}
