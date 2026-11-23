"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { cores, subfontes, temas, tokensComponente, tokensEstado, type Campanha, type Tema } from "../tokens"
import styles from "./Fundamentos.module.css"

const meta = {
  title: "Fundamentos/Visão geral",
  parameters: {
    docs: {
      description: {
        component:
          "Fundamentos do Manual Final 2026 · VIGENTE v2. Os valores são lidos das custom properties de `src/index.css` (nenhum HEX no código da página).",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** `"var(--dg-ocre)"` → `"dg-ocre"`. */
function nomeDoToken(referencia: string): string {
  return referencia.slice("var(--".length, -1)
}

/** Lê o valor resolvido da custom property no elemento, ao montar. */
function useValorResolvido(token: string) {
  const ref = useRef<HTMLElement>(null)
  const [valor, setValor] = useState("")
  useEffect(() => {
    if (ref.current) setValor(getComputedStyle(ref.current).getPropertyValue(`--${token}`).trim())
  }, [token])
  return [ref, valor] as const
}

/** Chave que muda com o tema e a campanha da toolbar: remonta as amostras para reler os valores. */
function chaveDoEscopo(globals: Record<string, unknown>): string {
  return `${String(globals.tema)}:${String(globals.campanha)}:${String(globals.theme)}`
}

function Amostra({ token }: { token: string }) {
  const [ref, valor] = useValorResolvido(token)
  return (
    <figure ref={ref} className={styles.amostra} data-testid={`amostra-${token}`}>
      <span className={styles.cor} style={{ background: `var(--${token})` }} aria-hidden="true" />
      <figcaption className={styles.legenda}>
        <code>--{token}</code>
        <span>{valor || "—"}</span>
      </figcaption>
    </figure>
  )
}

const nomesMarca: Record<keyof typeof cores, string> = {
  dg: "Débora Gabrich",
  ne: "No Estúdio",
  lp: "Luz na Prática",
  mqc: "Mais que um Click",
  adf: "Antes da Foto",
  bf: "Black Friday 2026",
}

const tokensDoTema = [...Object.values(tokensComponente), ...Object.values(tokensEstado)].map(nomeDoToken)

/** 2 · 01: o tema da toolbar (tokens de componente e estados) e todos os primitivos de cor, por marca, com o nome e o valor do token. */
export const Cores: Story = {
  render: (_, { globals }) => (
    <div key={chaveDoEscopo(globals)} className={styles.pagina}>
      {globals.tema && globals.tema !== "nenhum" && (
        <section className={styles.secao} aria-labelledby="cores-tema">
          <h2 id="cores-tema" className={styles.titulo}>
            Tema da toolbar: {String(globals.tema)}
            {globals.campanha && globals.campanha !== "nenhuma" ? ` + ${String(globals.campanha)}` : ""}
          </h2>
          <div className={styles.grade}>
            {tokensDoTema.map((token) => (
              <Amostra key={token} token={token} />
            ))}
          </div>
        </section>
      )}
      {(Object.keys(cores) as (keyof typeof cores)[]).map((marca) => (
        <section key={marca} className={styles.secao} aria-labelledby={`cores-${marca}`}>
          <h2 id={`cores-${marca}`} className={styles.titulo}>
            {nomesMarca[marca]}
          </h2>
          <div className={styles.grade}>
            {Object.values(cores[marca]).map((referencia) => (
              <Amostra key={referencia} token={nomeDoToken(referencia)} />
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
}

function PainelTema({ tema, campanha }: { tema: Tema; campanha?: Campanha }) {
  const rotulo = campanha ? `${tema} + ${campanha}` : tema
  return (
    <section
      data-tema={tema}
      data-campanha={campanha}
      className={styles.painel}
      aria-label={`Tema ${rotulo}`}
    >
      <h2 className={styles.titulo}>{rotulo}</h2>
      <p className={styles.apoio}>Texto de apoio sobre o fundo do tema.</p>
      <div className={styles.card}>
        <p>Texto sobre o card, com fio de card.</p>
        <span className={styles.botao}>Botão</span>
      </div>
      <div className={styles.grade}>
        {tokensDoTema.map((token) => (
          <Amostra key={token} token={token} />
        ))}
      </div>
    </section>
  )
}

/** Os 10 temas lado a lado, mais a camada da Black Friday sobre `dg` e `dg-claro`. */
export const Temas: Story = {
  render: (_, { globals }) => (
    <div key={chaveDoEscopo(globals)} className={styles.temas}>
      {temas.map((tema) => (
        <PainelTema key={tema} tema={tema} />
      ))}
      <PainelTema tema="dg" campanha="bf" />
      <PainelTema tema="dg-claro" campanha="bf" />
    </div>
  ),
}

/** `"var(--lp-preco)"` + nível → amostra com font, tracking e caixa do token. */
function AmostraTipografica({ marca, nivel }: { marca: keyof typeof subfontes; nivel: string }) {
  const token = `${marca}-${nivel}`
  const [ref, valor] = useValorResolvido(token)
  return (
    <figure ref={ref} className={styles.nivel}>
      <figcaption className={styles.legenda}>
        <code>--{token}</code>
        <span>{valor || "—"}</span>
      </figcaption>
      <p
        data-testid={`nivel-${token}`}
        className={styles.textoNivel}
        style={{
          font: `var(--${token})`,
          letterSpacing: `var(--${token}-tracking)`,
          textTransform: `var(--${token}-caixa)` as CSSProperties["textTransform"],
        }}
      >
        {marca === "bf" && nivel === "numero" ? "50%" : "A luz certa muda a foto"}
      </p>
    </figure>
  )
}

/** Nível do token → nome usado no CSS (`quizTitulo` → `quiz-titulo`). */
function nomeDoNivel(chave: string): string {
  return chave.replace(/[A-Z]/g, (letra) => `-${letra.toLowerCase()}`)
}

/** 2 · 02: cada nível de cada marca, com o valor do token e a amostra aplicada. */
export const Tipografia: Story = {
  render: (_, { globals }) => (
    <div key={chaveDoEscopo(globals)} className={styles.pagina}>
      {(Object.keys(subfontes) as (keyof typeof subfontes)[]).map((marca) => (
        <section key={marca} className={styles.secao} aria-labelledby={`tipografia-${marca}`}>
          <h2 id={`tipografia-${marca}`} className={styles.titulo}>
            {nomesMarca[marca]}
          </h2>
          {Object.keys(subfontes[marca]).map((chave) => (
            <AmostraTipografica key={chave} marca={marca} nivel={nomeDoNivel(chave)} />
          ))}
        </section>
      ))}
    </div>
  ),
}
