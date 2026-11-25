import type { HTMLAttributes } from "react"
import type { FaseDaCampanha } from "../../dados/campanha"
import { Badge, Badges } from "../Badge"
import styles from "./SeloDesconto.module.css"

/** `quadrado` quando o 50% não é o protagonista da peça; `linha` dentro do card de preço e do card. */
export type SeloDescontoForma = "quadrado" | "linha"

export interface SeloDescontoProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  forma?: SeloDescontoForma
  /** Fase da campanha (`faseDaCampanha`): o selo só existe na Black (R14). */
  fase: FaseDaCampanha
  /** % de desconto da oferta, inteiro (`oferta.descontoBlack`), nunca calculado na tela (R16, R17). */
  percentual: number
  /** Selo sobre o papel: fio e rótulo em preto (a cor do texto) no lugar do ocre. */
  papel?: boolean
}

const FASES_DA_BLACK: readonly FaseDaCampanha[] = ["aberta", "ultima-semana", "ultimas-24h"]

/**
 * Selo de desconto do manual vigente (2 · 05.06): só na Black Friday, canto reto, não interativo.
 * Fora das fases aberta, última semana e últimas 24h, não renderiza nada.
 */
export function SeloDesconto({ forma = "quadrado", fase, percentual, papel = false, className, ...rest }: SeloDescontoProps) {
  if (!FASES_DA_BLACK.includes(fase)) return null
  if (forma === "linha") {
    return (
      <Badges versao="site" className={className} {...rest}>
        <Badge acento>{`−${percentual}%`}</Badge>
        <Badge>black friday</Badge>
      </Badges>
    )
  }
  return (
    <div className={[styles.quadrado, papel ? styles.papel : "", className].filter(Boolean).join(" ")} {...rest}>
      <span className={styles.numero}>{`${percentual}%`}</span>{" "}
      <span className={styles.rotulo}>black friday</span>
    </div>
  )
}
