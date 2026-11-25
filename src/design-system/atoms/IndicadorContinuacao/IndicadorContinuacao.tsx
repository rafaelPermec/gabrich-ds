"use client"
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react"
import styles from "./IndicadorContinuacao.module.css"

/** Diâmetro: `minimo` 30, `padrao` 38, `capa` 44 (manual 2 · 05.09). Sempre menor que o disco de ação (52). */
export type IndicadorContinuacaoTamanho = "minimo" | "padrao" | "capa"

type Comum = {
  tamanho?: IndicadorContinuacaoTamanho
  /** Nome acessível (o desenho é só a seta). */
  rotulo?: string
}

export type IndicadorContinuacaoProps = Comum &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    /** Com `href`, vira link (âncora para a próxima dobra, por exemplo); `disabled` não se aplica. */
    href?: string
  }

/** A seta aprovada da ficha 2 · 05.09, para baixo, em traço de 1,4. */
function Seta() {
  return (
    <svg className={styles.seta} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M12 4 V20 M6 14 L12 20 L18 14" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * Indicador de continuação do manual vigente (2 · 05.09): disco traçado com a seta, que indica
 * que a página continua. Sem preenchimento; no hover, fio e seta no acento; nada se move.
 * A área clicável tem 44px em todos os tamanhos, sem mudar o desenho.
 */
export function IndicadorContinuacao(props: IndicadorContinuacaoProps) {
  const { tamanho = "padrao", rotulo = "continuar", className, ...rest } = props
  const classes = [styles.indicador, styles[tamanho], className].filter(Boolean).join(" ")

  if (rest.href !== undefined) {
    const { disabled: _disabled, type: _type, ...link } = rest
    return (
      <a className={classes} aria-label={rotulo} {...(link as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        <Seta />
      </a>
    )
  }
  const { type = "button", href: _href, ...botao } = rest
  return (
    <button type={type} className={classes} aria-label={rotulo} {...botao}>
      <Seta />
    </button>
  )
}
