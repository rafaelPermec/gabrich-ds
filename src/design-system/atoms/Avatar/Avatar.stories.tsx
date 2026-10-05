import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';
import { photo } from '../../utils/storyFixtures';

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component:
          'Retrato circular — reservado ao retrato da própria Débora ou de pessoas (nunca produto). Sem imagem, exibe as iniciais.',
      },
    },
  },
  args: { alt: 'Débora Gabrich', initials: 'DG' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl'] } },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {};

export const WithImage: Story = { args: { src: photo('DG', '#644D3D', '#F4F0E8') } };

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
      <Avatar {...args} size="xl" />
    </div>
  ),
};
