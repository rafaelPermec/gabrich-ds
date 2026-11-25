import type { Meta, StoryObj } from "@storybook/react-vite"
import { Badge } from "./Badge"
import { Badges } from "./Badges"

const meta = {
  title: "Atoms/Badge",
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: [
          "**Etiqueta** · **Status de aprovação:** APROVADO (manual 2 · 05.02).",
          "",
          "Canto reto sempre. Sozinha é sempre traçada; cheia só quando há duas ou mais em linha: agrupe com `Badges`, que deixa as filhas cheias e aplica o gap (4 na Black, 8 na marca mãe). No máximo uma em `acento`. Não é interativa: sem hover, foco nem desabilitado. As cores vêm do tema do manual (`data-tema`); escolha o tema na toolbar. A story “Fundo escuro e claro” mostra os estados nos dois fundos.",
        ].join("\n"),
      },
    },
  },
  args: { children: "última semana" },
  argTypes: {
    versao: { control: "inline-radio", options: ["site", "peca"] },
    cheia: { control: "boolean" },
    acento: { control: "boolean" },
    children: { control: "text" },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

const linha = { display: "flex", gap: "var(--esp-4)", alignItems: "center", flexWrap: "wrap" } as const

/** Uma etiqueta só: sempre traçada, na cor do texto. */
export const Sozinha: Story = {}

/** Traçada e cheia, com e sem acento, para conferir as cores em cada tema. */
export const Variantes: Story = {
  render: (args) => (
    <div style={linha}>
      <Badge {...args}>traçada</Badge>
      <Badge {...args} acento>traçada em acento</Badge>
      <Badges>
        <Badge acento>cheia em acento</Badge>
        <Badge>cheia</Badge>
      </Badges>
    </div>
  ),
}

/** Black Friday: duas em linha ficam cheias, com gap de 4; a primeira em acento. */
export const GrupoDaBlack: Story = {
  name: "Grupo da Black",
  render: () => (
    <Badges versao="site">
      <Badge acento>black friday</Badge>
      <Badge>mais de 50%</Badge>
    </Badges>
  ),
}

/** Marca mãe em peça: versão de peça (8 × 12, altura mínima 28) e gap de 8. */
export const GrupoDaMarcaMae: Story = {
  name: "Grupo da marca mãe",
  render: () => (
    <Badges versao="peca">
      <Badge acento>fotografia</Badge>
      <Badge>direção de arte</Badge>
    </Badges>
  ),
}

/** Marca mãe em peça, sozinha: padding 8 × 12 e altura mínima de 28. */
export const Peca: Story = { name: "Peça", args: { versao: "peca", children: "fotografia" } }

const painel =
  { background: "var(--fundo)", color: "var(--texto)", padding: "var(--esp-6)", display: "grid", gap: "var(--esp-4)" } as const

/** Os estados da ficha 2 · 05.02 lado a lado, no fundo escuro (dg) e no claro (dg-claro). */
export const EscuroEClaro: Story = {
  name: "Fundo escuro e claro",
  render: () => (
    <div style={{ display: "grid", gap: "var(--esp-6)" }}>
      {(["dg", "dg-claro"] as const).map((tema) => (
        <div key={tema} data-tema={tema} style={painel}>
          <span>{tema === "dg" ? "fundo escuro" : "fundo claro"}</span>
          <div style={linha}>
            <Badge>última semana</Badge>
            <Badge acento>última semana</Badge>
            <Badges>
              <Badge acento>black friday</Badge>
              <Badge>mais de 50%</Badge>
            </Badges>
          </div>
          <div style={linha}>
            <Badge versao="peca">fotografia</Badge>
            <Badges versao="peca">
              <Badge acento>fotografia</Badge>
              <Badge>direção de arte</Badge>
            </Badges>
          </div>
        </div>
      ))}
    </div>
  ),
}
