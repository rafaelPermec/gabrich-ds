/** RF12: valor monetário no formato brasileiro. */

const NBSP = " "
const inteiro = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 })
const comCentavos = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

/** "R$ 1.397" ou "R$ 144,48": inteiro sem centavos, fração com 2 casas; espaço não separável após "R$". */
export function formatarMoeda(valor: number): string {
  const formato = Number.isInteger(valor) ? inteiro : comCentavos
  return `R$${NBSP}${formato.format(valor)}`
}

/** "R$ 1.547,00": sempre com 2 casas, como no card do No Estúdio (RF14). */
export function formatarMoedaComCentavos(valor: number): string {
  return `R$${NBSP}${comCentavos.format(valor)}`
}

/** RF6: "12x R$ 144,48" ou, sem a parcela, "12x a confirmar". */
export function formatarParcela(valor?: number): string {
  return valor === undefined ? "12x a confirmar" : `12x ${formatarMoeda(valor)}`
}

/** "12x R$ 160,00": parcela sempre com 2 casas (No Estúdio); sem ela, "12x a confirmar". */
export function formatarParcelaComCentavos(valor?: number): string {
  return valor === undefined ? "12x a confirmar" : `12x ${formatarMoedaComCentavos(valor)}`
}
