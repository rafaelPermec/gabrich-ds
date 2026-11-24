"use client"
import { Children, type HTMLAttributes, type ReactNode } from "react"
import { GrupoDeEtiquetas, type BadgeVersao } from "./grupo"
import styles from "./Badge.module.css"

export interface BadgesProps extends HTMLAttributes<HTMLDivElement> {
  /** `site` (Black): gap de 4. `peca` (marca mãe): gap de 8, e as etiquetas na versão de peça. */
  versao?: BadgeVersao
  children: ReactNode
}

/**
 * Etiquetas em linha (manual 2 · 05.02): com duas ou mais, todas ficam cheias; com uma só, ela
 * é traçada. No máximo uma com `acento`.
 */
export function Badges({ versao = "site", className, children, ...rest }: BadgesProps) {
  const cheia = Children.toArray(children).length >= 2
  return (
    <div className={[styles.grupo, styles[`grupo-${versao}`], className].filter(Boolean).join(" ")} {...rest}>
      <GrupoDeEtiquetas.Provider value={{ cheia, versao }}>{children}</GrupoDeEtiquetas.Provider>
    </div>
  )
}
