import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import { ActionDisk } from "./ActionDisk"
import { IconArrow, IconPlus } from "../../utils/storyFixtures"

const meta = {
  title: "Atoms/ActionDisk",
  component: ActionDisk,
  parameters: {
    docs: {
      description: {
        component:
          'Disco de ação: círculo inteiro, gesto de "marcar". Use para ações pontuais (avançar, adicionar). Sempre informe `label` para acessibilidade.',
      },
    },
  },
  args: { label: "Avançar", children: <IconArrow />, onClick: fn() },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    variant: { control: "inline-radio", options: ["filled", "outline"] },
    children: { control: false },
  },
} satisfies Meta<typeof ActionDisk>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Outline: Story = {
  args: { variant: "outline", children: <IconPlus />, label: "Adicionar" },
}

export const Sizes: Story = {
  render: (args) => (
    <div
      style={{ display: "flex", gap: "var(--space-4)", alignItems: "center" }}
    >
      <ActionDisk {...args} size="sm" />
      <ActionDisk {...args} size="md" />
      <ActionDisk {...args} size="lg" />
    </div>
  ),
}

export const Disabled: Story = { args: { disabled: true } }
