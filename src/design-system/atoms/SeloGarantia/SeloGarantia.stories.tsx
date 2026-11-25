import type { Meta, StoryObj } from "@storybook/react-vite"
import { SeloGarantia } from "./SeloGarantia"

const meta = {
  title: "Atoms/SeloGarantia",
  component: SeloGarantia,
  parameters: {
    docs: {
      description: {
        component: [
          "**Selo de garantia** · **Status de aprovação:** APROVADO (manual 2 · 05.07). Ícone “aprovação”: PENDENTE (placeholder tracejado até o arquivo chegar).",
          "",
          "Sempre “7 dias de garantia”, o mesmo em todas as páginas, na cor do curso (`--selo-garantia`) e nunca em ocre. Canto reto. Em linha: ícone de 22, Space Mono 9, padding 12 × 16, fio de 1px. Quadrado: 120 × 120 (mínimo 88), com o 7 em Urbanist 600. Nunca dentro do card ou do box de preço: fica fora, uma vez, 32px abaixo da última oferta. As cores vêm do tema do manual (`data-tema`); escolha o tema na toolbar.",
        ].join("\n"),
      },
    },
  },
  argTypes: { forma: { control: "inline-radio", options: ["linha", "quadrado"] } },
} satisfies Meta<typeof SeloGarantia>

export default meta
type Story = StoryObj<typeof meta>

const linha = { display: "flex", gap: "var(--esp-6)", alignItems: "center", flexWrap: "wrap" } as const

export const Linha: Story = { args: { forma: "linha" } }

/** As duas formas da ficha 2 · 05.07. */
export const Formas: Story = {
  render: () => (
    <div style={linha}>
      <SeloGarantia forma="linha" data-testid="linha" />
      <SeloGarantia forma="quadrado" data-testid="quadrado" />
    </div>
  ),
}

const painel = { background: "var(--fundo)", color: "var(--texto)", padding: "var(--esp-6)", display: "grid", gap: "var(--esp-4)" } as const
const CURSOS = [
  ["dg", "Débora Gabrich"],
  ["lp", "Luz na Prática"],
  ["mqc", "Mais que um Click"],
  ["adf", "Antes da Foto"],
  ["ne", "No Estúdio"],
] as const

/** As duas formas em cada curso, no fundo escuro e no claro: a cor muda com o tema, nunca para ocre. */
export const EscuroEClaro: Story = {
  name: "Fundo escuro e claro",
  render: () => (
    <div style={{ display: "grid", gap: "var(--esp-4)" }}>
      {CURSOS.flatMap(([tema, nome]) =>
        ([tema, `${tema}-claro`] as const).map((t) => (
          <div key={t} data-tema={t} style={painel}>
            <span style={{ font: "var(--dg-rotulo)", color: "var(--texto-apoio)" }}>
              {nome} · {t.endsWith("-claro") ? "claro" : "escuro"}
            </span>
            <div style={linha}>
              <SeloGarantia forma="linha" />
              <SeloGarantia forma="quadrado" />
            </div>
          </div>
        )),
      )}
    </div>
  ),
}
