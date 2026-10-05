import type { Meta, StoryObj } from "@storybook/react-vite"
import { Toggle } from "./Toggle"

const meta = {
  title: "Atoms/Toggle",
  component: Toggle,
  args: { label: "Receber novidades" },
  argTypes: { size: { control: "inline-radio", options: ["sm", "md"] } },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const On: Story = { args: { defaultChecked: true } }
export const Small: Story = { args: { size: "sm" } }
export const Disabled: Story = { args: { disabled: true } }
