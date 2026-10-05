import type { Meta, StoryObj } from "@storybook/react-vite"
import { Breadcrumb } from "./Breadcrumb"

const meta = {
  title: "Molecules/Breadcrumb",
  component: Breadcrumb,
  args: {
    items: [
      { label: "Início", href: "#" },
      { label: "Portfólio", href: "#" },
      { label: "Still life" },
    ],
  },
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
