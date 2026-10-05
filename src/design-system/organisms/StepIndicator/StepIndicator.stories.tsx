import type { Meta, StoryObj } from "@storybook/react-vite"
import { StepIndicator } from "./StepIndicator"

const meta = {
  title: "Organisms/StepIndicator",
  component: StepIndicator,
  parameters: {
    docs: {
      description: {
        component:
          'Numeração de etapas em círculo inteiro (gesto de "marcar"/contar).',
      },
    },
  },
  args: {
    currentStep: 1,
    steps: [
      { label: "Briefing", description: "Produto e referências" },
      { label: "Produção", description: "Sessão em estúdio" },
      { label: "Edição", description: "Tratamento de cor" },
      { label: "Entrega", description: "Galeria final" },
    ],
  },
  argTypes: {
    currentStep: { control: { type: "range", min: 0, max: 3, step: 1 } },
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
  },
} satisfies Meta<typeof StepIndicator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {}
export const Vertical: Story = { args: { orientation: "vertical" } }
export const Dark: Story = { args: { dark: true, currentStep: 2 } }
