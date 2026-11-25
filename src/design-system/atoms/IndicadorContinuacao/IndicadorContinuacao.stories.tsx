import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import { IndicadorContinuacao } from "./IndicadorContinuacao"

const meta = {
  title: "Atoms/IndicadorContinuacao",
  component: IndicadorContinuacao,
  parameters: {
    docs: {
      description: {
        component: [
          "**Indicador de continuação** · **Status de aprovação:** APROVADO (manual 2 · 05.09). Foco: EM APROVAÇÃO (proposta).",
          "",
          "Disco traçado com a seta aprovada, sempre menor que o disco de ação (52). Indica que a página continua. Fio de 1px e seta de 1,4, sem preenchimento. A área clicável tem 44px em todos os tamanhos, sem mudar o desenho. As cores vêm do tema do manual (`data-tema`); escolha o tema na toolbar. A story “Fundo escuro e claro” mostra os estados nos dois fundos.",
        ].join("\n"),
      },
    },
  },
  args: { onClick: fn() },
  argTypes: {
    tamanho: { control: "inline-radio", options: ["minimo", "padrao", "capa"] },
    rotulo: { control: "text" },
  },
} satisfies Meta<typeof IndicadorContinuacao>

export default meta
type Story = StoryObj<typeof meta>

const linha = { display: "flex", gap: "var(--esp-4)", alignItems: "center", flexWrap: "wrap" } as const

export const Padrao: Story = { name: "Padrão" }

/** 30 mínimo, 38 padrão e 44 em capa. */
export const Tamanhos: Story = {
  render: (args) => (
    <div style={linha}>
      <IndicadorContinuacao {...args} tamanho="minimo" rotulo="mínimo" />
      <IndicadorContinuacao {...args} tamanho="padrao" rotulo="padrão" />
      <IndicadorContinuacao {...args} tamanho="capa" rotulo="capa" />
    </div>
  ),
}

export const Desabilitado: Story = { args: { disabled: true } }

/**
 * EM APROVAÇÃO: o foco de teclado é uma proposta do manual (contorno de 2px na cor do texto,
 * afastado 2px) e pode mudar. Clique no canvas e aperte Tab para ver.
 */
export const FocoProposta: Story = {
  name: "Foco (proposta)",
  parameters: {
    docs: {
      description: { story: "**Proposta (EM APROVAÇÃO).** Contorno de 2px na cor do texto, afastado 2px. Aperte Tab." },
    },
  },
}

const painel =
  { background: "var(--fundo)", color: "var(--texto)", padding: "var(--esp-6)", display: "grid", gap: "var(--esp-4)" } as const

/** Os estados da ficha 2 · 05.09 no fundo escuro (dg) e no claro (dg-claro). Passe o mouse para ver o hover. */
export const EscuroEClaro: Story = {
  name: "Fundo escuro e claro",
  render: (args) => (
    <div style={{ display: "grid", gap: "var(--esp-6)" }}>
      {(["dg", "dg-claro"] as const).map((tema) => (
        <div key={tema} data-tema={tema} style={painel}>
          <span>{tema === "dg" ? "fundo escuro" : "fundo claro"}</span>
          <div style={linha}>
            <IndicadorContinuacao {...args} tamanho="minimo" />
            <IndicadorContinuacao {...args} tamanho="padrao" />
            <IndicadorContinuacao {...args} tamanho="capa" />
            <IndicadorContinuacao {...args} rotulo="desabilitado" disabled />
          </div>
        </div>
      ))}
    </div>
  ),
}
