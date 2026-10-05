import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from './Icon';
import { IconCamera, IconClock, IconHome, IconArrow } from '../../utils/storyFixtures';

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    docs: {
      description: {
        component:
          'Container de ícone com tamanhos fixos (16/20/24/32) e cores da paleta. Sem `label`, o ícone é decorativo (`aria-hidden`).',
      },
    },
  },
  args: { children: <IconCamera />, label: 'Câmera' },
  argTypes: {
    size: { control: 'inline-radio', options: [16, 20, 24, 32] },
    color: { control: 'select', options: ['current', 'ink', 'paper', 'ochre', 'caramel', 'sand'] },
    children: { control: false },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
      {([16, 20, 24, 32] as const).map((s) => <Icon key={s} {...args} size={s} />)}
    </div>
  ),
};

export const Set: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
      <Icon color="ochre"><IconCamera /></Icon>
      <Icon color="ochre"><IconClock /></Icon>
      <Icon color="ochre"><IconHome /></Icon>
      <Icon color="ochre"><IconArrow /></Icon>
    </div>
  ),
};
