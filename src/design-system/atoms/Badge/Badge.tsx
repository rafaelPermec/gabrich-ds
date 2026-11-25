"use client"
import { useContext, type HTMLAttributes, type ReactNode } from "react"
import { GrupoDeEtiquetas, type BadgeVersao } from "./grupo"
import styles from "./Badge.module.css"

export type { BadgeVersao }

/** `color` sai do tipo: a cor vem só do tema (era prop do Badge antigo). */
export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, "color"> {
  versao?: BadgeVersao
  /** Preenchida. Dentro de `Badges` com duas ou mais, é forçada; sozinha, use só sobre foto. */
  cheia?: boolean
  /** Na cor de ação do curso (`--acento`). No máximo uma por grupo. */
  acento?: boolean
  children: ReactNode
}

/**
 * Etiqueta do manual vigente (2 · 05.02): canto reto, Space Mono 9px em caixa alta, fio de 1px
 * na cor do texto. Sozinha é traçada; cheia só com duas ou mais em linha (use `Badges`).
 * Não é interativa. Cores do `data-tema`.
 */
export function Badge({ versao, cheia, acento = false, className, children, ...rest }: BadgeProps) {
  const grupo = useContext(GrupoDeEtiquetas)
  const preenchida = grupo ? grupo.cheia : (cheia ?? false)
  return (
    <span
      data-etiqueta=""
      className={[
        styles.etiqueta,
        styles[versao ?? grupo?.versao ?? "site"],
        preenchida ? styles.cheia : "",
        acento ? styles.acento : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </span>
  )
}
