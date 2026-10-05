import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import { Modal, type ModalProps } from "./Modal"
import { Button } from "../../atoms/Button"

function ModalDemo(args: ModalProps) {
  const [open, setOpen] = useState(false)
  const close = () => {
    setOpen(false)
    args.onClose()
  }
  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir modal</Button>
      <Modal
        {...args}
        open={open}
        onClose={close}
        footer={
          <div
            style={{
              display: "flex",
              gap: "var(--space-3)",
              justifyContent: "flex-end",
            }}
          >
            <Button variant="ghost" size="sm" onClick={close}>
              Cancelar
            </Button>
            <Button size="sm" onClick={close}>
              Confirmar
            </Button>
          </div>
        }
      />
    </>
  )
}

const meta = {
  title: "Molecules/Modal",
  component: Modal,
  parameters: {
    docs: {
      description: {
        component:
          "Diálogo modal com focus trap, `Esc` para fechar e animação via `motion`. Backdrop usa `--overlay-heavy`.",
      },
    },
  },
  args: {
    open: false,
    onClose: fn(),
    title: "Confirmar agendamento",
    children: (
      <p>
        A sessão de fotos será agendada para 14 de outubro, às 9h, no estúdio.
      </p>
    ),
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg", "full"] },
    open: { control: false },
    children: { control: false },
    footer: { control: false },
  },
  render: (args) => <ModalDemo {...args} />,
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }
