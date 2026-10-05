import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stat } from './Stat';
import { IconCamera } from '../../utils/storyFixtures';

const meta = {
  title: 'Molecules/Stat',
  component: Stat,
  args: { value: '1.240', label: 'Fotos entregues em 2026', change: '+18%' },
  argTypes: { icon: { control: false } },
} satisfies Meta<typeof Stat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Negative: Story = { args: { change: '-4%', changePositive: false, label: 'Prazo médio (dias)', value: '8,2' } };
export const WithIcon: Story = { args: { icon: <IconCamera /> } };
export const Dark: Story = { args: { dark: true } };

export const Row: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 'var(--space-6)' }}>
      <Stat value="1.240" label="Fotos entregues" change="+18%" />
      <Stat value="86" label="Clientes ativos" change="+6%" />
      <Stat value="8,2" label="Prazo médio (dias)" change="-4%" changePositive={false} />
    </div>
  ),
};
