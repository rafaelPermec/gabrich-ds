import type { Meta, StoryObj } from "@storybook/react-vite"
import { userEvent, within } from "storybook/test"
import type { CursoOnline } from "../../dados/index"
import { DESCONTO_DA_CAMPANHA_2026_MOCK } from "../../mocks/campanha"
import { DESCRITIVOS_COMBO_MOCK, INCLUSOS_COMBO_MOCK } from "../../mocks/conteudo"
import { OFERTAS_MOCK, PRECOS_NORMAIS_MOCK } from "../../mocks/ofertas"
import { MonteSeuCombo } from "./MonteSeuCombo"

const meta = {
  title: "Organisms/MonteSeuCombo",
  component: MonteSeuCombo,
  parameters: {
    docs: {
      description: {
        component: [
          "**Monte seu combo / Monte a sua Black Friday** · **Status de aprovação:** APROVADO (manual 2 · 05.12). Hover e foco: proposta, a validar com a Débora.",
          "",
          "O mesmo componente nos dois casos: três cursos para marcar em qualquer combinação; o curso da página vem primeiro e já marcado, os outros na ordem Antes da Foto, Luz na Prática, Mais que um Click. A linha inteira é clicável (mouse, Tab e Espaço), com 44 de altura mínima; na lista, só logo e descritivo, sem preço.",
          "",
          "O resumo mostra as logos da combinação, o que cada curso inclui, “preço separado” e o desconto (fora da Black só com 2 ou 3 cursos; na Black, riscado e com o desconto da Black), o preço em 12x e à vista, “você economiza” e o botão para o checkout da oferta. Sem nada marcado: “marque pelo menos um curso.” e o botão desabilitado. Preços e porcentagens vêm do dado (mocks nas stories); nada é calculado na tela.",
          "",
          "Cores dos 12 tokens do `data-tema` da página; título e preço nas fontes `--combo-*` de cada tema. Diferenças do protótipo: espaçamentos levados à escala de 4; o curso único fora da Black diz “quero o curso” (Antes da Foto: “quero o e-book”), não “quero garantir”; “você economiza” no acento do tema.",
        ].join("\n"),
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "880px", padding: "var(--esp-6)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MonteSeuCombo>

export default meta
type Story = StoryObj<typeof MonteSeuCombo>

/** Clica na linha (no descritivo, não no checkbox) de cada curso. */
const clicarNasLinhas =
  (...cursos: CursoOnline[]): Story["play"] =>
  async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    for (const curso of cursos) {
      await userEvent.click(canvas.getByText(DESCRITIVOS_COMBO_MOCK[curso]))
    }
    // Clique de mouse não deixa contorno de foco na linha.
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
  }

function combo(curso: CursoOnline, black: boolean, tema: string = curso): Story {
  const comum = {
    cursoDaPagina: curso,
    ofertas: OFERTAS_MOCK,
    precosNormais: PRECOS_NORMAIS_MOCK,
    descritivos: DESCRITIVOS_COMBO_MOCK,
    inclusos: INCLUSOS_COMBO_MOCK,
  }
  return {
    globals: { tema },
    args: black ? { ...comum, blackFriday: true, descontoDaCampanha: DESCONTO_DA_CAMPANHA_2026_MOCK } : comum,
  }
}

// Página do Luz na Prática: nada, 1, 2 e 3 cursos, normal e Black.
export const LpNadaNormal: Story = { ...combo("lp", false), name: "Luz na Prática · nada marcado · normal", play: clicarNasLinhas("lp") }
export const LpUmNormal: Story = { ...combo("lp", false), name: "Luz na Prática · 1 curso · normal" }
export const LpDoisNormal: Story = { ...combo("lp", false), name: "Luz na Prática · 2 cursos · normal", play: clicarNasLinhas("adf") }
export const LpTresNormal: Story = { ...combo("lp", false), name: "Luz na Prática · 3 cursos · normal", play: clicarNasLinhas("adf", "mqc") }

export const LpNadaBlack: Story = { ...combo("lp", true), name: "Luz na Prática · nada marcado · Black", play: clicarNasLinhas("lp") }
export const LpUmBlack: Story = { ...combo("lp", true), name: "Luz na Prática · 1 curso · Black" }
export const LpDoisBlack: Story = { ...combo("lp", true), name: "Luz na Prática · 2 cursos · Black", play: clicarNasLinhas("adf") }
export const LpTresBlack: Story = { ...combo("lp", true), name: "Luz na Prática · 3 cursos · Black", play: clicarNasLinhas("adf", "mqc") }

// Outros cursos e fundos.
export const LpUmClaro: Story = { ...combo("lp", false, "lp-claro"), name: "Luz na Prática · 1 curso · claro" }
export const AdfUmNormal: Story = { ...combo("adf", false), name: "Antes da Foto · 1 curso · normal" }
export const AdfDoisBlack: Story = { ...combo("adf", true), name: "Antes da Foto · 2 cursos · Black", play: clicarNasLinhas("lp") }
export const AdfUmClaro: Story = { ...combo("adf", false, "adf-claro"), name: "Antes da Foto · 1 curso · claro" }
export const MqcUmNormal: Story = { ...combo("mqc", false), name: "Mais que um Click · 1 curso · normal" }
export const MqcUmBlack: Story = { ...combo("mqc", true), name: "Mais que um Click · 1 curso · Black" }
export const MqcDoisClaro: Story = { ...combo("mqc", false, "mqc-claro"), name: "Mais que um Click · 2 cursos · claro", play: clicarNasLinhas("lp") }

/** Página da Black Friday (marca mãe com a camada da campanha). */
export const MarcaMaeBlack: Story = {
  ...combo("lp", true, "dg"),
  name: "Marca mãe · Black",
  globals: { tema: "dg", campanha: "bf" },
}

/** RF5: combinação sem oferta no dado: o aviso no lugar do resumo. */
export const OfertaAusente: Story = {
  ...combo("lp", false),
  name: "Oferta ausente no dado",
  args: { ...combo("lp", false).args, ofertas: OFERTAS_MOCK.filter((o) => o.slug !== "luz-antes-da-foto") },
  play: clicarNasLinhas("adf"),
}
