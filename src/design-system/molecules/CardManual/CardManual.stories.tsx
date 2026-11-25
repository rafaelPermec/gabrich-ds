import type { Meta, StoryObj } from "@storybook/react-vite"
import { photo } from "../../utils/storyFixtures"
import { CardManual } from "./CardManual"

const meta = {
  title: "Molecules/CardManual",
  component: CardManual,
  parameters: {
    docs: {
      description: {
        component: [
          "**Card** · **Status de aprovação:** APROVADO (manual 2 · 05.03). Foco: EM APROVAÇÃO (proposta).",
          "",
          "Raio de 16 nas páginas dos cursos, “cursos” e Black Friday. Fio de 1px, nenhuma sombra. A foto fica numa faixa no topo (4:3 ou 16:9), sangra até o fio e recorta no raio. Padding 24, 32 no card de 6 colunas e 20 no celular; gap interno 12. Com `href`, o card é clicável: no hover, o fio vira a cor do texto e o rótulo vira o acento, e nada se move. As cores vêm do tema do manual (`data-tema`); escolha o tema na toolbar. A story “Fundo escuro e claro” mostra os estados nos dois fundos.",
        ].join("\n"),
      },
    },
  },
  args: {
    rotulo: "ensaio",
    titulo: "Luz que desenha o produto",
    texto: "Como uma janela e um rebatedor resolvem a foto de catálogo sem estúdio.",
  },
  argTypes: {
    colunas6: { control: "boolean" },
    href: { control: "text" },
  },
  decorators: [
    (Story, { parameters }) =>
      parameters.largura === "livre" ? (
        <Story />
      ) : (
        <div style={{ maxWidth: parameters.largura === "6colunas" ? "min(100%, 560px)" : "min(100%, 360px)" }}>
          <Story />
        </div>
      ),
  ],
} satisfies Meta<typeof CardManual>

export default meta
type Story = StoryObj<typeof meta>

const fotoMock = { src: photo("produto"), alt: "Frasco sobre mesa de madeira, com luz de janela" }

export const Padrao: Story = { name: "Padrão" }

export const ComFoto: Story = { name: "Com foto", args: { imagem: fotoMock } }

export const FotoPanoramica: Story = {
  name: "Foto 16:9",
  args: { imagem: { ...fotoMock, proporcao: "16/9" } },
}

/** Card clicável: passe o mouse para ver o fio no texto e o rótulo no acento. */
export const Clicavel: Story = { name: "Clicável", args: { imagem: fotoMock, href: "#" } }

/** Card de 6 colunas: padding 32 (20 no celular). */
export const Colunas6: Story = {
  name: "Colunas 6",
  args: { colunas6: true },
  parameters: { largura: "6colunas" },
}

/**
 * EM APROVAÇÃO: o foco de teclado é uma proposta do manual (contorno de 2px na cor do texto,
 * afastado 2px) e pode mudar. Clique no canvas e aperte Tab para ver.
 */
export const FocoProposta: Story = {
  name: "Foco (proposta)",
  args: { href: "#" },
  parameters: {
    docs: {
      description: { story: "**Proposta (EM APROVAÇÃO).** Contorno de 2px na cor do texto, afastado 2px. Aperte Tab." },
    },
  },
}

const painel = {
  background: "var(--fundo)",
  color: "var(--texto)",
  padding: "var(--esp-6)",
  display: "grid",
  gap: "var(--esp-4)",
  gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
} as const

/** Os estados da ficha 2 · 05.03 no fundo escuro (dg) e no claro (dg-claro). */
export const EscuroEClaro: Story = {
  name: "Fundo escuro e claro",
  parameters: { largura: "livre" },
  render: (args) => (
    <div style={{ display: "grid", gap: "var(--esp-6)" }}>
      {(["dg", "dg-claro"] as const).map((tema) => (
        <div key={tema} data-tema={tema} style={painel}>
          <CardManual {...args} rotulo={tema === "dg" ? "fundo escuro" : "fundo claro"} />
          <CardManual {...args} imagem={fotoMock} />
          <CardManual {...args} imagem={fotoMock} href="#" rotulo="clicável" />
        </div>
      ))}
    </div>
  ),
}
