import type { Meta, StoryObj } from "@storybook/react-vite"
import { FormField } from "./FormField"
import { Input } from "../../atoms/Input"
import { Textarea } from "../../atoms/Textarea"

const meta = {
  title: "Molecules/FormField",
  component: FormField,
  parameters: {
    docs: {
      description: {
        component:
          "Associa label, texto de apoio e mensagem de erro a um controle de formulário.",
      },
    },
  },
  args: {
    label: "E-mail",
    htmlFor: "ff-email",
    helperText: "Usamos apenas para enviar o orçamento.",
    children: <Input id="ff-email" placeholder="seu@email.com" />,
  },
  argTypes: { children: { control: false } },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FormField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Required: Story = { args: { required: true } }
export const WithError: Story = {
  args: {
    errorMessage: "Informe um e-mail válido.",
    helperText: undefined,
    children: <Input id="ff-email" error defaultValue="debora@" />,
  },
}
export const WithTextarea: Story = {
  args: {
    label: "Briefing",
    htmlFor: "ff-brief",
    helperText: "Produto, quantidade e onde as fotos serão usadas.",
    children: <Textarea id="ff-brief" rows={4} />,
  },
}
