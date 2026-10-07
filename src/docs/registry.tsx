"use client"
// Single source of truth for docs pages and the internal Storybook.
// Generated from the original single-page documentation.

// Atoms

// Molecules

// Organisms

// ────────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────────
import React, { useState } from "react"
import styles from "./demos.module.css"
import { useTheme } from "../design-system/context/ThemeContext"
import { Drawer } from "../design-system/molecules/Drawer"
import { Text, Heading } from "../design-system/atoms/Typography"
import { Button } from "../design-system/atoms/Button"
import { ActionDisk } from "../design-system/atoms/ActionDisk"
import { Badge } from "../design-system/atoms/Badge"
import { Icon } from "../design-system/atoms/Icon"
import { Divider } from "../design-system/atoms/Divider"
import { Input } from "../design-system/atoms/Input"
import { Textarea } from "../design-system/atoms/Textarea"
import { Select } from "../design-system/atoms/Select"
import { Checkbox } from "../design-system/atoms/Checkbox"
import { Radio } from "../design-system/atoms/Radio"
import { Toggle } from "../design-system/atoms/Toggle"
import { Avatar } from "../design-system/atoms/Avatar"
import { Spinner } from "../design-system/atoms/Spinner"
import { ProgressBar } from "../design-system/atoms/ProgressBar"
import { Skeleton } from "../design-system/atoms/Skeleton"
import { Tooltip } from "../design-system/atoms/Tooltip"
import { FormField } from "../design-system/molecules/FormField"
import { SearchBar } from "../design-system/molecules/SearchBar"
import { Card } from "../design-system/molecules/Card"
import { NavigationItem } from "../design-system/molecules/NavigationItem"
import { Breadcrumb } from "../design-system/molecules/Breadcrumb"
import { Pagination } from "../design-system/molecules/Pagination"
import { Alert } from "../design-system/molecules/Alert"
import { useToast } from "../design-system/molecules/Toast"
import { Modal } from "../design-system/molecules/Modal"
import { Tabs } from "../design-system/molecules/Tabs"
import { Accordion } from "../design-system/molecules/Accordion"
import { ListItem } from "../design-system/molecules/ListItem"
import { Table } from "../design-system/molecules/Table"
import { Stat } from "../design-system/molecules/Stat"
import { Navbar } from "../design-system/organisms/Navbar"
import { Sidebar } from "../design-system/organisms/Sidebar"
import { Footer } from "../design-system/organisms/Footer"
import { FilterBar } from "../design-system/organisms/FilterBar"
import { HeroSection } from "../design-system/organisms/HeroSection"
import { PortfolioGrid } from "../design-system/organisms/PortfolioGrid"
import { StepIndicator } from "../design-system/organisms/StepIndicator"
import { DataTable } from "../design-system/organisms/DataTable"

export const navSections = [
  {
    label: "Fundamentos",
    items: [
      { id: "tokens", label: "Tokens", href: "#tokens" },
      { id: "dark-mode", label: "Dark / Light Mode", href: "#dark-mode" },
      {
        id: "typography-scale",
        label: "Tipografia",
        href: "#typography-scale",
      },
    ],
  },
  {
    label: "Átomos",
    items: [
      { id: "heading", label: "Heading", href: "#heading" },
      { id: "text", label: "Text", href: "#text" },
      { id: "button", label: "Button", href: "#button" },
      { id: "action-disk", label: "ActionDisk", href: "#action-disk" },
      { id: "badge", label: "Badge", href: "#badge" },
      { id: "icon", label: "Icon", href: "#icon" },
      { id: "divider", label: "Divider", href: "#divider" },
      { id: "input", label: "Input", href: "#input" },
      { id: "textarea", label: "Textarea", href: "#textarea" },
      { id: "select", label: "Select", href: "#select" },
      { id: "checkbox", label: "Checkbox", href: "#checkbox" },
      { id: "radio", label: "Radio", href: "#radio" },
      { id: "toggle", label: "Toggle", href: "#toggle" },
      { id: "avatar", label: "Avatar", href: "#avatar" },
      { id: "spinner", label: "Spinner", href: "#spinner" },
      { id: "progress", label: "ProgressBar", href: "#progress" },
      { id: "skeleton", label: "Skeleton", href: "#skeleton" },
      { id: "tooltip", label: "Tooltip", href: "#tooltip" },
    ],
  },
  {
    label: "Moléculas",
    items: [
      { id: "form-field", label: "FormField", href: "#form-field" },
      { id: "search-bar", label: "SearchBar", href: "#search-bar" },
      { id: "card", label: "Card", href: "#card" },
      { id: "nav-item", label: "NavigationItem", href: "#nav-item" },
      { id: "breadcrumb", label: "Breadcrumb", href: "#breadcrumb" },
      { id: "pagination", label: "Pagination", href: "#pagination" },
      { id: "alert", label: "Alert", href: "#alert" },
      { id: "toast", label: "Toast", href: "#toast" },
      { id: "modal", label: "Modal", href: "#modal" },
      { id: "drawer", label: "Drawer", href: "#drawer" },
      { id: "tabs", label: "Tabs", href: "#tabs" },
      { id: "accordion", label: "Accordion", href: "#accordion" },
      { id: "list-item", label: "ListItem", href: "#list-item" },
      { id: "table", label: "Table", href: "#table" },
      { id: "stat", label: "Stat", href: "#stat" },
    ],
  },
  {
    label: "Organismos",
    items: [
      { id: "navbar", label: "Navbar", href: "#navbar" },
      { id: "sidebar", label: "Sidebar", href: "#sidebar" },
      { id: "footer", label: "Footer", href: "#footer" },
      { id: "filter-bar", label: "FilterBar", href: "#filter-bar" },
      { id: "hero", label: "HeroSection", href: "#hero" },
      { id: "portfolio-grid", label: "PortfolioGrid", href: "#portfolio-grid" },
      { id: "step-indicator", label: "StepIndicator", href: "#step-indicator" },
      { id: "data-table", label: "DataTable", href: "#data-table" },
    ],
  },
]

