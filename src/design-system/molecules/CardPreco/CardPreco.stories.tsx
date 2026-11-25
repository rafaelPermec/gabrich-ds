import type { Meta, StoryObj } from "@storybook/react-vite"
import type { CursoOnline } from "../../dados/index"
import { DESCONTO_DA_CAMPANHA_2026_MOCK } from "../../mocks/campanha"
import { listaDoCardMock as lista } from "../../mocks/conteudo"
import { OFERTA_NO_ESTUDIO_MOCK, ofertaDoCursoMock as ofertaDoCurso } from "../../mocks/ofertas"
import { CardPreco } from "./CardPreco"

const meta = {
  title: "Molecules/CardPreco",
  component: CardPreco,
  parameters: {
    docs: {
      description: {
        component: [
          "**Card de preço** · **Status de aprovação:** APROVADO (manual 2 · 05.05b). Hover e foco do botão: proposta, a validar com a Débora.",
          "",
          "O card do fim de cada página: mesmo conteúdo e mesma ordem em todos (logo · tipo · etiqueta da Black · “de R$ X por” · 12x · à vista · fio · lista · botão · linha abaixo do botão), com o visual de cada curso. Antes da Foto, Luz na Prática e Mais que um Click em versão normal e Black Friday; No Estúdio só na normal. Raio de 16 no card; botão e etiqueta retos. O selo de garantia fica fora do card, uma vez, abaixo das ofertas (`CardsDePreco`).",
          "",
          "O card aplica o próprio `data-tema` (`<curso>` ou `<curso>-claro`) e usa os tokens `--card-preco-*` da tabela 2 · 05.05b. Preços, parcelas, lista e o desconto da campanha chegam no dado (mocks nas stories). O botão é um link para o checkout da oferta: o link da Hotmart ou, sem ele, o id. Diferenças do protótipo: espaçamentos levados à escala de 4 e o botão do Antes da Foto em Manrope 600 (a 2 · 06 não carrega o 700).",
        ].join("\n"),
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "min(100%, 460px)", padding: "var(--esp-6)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CardPreco>

export default meta
type Story = StoryObj<typeof CardPreco>

/** Story de um curso online, normal ou Black, no fundo escuro ou claro (o fundo da página segue o tema). */
function online(curso: CursoOnline, black: boolean, claro: boolean): Story {
  const comum = { oferta: ofertaDoCurso(curso), lista: lista(curso), claro }
  return {
    globals: { tema: claro ? `${curso}-claro` : curso },
    args: black ? { ...comum, blackFriday: true, descontoDaCampanha: DESCONTO_DA_CAMPANHA_2026_MOCK } : comum,
  }
}

function noEstudio(claro: boolean): Story {
  return {
    globals: { tema: claro ? "ne-claro" : "ne" },
    args: { oferta: OFERTA_NO_ESTUDIO_MOCK, lista: lista("ne"), claro },
  }
}

export const AdfNormalEscuro: Story = { ...online("adf", false, false), name: "Antes da Foto · normal · escuro" }
export const AdfBlackEscuro: Story = { ...online("adf", true, false), name: "Antes da Foto · Black · escuro" }
export const AdfNormalClaro: Story = { ...online("adf", false, true), name: "Antes da Foto · normal · claro" }
export const AdfBlackClaro: Story = { ...online("adf", true, true), name: "Antes da Foto · Black · claro" }

export const LpNormalEscuro: Story = { ...online("lp", false, false), name: "Luz na Prática · normal · escuro" }
export const LpBlackEscuro: Story = { ...online("lp", true, false), name: "Luz na Prática · Black · escuro" }
export const LpNormalClaro: Story = { ...online("lp", false, true), name: "Luz na Prática · normal · claro" }
export const LpBlackClaro: Story = { ...online("lp", true, true), name: "Luz na Prática · Black · claro" }

export const MqcNormalEscuro: Story = { ...online("mqc", false, false), name: "Mais que um Click · normal · escuro" }
export const MqcBlackEscuro: Story = { ...online("mqc", true, false), name: "Mais que um Click · Black · escuro" }
export const MqcNormalClaro: Story = { ...online("mqc", false, true), name: "Mais que um Click · normal · claro" }
export const MqcBlackClaro: Story = { ...online("mqc", true, true), name: "Mais que um Click · Black · claro" }

/** O No Estúdio não entra na Black: só a versão normal. */
export const NeNormalEscuro: Story = { ...noEstudio(false), name: "No Estúdio · normal · escuro" }
export const NeNormalClaro: Story = { ...noEstudio(true), name: "No Estúdio · normal · claro" }

/** RF12: com o link da Hotmart no dado, o botão vai ao link; sem ele, ao id de checkout. */
export const ComLink: Story = {
  name: "Com link de checkout",
  globals: { tema: "lp" },
  args: {
    oferta: { ...ofertaDoCurso("lp"), linkNormal: "https://pay.hotmart.com/exemplo-luz-na-pratica" },
    lista: lista("lp"),
  },
}
