import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from './Accordion';

const items = [
  { id: 'prazo', title: 'Qual o prazo de entrega?', content: 'Até 10 dias úteis após a sessão, com prévia em 72h.' },
  { id: 'local', title: 'As fotos são feitas em estúdio?', content: 'Sim, em estúdio próprio — ou ambientadas no seu espaço, sob consulta.' },
  { id: 'uso', title: 'Posso usar as fotos em anúncios?', content: 'O licenciamento padrão cobre site, redes sociais e marketplaces.' },
  { id: 'video', title: 'Vocês fazem vídeo?', content: 'Em breve.', disabled: true },
];

const meta = {
  title: 'Molecules/Accordion',
  component: Accordion,
  args: { items },
  decorators: [(Story) => <div style={{ maxWidth: 640 }}><Story /></div>],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const DefaultOpen: Story = { args: { defaultOpen: ['prazo'] } };
export const Multiple: Story = { args: { multiple: true, defaultOpen: ['prazo', 'local'] } };
