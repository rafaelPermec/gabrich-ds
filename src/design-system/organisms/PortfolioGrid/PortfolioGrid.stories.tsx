import type { Meta, StoryObj } from "@storybook/react-vite"
import { PortfolioGrid } from "./PortfolioGrid"
import { photo } from "../../utils/storyFixtures"

const items = [
  {
    id: "1",
    title: "Linha Cacau",
    category: "Alimentos",
    label: "2026",
    imageSrc: photo("Cacau", "dg-cacau-profundo"),
  },
  {
    id: "2",
    title: "Still Joias",
    category: "Joias",
    label: "2026",
    imageSrc: photo("Joias", "dg-preto-tinta"),
  },
  {
    id: "3",
    title: "Pele Nua",
    category: "Cosméticos",
    label: "2025",
    imageSrc: photo("Pele Nua", "dg-cacau-fosco", "dg-papel"),
  },
  {
    id: "4",
    title: "Café Origem",
    category: "Alimentos",
    label: "2025",
    imageSrc: photo("Café", "dg-caramelo", "dg-papel"),
  },
  {
    id: "5",
    title: "Casa Linho",
    category: "Casa",
    label: "2025",
    imageSrc: photo("Linho", "dg-areia", "dg-preto-tinta"),
  },
  {
    id: "6",
    title: "Barro Vivo",
    category: "Casa",
    label: "2024",
    imageSrc: photo("Barro", "dg-cacau-profundo"),
  },
]

const meta = {
  title: "Organisms/PortfolioGrid",
  component: PortfolioGrid,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Grade de projetos com filtro por categoria. Fotos sem raio; overlay usa `--overlay-heavy`.",
      },
    },
  },
  args: {
    items,
    categories: ["Alimentos", "Joias", "Cosméticos", "Casa"],
    columns: 3,
    dark: true,
  },
  argTypes: { columns: { control: "inline-radio", options: [2, 3, 4] } },
} satisfies Meta<typeof PortfolioGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Dark: Story = {}
export const Light: Story = { args: { dark: false } }
export const FourColumns: Story = { args: { columns: 4 } }
