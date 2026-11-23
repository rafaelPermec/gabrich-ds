/**
 * Formato das datas da campanha e a fase calculada a partir delas (RF2, RF3).
 * As datas chegam no dado; o "agora" chega como entrada. Nenhuma data fica fixa aqui.
 */

/** Instante ISO no horário de Brasília, com offset fixo: `2026-11-24T00:00:00-03:00`. */
export type DataBrasilia = `${string}T${string}-03:00`

/**
 * As seis datas da campanha. Cada uma abre a fase seguinte; os fins são exclusivos
 * ("até 30/11 23h59" vira `2026-12-01T00:00:00-03:00`).
 */
export type DatasDaCampanha = {
  inicioLista: DataBrasilia
  abertura: DataBrasilia
  inicioUltimaSemana: DataBrasilia
  inicioUltimas24h: DataBrasilia
  fimBlack: DataBrasilia
  fimEncerramento: DataBrasilia
}

export type FaseDaCampanha =
  | "normal"
  | "lista-de-espera"
  | "aberta"
  | "ultima-semana"
  | "ultimas-24h"
  | "encerrada"

/** As datas em ordem cronológica, cada uma com a fase que ela abre. */
export const DATAS_DA_CAMPANHA = [
  ["inicioLista", "lista-de-espera"],
  ["abertura", "aberta"],
  ["inicioUltimaSemana", "ultima-semana"],
  ["inicioUltimas24h", "ultimas-24h"],
  ["fimBlack", "encerrada"],
  ["fimEncerramento", "normal"],
] as const satisfies readonly (readonly [keyof DatasDaCampanha, FaseDaCampanha])[]

/**
 * RF3: a fase em que `agora` cai. Intervalos fechados no início e abertos no fim;
 * antes da lista e a partir do fim do encerramento, "normal". Datas iguais pulam a fase entre elas.
 */
export function faseDaCampanha(datas: DatasDaCampanha, agora: Date): FaseDaCampanha {
  const instante = agora.getTime()
  let fase: FaseDaCampanha = "normal"
  for (const [campo, abre] of DATAS_DA_CAMPANHA) {
    if (Date.parse(datas[campo]) <= instante) fase = abre
  }
  return fase
}
