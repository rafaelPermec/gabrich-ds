import type { Meta, StoryObj } from "@storybook/react-vite"
import { Footer } from "./Footer"
import { IconInstagram } from "../../utils/storyFixtures"

const meta = {
  title: "Organisms/Footer",
  component: Footer,
  parameters: { layout: "fullscreen" },
  args: {
    logoText: "dg",
    tagline: "Fotografia de produtos e direção criativa.",
    groups: [
      {
        title: "Estúdio",
        links: [
          { label: "Sobre", href: "#" },
          { label: "Processo", href: "#" },
        ],
      },
      {
        title: "Trabalho",
        links: [
          { label: "Portfólio", href: "#" },
          { label: "Serviços", href: "#" },
          { label: "Orçamento", href: "#" },
        ],
      },
      {
        title: "Contato",
        links: [{ label: "contato@deboragabrich.com", href: "#" }],
      },
    ],
    social: [{ label: "Instagram", href: "#", icon: <IconInstagram /> }],
    copyright: "© 2026 Débora Gabrich",
  },
  argTypes: { logo: { control: false }, social: { control: false } },
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {}
export const Dark: Story = { args: { dark: true } }
