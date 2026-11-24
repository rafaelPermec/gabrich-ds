import type { Meta, StoryObj } from "@storybook/react-vite"
import { Marcador } from "./Marcador"

const meta = {
  title: "Atoms/Marcador",
  component: Marcador,
  parameters: {
    docs: {
      description: {
        component: [
          "**Marcador de lista** · **Status de aprovação:** APROVADO (manual 2 · 05.08).",
          "",
          "Sempre redondo. Ponto de 7px no acento do tema, a 8px do texto; numeração em disco de 20px com Space Mono 9; seleção (combo, quiz, formulário) em anel de 20px com fio de 1,5px e ponto de 8px quando marcado. O anel é só visual: quem usa põe o input e o rótulo, com área clicável de 44px. As cores vêm do tema do manual (`data-tema`); escolha o tema na toolbar. A story “Fundo escuro e claro” mostra os tipos nos dois fundos.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    tipo: { control: "inline-radio", options: ["ponto", "numero", "selecao"] },
  },
} satisfies Meta<typeof Marcador>

export default meta
type Story = StoryObj<typeof meta>

const coluna = { display: "grid", gap: "var(--esp-3)", justifyItems: "start" } as const
const linha = { display: "flex", gap: "var(--esp-4)", alignItems: "center" } as const
const texto = { font: "var(--dg-corpo)", color: "var(--texto)" } as const

export const Ponto: Story = { args: { tipo: "ponto", children: "27 aulas em vídeo, em 08 módulos" } }

/** Os três tipos da ficha 2 · 05.08: lista com ponto, disco numerado e anel de seleção (marcado e vazio). */
export const Tipos: Story = {
  render: () => (
    <div style={{ ...coluna, ...texto }}>
      <Marcador tipo="ponto" data-testid="ponto">
        27 aulas em vídeo, em 08 módulos
      </Marcador>
      <Marcador tipo="ponto">suporte para alunos na plataforma da Hotmart</Marcador>
      <div style={linha}>
        <Marcador tipo="numero" numero={2} data-testid="numero" />
        <Marcador tipo="selecao" marcado data-testid="selecao-marcada" />
        <Marcador tipo="selecao" data-testid="selecao" />
      </div>
    </div>
  ),
}

/** Lista numerada: o número sai com dois dígitos. */
export const Numeracao: Story = {
  name: "Numeração",
  render: () => (
    <div style={{ ...coluna, ...texto }}>
      <Marcador tipo="numero" numero={1}>
        luz principal
      </Marcador>
      <Marcador tipo="numero" numero={2}>
        rebatedor
      </Marcador>
      <Marcador tipo="numero" numero={3}>
        contraluz
      </Marcador>
    </div>
  ),
}

/**
 * O anel é só o desenho: o exemplo mostra o rótulo clicável (44px de altura) que o quiz e o combo
 * põem em volta, com o input nativo escondido.
 */
export const Selecao: Story = {
  name: "Seleção",
  render: () => (
    <fieldset style={{ ...coluna, ...texto, border: 0, padding: 0, margin: 0 }}>
      <legend>Qual é o seu nível?</legend>
      {["começando agora", "já fotografo"].map((opcao, i) => (
        <label key={opcao} style={{ ...linha, gap: "var(--esp-2)", minHeight: "44px", cursor: "pointer" }}>
          <input type="radio" name="nivel" defaultChecked={i === 0} style={{ position: "absolute", opacity: 0 }} />
          <Marcador tipo="selecao" marcado={i === 0} />
          {opcao}
        </label>
      ))}
    </fieldset>
  ),
}

const painel = { background: "var(--fundo)", color: "var(--texto)", padding: "var(--esp-6)", display: "grid", gap: "var(--esp-4)" } as const

/** Os tipos da ficha 2 · 05.08 no fundo escuro (dg) e no claro (dg-claro). */
export const EscuroEClaro: Story = {
  name: "Fundo escuro e claro",
  render: () => (
    <div style={{ display: "grid", gap: "var(--esp-6)" }}>
      {(["dg", "dg-claro"] as const).map((tema) => (
        <div key={tema} data-tema={tema} style={painel}>
          <span>{tema === "dg" ? "fundo escuro" : "fundo claro"}</span>
          <div style={coluna}>
            <Marcador tipo="ponto">27 aulas em vídeo, em 08 módulos</Marcador>
            <Marcador tipo="ponto">suporte para alunos na plataforma da Hotmart</Marcador>
            <div style={linha}>
              <Marcador tipo="numero" numero={2} />
              <Marcador tipo="selecao" marcado />
              <Marcador tipo="selecao" />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
}