function ColorSwatch({
  name,
  hex,
  role,
}: {
  name: string
  hex: string
  role: string
}) {
  return (
    <div className={styles.swatch}>
      <div className={styles.swatchColor} style={{ backgroundColor: hex }} />
      <div className={styles.swatchInfo}>
        <span className={styles.swatchName}>{name}</span>
        <span className={styles.swatchHex}>{hex}</span>
        <span className={styles.swatchRole}>{role}</span>
      </div>
    </div>
  )
}

function ToastDemo() {
  const { addToast } = useToast()
  return (
    <div className={styles.row}>
      {(["info", "success", "warning", "error"] as const).map((v) => (
        <Button
          key={v}
          variant="outline"
          size="sm"
          onClick={() =>
            addToast({
              variant: v,
              title: `Toast ${v}`,
              description: "Notificação de exemplo.",
              duration: 3000,
            })
          }
        >
          {v}
        </Button>
      ))}
    </div>
  )
}

function ModalDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="exemplo de modal"
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setOpen(false)}>Confirmar</Button>
          </>
        }
      >
        <Text>
          Este é o conteúdo de um modal. Ele pode conter formulários,
          confirmações ou qualquer outro conteúdo relevante.
        </Text>
      </Modal>
    </>
  )
}

function DrawerDemo() {
  const [open, setOpen] = useState(false)
  const [side, setSide] = useState<"left" | "right" | "top" | "bottom">("right")
  return (
    <>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {(["right", "left", "top", "bottom"] as const).map((s) => (
          <Button
            key={s}
            variant={side === s ? "filled" : "outline"}
            size="sm"
            onClick={() => {
              setSide(s)
              setOpen(true)
            }}
          >
            {s}
          </Button>
        ))}
      </div>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        side={side}
        title="exemplo de drawer"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button size="sm" onClick={() => setOpen(false)}>
              Confirmar
            </Button>
          </>
        }
      >
        <Text>
          Drawer abre da direção <strong>{side}</strong>. O foco fica preso
          dentro (Tab/Shift+Tab). Pressione Esc para fechar.
        </Text>
        <br />
        <Input placeholder="Teste o foco aqui" aria-label="Campo de exemplo" />
      </Drawer>
    </>
  )
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const options: Array<{ value: "light" | "dark" | "system"; label: string }> = [
    { value: "light", label: "Claro" },
    { value: "dark", label: "Escuro" },
    { value: "system", label: "Sistema" },
  ]
  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      {options.map((o) => (
        <Button
          key={o.value}
          variant={theme === o.value ? "filled" : "outline"}
          size="sm"
          onClick={() => setTheme(o.value)}
        >
          {o.label}
        </Button>
      ))}
    </div>
  )
}

const tableData = [
  {
    projeto: "Editorial Inverno",
    cliente: "Marca Viva",
    data: "12 Mar 2026",
    status: "Entregue",
  },
  {
    projeto: "Lookbook Verão",
    cliente: "Casa Nobre",
    data: "28 Fev 2026",
    status: "Em andamento",
  },
  {
    projeto: "E-commerce Kit",
    cliente: "Loja Branca",
    data: "05 Jan 2026",
    status: "Entregue",
  },
  {
    projeto: "Campanha Páscoa",
    cliente: "Doce Arte",
    data: "18 Abr 2026",
    status: "Briefing",
  },
  {
    projeto: "Rebranding Visual",
    cliente: "Nova Form",
    data: "02 Mai 2026",
    status: "Em andamento",
  },
]

const tableColumns = [
  { key: "projeto", label: "Projeto", sortable: true },
  { key: "cliente", label: "Cliente", sortable: true },
  { key: "data", label: "Data", sortable: true },
  { key: "status", label: "Status", sortable: true },
]

const portfolioItems = [
  {
    id: "1",
    title: "editorial inverno",
    category: "Editorial",
    label: "SET 2025",
  },
  { id: "2", title: "lookbook verão", category: "Lookbook", label: "JAN 2026" },
  {
    id: "3",
    title: "e-commerce kit",
    category: "E-commerce",
    label: "MAR 2026",
  },
  {
    id: "4",
    title: "campanha páscoa",
    category: "Campanha",
    label: "ABR 2026",
  },
  {
    id: "5",
    title: "rebranding visual",
    category: "Editorial",
    label: "MAI 2026",
  },
  {
    id: "6",
    title: "bastidores behind",
    category: "E-commerce",
    label: "JUN 2026",
  },
]

function PaginationDemo() {
  const [page, setPage] = useState(1)
  return <Pagination currentPage={page} totalPages={5} onChange={setPage} />
}

export type Category = "foundations" | "atoms" | "molecules" | "organisms"

export interface Story {
  name: string
  description?: string
  dark: boolean
  Render: () => React.ReactElement
}

export interface Entry {
  id: string
  category: Category
  tag: string
  title: string
  subtitle: string
  stories: Story[]
}

export const categories: Array<{
  id: Category
  label: string
  path: string
  blurb: string
}> = [
  {
    id: "foundations",
    label: "Fundamentos",
    path: "/foundations",
    blurb: "Cor, espaço, forma, tipografia e temas.",
  },
  {
    id: "atoms",
    label: "Átomos",
    path: "/atoms",
    blurb: "As menores unidades — botões, campos, marcadores.",
  },
  {
    id: "molecules",
    label: "Moléculas",
    path: "/molecules",
    blurb: "Composições curtas com um propósito único.",
  },
  {
    id: "organisms",
    label: "Organismos",
    path: "/organisms",
    blurb: "Seções completas prontas para página.",
  },
]

