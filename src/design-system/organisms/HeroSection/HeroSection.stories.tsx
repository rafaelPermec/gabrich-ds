import type { Meta, StoryObj } from "@storybook/react-vite"
import { HeroSection } from "./HeroSection"
import { Button } from "../../atoms/Button"
import { photo } from "../../utils/storyFixtures"

const meta = {
  title: "Organisms/HeroSection",
  component: HeroSection,
  parameters: { layout: "fullscreen" },
  args: {
    eyebrow: "Fotografia de produto",
    title: "Luz que vende",
    titleAccent: "sem gritar",
    subtitle: "Direção criativa e still para marcas que cuidam do detalhe.",
    primaryAction: <Button>Ver portfólio</Button>,
    secondaryAction: <Button variant="outline">Solicitar orçamento</Button>,
    dark: true,
  },
  argTypes: {
    primaryAction: { control: false },
    secondaryAction: { control: false },
    image: { control: false },
  },
} satisfies Meta<typeof HeroSection>

export default meta
type Story = StoryObj<typeof meta>

export const Dark: Story = {}

export const WithImage: Story = {
  args: {
    image: (
      <img
        src={photo("still", "#2E2118")}
        alt="Still de produto em fundo cacau"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    ),
  },
}

export const LightCentered: Story = { args: { dark: false, centered: true } }
