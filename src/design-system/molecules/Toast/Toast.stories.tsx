import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToastProvider, useToast, type ToastVariant } from './Toast';
import { Button } from '../../atoms/Button';

const messages: Record<ToastVariant, { title: string; description: string }> = {
  info: { title: 'Prévia disponível', description: 'As primeiras 10 fotos já estão na galeria.' },
  success: { title: 'Orçamento enviado', description: 'Responderemos em até 24h.' },
  warning: { title: 'Arquivo grande', description: 'O upload pode demorar alguns minutos.' },
  error: { title: 'Falha no envio', description: 'Verifique sua conexão e tente novamente.' },
};

function ToastTriggers() {
  const { addToast } = useToast();
  return (
    <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
      {(Object.keys(messages) as ToastVariant[]).map((variant) => (
        <Button key={variant} variant="outline" size="sm" onClick={() => addToast({ variant, ...messages[variant] })}>
          {variant}
        </Button>
      ))}
    </div>
  );
}

const meta = {
  title: 'Molecules/Toast',
  component: ToastProvider,
  parameters: {
    docs: {
      description: {
        component:
          'Notificações efêmeras. Envolva o app com `ToastProvider` e dispare com `useToast().addToast({ variant, title, description, duration })`. `duration: 0` mantém o toast até ser fechado.',
      },
    },
  },
  args: { children: null },
  argTypes: {
    position: { control: 'inline-radio', options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'] },
    children: { control: false },
  },
  render: (args) => (
    <ToastProvider position={args.position}>
      <ToastTriggers />
    </ToastProvider>
  ),
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TopRight: Story = { args: { position: 'top-right' } };
export const BottomLeft: Story = { args: { position: 'bottom-left' } };
