import type { HTMLAttributes } from "react"
import styles from "./SeloGarantia.module.css"

/** `linha` (ícone + texto) ou `quadrado` (o 7 em destaque). */
export type SeloGarantiaForma = "linha" | "quadrado"

export interface SeloGarantiaProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  forma?: SeloGarantiaForma
}

/**
 * Selo de garantia do manual vigente (2 · 05.07): sempre "7 dias de garantia", na cor do curso
 * (`--selo-garantia`), nunca em ocre, canto reto. Fica fora do card e do box de preço, uma vez,
 * abaixo das ofertas.
 */
export function SeloGarantia({ forma = "linha", className, ...rest }: SeloGarantiaProps) {
  if (forma === "quadrado") {
    return (
      <div className={[styles.selo, styles.quadrado, className].filter(Boolean).join(" ")} {...rest}>
        <span className={styles.sete}>7</span>{" "}
        <span className={styles.rotulo}>dias de garantia</span>
      </div>
    )
  }
  return (
    <div className={[styles.selo, styles.linha, className].filter(Boolean).join(" ")} {...rest}>
      {/* Pendente: o ícone "aprovação" de 22px ainda não chegou (task avulsa). */}
      <span className={styles.icone} data-placeholder="icone-aprovacao" aria-hidden="true" />
      <span className={styles.texto}>7 dias de garantia</span>
    </div>
  )
}
