import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import { Pagination } from "./Pagination"

const meta = {
  title: "Molecules/Pagination",
  component: Pagination,
  args: { currentPage: 3, totalPages: 12, onChange: fn() },
  render: function Render(args) {
    const [page, setPage] = useState(args.currentPage)
    return (
      <Pagination
        {...args}
        currentPage={page}
        onChange={(p) => {
          setPage(p)
          args.onChange(p)
        }}
      />
    )
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const FewPages: Story = { args: { currentPage: 1, totalPages: 3 } }
