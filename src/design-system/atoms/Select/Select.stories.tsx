import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const meta = {
  title: 'Atoms/Select',
  component: Select,
  args: {
    'aria-label': 'Tipo de ensaio',
    placeholder: 'Selecione o tipo de ensaio',
    options: [
      { value: 'still', label: 'Still' },
      { value: 'ambientado', label: 'Ambientado' },
      { value: 'lifestyle', label: 'Lifestyle' },
      { value: 'video', label: 'Vídeo (em breve)', disabled: true },
    ],
  },
  argTypes: { size: { control: 'inline-radio', options: ['md', 'lg'] } },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Large: Story = { args: { size: 'lg' } };
export const WithError: Story = { args: { error: true, errorMessage: 'Escolha uma opção.' } };
export const Disabled: Story = { args: { disabled: true } };
