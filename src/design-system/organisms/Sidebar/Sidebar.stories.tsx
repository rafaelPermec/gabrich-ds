import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Sidebar } from './Sidebar';
import { IconCamera, IconClock, IconHome } from '../../utils/storyFixtures';

const meta = {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
  args: {
    logoText: 'dg',
    activeId: 'portfolio',
    onSelect: fn(),
    sections: [
      {
        items: [
          { id: 'inicio', label: 'Início', icon: <IconHome /> },
          { id: 'portfolio', label: 'Portfólio', icon: <IconCamera />, badge: 12 },
          { id: 'agenda', label: 'Agenda', icon: <IconClock /> },
        ],
      },
      {
        label: 'Clientes',
        items: [
          { id: 'ativos', label: 'Ativos' },
          { id: 'propostas', label: 'Propostas', badge: 3 },
        ],
      },
    ],
  },
  argTypes: { logo: { control: false }, sections: { control: false } },
  render: function Render(args) {
    const [active, setActive] = useState(args.activeId);
    return (
      <div style={{ height: '100vh', display: 'flex' }}>
        <Sidebar
          {...args}
          activeId={active}
          onSelect={(id) => {
            setActive(id);
            args.onSelect?.(id);
          }}
        />
      </div>
    );
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Collapsible: Story = { args: { collapsible: true } };
