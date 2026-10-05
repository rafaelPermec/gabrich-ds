import type { Meta, StoryObj } from "@storybook/react-vite"
import { Badge } from "./Badge"

const colors = ["ink", "paper", "ochre", "caramel"] as const

const meta = {
  title: "Atoms/Badge",
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          'Etiqueta de canto reto ("enquadra") para categorias, status e metadados curtos.',
      },
    },
  },
  args: { children: "Still life" },
  argTypes: {
    variant: { control: "inline-radio", options: ["solid", "outline"] },
    color: { control: "inline-radio", options: colors },
    size: { control: "inline-radio", options: ["sm", "md"] },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Palette: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "var(--space-3)" }}>
      {(["solid", "outline"] as const).map((variant) => (
        <div key={variant} style={{ display: "flex", gap: "var(--space-3)" }}>
          {colors.map((color) => (
            <Badge key={color} {...args} variant={variant} color={color}>
              {color}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
}

export const Small: Story = { args: { size: "sm" } }
