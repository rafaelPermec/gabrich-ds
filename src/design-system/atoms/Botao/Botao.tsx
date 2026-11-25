"use client"
import type { ButtonHTMLAttributes, ReactNode } from "react"
import styles from "./Botao.module.css"

/** `acao`: na cor de ação do curso (`--acento`). Nos temas escuros, coincide com o `solido`. */
export type BotaoVariante = "solido" | "acao" | "contorno"
/** Altura: `grande` 56, `medio` 48, `pequeno` 44 (manual 2 · 05.01). */
export type BotaoTamanho = "grande" | "medio" | "pequeno"

export interface BotaoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: BotaoVariante
  tamanho?: BotaoTamanho
  /** Ocupa a coluna toda abaixo de 768px. */
  larguraTotal?: boolean
  children: ReactNode
}

/**
 * Botão do manual vigente (2 · 05.01): retângulo de canto reto, sem seta, cores do `data-tema`.
 * O hover troca só o fundo; o tamanho nunca muda. Um botão de acento por dobra.
 */
export function Botao({
  variante = "solido",
  tamanho = "medio",
  larguraTotal = false,
  type = "button",
  className,
  children,
  ...rest
}: BotaoProps) {
  return (
    <button
      type={type}
      className={[
        styles.botao,
        styles[variante],
        styles[tamanho],
        larguraTotal ? styles.larguraTotal : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </button>
  )
}
