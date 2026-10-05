import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { FilterBar } from './FilterBar';

const meta = {
  title: 'Organisms/FilterBar',
  component: FilterBar,
  args: {
    filters: [
      { id: 'still', label: 'Still' },
      { id: 'ambientado', label: 'Ambientado' },
      { id: 'lifestyle', label: 'Lifestyle' },
      { id: 'joias', label: 'Joias' },
    ],
    sortOptions: [
      { value: 'recent', label: 'Mais recentes' },
      { value: 'az', label: 'A–Z' },
    ],
    onFilterChange: fn(),
    onSearch: fn(),
    onSort: fn(),
  },
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const FiltersOnly: Story = { args: { sortOptions: undefined } };
