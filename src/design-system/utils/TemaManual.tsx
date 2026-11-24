import type { ReactNode } from "react"
import type { Tema } from "../tokens/index"
import styles from "./TemaManual.module.css"

/**
 * Só para docs, stories e páginas de demonstração (fora do contrato público): aplica um tema do
 * manual (`data-tema`) e pinta o fundo dele, para átomos do manual em telas sem tema.
 */
export function TemaManual({
  tema,
  as: Elemento = "span",
  className,
  children,
}: {
  tema: Tema
  /** `div` quando o conteúdo tem blocos (ex.: `Badges`). */
  as?: "span" | "div"
  className?: string
  children: ReactNode
}) {
  return (
    <Elemento data-tema={tema} className={[styles.tema, className].filter(Boolean).join(" ")}>
      {children}
    </Elemento>
  )
}
