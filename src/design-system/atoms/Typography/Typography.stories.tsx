import type { Meta, StoryObj } from "@storybook/react-vite"
import { Heading, Text } from "./Typography"

const meta = {
  title: "Atoms/Typography",
  component: Heading,
  subcomponents: { Text },
  parameters: {
    docs: {
      description: {
        component:
          "`Heading` (Urbanist display / Tenor Sans) e `Text` (Manrope corpo, Space Mono etiquetas, Tenor Sans subtítulo). Texto sempre em cor cheia — troque a cor, nunca a opacidade.",
      },
    },
  },
  args: { children: "Fotografia de produto", level: 1, size: "xl" },
  argTypes: {
    level: { control: "inline-radio", options: [1, 2, 3, 4, 5, 6] },
    size: {
      control: "select",
      options: ["display", "xl", "lg", "md", "sm", "xs"],
    },
    font: { control: "inline-radio", options: ["display", "sub"] },
    color: {
      control: "select",
      options: [
        "ink",
        "paper",
        "ochre",
        "caramel",
        "cocoa-matte",
        "sand",
        "cocoa-deep",
      ],
    },
  },
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof meta>

export const HeadingPlayground: Story = {}

export const HeadingScale: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-4)" }}>
      {(["display", "xl", "lg", "md", "sm", "xs"] as const).map((size) => (
        <Heading key={size} level={2} size={size}>
          {size} · Luz e matéria
        </Heading>
      ))}
    </div>
  ),
}

export const TextVoices: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--space-4)", maxWidth: 640 }}>
      <Text font="mono" size="xs" uppercase color="caramel">
        Ficha técnica · 01
      </Text>
      <Text font="sub" size="lg">
        Cada produto tem uma luz que é só dele.
      </Text>
      <Text font="body" size="base">
        Manrope sustenta parágrafos longos: 15–17px, entrelinha 1,65 e no máximo
        68 caracteres por linha para uma leitura confortável em propostas e no
        site.
      </Text>
    </div>
  ),
}
