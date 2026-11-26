/**
 * RF4: validação de conteúdo em runtime. Devolve a lista de problemas; vazia = válido.
 * O formato já é garantido pelo typecheck; aqui entram os dados que chegam de fora do TS
 * (JSON, CMS) e as regras que o tipo não expressa.
 */
import { DATAS_DA_CAMPANHA } from "./campanha"
import type { Curso } from "./conteudo"
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

/** RF14: oferta presencial (No Estúdio), com as mesmas regras de número positivo e id de checkout. */
export function validarOfertaPresencial(oferta: unknown): string[] {
  if (typeof oferta !== "object" || oferta === null) return ["oferta ausente"]
  const o = oferta as Record<string, unknown>
  const problemas: string[] = []
  const exigir = (ok: boolean, problema: string) => {
    if (!ok) problemas.push(problema)
  }

  exigir(textoPreenchido(o.slug), "slug ausente")
  exigir(textoPreenchido(o.nome), "nome ausente")
  exigir(o.curso === "ne", "curso: ne")
  exigir(numeroPositivo(o.preco), "preco: número positivo")
  if (o.parcela !== undefined) exigir(numeroPositivo(o.parcela), "parcela: número positivo ou ausente")
  exigir(o.checkout === `#checkout-${String(o.slug)}`, "checkout: #checkout-<slug>")
  if (o.link !== undefined) exigir(textoPreenchido(o.link), "link: texto ou ausente")
  return problemas
}

/** ISO com offset de Brasília (`DataBrasilia`) e data existente. */
const DATA_BRASILIA = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d{1,3})?)?-03:00$/
/** O V8 aceita 30/02 e rola para março; confere o dia contra o mês. */
const diaExiste = (v: string) => {
  const [ano = 0, mes = 0, dia = 0] = v.slice(0, 10).split("-").map(Number)
  return new Date(Date.UTC(ano, mes - 1, dia)).getUTCDate() === dia
}
const dataBrasilia = (v: unknown): v is string =>
  typeof v === "string" && DATA_BRASILIA.test(v) && Number.isFinite(Date.parse(v)) && diaExiste(v)

/** RF4: as seis datas presentes, no horário de Brasília e em ordem cronológica (iguais são permitidas). */
export function validarCampanha(datas: unknown): string[] {
  if (typeof datas !== "object" || datas === null) return ["datas da campanha ausentes"]
  const d = datas as Record<string, unknown>
  const problemas: string[] = []
  let anterior: { campo: string; instante: number } | undefined
  for (const [campo] of DATAS_DA_CAMPANHA) {
    const valor = d[campo]
    if (!dataBrasilia(valor)) {
      problemas.push(`${campo}: data ISO com offset -03:00`)
      continue
    }
    const instante = Date.parse(valor)
    if (anterior && instante < anterior.instante) problemas.push(`${campo} antes de ${anterior.campo}`)
    anterior = { campo, instante }
  }
  return problemas
}

/**
 * RF10: termos de itens que não existem. Masterclass em nenhum curso; certificado e encontro ao
 * vivo só no No Estúdio (que tem "certificado de participação" na lista oficial).
 */
const TERMOS_PROIBIDOS: readonly { termo: string; padrao: RegExp; vale: (curso: Curso) => boolean }[] = [
  { termo: "masterclass", padrao: /master\s*-?\s*class/i, vale: () => true },
  { termo: "certificado", padrao: /certificad[oa]/i, vale: (curso) => curso !== "ne" },
  { termo: "encontro ao vivo", padrao: /encontros?\b[^.;\n]{0,30}\bao vivo/i, vale: (curso) => curso !== "ne" },
]

const textos = (v: unknown): string[] =>
  typeof v === "string" ? [v] : typeof v === "object" && v !== null ? Object.values(v).flatMap(textos) : []

/** RF10: varre todos os textos do conteúdo (lista, módulos, depoimento…) atrás dos termos proibidos no curso. */
export function validarConteudo(conteudo: unknown, curso: Curso): string[] {
  const todos = textos(conteudo)
  return TERMOS_PROIBIDOS.filter(({ vale }) => vale(curso)).flatMap(({ termo, padrao }) =>
    todos.filter((t) => padrao.test(t)).map((t) => `${termo} não existe em ${curso}: "${t}"`),
  )
}
