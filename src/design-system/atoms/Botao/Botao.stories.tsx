import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import { Botao } from "./Botao"

const meta = {
  title: "Atoms/Botao",
  component: Botao,
  parameters: {
    docs: {
      description: {
        component: [
          "**Status de aprovação:** APROVADO (manual 2 · 05.01). Foco: EM APROVAÇÃO (proposta).",
          "",
          "Retângulo de canto reto, sem seta, nas páginas dos cursos, na página “cursos” e na Black Friday. Um botão de acento por dobra. As cores vêm do tema do manual (`data-tema`); escolha o tema na toolbar (em “Nenhum”, o botão fica sem cor). A story “Fundo escuro e claro” mostra os estados nos dois fundos.",
        ].join("\n"),
      },
    },
  },
  args: { children: "quero garantir", onClick: fn() },
  argTypes: {
    variante: { control: "inline-radio", options: ["solido", "acao", "contorno"] },
    tamanho: { control: "inline-radio", options: ["grande", "medio", "pequeno"] },
    children: { control: "text" },
  },
} satisfies Meta<typeof Botao>

export default meta
type Story = StoryObj<typeof meta>

const linha = { display: "flex", gap: "var(--esp-4)", alignItems: "center", flexWrap: "wrap" } as const

export const Padrao: Story = { name: "Padrão" }

export const Tamanhos: Story = {
  render: (args) => (
    <div style={linha}>
      <Botao {...args} tamanho="grande">grande</Botao>
      <Botao {...args} tamanho="medio">médio</Botao>
      <Botao {...args} tamanho="pequeno">pequeno</Botao>
    </div>
  ),
}

export const Variantes: Story = {
  render: (args) => (
    <div style={linha}>
      <Botao {...args} variante="solido">sólido</Botao>
      <Botao {...args} variante="acao">ação</Botao>
      <Botao {...args} variante="contorno">contorno</Botao>
    </div>
  ),
}

export const Desabilitado: Story = {
  args: { disabled: true },
  render: (args) => (
    <div style={linha}>
      <Botao {...args} variante="solido">sólido</Botao>
      <Botao {...args} variante="acao">ação</Botao>
      <Botao {...args} variante="contorno">contorno</Botao>
    </div>
  ),
}

/** Abaixo de 768px ocupa a coluna toda; acima, a largura segue o texto. Veja no viewport de celular. */
export const LarguraTotal: Story = {
  name: "Largura total",
  args: { larguraTotal: true, variante: "acao" },
}

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
  render: (args) => (
    <div style={linha}>
      <Botao {...args} variante="solido">sólido</Botao>
      <Botao {...args} variante="acao">ação</Botao>
      <Botao {...args} variante="contorno">contorno</Botao>
    </div>
  ),
}

const painel =
  { background: "var(--fundo)", color: "var(--texto)", padding: "var(--esp-6)", display: "grid", gap: "var(--esp-4)" } as const

/** Os estados da ficha 2 · 05.01 lado a lado, no fundo escuro (dg) e no claro (dg-claro). */
export const EscuroEClaro: Story = {
  name: "Fundo escuro e claro",
  render: (args) => (
    <div style={{ display: "grid", gap: "var(--esp-6)" }}>
      {(["dg", "dg-claro"] as const).map((tema) => (
        <div key={tema} data-tema={tema} style={painel}>
          <span>{tema === "dg" ? "fundo escuro" : "fundo claro"}</span>
          <div style={linha}>
            <Botao {...args} variante="solido">padrão</Botao>
            <Botao {...args} variante="acao">ação</Botao>
            <Botao {...args} variante="contorno">contorno</Botao>
            <Botao {...args} disabled>desabilitado</Botao>
          </div>
          <div style={linha}>
            <Botao {...args} tamanho="grande">grande</Botao>
            <Botao {...args} tamanho="medio">médio</Botao>
            <Botao {...args} tamanho="pequeno">pequeno</Botao>
          </div>
        </div>
      ))}
    </div>
  ),
}
