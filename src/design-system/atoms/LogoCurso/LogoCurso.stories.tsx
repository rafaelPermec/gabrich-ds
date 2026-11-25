import type { Meta, StoryObj } from "@storybook/react-vite"
import { LogoCurso, type LogoCursoCurso } from "./LogoCurso"

const meta = {
  title: "Atoms/LogoCurso",
  component: LogoCurso,
  parameters: {
    docs: {
      description: {
        component: [
          "**Logo do curso** · **Status de aprovação:** APROVADO (logos dos cursos no manual vigente).",
          "",
          "Logo de Luz na Prática, Mais que um Click, Antes da Foto e No Estúdio como imagem de uma cor só (R19): uma máscara do SVG pintada com a cor do texto do tema. Serve ao combo, ao quiz e à faixa. Altura padrão de 32px; a largura segue a proporção da logo. As cores vêm do tema do manual (`data-tema`); escolha o tema na toolbar. A story “Fundo escuro e claro” mostra as quatro nos dois fundos.",
        ].join("\n"),
      },
    },
  },
  args: { curso: "lnp" },
  argTypes: {
    curso: { control: "inline-radio", options: ["lnp", "mqc", "adf", "ne"] },
    variante: { control: "inline-radio", options: ["horizontal", "empilhada"] },
  },
} satisfies Meta<typeof LogoCurso>

export default meta
type Story = StoryObj<typeof meta>

const CURSOS: LogoCursoCurso[] = ["lnp", "mqc", "adf", "ne"]
/** Tema do manual de cada curso (o de Luz na Prática é `lp`). */
const TEMA_DO_CURSO: Record<LogoCursoCurso, string> = { lnp: "lp", mqc: "mqc", adf: "adf", ne: "ne" }
const grade = { display: "grid", gridTemplateColumns: "repeat(2, max-content)", gap: "var(--esp-8)", alignItems: "center" } as const

export const Padrao: Story = { name: "Padrão" }

/** Os quatro cursos, na versão horizontal e na empilhada. */
export const Cursos: Story = {
  render: () => (
    <div style={grade}>
      {CURSOS.map((curso) => [
        <LogoCurso key={`${curso}-h`} curso={curso} />,
        <LogoCurso key={`${curso}-e`} curso={curso} variante="empilhada" style={{ height: "var(--esp-16)" }} />,
      ])}
    </div>
  ),
}

const painel = { background: "var(--fundo)", color: "var(--texto)", padding: "var(--esp-6)", display: "grid", gap: "var(--esp-4)" } as const

/** Cada logo no tema do curso, no fundo escuro e no claro. */
export const EscuroEClaro: Story = {
  name: "Fundo escuro e claro",
  render: () => (
    <div style={{ display: "grid", gap: "var(--esp-6)" }}>
      {CURSOS.flatMap((curso) =>
        [TEMA_DO_CURSO[curso], `${TEMA_DO_CURSO[curso]}-claro`].map((tema) => (
          <div key={tema} data-tema={tema} style={painel}>
            <span>{tema.endsWith("-claro") ? "fundo claro" : "fundo escuro"}</span>
            <div style={{ display: "flex", gap: "var(--esp-8)", alignItems: "center", flexWrap: "wrap" }}>
              <LogoCurso curso={curso} />
              <LogoCurso curso={curso} variante="empilhada" style={{ height: "var(--esp-16)" }} />
            </div>
          </div>
        )),
      )}
    </div>
  ),
}
