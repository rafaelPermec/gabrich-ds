import type { Meta, StoryObj } from "@storybook/react-vite"
import { ProgressBar } from "./ProgressBar"

const meta = {
  title: "Atoms/ProgressBar",
  component: ProgressBar,
  args: { value: 64, max: 100, label: "Edição do ensaio", showLabel: true },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    color: { control: "inline-radio", options: ["ink", "ochre", "caramel"] },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Colors: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "var(--space-6)" }}>
      <ProgressBar {...args} color="ink" label="Ink" />
      <ProgressBar {...args} color="ochre" label="Ochre" />
      <ProgressBar {...args} color="caramel" label="Caramel" />
    </div>
  ),
}
