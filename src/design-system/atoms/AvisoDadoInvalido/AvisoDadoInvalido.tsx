import styles from "./AvisoDadoInvalido.module.css"

export interface AvisoDadoInvalidoProps {
  /** Problemas devolvidos por `validarOferta`, `validarCampanha` ou `validarConteudo`. */
  problemas: readonly string[]
  /** O que foi validado, para o título ("oferta", "campanha", "conteúdo"). */
  origem?: string
}

/**
 * RF5: aviso de dado inválido, visível só no modo "aviso" (Storybook), ao lado do conteúdo,
 * que continua renderizado. Sem vermelho (R21): fio no token de aviso do tema.
 */
export function AvisoDadoInvalido({ problemas, origem }: AvisoDadoInvalidoProps) {
  if (problemas.length === 0) return null
  return (
    <div role="alert" className={styles.aviso}>
      <p className={styles.titulo}>Dado inválido{origem ? ` · ${origem}` : ""}</p>
      <ul className={styles.lista}>
        {problemas.map((problema) => (
          <li key={problema}>{problema}</li>
        ))}
      </ul>
    </div>
  )
}
