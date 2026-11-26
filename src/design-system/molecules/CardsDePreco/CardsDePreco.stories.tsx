import type { Meta, StoryObj } from "@storybook/react-vite"
import type { CursoOnline } from "../../dados/index"
import { DESCONTO_DA_CAMPANHA_2026_MOCK } from "../../mocks/campanha"
import { listaDoCardMock as lista } from "../../mocks/conteudo"
import { ofertaDoCursoMock as ofertaDoCurso } from "../../mocks/ofertas"
import { CardPreco } from "../CardPreco/index"
import { CardsDePreco } from "./CardsDePreco"

const meta = {
  title: "Molecules/CardsDePreco",
  component: CardsDePreco,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: [
          "**Grupo de cards de preço** · **Status de aprovação:** APROVADO (manual 2 · 05.05b e 2 · 05.07).",
          "",
          "Os cards de preço lado a lado (uma coluna no celular) e um único selo de garantia abaixo do último, a 32px, centralizado. O selo nunca entra no card. Ele usa a cor do selo do card do curso da página (`--card-preco-selo`) e, fora das páginas de curso, a do tema (`--selo-garantia`). Diferença do protótipo: o selo é o átomo `SeloGarantia` (2 · 05.07), não o quadro de 72px com o texto ao lado.",
        ].join("\n"),
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "var(--esp-12) var(--esp-6)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CardsDePreco>

export default meta
type Story = StoryObj<typeof CardsDePreco>

const CURSOS: readonly CursoOnline[] = ["lp", "mqc", "adf"]

function tresCursos(black: boolean, claro: boolean) {
  return CURSOS.map((curso) =>
    black ? (
      <CardPreco
        key={curso}
        oferta={ofertaDoCurso(curso)}
        lista={lista(curso)}
        claro={claro}
        blackFriday
        descontoDaCampanha={DESCONTO_DA_CAMPANHA_2026_MOCK}
      />
    ) : (
      <CardPreco key={curso} oferta={ofertaDoCurso(curso)} lista={lista(curso)} claro={claro} />
    ),
  )
}

/** Página do Luz na Prática na Black: o selo na cor do selo do card do Luz na Prática. */
export const TresBlackEscuro: Story = {
  name: "Três cursos · Black · escuro",
  globals: { tema: "lp" },
  args: { children: tresCursos(true, false) },
}

export const TresNormalEscuro: Story = {
  name: "Três cursos · normal · escuro",
  globals: { tema: "lp" },
  args: { children: tresCursos(false, false) },
}

export const TresNormalClaro: Story = {
  name: "Três cursos · normal · claro",
  globals: { tema: "lp-claro" },
  args: { children: tresCursos(false, true) },
}

/** Fora das páginas de curso (marca mãe na Black): o selo na cor do tema. */
export const TresBlackMarcaMae: Story = {
  name: "Três cursos · Black · marca mãe",
  globals: { tema: "dg", campanha: "bf" },
  args: { children: tresCursos(true, false) },
}

export const SeloQuadrado: Story = {
  name: "Selo quadrado",
  globals: { tema: "adf" },
  args: { children: tresCursos(false, false), formaDoSelo: "quadrado" },
}
