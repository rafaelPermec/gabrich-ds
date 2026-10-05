import type { Meta, StoryObj } from "@storybook/react-vite"
import { Input } from "./Input"

const meta = {
  title: "Atoms/Input",
  component: Input,
  args: { placeholder: "seu@email.com", "aria-label": "E-mail" },
  argTypes: { size: { control: "inline-radio", options: ["md", "lg"] } },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Large: Story = { args: { size: "lg" } }
export const WithError: Story = {
  args: {
    error: true,
    errorMessage: "Informe um e-mail válido.",
    defaultValue: "debora@",
  },
}
export const Disabled: Story = { args: { disabled: true } }
