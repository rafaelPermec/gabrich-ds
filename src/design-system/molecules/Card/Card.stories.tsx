import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';
import { Button } from '../../atoms/Button';
import { IconCamera, photo } from '../../utils/storyFixtures';

const meta = {
  title: 'Molecules/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          'Card de canto reto ("enquadra"). Cinco variantes: `content`, `icon`, `project` (com foto), `data` (número em destaque) e `value` (com rodapé/ação).',
      },
    },
  },
  args: {
    label: 'Serviço',
    title: 'Fotografia de produto',
    body: 'Still em fundo infinito com tratamento de cor fiel ao produto.',
  },
  argTypes: {
    variant: { control: 'select', options: ['content', 'icon', 'project', 'data', 'value'] },
    imageAspect: { control: 'inline-radio', options: ['4/3', '4/5'] },
    icon: { control: false },
    action: { control: false },
    footer: { control: false },
  },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Content: Story = { args: { variant: 'content' } };

export const WithIcon: Story = { args: { variant: 'icon', icon: <IconCamera /> } };

export const Project: Story = {
  args: {
    variant: 'project',
    label: 'Cosméticos',
    title: 'Linha Pele Nua',
    imageSrc: photo('Pele Nua'),
    imageAlt: 'Frascos da linha Pele Nua',
    imageAspect: '4/5',
  },
};

export const Data: Story = { args: { variant: 'data', stat: '1.200+', statLabel: 'produtos fotografados' } };

export const Value: Story = {
  args: {
    variant: 'value',
    label: 'Pacote',
    title: 'Essencial',
    body: '20 fotos tratadas, fundo infinito, entrega em 10 dias.',
    action: <Button size="sm">Solicitar orçamento</Button>,
  },
};

export const Dark: Story = { args: { variant: 'content', dark: true } };
