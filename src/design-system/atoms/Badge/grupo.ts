import { createContext } from "react"

/** `site`: padding 4 × 8 (páginas e Black). `peca`: padding 8 × 12, altura mínima 28 (peças da marca mãe). */
export type BadgeVersao = "site" | "peca"

/** Estado que o grupo `Badges` passa às etiquetas filhas. */
export const GrupoDeEtiquetas = createContext<{ cheia: boolean; versao: BadgeVersao } | null>(null)
