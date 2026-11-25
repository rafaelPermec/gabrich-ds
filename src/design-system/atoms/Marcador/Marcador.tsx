import type { HTMLAttributes, ReactNode } from "react"
import styles from "./Marcador.module.css"

/** `ponto` (lista, 7px no acento), `numero` (disco de 20px) e `selecao` (anel de 20px), manual 2 · 05.08. */
export type MarcadorTipo = "ponto" | "numero" | "selecao"

type Comum = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  /** Texto ao lado do marcador, a 8px (item de lista). Sem ele, só o marcador. */
  children?: ReactNode
}

export type MarcadorProps = Comum &
  (
    | { tipo?: "ponto" }
    /** Número com dois dígitos ("02"); string passa como veio. */
    | { tipo: "numero"; numero: number | string }
    /**
     * Só visual (`aria-hidden`): quem usa (quiz, combo) põe o input e o rótulo, com área de 44px.
     * `marcado` mostra o ponto de 8px no acento.
     */
    | { tipo: "selecao"; marcado?: boolean }
  )

const doisDigitos = (n: number | string) => (typeof n === "number" ? String(n).padStart(2, "0") : n)

/**
 * Marcador do manual vigente (2 · 05.08): sempre redondo. Ponto de 7px no acento para listas,
 * disco numerado de 20px em Space Mono 9 e anel de seleção de 20px com ponto de 8px quando marcado.
 */
export function Marcador(props: MarcadorProps) {
  const { children, className, ...resto } = props
  let marca: ReactNode
  if (resto.tipo === "numero") {
    const { tipo: _tipo, numero, ...span } = resto
    marca = (
      <span className={[styles.marca, styles.numero, className].filter(Boolean).join(" ")} {...span}>
        {doisDigitos(numero)}
      </span>
    )
  } else if (resto.tipo === "selecao") {
    const { tipo: _tipo, marcado = false, ...span } = resto
    marca = (
      <span className={[styles.marca, styles.selecao, className].filter(Boolean).join(" ")} aria-hidden="true" {...span}>
        <svg className={styles.anel} viewBox="0 0 20 20" focusable="false">
          <circle cx="10" cy="10" r="9.25" strokeWidth="1.5" />
        </svg>
        {marcado && <span className={styles.pontoSelecao} />}
      </span>
    )
  } else {
    const { tipo: _tipo, ...span } = resto
    marca = <span className={[styles.marca, styles.ponto, className].filter(Boolean).join(" ")} aria-hidden="true" {...span} />
  }
  if (children === undefined) return marca
  return (
    <span className={styles.item}>
      {marca}
      <span>{children}</span>
    </span>
  )
}
