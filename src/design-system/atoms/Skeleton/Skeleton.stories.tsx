import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  parameters: {
    docs: {
      description: { component: 'Placeholder de carregamento. Shimmer controlado pelo token `--skeleton-shimmer` (ajustado no dark).' },
    },
  },
  args: { width: 240, height: 16 },
  argTypes: { shape: { control: 'inline-radio', options: ['rect', 'circle'] } },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Circle: Story = { args: { shape: 'circle', width: 56, height: 56 } };

export const CardPlaceholder: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-3)', maxWidth: 280 }}>
      <Skeleton height={200} />
      <Skeleton width="60%" height={12} />
      <Skeleton height={20} />
      <Skeleton width="80%" height={14} />
    </div>
  ),
};
