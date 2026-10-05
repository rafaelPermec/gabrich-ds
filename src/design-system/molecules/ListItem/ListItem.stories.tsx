import type { Meta, StoryObj } from "@storybook/react-vite"
import { ListItem } from "./ListItem"
import { Avatar } from "../../atoms/Avatar"
import { Badge } from "../../atoms/Badge"
import { IconCamera } from "../../utils/storyFixtures"

const meta = {
  title: "Molecules/ListItem",
  component: ListItem,
  args: {
    label: "Briefing e referências",
    sublabel: "Alinhamento do estilo visual",
  },
  argTypes: {
    leadingType: {
      control: "inline-radio",
      options: ["icon", "avatar", "number", "dot"],
    },
    leading: { control: false },
    trailing: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 480 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ListItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Numbered: Story = {
  render: (args) => (
    <div>
      <ListItem
        {...args}
        leadingType="number"
        leading="1"
        label="Briefing"
        divider
      />
      <ListItem
        {...args}
        leadingType="number"
        leading="2"
        label="Produção"
        sublabel="Sessão em estúdio"
        divider
      />
      <ListItem
        {...args}
        leadingType="number"
        leading="3"
        label="Entrega"
        sublabel="Fotos tratadas em 10 dias"
      />
    </div>
  ),
}

export const WithIcon: Story = {
  args: { leadingType: "icon", leading: <IconCamera /> },
}

export const WithAvatarAndTrailing: Story = {
  args: {
    leadingType: "avatar",
    leading: <Avatar alt="Débora Gabrich" initials="DG" size="sm" />,
    label: "Débora Gabrich",
    sublabel: "Fotógrafa e diretora criativa",
    trailing: (
      <Badge color="ochre" size="sm">
        Autora
      </Badge>
    ),
  },
}

export const Clickable: Story = {
  args: { clickable: true, leadingType: "dot", divider: true },
}
