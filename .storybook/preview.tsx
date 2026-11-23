import { useEffect } from "react"
import type { Decorator, Preview } from "@storybook/react-vite"
import { ToastProvider } from "../src/design-system/molecules/Toast"
import { temas, type Campanha, type Tema } from "../src/design-system/tokens"
import "../src/index.css"

type ThemeGlobal = "light" | "dark"
type VerticalGlobal = "none" | "portfolio" | "document" | "course" | "blackfriday"
type TemaGlobal = "nenhum" | Tema
type CampanhaGlobal = "nenhuma" | Campanha

const rotulosTema: Record<Tema, string> = {
  dg: "Débora Gabrich",
  "dg-claro": "Débora Gabrich · claro",
  lp: "Luz na Prática",
  "lp-claro": "Luz na Prática · claro",
  mqc: "Mais que um Click",
  "mqc-claro": "Mais que um Click · claro",
  adf: "Antes da Foto",
  "adf-claro": "Antes da Foto · claro",
  ne: "No Estúdio",
  "ne-claro": "No Estúdio · claro",
}

/**
 * Aplica o tema no <html> exatamente como o ThemeProvider do app faz
 * (classes `light`/`dark`), para que os tokens de `index.css` respondam.
 */
const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme ?? "light") as ThemeGlobal

  useEffect(() => {
    const html = document.documentElement
    html.classList.remove("light", "dark")
    html.classList.add(theme)
  }, [theme])

  return <Story />
}

/**
 * Envolve a story no escopo de vertical (`.vertical-*`), no tema do manual (`data-tema`,
 * `data-campanha`) e no ToastProvider. Sem tema do manual, os genéricos ficam como estão.
 */
const withVertical: Decorator = (Story, context) => {
  const vertical = (context.globals.vertical ?? "none") as VerticalGlobal
  const tema = (context.globals.tema ?? "nenhum") as TemaGlobal
  const campanha = (context.globals.campanha ?? "nenhuma") as CampanhaGlobal
  const className = vertical === "none" ? undefined : `vertical-${vertical}`
  const isFullscreen = context.parameters.layout === "fullscreen"

  return (
    <ToastProvider position="top-right">
      <div
        className={className}
        data-tema={tema === "nenhum" ? undefined : tema}
        data-campanha={campanha === "nenhuma" ? undefined : campanha}
        style={{
          background: tema === "nenhum" ? "var(--bg-base)" : "var(--fundo)",
          color: tema === "nenhum" ? "var(--text-primary)" : "var(--texto)",
          padding: isFullscreen ? 0 : "var(--space-6)",
          minHeight: isFullscreen ? "100vh" : undefined,
        }}
      >
        <Story />
      </div>
    </ToastProvider>
  )
}

const preview: Preview = {
  tags: ["autodocs"],
  globalTypes: {
    theme: {
      description: "Tema de contraste do design system",
      toolbar: {
        title: "Tema",
        icon: "contrast",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
    vertical: {
      description: "Vertical de marca (remapeia os tokens semânticos)",
      toolbar: {
        title: "Vertical",
        icon: "paintbrush",
        items: [
          { value: "none", title: "Padrão (sem vertical)" },
          { value: "portfolio", title: "Portfólio" },
          { value: "document", title: "Documento" },
          { value: "course", title: "Curso" },
          { value: "blackfriday", title: "Black Friday" },
        ],
        dynamicTitle: true,
      },
    },
    tema: {
      description: "Tema do manual vigente (data-tema)",
      toolbar: {
        title: "Tema do manual",
        icon: "mirror",
        items: [
          { value: "nenhum", title: "Nenhum (genéricos)" },
          ...temas.map((id) => ({ value: id, title: rotulosTema[id] })),
        ],
        dynamicTitle: true,
      },
    },
    campanha: {
      description: "Camada de campanha sobre dg/dg-claro (data-campanha)",
      toolbar: {
        title: "Campanha",
        icon: "flag",
        items: [
          { value: "nenhuma", title: "Nenhuma" },
          { value: "bf", title: "Black Friday" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
    vertical: "none",
    tema: "nenhum",
    campanha: "nenhuma",
  },
  parameters: {
    layout: "padded",
    backgrounds: { disable: true },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    options: {
      storySort: {
        order: ["Introdução", "Fundamentos", "Foundations", "Atoms", "Molecules", "Organisms"],
      },
    },
  },
  decorators: [withVertical, withTheme],
}

export default preview
