import type { CSSProperties, HTMLAttributes } from "react"
import adfEmpilhada from "../../assets/logos/adf-empilhada.svg"
import adfHorizontal from "../../assets/logos/adf-horizontal.svg"
import lnpEmpilhada from "../../assets/logos/lnp-empilhada.svg"
import lnpHorizontal from "../../assets/logos/lnp-horizontal.svg"
import mqcEmpilhada from "../../assets/logos/mqc-empilhada.svg"
import mqcHorizontal from "../../assets/logos/mqc-horizontal.svg"
import neEmpilhada from "../../assets/logos/ne-empilhada.svg"
import neHorizontal from "../../assets/logos/ne-horizontal.svg"
import styles from "./LogoCurso.module.css"

/** `lnp` Luz na Prática, `mqc` Mais que um Click, `adf` Antes da Foto, `ne` No Estúdio. */
export type LogoCursoCurso = "lnp" | "mqc" | "adf" | "ne"
export type LogoCursoVariante = "horizontal" | "empilhada"

export type LogoCursoProps = Omit<HTMLAttributes<HTMLSpanElement>, "children" | "role"> & {
  curso: LogoCursoCurso
  variante?: LogoCursoVariante
}

type Desenho = { url: string; proporcao: string }

/** SVGs em curvas do manual (exportacoes-2026), com a proporção do viewBox de cada um. */
const LOGOS: Record<LogoCursoCurso, { nome: string } & Record<LogoCursoVariante, Desenho>> = {
  lnp: {
    nome: "Luz na Prática",
    horizontal: { url: lnpHorizontal, proporcao: "1874 / 170" },
    empilhada: { url: lnpEmpilhada, proporcao: "965 / 360" },
  },
  mqc: {
    nome: "Mais que um Click",
    horizontal: { url: mqcHorizontal, proporcao: "1548 / 201" },
    empilhada: { url: mqcEmpilhada, proporcao: "1012 / 584" },
  },
  adf: {
    nome: "Antes da Foto",
    horizontal: { url: adfHorizontal, proporcao: "655.5 / 79.04" },
    empilhada: { url: adfEmpilhada, proporcao: "361 / 160.1" },
  },
  ne: {
    nome: "No Estúdio",
    horizontal: { url: neHorizontal, proporcao: "755 / 123" },
    empilhada: { url: neEmpilhada, proporcao: "543 / 202" },
  },
}

/**
 * Logo do curso como imagem de uma cor (R19): máscara do SVG pintada com `--texto` do tema.
 * A Balgin nunca é carregada; o nome do curso é o nome acessível.
 */
export function LogoCurso(props: LogoCursoProps) {
  const { curso, variante = "horizontal", className, style, ...span } = props
  const { nome, [variante]: desenho } = LOGOS[curso]
  const variaveis = {
    "--logo-mascara": `url("${desenho.url}")`,
    "--logo-proporcao": desenho.proporcao,
  } as CSSProperties
  return (
    <span
      role="img"
      aria-label={nome}
      className={[styles.logo, className].filter(Boolean).join(" ")}
      style={{ ...variaveis, ...style }}
      {...span}
    />
  )
}
