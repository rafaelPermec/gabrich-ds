import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataTable } from './DataTable';
import type { TableColumn } from '../../molecules/Table';
import { projectRows } from '../../utils/storyFixtures';

type Row = (typeof projectRows)[number];

const columns: TableColumn<Row>[] = [
  { key: 'projeto', label: 'Projeto', sortable: true },
  { key: 'cliente', label: 'Cliente', sortable: true },
  { key: 'fotos', label: 'Fotos', sortable: true, width: '96px' },
  { key: 'status', label: 'Status', sortable: true },
];

const meta = {
  title: 'Organisms/DataTable',
  component: DataTable<Row>,
  parameters: {
    docs: { description: { component: 'Composição de `Table` + `SearchBar` + `Pagination`, com busca nas chaves indicadas em `searchKeys`.' } },
  },
  args: {
    title: 'Projetos',
    columns,
    data: projectRows,
    pageSize: 4,
    searchable: true,
    searchKeys: ['projeto', 'cliente'],
  },
} satisfies Meta<typeof DataTable<Row>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Striped: Story = { args: { striped: true } };
export const WithoutSearch: Story = { args: { searchable: false, title: undefined } };
