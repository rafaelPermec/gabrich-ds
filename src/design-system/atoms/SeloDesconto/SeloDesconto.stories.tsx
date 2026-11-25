import type { Meta, StoryObj } from "@storybook/react-vite"
import type { FaseDaCampanha } from "../../dados/campanha"
import { SeloDesconto } from "./SeloDesconto"

const meta = {
  title: "Atoms/SeloDesconto",
  component: SeloDesconto,
  parameters: {
    docs: {
      description: {
        component: [
          "**Selo de desconto** · **Status de aprovação:** APROVADO (manual 2 · 05.06).",
          "",
          "Só na Black Friday: fora das fases aberta, última semana e últimas 24h, não renderiza nada. Quadrado de 120 × 120 (mínimo 88) com fio de 1px em ocre (preto no papel), número em Urbanist 600 44 e rótulo em Space Mono 7,5; em linha, dentro do box e do card, duas etiquetas cheias (−50% em ocre + black friday). Canto reto, não interativo. O percentual chega da oferta (`descontoBlack`) e nunca é calculado. Escolha o tema `dg` ou `dg-claro` na toolbar.",
        ].join("\n"),
      },
    },
  },
  args: { fase: "aberta", percentual: 50, forma: "quadrado" },
  argTypes: {
    forma: { control: "inline-radio", options: ["quadrado", "linha"] },
    fase: { control: "select", options: ["normal", "lista-de-espera", "aberta", "ultima-semana", "ultimas-24h", "encerrada"] },
  },
} satisfies Meta<typeof SeloDesconto>

export default meta
type Story = StoryObj<typeof meta>

const linha = { display: "flex", gap: "var(--esp-6)", alignItems: "center", flexWrap: "wrap" } as const
const legenda = { font: "var(--dg-rotulo)", color: "var(--texto-apoio)" } as const

export const Quadrado: Story = {}

/** As duas formas da ficha 2 · 05.06. */
export const Formas: Story = {
  render: (args) => (
    <div style={linha}>
      <SeloDesconto {...args} forma="quadrado" data-testid="quadrado" />
      <SeloDesconto {...args} forma="linha" data-testid="linha" />
    </div>
  ),
}

const FASES: FaseDaCampanha[] = ["normal", "lista-de-espera", "aberta", "ultima-semana", "ultimas-24h", "encerrada"]

/** O selo em cada fase da campanha: só aparece em aberta, última semana e últimas 24h (R14). */
export const Fases: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "var(--esp-4)" }}>
      {FASES.map((fase) => (
        <div key={fase} style={linha}>
          <span style={{ ...legenda, minWidth: "var(--esp-24)" }}>{fase}</span>
          <div data-testid={`fase-${fase}`}>
            <SeloDesconto {...args} fase={fase} />
          </div>
        </div>
      ))}
    </div>
  ),
}

/** Sobre o papel: o ocre sai do fio e do rótulo. Use com o tema `dg-claro`. */
export const NoPapel: Story = {
  name: "No papel",
  args: { papel: true },
  render: (args) => (
    <div style={linha}>
      <SeloDesconto {...args} forma="quadrado" data-testid="quadrado" />
      <SeloDesconto {...args} forma="linha" />
    </div>
  ),
}

const painel = { background: "var(--fundo)", color: "var(--texto)", padding: "var(--esp-6)", display: "grid", gap: "var(--esp-4)" } as const

/** As duas formas no preto (dg) e no papel (dg-claro), como na ficha. */
export const EscuroEClaro: Story = {
  name: "Fundo escuro e claro",
  render: (args) => (
    <div style={{ display: "grid", gap: "var(--esp-6)" }}>
      {(["dg", "dg-claro"] as const).map((tema) => (
        <div key={tema} data-tema={tema} style={painel}>
          <span style={legenda}>{tema === "dg" ? "fundo escuro" : "fundo claro"}</span>
          <div style={linha}>
            <SeloDesconto {...args} forma="quadrado" papel={tema === "dg-claro"} />
            <SeloDesconto {...args} forma="linha" />
          </div>
        </div>
      ))}
    </div>
  ),
}
