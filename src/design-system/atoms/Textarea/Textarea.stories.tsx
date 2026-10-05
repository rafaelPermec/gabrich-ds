import type { Meta, StoryObj } from "@storybook/react-vite"
import { Textarea } from "./Textarea"

const meta = {
  title: "Atoms/Textarea",
  component: Textarea,
  args: {
    placeholder: "Conte sobre o produto e o uso das fotos…",
    rows: 4,
    "aria-label": "Briefing",
  },
  argTypes: {
    resize: { control: "inline-radio", options: ["none", "vertical", "both"] },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 480 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithError: Story = {
  args: {
    error: true,
    errorMessage: "O briefing precisa de pelo menos 20 caracteres.",
  },
}
export const NoResize: Story = { args: { resize: "none" } }
export const Disabled: Story = { args: { disabled: true } }
