/**
 * RF4: validação de conteúdo em runtime. Devolve a lista de problemas; vazia = válido.
 * O formato já é garantido pelo typecheck; aqui entram os dados que chegam de fora do TS
 * (JSON, CMS) e as regras que o tipo não expressa.
 */
import { CURSOS_ONLINE } from "./oferta"

const numeroPositivo = (v: unknown) => typeof v === "number" && Number.isFinite(v) && v > 0
const porcentagem = (v: unknown) => typeof v === "number" && Number.isInteger(v) && v >= 0 && v <= 100
const textoPreenchido = (v: unknown) => typeof v === "string" && v.trim() !== ""

export function validarOferta(oferta: unknown): string[] {
  if (typeof oferta !== "object" || oferta === null) return ["oferta ausente"]
  const o = oferta as Record<string, unknown>
  const problemas: string[] = []
  const exigir = (ok: boolean, problema: string) => {
    if (!ok) problemas.push(problema)
  }

  exigir(textoPreenchido(o.slug), "slug ausente")
  exigir(textoPreenchido(o.nome), "nome ausente")
  exigir(
    Array.isArray(o.cursos) && o.cursos.length > 0 && o.cursos.every((c: unknown) => (CURSOS_ONLINE as readonly unknown[]).includes(c)),
    "cursos: ao menos um, entre lp, mqc e adf",
  )
  exigir(numeroPositivo(o.precoNormal), "precoNormal: número positivo")
  exigir(numeroPositivo(o.precoBlack), "precoBlack: número positivo")
  if (numeroPositivo(o.precoNormal) && numeroPositivo(o.precoBlack)) {
    exigir((o.precoBlack as number) < (o.precoNormal as number), "precoBlack menor que precoNormal")
  }
  for (const campo of ["parcelaNormal", "parcelaBlack"]) {
    if (o[campo] !== undefined) exigir(numeroPositivo(o[campo]), `${campo}: número positivo ou ausente`)
  }
  exigir(porcentagem(o.descontoBlack), "descontoBlack: inteiro entre 0 e 100")
  if (o.descontoCombo !== undefined) exigir(porcentagem(o.descontoCombo), "descontoCombo: inteiro entre 0 e 100")
  exigir(o.checkout === `#checkout-${String(o.slug)}`, "checkout: #checkout-<slug>")
  exigir(o.checkoutBlack === `#checkout-bf26-${String(o.slug)}`, "checkoutBlack: #checkout-bf26-<slug>")
  for (const campo of ["linkNormal", "linkBlack"]) {
    if (o[campo] !== undefined) exigir(textoPreenchido(o[campo]), `${campo}: texto ou ausente`)
  }
  return problemas
}
