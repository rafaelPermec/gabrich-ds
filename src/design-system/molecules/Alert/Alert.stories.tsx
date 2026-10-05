import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Alert } from './Alert';

const meta = {
  title: 'Molecules/Alert',
  component: Alert,
  parameters: {
    docs: {
      description: { component: 'Mensagens de estado. Cores vêm dos tokens `--color-{info,success,warning,error}` e seus `-bg`, com versões próprias no dark.' },
    },
  },
  args: { title: 'Sessão confirmada', description: 'Enviamos o checklist de produção para o seu e-mail.', onDismiss: fn() },
  argTypes: { variant: { control: 'inline-radio', options: ['info', 'success', 'warning', 'error'] } },
  decorators: [(Story) => <div style={{ maxWidth: 560 }}><Story /></div>],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
      <Alert {...args} variant="info" title="Informação" />
      <Alert {...args} variant="success" title="Tudo certo" />
      <Alert {...args} variant="warning" title="Atenção" />
      <Alert {...args} variant="error" title="Algo deu errado" />
    </div>
  ),
};

export const Dismissible: Story = { args: { dismissible: true, variant: 'success' } };
