import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Drawer, type DrawerProps } from './Drawer';
import { Button } from '../../atoms/Button';

function DrawerDemo(args: DrawerProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir drawer ({args.side ?? 'right'})</Button>
      <Drawer
        {...args}
        open={open}
        onClose={() => {
          setOpen(false);
          args.onClose();
        }}
      />
    </>
  );
}

const meta = {
  title: 'Molecules/Drawer',
  component: Drawer,
  parameters: {
    docs: {
      description: { component: 'Painel lateral com focus trap e animação via `motion`. Overlay usa `--overlay-mid`.' },
    },
  },
  args: {
    open: false,
    onClose: fn(),
    title: 'Filtros',
    children: <p>Conteúdo do drawer: filtros, navegação ou detalhes de um projeto.</p>,
    footer: <Button size="sm">Aplicar</Button>,
  },
  argTypes: {
    side: { control: 'inline-radio', options: ['left', 'right', 'top', 'bottom'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'full'] },
    open: { control: false },
    children: { control: false },
    footer: { control: false },
  },
  render: (args) => <DrawerDemo {...args} />,
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Right: Story = {};
export const Left: Story = { args: { side: 'left' } };
export const Bottom: Story = { args: { side: 'bottom', size: 'sm' } };
