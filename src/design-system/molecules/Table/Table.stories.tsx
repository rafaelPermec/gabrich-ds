import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table, type TableColumn } from './Table';
import { Badge } from '../../atoms/Badge';
import { projectRows } from '../../utils/storyFixtures';

type Row = (typeof projectRows)[number];

const columns: TableColumn<Row>[] = [
  { key: 'projeto', label: 'Projeto', sortable: true },
  { key: 'cliente', label: 'Cliente', sortable: true },
  { key: 'fotos', label: 'Fotos', sortable: true, width: '96px' },
  {
    key: 'status',
    label: 'Status',
    render: (value) => (
      <Badge size="sm" variant="outline" color={value === 'Entregue' ? 'ink' : 'caramel'}>
        {String(value)}
      </Badge>
    ),
  },
];

const meta = {
  title: 'Molecules/Table',
  component: Table<Row>,
  parameters: {
    docs: {
      description: { component: 'Tabela com ordenação por coluna. Hover usa `--bg-hover` e zebra usa `--bg-subtle-alpha`.' },
    },
  },
  args: { columns, data: projectRows.slice(0, 4) },
} satisfies Meta<typeof Table<Row>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Striped: Story = { args: { striped: true, data: projectRows } };
