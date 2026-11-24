import type { Curso } from "../../design-system/dados/index"
import type { SubmarcaId } from "../../design-system/tokens/index"

/** O dado fala em cursos (`lp`, `mqc`, `adf`, `ne`); os temas e as logos, em submarcas. */
export const SUBMARCA_DO_CURSO = {
  lp: "luz",
  mqc: "click",
  adf: "adf",
  ne: "estudio",
} as const satisfies Record<Curso, SubmarcaId>

export const CURSO_DA_SUBMARCA = {
  luz: "lp",
  click: "mqc",
  adf: "adf",
  estudio: "ne",
} as const satisfies Record<SubmarcaId, Curso>
