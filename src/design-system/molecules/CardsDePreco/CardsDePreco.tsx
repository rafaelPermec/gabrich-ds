import type { HTMLAttributes, ReactNode } from "react"
import { SeloGarantia, type SeloGarantiaForma } from "../../atoms/SeloGarantia/index"
import styles from "./CardsDePreco.module.css"

export interface CardsDePrecoProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Os `CardPreco` da dobra, na ordem. */
  children: ReactNode
  /** Forma do selo de garantia abaixo dos cards. */
  formaDoSelo?: SeloGarantiaForma
}

/**
 * Grupo de cards de preço (manual 2 · 05.05b e 2 · 05.07, RF6): cards lado a lado, empilhados no
 * celular, e um único selo de garantia abaixo do último, a 32px, centralizado. O selo fica fora dos
 * cards e usa a cor do selo do card do curso da página (`--card-preco-selo`), ou a do tema.
 */
export function CardsDePreco({ children, formaDoSelo, className, ...resto }: CardsDePrecoProps) {
  return (
    <div data-cards-de-preco="" className={[styles.grupo, className].filter(Boolean).join(" ")} {...resto}>
      <div className={styles.cards}>{children}</div>
      <SeloGarantia forma={formaDoSelo} className={styles.selo} />
    </div>
  )
}
