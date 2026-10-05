import type { Meta, StoryObj } from "@storybook/react-vite"
import { Tabs } from "./Tabs"

const items = [
  {
    id: "still",
    label: "Still",
    content: <p>Produto isolado em fundo infinito, luz controlada.</p>,
  },
  {
    id: "ambientado",
    label: "Ambientado",
    content: <p>Produto em cena, com objetos e texturas de apoio.</p>,
  },
  {
    id: "lifestyle",
    label: "Lifestyle",
    content: <p>Produto em uso, com pessoas e contexto real.</p>,
  },
  { id: "video", label: "Vídeo", content: <p>Em breve.</p>, disabled: true },
]

const meta = {
  title: "Molecules/Tabs",
  component: Tabs,
  args: { items },
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 640 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {}
export const Vertical: Story = { args: { orientation: "vertical" } }
export const DefaultTab: Story = { args: { defaultTab: "lifestyle" } }
