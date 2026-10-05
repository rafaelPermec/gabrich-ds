import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from './Radio';

const meta = {
  title: 'Atoms/Radio',
  component: Radio,
  args: { label: 'Fundo infinito', name: 'cenario' },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Group: Story = {
  render: () => (
    <fieldset style={{ border: 0, display: 'grid', gap: 'var(--space-3)' }}>
      <legend style={{ marginBottom: 'var(--space-3)' }}>Cenário</legend>
      <Radio name="cenario-grupo" label="Fundo infinito" defaultChecked />
      <Radio name="cenario-grupo" label="Ambientado" />
      <Radio name="cenario-grupo" label="Lifestyle" />
      <Radio name="cenario-grupo" label="Indisponível" disabled />
    </fieldset>
  ),
};
