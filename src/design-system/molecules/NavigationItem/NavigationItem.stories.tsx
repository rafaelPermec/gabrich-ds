import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import { NavigationItem } from "./NavigationItem"
import { IconHome, IconCamera, IconClock } from "../../utils/storyFixtures"

const meta = {
  title: "Molecules/NavigationItem",
  component: NavigationItem,
  args: { label: "Portfólio", href: "#", onClick: fn() },
  argTypes: { icon: { control: false } },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 280 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NavigationItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Active: Story = { args: { active: true } }
export const WithIconAndBadge: Story = {
  args: { icon: <IconCamera />, badge: 12 },
}
export const Disabled: Story = { args: { disabled: true } }

export const Menu: Story = {
  render: () => (
    <nav style={{ display: "grid", gap: "var(--space-1)" }}>
      <NavigationItem label="Início" icon={<IconHome />} href="#" />
      <NavigationItem
        label="Portfólio"
        icon={<IconCamera />}
        href="#"
        active
        badge={12}
      />
      <NavigationItem label="Agenda" icon={<IconClock />} href="#" />
    </nav>
  ),
}
