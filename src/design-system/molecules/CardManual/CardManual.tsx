"use client"
import { useId, type HTMLAttributes, type ReactNode } from "react"
import styles from "./CardManual.module.css"

export interface CardManualImagem {
  src: string
  alt: string
  /** Faixa no topo, em 4:3 (padrão) ou 16:9 (manual 2 · 05.03). */
  proporcao?: "4/3" | "16/9"
}

export interface CardManualProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  rotulo?: string
  titulo?: string
  texto?: string
  /** Foto no topo, sangrando até o fio e recortada no raio do card. */
  imagem?: CardManualImagem
  /** Card de 6 colunas: padding 32 (20 no celular). */
  colunas6?: boolean
  /** Card clicável: vira link, com hover (fio no texto, rótulo no acento) e foco. */
  href?: string
  children?: ReactNode
}

/**
 * Card do manual vigente (2 · 05.03): raio de 16, fio de 1px, nenhuma sombra. A foto fica numa
 * faixa no topo e recorta no raio. No hover, o fio vira a cor do texto e o rótulo vira o acento;
 * nada se move.
 */
export function CardManual({
  rotulo,
  titulo,
  texto,
  imagem,
  colunas6 = false,
  href,
  className,
  children,
  ...rest
}: CardManualProps) {
  const idTitulo = useId()
  const classes = [styles.card, colunas6 ? styles.colunas6 : "", href ? styles.clicavel : "", className]
    .filter(Boolean)
    .join(" ")

  const conteudo = (
    <>
      {imagem && (
        <div className={styles.foto} style={{ aspectRatio: imagem.proporcao ?? "4/3" }}>
          <img src={imagem.src} alt={imagem.alt} />
        </div>
      )}
      <div className={styles.corpo}>
        {rotulo && <span className={styles.rotulo}>{rotulo}</span>}
        {titulo && (
          <h3 id={idTitulo} className={styles.titulo}>
            {titulo}
          </h3>
        )}
        {texto && <p className={styles.texto}>{texto}</p>}
        {children}
      </div>
    </>
  )

  if (href) {
    return (
      <a href={href} className={classes} {...(rest as HTMLAttributes<HTMLAnchorElement>)}>
        {conteudo}
      </a>
    )
  }
  return (
    <article className={classes} aria-labelledby={titulo ? idTitulo : undefined} {...rest}>
      {conteudo}
    </article>
  )
}
