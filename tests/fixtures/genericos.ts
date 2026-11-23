/**
 * Componentes genéricos: ficam como estão no manual v2 (PRD fundamentos-manual-v2, RF14).
 * Títulos de story do Storybook. Os componentes do manual (Button, Badge, Card, ActionDisk,
 * Typography, Divider) ficam de fora: eles migram no PRD atomos-manual-v2.
 */
export const GENERICOS = [
  "Atoms/Avatar",
  "Atoms/Checkbox",
  "Atoms/Icon",
  "Atoms/Input",
  "Atoms/ProgressBar",
  "Atoms/Radio",
  "Atoms/Select",
  "Atoms/Skeleton",
  "Atoms/Spinner",
  "Atoms/Textarea",
  "Atoms/Toggle",
  "Atoms/Tooltip",
  "Molecules/Accordion",
  "Molecules/Alert",
  "Molecules/Breadcrumb",
  "Molecules/Drawer",
  "Molecules/FormField",
  "Molecules/ListItem",
  "Molecules/Modal",
  "Molecules/NavigationItem",
  "Molecules/Pagination",
  "Molecules/SearchBar",
  "Molecules/Stat",
  "Molecules/Table",
  "Molecules/Tabs",
  "Molecules/Toast",
  "Organisms/DataTable",
  "Organisms/FilterBar",
  "Organisms/Footer",
  "Organisms/HeroSection",
  "Organisms/Navbar",
  "Organisms/PortfolioGrid",
  "Organisms/Sidebar",
  "Organisms/StepIndicator",
] as const

/** Temas antigos (`.light`/`.dark`) que os genéricos consomem. */
export const TEMAS_GENERICOS = ["light", "dark"] as const