export const registry: Entry[] = [
  {
    id: "tokens",
    category: "foundations",
    tag: "Fundamentos",
    title: "Tokens",
    subtitle:
      "Sistema de design baseado na identidade visual de Débora Gabrich — fotografia de produtos e direção criativa.",
    stories: [
      {
        name: "Paleta de cores",
        dark: false,
        Render: () => (
          <>
            <div className={styles.swatchGrid}>
              <ColorSwatch
                name="Preto tinta"
                hex="#0B0B0B"
                role="Base principal"
              />
              <ColorSwatch
                name="Cacau profundo"
                hex="#2E2118"
                role="Camada sobre preto"
              />
              <ColorSwatch name="Caramelo" hex="#8A5F3A" role="Área quente" />
              <ColorSwatch name="Ocre" hex="#CCAA66" role="Acento (máx. 10%)" />
              <ColorSwatch name="Papel" hex="#F4F0E8" role="Base clara" />
              <ColorSwatch
                name="Cacau fosco"
                hex="#644D3D"
                role="Blocos de texto"
              />
              <ColorSwatch name="Areia" hex="#BFB09B" role="Fundo secundário" />
              <ColorSwatch
                name="Neutro"
                hex="#D3CABB"
                role="Linhas e listras"
              />
              <ColorSwatch
                name="Filete escuro"
                hex="#4A423A"
                role="Fio sobre escuro"
              />
            </div>
          </>
        ),
      },
      {
        name: "Escala de espaçamento (grade de 4px)",
        dark: false,
        Render: () => (
          <>
            <div className={styles.spacingRow}>
              {[4, 8, 12, 16, 24, 32, 48, 64, 96].map((n) => (
                <div key={n} className={styles.spacingItem}>
                  <div
                    className={styles.spacingBar}
                    style={{
                      width: Math.min(n, 64) + "px",
                      height: "8px",
                      backgroundColor: "var(--color-caramel)",
                    }}
                  />
                  <span className={styles.spacingLabel}>{n}px</span>
                </div>
              ))}
            </div>
          </>
        ),
      },
      {
        name: "Forma — a regra-mãe",
        dark: false,
        Render: () => (
          <>
            <div className={styles.row}>
              <div className={styles.shapeDemo}>
                <div className={styles.shapeRect} />
                <span className={styles.shapeLabel}>
                  border-radius: 0<br />
                  enquadra (conteúdo)
                </span>
              </div>
              <div className={styles.shapeDemo}>
                <div className={styles.shapeCircle} />
                <span className={styles.shapeLabel}>
                  border-radius: 9999px
                  <br />
                  marca (seleção)
                </span>
              </div>
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "typography-scale",
    category: "foundations",
    tag: "Fundamentos",
    title: "Tipografia",
    subtitle:
      "Seis vozes. Manrope é a única que sustenta parágrafo longo. Space Mono é o rótulo do sistema.",
    stories: [
      {
        name: "Escala de Heading — Urbanist 900",
        dark: false,
        Render: () => (
          <>
            <div className={styles.col}>
              {(["display", "xl", "lg", "md", "sm", "xs"] as const).map(
                (size) => (
                  <div key={size} className={styles.typeRow}>
                    <span className={styles.typeLabel}>{size}</span>
                    <Heading size={size} level={2}>
                      Débora Gabrich
                    </Heading>
                  </div>
                ),
              )}
            </div>
          </>
        ),
      },
      {
        name: "Heading — Tenor Sans (subtítulos)",
        dark: false,
        Render: () => (
          <>
            <Heading size="lg" font="sub">
              Fotografia de produtos e direção criativa
            </Heading>
          </>
        ),
      },
      {
        name: "Text — Manrope (corpo)",
        dark: false,
        Render: () => (
          <>
            <div className={styles.col}>
              <Text size="lg">Tamanho lg — 21px</Text>
              <Text size="md">Tamanho md — 17px</Text>
              <Text size="base">Tamanho base — 15px (padrão do sistema)</Text>
              <Text size="sm">Tamanho sm — 12px</Text>
              <Text size="xs">Tamanho xs — 10px</Text>
            </div>
          </>
        ),
      },
      {
        name: "Text — Space Mono (rótulos, dados)",
        dark: false,
        Render: () => (
          <>
            <div className={styles.col}>
              <Text font="mono" uppercase>
                ETIQUETA DE MÓDULO
              </Text>
              <Text font="mono" uppercase size="sm">
                f/8 · 1/125 · ISO 100
              </Text>
              <Text font="mono" uppercase size="xs">
                ficha técnica
              </Text>
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "heading",
    category: "atoms",
    tag: "Átomo",
    title: "Heading",
    subtitle: "Títulos tipográficos em Urbanist 900 (display) ou Tenor Sans.",
    stories: [
      {
        name: "Variantes de fonte",
        dark: false,
        Render: () => (
          <>
            <div className={styles.col}>
              <Heading size="xl" font="display">
                fotografia de produtos
              </Heading>
              <Heading size="lg" font="sub">
                Fotografia de produtos e direção criativa
              </Heading>
              <Heading size="md" font="display" color="ochre">
                destaque em ocre
              </Heading>
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "text",
    category: "atoms",
    tag: "Átomo",
    title: "Text",
    subtitle:
      "Texto corrido em Manrope, rótulos em Space Mono, subheadings em Tenor Sans.",
    stories: [
      {
        name: "Variantes de cor",
        dark: false,
        Render: () => (
          <>
            <div className={styles.col}>
              <Text color="primary">primary — cor principal adaptável ao tema</Text>
              <Text color="secondary">secondary — cor secundária adaptável ao tema</Text>
              <Text color="muted">muted — texto atenuado para legendas e rótulos</Text>
              <Text color="ink">preto tinta — cor base padrão</Text>
              <Text color="caramel">caramelo — área quente</Text>
              <Text color="ochre">ocre — acento, máx 1x por peça</Text>
              <Text color="cocoa-matte">cacau fosco — blocos de texto</Text>
            </div>
          </>
        ),
      },
      {
        name: "Peso e transformação",
        dark: true,
        Render: () => (
          <>
            <div className={styles.col}>
              <Text weight={300} color="paper">
                peso 300 — light
              </Text>
              <Text weight={400} color="paper">
                peso 400 — regular
              </Text>
              <Text weight={600} color="paper">
                peso 600 — semibold
              </Text>
              <Text weight={700} color="paper">
                peso 700 — bold
              </Text>
              <Text font="mono" uppercase color="sand" size="xs">
                ESPAÇAMENTO LARGO · SPACE MONO
              </Text>
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "button",
    category: "atoms",
    tag: "Átomo",
    title: "Button",
    subtitle:
      "Canto reto ou pílula (999px). Nunca misturado. Altura mínima 44px. Máx. 1 preenchido por peça.",
    stories: [
      {
        name: "Variantes",
        dark: false,
        Render: () => (
          <>
            <Button variant="filled">Preenchido</Button>
            <Button variant="outline">Contorno</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="text">Texto</Button>
            <Button variant="filled" disabled>
              Indisponível
            </Button>
            <Button variant="filled" loading>
              Carregando
            </Button>
          </>
        ),
      },
      {
        name: "Tamanhos",
        dark: false,
        Render: () => (
          <>
            <div className={styles.rowAligned}>
              <Button size="lg">Grande 52px</Button>
              <Button size="md">Padrão 44px</Button>
              <Button size="sm">Pequeno</Button>
            </div>
          </>
        ),
      },
      {
        name: "Shape pílula",
        dark: true,
        Render: () => (
          <>
            <Button shape="pill" variant="filled">
              Pílula preenchida
            </Button>
            <Button shape="pill" variant="outline">
              Pílula contorno
            </Button>
          </>
        ),
      },
    ],
  },
  {
    id: "action-disk",
    category: "atoms",
    tag: "Átomo",
    title: "ActionDisk",
    subtitle:
      "Sinal separado do texto. Sempre circular (a única exceção redonda de ação).",
    stories: [
      {
        name: "Tamanhos e variantes",
        dark: true,
        Render: () => (
          <>
            <ActionDisk size="sm" variant="filled" />
            <ActionDisk size="md" variant="filled" />
            <ActionDisk size="lg" variant="filled" />
            <ActionDisk size="sm" variant="outline" />
            <ActionDisk size="md" variant="outline" />
          </>
        ),
      },
    ],
  },
  {
    id: "badge",
    category: "atoms",
    tag: "Átomo",
    title: "Badge",
    subtitle:
      "Canto sempre reto. Sem sombra. Sem translúcido. Máx. 4 visíveis por peça.",
    stories: [
      {
        name: "Solid",
        dark: false,
        Render: () => (
          <>
            <Badge variant="solid" color="ink">
              padrão
            </Badge>
            <Badge variant="solid" color="ochre">
              destaque
            </Badge>
            <Badge variant="solid" color="caramel">
              caramel
            </Badge>
            <Badge variant="solid" color="paper">
              paper
            </Badge>
          </>
        ),
      },
      {
        name: "Outline",
        dark: true,
        Render: () => (
          <>
            <Badge variant="outline" color="paper">
              paper
            </Badge>
            <Badge variant="outline" color="ochre">
              ochre
            </Badge>
            <Badge variant="outline" color="caramel">
              caramel
            </Badge>
          </>
        ),
      },
      {
        name: "Tamanhos",
        dark: false,
        Render: () => (
          <>
            <Badge size="sm">pequeno</Badge>
            <Badge size="md">médio</Badge>
          </>
        ),
      },
    ],
  },
  {
    id: "icon",
    category: "atoms",
    tag: "Átomo",
    title: "Icon",
    subtitle:
      "Grade de 24px. Traço 1,6px. Respiro externo de 25% do tamanho. Área clicável 44px.",
    stories: [
      {
        name: "Tamanhos",
        dark: false,
        Render: () => (
          <>
            {([16, 20, 24, 32] as const).map((size) => (
              <Icon key={size} size={size} label={`ícone ${size}px`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="9" />
                  <path
                    d="M12 8v4l3 3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Icon>
            ))}
          </>
        ),
      },
      {
        name: "Cores",
        dark: true,
        Render: () => (
          <>
            {(["ink", "paper", "ochre", "caramel", "sand"] as const).map(
              (c) => (
                <Icon key={c} color={c} label={c}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polygon points="12,3 22,21 2,21" strokeLinejoin="round" />
                  </svg>
                </Icon>
              ),
            )}
          </>
        ),
      },
    ],
  },
  {
    id: "divider",
    category: "atoms",
    tag: "Átomo",
    title: "Divider",
    subtitle:
      "Sempre 1px. Nunca engrossa — se precisa de peso, vira faixa sólida de 4px.",
    stories: [
      {
        name: "Horizontal",
        dark: false,
        Render: () => (
          <>
            <div style={{ width: "100%" }}>
              <Divider color="neutral" />
              <div style={{ height: "8px" }} />
              <Divider color="ink" />
              <div style={{ height: "8px" }} />
              <Divider color="ochre" />
            </div>
          </>
        ),
      },
      {
        name: "Vertical",
        dark: false,
        Render: () => (
          <>
            <div
              style={{
                display: "flex",
                height: "48px",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <Text>item</Text>
              <Divider orientation="vertical" />
              <Text>item</Text>
              <Divider orientation="vertical" color="ochre" />
              <Text>item</Text>
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "input",
    category: "atoms",
    tag: "Átomo",
    title: "Input",
    subtitle:
      "Sempre canto reto. Borda 1px. Focus em caramelo. Nunca arredondado.",
    stories: [
      {
        name: "Estados",
        dark: false,
        Render: () => (
          <>
            <div
              className={styles.col}
              style={{ width: "100%", maxWidth: "320px" }}
            >
              <Input placeholder="placeholder padrão" />
              <Input
                placeholder="estado focus"
                defaultValue="valor preenchido"
              />
              <Input
                placeholder="erro de campo"
                error
                errorMessage="Campo obrigatório"
                defaultValue="valor inválido"
              />
              <Input placeholder="desabilitado" disabled />
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "textarea",
    category: "atoms",
    tag: "Átomo",
    title: "Textarea",
    subtitle: "Expansão vertical. Nunca redimensionamento livre em interface.",
    stories: [
      {
        name: "Estados",
        dark: false,
        Render: () => (
          <>
            <div
              className={styles.col}
              style={{ width: "100%", maxWidth: "400px" }}
            >
              <Textarea placeholder="escreva aqui…" rows={3} />
              <Textarea
                placeholder="erro"
                error
                errorMessage="Máximo de 500 caracteres"
                defaultValue="texto com erro"
                rows={3}
              />
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "select",
    category: "atoms",
    tag: "Átomo",
    title: "Select",
    subtitle: "Dropdown nativo tipado. Sempre canto reto.",
    stories: [
      {
        name: "Estados",
        dark: false,
        Render: () => (
          <>
            <div
              className={styles.col}
              style={{ width: "100%", maxWidth: "320px" }}
            >
              <Select
                options={[
                  { value: "editorial", label: "Editorial" },
                  { value: "lookbook", label: "Lookbook" },
                  { value: "ecommerce", label: "E-commerce" },
                ]}
                placeholder="Selecione uma categoria"
              />
              <Select
                options={[{ value: "entregue", label: "Entregue" }]}
                defaultValue="entregue"
                error
                errorMessage="Selecione um status válido"
              />
              <Select
                options={[
                  { value: "editorial", label: "Editorial" },
                  { value: "lookbook", label: "Lookbook" },
                  { value: "ecommerce", label: "E-commerce" },
                ]}
                disabled
                error
                placeholder="Bloqueado"
                errorMessage="Campo bloqueado"
              />
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "checkbox",
    category: "atoms",
    tag: "Átomo",
    title: "Checkbox",
    subtitle:
      "Canto reto — o checkbox guarda conteúdo (estado), nunca é redondo.",
    stories: [
      {
        name: "Estados",
        dark: false,
        Render: () => (
          <>
            <div className={styles.col}>
              <Checkbox label="Não selecionado" />
              <Checkbox label="Selecionado" defaultChecked />
              <Checkbox label="Indeterminado" indeterminate />
              <Checkbox label="Desabilitado" disabled />
              <Checkbox
                label="Desabilitado selecionado"
                disabled
                defaultChecked
              />
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "radio",
    category: "atoms",
    tag: "Átomo",
    title: "Radio",
    subtitle: "Circular por natureza — selecionar é uma ação de marcação.",
    stories: [
      {
        name: "Grupo de radio",
        dark: false,
        Render: () => (
          <>
            <div className={styles.col}>
              <Radio name="demo" label="Opção A" value="a" defaultChecked />
              <Radio name="demo" label="Opção B" value="b" />
              <Radio
                name="demo"
                label="Opção C (desabilitada)"
                value="c"
                disabled
              />
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "toggle",
    category: "atoms",
    tag: "Átomo",
    title: "Toggle",
    subtitle:
      "Pílula (999px) — o toggle é um seletor/marcador, nunca retangular.",
    stories: [
      {
        name: "Estados",
        dark: false,
        Render: () => (
          <>
            <div className={styles.col}>
              <Toggle label="Notificações desativadas" />
              <Toggle label="Notificações ativas" defaultChecked />
              <Toggle label="Desabilitado" disabled />
              <Toggle size="sm" label="Tamanho pequeno" />
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "avatar",
    category: "atoms",
    tag: "Átomo",
    title: "Avatar",
    subtitle:
      "Sempre circular — exclusivo para retratos humanos. Nunca para produto.",
    stories: [
      {
        name: "Tamanhos com iniciais",
        dark: false,
        Render: () => (
          <>
            <div className={styles.rowAligned}>
              <Avatar alt="Débora Gabrich" size="sm" initials="DG" />
              <Avatar alt="Débora Gabrich" size="md" initials="DG" />
              <Avatar alt="Débora Gabrich" size="lg" initials="DG" />
              <Avatar alt="Débora Gabrich" size="xl" initials="DG" />
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "spinner",
    category: "atoms",
    tag: "Átomo",
    title: "Spinner",
    subtitle: "Indicador de carregamento circular.",
    stories: [
      {
        name: "Tamanhos",
        dark: false,
        Render: () => (
          <>
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </>
        ),
      },
      {
        name: "Cores",
        dark: true,
        Render: () => (
          <>
            <Spinner color="paper" />
            <Spinner color="ochre" />
            <Spinner color="caramel" />
          </>
        ),
      },
    ],
  },
  {
    id: "progress",
    category: "atoms",
    tag: "Átomo",
    title: "ProgressBar",
    subtitle: "Barra de progresso. Valores apenas na escala de 4px.",
    stories: [
      {
        name: "Variantes",
        dark: false,
        Render: () => (
          <>
            <div className={styles.col} style={{ width: "100%" }}>
              <ProgressBar value={30} label="Briefing" showLabel color="ink" />
              <ProgressBar
                value={65}
                label="Set fotográfico"
                showLabel
                color="caramel"
              />
              <ProgressBar value={90} label="Entrega" showLabel color="ochre" />
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "skeleton",
    category: "atoms",
    tag: "Átomo",
    title: "Skeleton",
    subtitle: "Estado de carregamento de conteúdo.",
    stories: [
      {
        name: "Formas",
        dark: false,
        Render: () => (
          <>
            <div className={styles.col} style={{ width: "100%" }}>
              <Skeleton width="100%" height={20} />
              <Skeleton width="75%" height={20} />
              <Skeleton width="60%" height={20} />
              <div className={styles.rowAligned}>
                <Skeleton width={48} height={48} shape="circle" />
                <div className={styles.col} style={{ flex: 1 }}>
                  <Skeleton width="100%" height={16} />
                  <Skeleton width="60%" height={16} />
                </div>
              </div>
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "tooltip",
    category: "atoms",
    tag: "Átomo",
    title: "Tooltip",
    subtitle: "Fundo preto, texto em Space Mono caixa alta. Nunca arredondado.",
    stories: [
      {
        name: "Posicionamentos",
        dark: false,
        Render: () => (
          <>
            <div
              className={styles.rowAligned}
              style={{ gap: "48px", padding: "24px 0" }}
            >
              <Tooltip content="Topo" placement="top">
                <Button size="sm" variant="outline">
                  top
                </Button>
              </Tooltip>
              <Tooltip content="Direita" placement="right">
                <Button size="sm" variant="outline">
                  right
                </Button>
              </Tooltip>
              <Tooltip content="Baixo" placement="bottom">
                <Button size="sm" variant="outline">
                  bottom
                </Button>
              </Tooltip>
              <Tooltip content="Esquerda" placement="left">
                <Button size="sm" variant="outline">
                  left
                </Button>
              </Tooltip>
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "form-field",
    category: "molecules",
    tag: "Molécula",
    title: "FormField",
    subtitle:
      "Label + input + helper + error. Envolve qualquer átomo de input.",
    stories: [
      {
        name: "Composição completa",
        dark: false,
        Render: () => (
          <>
            <div
              className={styles.col}
              style={{ width: "100%", maxWidth: "400px" }}
            >
              <FormField
                label="Nome do projeto"
                htmlFor="proj"
                helperText="Título para identificação interna."
                required
              >
                <Input id="proj" placeholder="ex: Editorial Inverno 2026" />
              </FormField>
              <FormField
                label="Categoria"
                htmlFor="cat"
                errorMessage="Campo obrigatório"
              >
                <Select
                  id="cat"
                  options={[
                    { value: "editorial", label: "Editorial" },
                    { value: "lookbook", label: "Lookbook" },
                  ]}
                  placeholder="Selecione"
                  error
                />
              </FormField>
              <FormField label="Observações" htmlFor="obs">
                <Textarea
                  id="obs"
                  placeholder="Detalhes do briefing…"
                  rows={3}
                />
              </FormField>
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "search-bar",
    category: "molecules",
    tag: "Molécula",
    title: "SearchBar",
    subtitle: "Input + ícone de busca + botão de limpar.",
    stories: [
      {
        name: "Padrão e desabilitado",
        dark: false,
        Render: () => (
          <>
            <div
              className={styles.col}
              style={{ width: "100%", maxWidth: "400px" }}
            >
              <SearchBar placeholder="buscar projetos…" />
              <SearchBar placeholder="desabilitado" disabled />
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "card",
    category: "molecules",
    tag: "Molécula",
    title: "Card",
    subtitle:
      "Filete 1px. Sem sombra, sem gradiente. Padding 24px (32px acima de 420px).",
    stories: [
      {
        name: "Variantes",
        dark: false,
        Render: () => (
          <>
            <div className={styles.cardGrid}>
              <Card
                variant="content"
                label="Editorial"
                title="lookbook inverno 2026"
                body="Direção criativa completa com set montado no estúdio."
              />
              <Card
                variant="icon"
                title="ícone + título"
                body="O ícone substitui o rótulo, nunca soma."
                icon={
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path
                      d="M12 8v5l3 3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              />
              <Card
                variant="data"
                label="projetos entregues"
                stat="47"
                statLabel="desde 2021"
              />
              <Card
                variant="value"
                label="Plano profissional"
                title="pacote editorial"
                body="Inclui 3 sessões de produto + edição completa."
                action={<Button>Solicitar proposta</Button>}
              />
            </div>
          </>
        ),
      },
      {
        name: "Dark",
        dark: true,
        Render: () => (
          <>
            <div className={styles.cardGrid}>
              <Card
                variant="content"
                label="Editorial"
                title="bastidores do set"
                body="Preparação e montagem do cenário."
                dark
              />
              <Card
                variant="data"
                label="clientes atendidos"
                stat="120+"
                statLabel="em 5 anos"
                dark
              />
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "nav-item",
    category: "molecules",
    tag: "Molécula",
    title: "NavigationItem",
    subtitle: "Ícone + rótulo + badge de notificação + estado ativo.",
    stories: [
      {
        name: "Estados",
        dark: false,
        Render: () => (
          <>
            <div
              style={{
                width: "200px",
                borderRight: "var(--border-light)",
                padding: "8px 0",
              }}
            >
              <NavigationItem label="Projetos" active />
              <NavigationItem label="Clientes" badge={3} />
              <NavigationItem label="Propostas" />
              <NavigationItem label="Indisponível" disabled />
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "breadcrumb",
    category: "molecules",
    tag: "Molécula",
    title: "Breadcrumb",
    subtitle: "Space Mono caixa alta. Separador em barra.",
    stories: [
      {
        name: "Exemplo",
        dark: false,
        Render: () => (
          <>
            <Breadcrumb
              items={[
                { label: "início", href: "/" },
                { label: "projetos", href: "/projetos" },
                { label: "editorial inverno 2026" },
              ]}
            />
          </>
        ),
      },
    ],
  },
  {
    id: "pagination",
    category: "molecules",
    tag: "Molécula",
    title: "Pagination",
    subtitle: "Paginação com ellipsis automática para muitas páginas.",
    stories: [
      {
        name: "5 páginas",
        dark: false,
        Render: () => (
          <>
            <PaginationDemo />
          </>
        ),
      },
      {
        name: "12 páginas",
        dark: false,
        Render: () => (
          <>
            <Pagination currentPage={6} totalPages={12} onChange={() => {}} />
          </>
        ),
      },
    ],
  },
  {
    id: "alert",
    category: "molecules",
    tag: "Molécula",
    title: "Alert",
    subtitle: "Borda esquerda 4px como ênfase. Sem sombra.",
    stories: [
      {
        name: "Variantes",
        dark: false,
        Render: () => (
          <>
            <div className={styles.col} style={{ width: "100%" }}>
              <Alert
                variant="info"
                title="Informação"
                description="O briefing foi recebido e está em análise."
                dismissible
              />
              <Alert
                variant="success"
                title="Entregue"
                description="O projeto foi entregue com sucesso."
                dismissible
              />
              <Alert
                variant="warning"
                title="Atenção"
                description="A data de entrega está próxima."
                dismissible
              />
              <Alert
                variant="error"
                title="Erro"
                description="Não foi possível processar o arquivo."
                dismissible
              />
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "toast",
    category: "molecules",
    tag: "Molécula",
    title: "Toast",
    subtitle: "Notificação temporária. Posição configurável.",
    stories: [
      {
        name: "Disparar toasts",
        dark: false,
        Render: () => (
          <>
            <ToastDemo />
          </>
        ),
      },
    ],
  },
  {
    id: "modal",
    category: "molecules",
    tag: "Molécula",
    title: "Modal",
    subtitle: "Overlay preto 72%. Esc para fechar. Scroll travado no body.",
    stories: [
      {
        name: "Tamanho médio",
        dark: false,
        Render: () => (
          <>
            <ModalDemo />
          </>
        ),
      },
    ],
  },
  {
    id: "tabs",
    category: "molecules",
    tag: "Molécula",
    title: "Tabs",
    subtitle: "Linha de 2px sob a tab ativa. Space Mono caixa alta.",
    stories: [
      {
        name: "Horizontal",
        dark: false,
        Render: () => (
          <>
            <Tabs
              items={[
                {
                  id: "set",
                  label: "Set",
                  content: (
                    <Text>
                      Informações sobre o set fotográfico e equipamentos
                      utilizados.
                    </Text>
                  ),
                },
                {
                  id: "edicao",
                  label: "Edição",
                  content: (
                    <Text>
                      Processo de edição, retoque e tratamento de cor das
                      imagens.
                    </Text>
                  ),
                },
                {
                  id: "entrega",
                  label: "Entrega",
                  content: (
                    <Text>
                      Formatos de entrega, resolução e organização dos arquivos
                      finais.
                    </Text>
                  ),
                },
                {
                  id: "disabled",
                  label: "Inativo",
                  content: null,
                  disabled: true,
                },
              ]}
              defaultTab="set"
            />
          </>
        ),
      },
    ],
  },
  {
    id: "accordion",
    category: "molecules",
    tag: "Molécula",
    title: "Accordion",
    subtitle: "Expansão suave. Chevron rotaciona 180°.",
    stories: [
      {
        name: "Múltiplo",
        dark: false,
        Render: () => (
          <>
            <div style={{ width: "100%" }}>
              <Accordion
                multiple
                defaultOpen={["briefing"]}
                items={[
                  {
                    id: "briefing",
                    title: "Briefing",
                    content: (
                      <Text>
                        Coleta de informações sobre o produto, marca e objetivos
                        da sessão.
                      </Text>
                    ),
                  },
                  {
                    id: "set",
                    title: "Montagem do set",
                    content: (
                      <Text>
                        Seleção de backdrop, iluminação e composição do cenário.
                      </Text>
                    ),
                  },
                  {
                    id: "entrega",
                    title: "Entrega",
                    content: (
                      <Text>
                        Seleção das melhores imagens, edição e entrega dos
                        arquivos finais.
                      </Text>
                    ),
                  },
                ]}
              />
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "list-item",
    category: "molecules",
    tag: "Molécula",
    title: "ListItem",
    subtitle: "Marcador sempre redondo (ponto 7px ocre). Nunca quadrado.",
    stories: [
      {
        name: "Com diferentes leading types",
        dark: false,
        Render: () => (
          <>
            <div style={{ width: "100%" }}>
              <ListItem
                label="Produto fotografado em estúdio"
                sublabel="Set montado"
                leadingType="dot"
                trailing={<Badge size="sm">novo</Badge>}
              />
              <ListItem
                label="Edição e retoque das imagens"
                sublabel="Prazo: 5 dias"
                leadingType="dot"
              />
              <ListItem
                label="Entrega dos arquivos finais"
                sublabel="Formato RAW + JPEG"
                leading="3"
                leadingType="number"
                clickable
              />
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "table",
    category: "molecules",
    tag: "Molécula",
    title: "Table",
    subtitle: "Cabeçalho em Space Mono caixa alta. Linha de separação 1px.",
    stories: [
      {
        name: "Com ordenação",
        dark: false,
        Render: () => (
          <>
            <Table columns={tableColumns} data={tableData} striped />
          </>
        ),
      },
    ],
  },
  {
    id: "stat",
    category: "molecules",
    tag: "Molécula",
    title: "Stat",
    subtitle: "Valor em ocre — a única cor de acento. Label em Space Mono.",
    stories: [
      {
        name: "Grid de stats",
        dark: false,
        Render: () => (
          <>
            <div className={styles.statGrid}>
              <Stat
                value="47"
                label="projetos entregues"
                change="12% este mês"
                changePositive
              />
              <Stat value="120+" label="clientes atendidos" />
              <Stat
                value="5"
                label="anos de experiência"
                change="desde 2021"
                changePositive
              />
              <Stat
                value="98%"
                label="satisfação"
                change="NPS 2026"
                changePositive
              />
            </div>
          </>
        ),
      },
      {
        name: "Dark",
        dark: true,
        Render: () => (
          <>
            <div className={styles.statGrid}>
              <Stat value="2.400" label="fotos entregues" dark />
              <Stat
                value="3"
                label="premiações"
                change="+1 este ano"
                changePositive
                dark
              />
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "navbar",
    category: "organisms",
    tag: "Organismo",
    title: "Navbar",
    subtitle:
      "Sticky. Logo + nav + CTA + hamburger responsivo. Dark (padrão) ou light.",
    stories: [
      {
        name: "Dark (padrão do sistema)",
        dark: false,
        Render: () => (
          <>
            <div style={{ margin: "0 -32px" }}>
              <Navbar
                logoText="dg"
                dark
                links={[
                  { label: "portfólio", href: "#", active: true },
                  { label: "método", href: "#" },
                  { label: "sobre", href: "#" },
                  { label: "contato", href: "#" },
                ]}
                cta={<Button size="sm">Solicitar proposta</Button>}
              />
            </div>
          </>
        ),
      },
      {
        name: "Light",
        dark: false,
        Render: () => (
          <>
            <div style={{ margin: "0 -32px" }}>
              <Navbar
                logoText="dg"
                dark={false}
                links={[
                  { label: "portfólio", href: "#" },
                  { label: "método", href: "#" },
                  { label: "contato", href: "#", active: true },
                ]}
              />
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "sidebar",
    category: "organisms",
    tag: "Organismo",
    title: "Sidebar",
    subtitle:
      "Navegação hierárquica. Collapsível. 220px expandido, 64px recolhido.",
    stories: [
      {
        name: "Com seções e badge",
        dark: false,
        Render: () => (
          <>
            <div
              style={{
                height: "360px",
                border: "var(--border-light)",
                overflow: "hidden",
              }}
            >
              <Sidebar
                sections={navSections.slice(0, 2)}
                activeId="button"
                collapsible
              />
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "footer",
    category: "organisms",
    tag: "Organismo",
    title: "Footer",
    subtitle: "Logo + tagline + social + grupos de links + copyright.",
    stories: [
      {
        name: "Dark (padrão)",
        dark: false,
        Render: () => (
          <>
            <div style={{ margin: "0 -32px" }}>
              <Footer
                tagline="fotografia de produtos"
                groups={[
                  {
                    title: "Serviços",
                    links: [
                      { label: "Editorial", href: "#" },
                      { label: "Lookbook", href: "#" },
                      { label: "E-commerce", href: "#" },
                    ],
                  },
                  {
                    title: "Empresa",
                    links: [
                      { label: "Sobre", href: "#" },
                      { label: "Método", href: "#" },
                      { label: "Contato", href: "#" },
                    ],
                  },
                ]}
              />
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "filter-bar",
    category: "organisms",
    tag: "Organismo",
    title: "FilterBar",
    subtitle: "Filtros em Badge + SearchBar + Select de ordenação.",
    stories: [
      {
        name: "Interativo",
        dark: false,
        Render: () => (
          <>
            <div style={{ width: "100%" }}>
              <FilterBar
                filters={[
                  { id: "editorial", label: "Editorial" },
                  { id: "lookbook", label: "Lookbook" },
                  { id: "ecommerce", label: "E-commerce" },
                  { id: "campanha", label: "Campanha" },
                ]}
                sortOptions={[
                  { value: "recente", label: "Mais recente" },
                  { value: "antigo", label: "Mais antigo" },
                ]}
              />
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "hero",
    category: "organisms",
    tag: "Organismo",
    title: "HeroSection",
    subtitle:
      "Chamada principal. Título em Urbanist 900, clamp responsivo. Acento em ocre máx 1 palavra.",
    stories: [
      {
        name: "Dark com acento",
        dark: true,
        Render: () => (
          <>
            <HeroSection
              eyebrow="fotografia de produtos"
              title="cada imagem conta"
              titleAccent="sua história"
              subtitle="Direção criativa e fotografia especializada para marcas que valorizam a beleza do detalhe."
              primaryAction={
                <Button size="lg" shape="sharp">
                  Solicitar proposta
                </Button>
              }
              secondaryAction={
                <Button variant="ghost" size="lg">
                  Ver portfólio
                </Button>
              }
              dark
            />
          </>
        ),
      },
      {
        name: "Light centralizado",
        dark: false,
        Render: () => (
          <>
            <HeroSection
              eyebrow="método"
              title="três etapas para o resultado perfeito"
              centered
              primaryAction={<Button>Saiba mais</Button>}
            />
          </>
        ),
      },
    ],
  },
  {
    id: "portfolio-grid",
    category: "organisms",
    tag: "Organismo",
    title: "PortfolioGrid",
    subtitle: "Grade filtrável com overlay ao hover. Proporção 4:3.",
    stories: [
      {
        name: "3 colunas com filtros",
        dark: false,
        Render: () => (
          <>
            <div style={{ width: "100%" }}>
              <PortfolioGrid
                items={portfolioItems}
                categories={["Editorial", "Lookbook", "E-commerce", "Campanha"]}
                columns={3}
              />
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "step-indicator",
    category: "organisms",
    tag: "Organismo",
    title: "StepIndicator",
    subtitle:
      "Discos numerados (círculo = conta/seleciona). Linha de progresso 1px.",
    stories: [
      {
        name: "Horizontal — etapa 2 atual",
        dark: false,
        Render: () => (
          <>
            <div style={{ width: "100%" }}>
              <StepIndicator
                currentStep={1}
                steps={[
                  { label: "Briefing", description: "Coleta de informações" },
                  { label: "Set", description: "Dia do ensaio fotográfico" },
                  { label: "Edição", description: "Tratamento das imagens" },
                  {
                    label: "Entrega",
                    description: "Envio dos arquivos finais",
                  },
                ]}
              />
            </div>
          </>
        ),
      },
      {
        name: "Vertical — etapa 1 completa",
        dark: true,
        Render: () => (
          <>
            <StepIndicator
              orientation="vertical"
              currentStep={1}
              dark
              steps={[
                { label: "Briefing", description: "Concluído" },
                { label: "Set fotográfico", description: "Em andamento" },
                { label: "Edição", description: "Próximo" },
              ]}
            />
          </>
        ),
      },
    ],
  },
  {
    id: "drawer",
    category: "molecules",
    tag: "Molécula",
    title: "Drawer",
    subtitle:
      "Painel lateral deslizante com header, footer e botão de fechar nativo. Todas as 4 direções — foco trapado, Esc fecha, responsivo.",
    stories: [
      {
        name: "4 direções",
        dark: false,
        Render: () => (
          <>
            <DrawerDemo />
          </>
        ),
      },
    ],
  },
  {
    id: "dark-mode",
    category: "foundations",
    tag: "Fundamentos",
    title: "Dark / Light Mode",
    subtitle:
      "Sistema de temas em 2 camadas — tokens primitivos + camada semântica. Respeita prefers-color-scheme do sistema.",
    stories: [
      {
        name: "Alternar tema",
        dark: false,
        Render: () => (
          <>
            <ThemeToggle />
          </>
        ),
      },
      {
        name: "Tokens semânticos de estado",
        dark: false,
        Render: () => (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                width: "100%",
              }}
            >
              <Alert
                variant="info"
                title="Info"
                description="Cor: var(--color-info) — Ocre #CCAA66. Mantém a identidade DG."
              />
              <Alert
                variant="success"
                title="Sucesso"
                description="Cor: var(--color-success) — #2E7D32. Verde sóbrio e acessível."
              />
              <Alert
                variant="warning"
                title="Atenção"
                description="Cor: var(--color-warning) — #F29900. Âmbar quente."
              />
              <Alert
                variant="error"
                title="Erro"
                description="Cor: var(--color-error) — #B3261E. Material Design M3 error."
              />
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "data-table",
    category: "organisms",
    tag: "Organismo",
    title: "DataTable",
    subtitle:
      "Table + SearchBar + Pagination. Busca ao vivo e paginação automática.",
    stories: [
      {
        name: "Projetos — pesquisável e paginada",
        dark: false,
        Render: () => (
          <>
            <div style={{ width: "100%" }}>
              <DataTable
                title="projetos"
                columns={tableColumns}
                data={tableData}
                pageSize={3}
                striped
              />
            </div>
          </>
        ),
      },
    ],
  },
]
