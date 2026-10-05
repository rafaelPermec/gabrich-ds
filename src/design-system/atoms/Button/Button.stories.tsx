import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import { Button } from "./Button"

const meta = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'Botão de ação do design system. Quatro variantes, três tamanhos e dois formatos — `sharp` (canto reto, "enquadra") ou `pill` (9999px). Nunca usar raio intermediário.',
      },
    },
  },
  args: { children: "Ver portfólio", onClick: fn() },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["filled", "outline", "ghost", "text"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    shape: { control: "inline-radio", options: ["sharp", "pill"] },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div
      style={{
        display: "flex",
        gap: "var(--space-4)",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <Button {...args} variant="filled">
        Filled
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="text">
        Text
      </Button>
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div
      style={{ display: "flex", gap: "var(--space-4)", alignItems: "center" }}
    >
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
}

export const Pill: Story = { args: { shape: "pill" } }

export const Loading: Story = { args: { loading: true } }

export const Disabled: Story = { args: { disabled: true } }
