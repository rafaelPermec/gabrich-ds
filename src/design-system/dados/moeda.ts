/** RF12: valor monetário no formato brasileiro. */

const NBSP = " "
const inteiro = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 })
const comCentavos = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

/** "R$ 1.397" ou "R$ 144,48": inteiro sem centavos, fração com 2 casas; espaço não separável após "R$". */
export function formatarMoeda(valor: number): string {
  const formato = Number.isInteger(valor) ? inteiro : comCentavos
  return `R$${NBSP}${formato.format(valor)}`
}

/** RF6: "12x R$ 144,48" ou, sem a parcela, "12x a confirmar". */
export function formatarParcela(valor?: number): string {
  return valor === undefined ? "12x a confirmar" : `12x ${formatarMoeda(valor)}`
}
