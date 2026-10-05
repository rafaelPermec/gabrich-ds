import type { Meta, StoryObj } from "@storybook/react-vite"
import { Navbar } from "./Navbar"
import { Button } from "../../atoms/Button"

const meta = {
  title: "Organisms/Navbar",
  component: Navbar,
  parameters: { layout: "fullscreen" },
  args: {
    logoText: "dg",
    links: [
      { label: "Portfólio", href: "#", active: true },
      { label: "Serviços", href: "#" },
      { label: "Sobre", href: "#" },
      { label: "Contato", href: "#" },
    ],
    cta: (
      <Button size="sm" shape="pill">
        Orçamento
      </Button>
    ),
  },
  argTypes: { logo: { control: false }, cta: { control: false } },
} satisfies Meta<typeof Navbar>

export default meta
type Story = StoryObj<typeof meta>

export const Dark: Story = {}
export const Light: Story = { args: { dark: false } }
export const Mobile: Story = {
  globals: { viewport: { value: "mobile1", isRotated: false } },
}
