import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

const meta = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  args: {
    content: 'Inclui 3 rodadas de ajuste',
    children: <Button variant="outline">Passe o mouse</Button>,
  },
  argTypes: {
    placement: { control: 'inline-radio', options: ['top', 'right', 'bottom', 'left'] },
    children: { control: false },
  },
  decorators: [(Story) => <div style={{ padding: 'var(--space-16)' }}><Story /></div>],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {};
export const Right: Story = { args: { placement: 'right' } };
export const Bottom: Story = { args: { placement: 'bottom' } };
export const Left: Story = { args: { placement: 'left' } };
