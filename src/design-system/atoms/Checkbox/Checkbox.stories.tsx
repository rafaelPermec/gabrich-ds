import type { Meta, StoryObj } from "@storybook/react-vite"
import { Checkbox } from "./Checkbox"

const meta = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  args: { label: "Incluir tratamento de imagem" },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Checked: Story = { args: { defaultChecked: true } }
export const Indeterminate: Story = {
  args: { indeterminate: true, label: "Selecionar todos" },
}
export const Disabled: Story = { args: { disabled: true } }
