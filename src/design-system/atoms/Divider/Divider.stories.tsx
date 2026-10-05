import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './Divider';

const meta = {
  title: 'Atoms/Divider',
  component: Divider,
  parameters: {
    docs: {
      description: {
        component: 'Filete de 1px. Use `neutral` sobre fundo claro e `border-dark` sobre fundo escuro.',
      },
    },
  },
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    color: { control: 'select', options: ['neutral', 'border-dark', 'ink', 'paper', 'ochre'] },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--space-4)', height: 48, alignItems: 'stretch' }}>
      <span>Fotografia</span>
      <Divider {...args} />
      <span>Direção criativa</span>
    </div>
  ),
};
