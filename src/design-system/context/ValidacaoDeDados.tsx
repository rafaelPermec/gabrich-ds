"use client"
import { createContext, useContext, useEffect, useRef, type ReactNode } from "react"
import { AvisoDadoInvalido } from "../atoms/AvisoDadoInvalido/index"

/**
 * RF5: onde vai o problema de dado inválido. "aviso" mostra o `AvisoDadoInvalido` junto do
 * conteúdo (ligado pelo decorator global do Storybook); "console" (padrão) só registra o erro.
 */
export type ModoValidacao = "aviso" | "console"

const ValidacaoDeDadosContext = createContext<ModoValidacao>("console")

export function ValidacaoDeDadosProvider({ modo, children }: { modo: ModoValidacao; children: ReactNode }) {
  return <ValidacaoDeDadosContext.Provider value={modo}>{children}</ValidacaoDeDadosContext.Provider>
}

export function useModoValidacao(): ModoValidacao {
  return useContext(ValidacaoDeDadosContext)
}

/**
 * Recebe os problemas de `validarOferta`/`validarCampanha`/`validarConteudo` e devolve o aviso
 * a renderizar (modo "aviso") ou `null`. No modo "console", faz um `console.error` por conjunto
 * de problemas. O conteúdo é sempre renderizado pelo componente que chama.
 */
export function useValidacao(problemas: readonly string[], origem?: string): ReactNode {
  const modo = useModoValidacao()
  const chave = problemas.join("\n")
  // Guarda o último conjunto registrado: re-render e o efeito duplo do StrictMode não repetem o erro.
  const registrado = useRef("")

  useEffect(() => {
    if (modo !== "console" || chave === "" || registrado.current === chave) return
    registrado.current = chave
    console.error(`[design-system] dado inválido${origem ? ` (${origem})` : ""}:\n${chave}`)
  }, [modo, chave, origem])

  return modo === "aviso" && problemas.length > 0 ? <AvisoDadoInvalido problemas={problemas} origem={origem} /> : null
}
