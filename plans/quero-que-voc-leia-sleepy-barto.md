# Plan v3: Motion · Storybook interno · App Router

> Estado atual: 41 componentes (18 atoms · 15 molecules · 8 organisms), ThemeProvider, VerticalProvider, FocusTrap, tokens semânticos — tudo em CSS Modules + TypeScript. App é uma única página de docs de 1015 linhas com navegação por âncoras. Nenhum router instalado. Nenhuma lib de animação instalada.

---

## Contexto

Três evoluções solicitadas:
1. **motion** — instalar `motion` (motion.dev) e integrar animações nos componentes planejados
2. **Storybook em `/storybook`** — documentação interativa estilo Storybook dentro do próprio app Vite (sem servidor separado — Figma Make expõe uma única URL de preview)
3. **App Router** — redesenhar a página de docs separando em rotas reais via `react-router-dom`, cada categoria em sua própria página

---

## Restrição de ambiente (Figma Make)

Figma Make serve **uma única URL** (porta `$PORT`). Um Storybook real rodaria em porta 6006 — inacessível do preview. Portanto o "Storybook" será uma rota interna `/storybook` construída dentro do mesmo app Vite, com:
- Auto-descoberta de stories via `import.meta.glob`
- UI estilo Storybook (sidebar de componentes + painel de preview + code snippet)
- Stories escritas num formato mínimo compatível com o `figmaMakeKitPlugin` já presente no Vite

---

## Tarefa 1 — Instalar e integrar `motion`

### Instalação
```bash
pnpm add motion
```

### Componentes a animar (import: `import { motion, AnimatePresence } from 'motion/react'`)

| Componente | Animação |
|---|---|
| `Modal` | `AnimatePresence` → overlay `opacity 0→1`, dialog `y 16→0 + opacity 0→1` |
| `Drawer` | `AnimatePresence` → slide from side via `drawerVariants` de `motionVariants.ts` |
| `Alert` | `AnimatePresence` → `x -12→0, opacity 0→1` |
| `Toast` | Substituir CSS `@keyframes slideIn` por `motion.div` com `AnimatePresence` |
| `Accordion` | Panel: `motion.div` com `initial={{ height: 0, opacity: 0 }}` → `animate={{ height: 'auto', opacity: 1 }}` usando `overflow: hidden` |
| `Button` | `motion.button` com `whileTap={{ scale: 0.97 }}` |
| `ActionDisk` | `motion.button` com `whileHover={{ scale: 1.05 }}` e `whileTap={{ scale: 0.95 }}` |
| `NavigationItem` | Active indicator com `layoutId="nav-indicator"` para deslizar entre tabs |

### `prefers-reduced-motion`
Usar o hook `useReducedMotion` de `motion/react`. Criar wrapper em `src/design-system/utils/useMotionConfig.ts`:
```ts
export function useMotionConfig() {
  const reduced = useReducedMotion();
  return { transition: reduced ? { duration: 0 } : undefined };
}
```
Todos os componentes animados consultam esse hook e zeraam `duration` se `reduced = true`.

### Arquivos a modificar
- `src/design-system/molecules/Modal/Modal.tsx`
- `src/design-system/molecules/Drawer/Drawer.tsx` + `Drawer.module.css` (remover `@keyframes` duplicados)
- `src/design-system/molecules/Alert/Alert.tsx`
- `src/design-system/molecules/Toast/Toast.tsx` + `Toast.module.css` (remover `@keyframes slideIn`)
- `src/design-system/molecules/Accordion/Accordion.tsx`
- `src/design-system/atoms/Button/Button.tsx`
- `src/design-system/atoms/ActionDisk/ActionDisk.tsx`
- `src/design-system/utils/useMotionConfig.ts` ← **NOVO**

---

## Tarefa 2 — Storybook interno em `/storybook`

### Arquitetura

```
src/
  stories/
    atoms/
      Button.stories.tsx
      ActionDisk.stories.tsx
      Badge.stories.tsx
      ... (17 arquivos)
    molecules/
      Alert.stories.tsx
      Drawer.stories.tsx
      Modal.stories.tsx
      ... (15 arquivos)
    organisms/
      Navbar.stories.tsx
      HeroSection.stories.tsx
      ... (8 arquivos)
  pages/
    StorybookPage.tsx        ← UI do explorer (sidebar + preview + snippet)
    StorybookStoryPage.tsx   ← Página individual de um story
```

### Formato das stories

```tsx
// Button.stories.tsx
import React from 'react';
import { Button } from '../../design-system/atoms/Button';

export const meta = {
  title: 'Atoms/Button',
  component: 'Button',
  description: 'Botão principal do design system. 4 variantes, 3 tamanhos, 2 shapes.',
};

export const Default = {
  name: 'Default',
  render: () => <Button>Click me</Button>,
};

export const AllVariants = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Button variant="filled">Filled</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="text">Text</Button>
    </div>
  ),
};
```

### Auto-descoberta via `import.meta.glob`

```tsx
// StorybookPage.tsx
const allStories = import.meta.glob('../stories/**/*.stories.tsx', { eager: true });
```

Isso retorna um mapa `{ './Button.stories.tsx': { meta, Default, AllVariants, ... } }`.

### UI do StorybookPage

Layout em 3 colunas:
```
┌─────────────────────────────────────────────────────┐
│  dg · storybook               [search]   [☀/🌙]    │  ← Navbar
├──────────────┬──────────────────────────────────────┤
│              │                                      │
│  Atoms (17)  │   Button                             │
│  ▼ Button    │   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│    ActionDisk│                                      │
│    Badge     │   [Default] [All Variants] [Loading] │  ← story tabs
│    ...       │                                      │
│              │   ┌────────────────────────────────┐ │
│  Molecules   │   │     LIVE PREVIEW               │ │
│  ▼ Alert     │   └────────────────────────────────┘ │
│    Drawer    │                                      │
│    Modal     │   ```tsx                             │
│    ...       │   <Button variant="filled">...</>    │
│              │   ```                                │
│  Organisms   │                                      │
│  ▼ Navbar    │                                      │
│    ...       │                                      │
└──────────────┴──────────────────────────────────────┘
```

**Rotas do storybook:**
- `/storybook` → StorybookPage (redirect para primeiro componente)
- `/storybook/:category/:component` → StorybookStoryPage

**Features:**
- Busca ao vivo por nome de componente
- Alternância de tema (dark/light) no preview
- Copy do code snippet
- Indicador de categoria (Atom / Molecule / Organism)
- Responsive: sidebar colapsável em mobile

---

## Tarefa 3 — App Router (react-router-dom)

### Instalação
```bash
pnpm add react-router-dom
```

### Estrutura de rotas

```
/                    → HomePage        (landing elegante com brand + links para seções)
/foundations         → FoundationsPage (tokens, cores, tipografia, dark mode, verticais)
/atoms               → AtomsPage       (todos os 17 átomos)
/molecules           → MoleculesPage   (todas as 15 moléculas)
/organisms           → OrganismsPage   (todos os 8 organismos)
/storybook           → StorybookPage   (explorer de componentes)
/storybook/:category/:component → StorybookStoryPage
```

### Nova estrutura de arquivos

```
src/
  App.tsx                        ← REESCRITO: apenas RouterProvider + rotas (~40 linhas)
  main.tsx                       ← inalterado
  index.css                      ← inalterado
  components/
    Layout.tsx                   ← NOVO: shell compartilhado (Navbar + main + Footer)
    Layout.module.css            ← NOVO
    DocLayout.tsx                ← NOVO: layout de docs (sidebar + main)
    DocLayout.module.css         ← NOVO
  pages/
    HomePage.tsx                 ← NOVO: landing com brand identity DG
    FoundationsPage.tsx          ← extraído de App.tsx (seções tokens, tipografia, dark mode)
    AtomsPage.tsx                ← extraído de App.tsx (todas as DocSection de átomos)
    MoleculesPage.tsx            ← extraído de App.tsx (todas as DocSection de moléculas)
    OrganismsPage.tsx            ← extraído de App.tsx (todas as DocSection de organismos)
    StorybookPage.tsx            ← NOVO: explorer interativo
    StorybookStoryPage.tsx       ← NOVO: página individual de story
  stories/
    atoms/                       ← 17 stories files
    molecules/                   ← 15 stories files
    organisms/                   ← 8 stories files
  docs/
    DocSection.tsx               ← inalterado
    DocSection.module.css        ← inalterado
  design-system/                 ← inalterado
```

### App.tsx reescrito

```tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './design-system/context/ThemeContext';
import Layout from './components/Layout';
import { HomePage, FoundationsPage, AtomsPage, MoleculesPage, OrganismsPage, StorybookPage, StorybookStoryPage } from './pages';

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="foundations" element={<FoundationsPage />} />
              <Route path="atoms" element={<AtomsPage />} />
              <Route path="molecules" element={<MoleculesPage />} />
              <Route path="organisms" element={<OrganismsPage />} />
              <Route path="storybook" element={<StorybookPage />} />
              <Route path="storybook/:category/:component" element={<StorybookStoryPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
```

### Layout.tsx

- Renderiza `<Navbar>` com links de nav para cada rota
- Usa `<Outlet />` do react-router para o conteúdo da rota ativa
- Renderiza `<Footer>` fixo no rodapé
- A Navbar recebe `links` com hrefs como `/atoms`, `/molecules`, etc. (não mais âncoras `#`)

### DocLayout.tsx

- Sidebar à esquerda com `<Sidebar>` filtrado para a seção da rota atual
- `<main>` com o `<Outlet />` da sub-rota (ou simplesmente os DocSections da página)
- Compartilhado entre Foundations, Atoms, Molecules, Organisms pages

### HomePage.tsx

Página de aterrissagem elegante com identidade DG:
- Hero full-viewport com tipografia display grande (`Urbanist 900`, ocre sobre preto tinta)
- 4 cards de acesso rápido: Foundations / Atoms / Molecules / Organisms
- Link para o Storybook com preview de componentes em motion
- Estatísticas: "41 componentes · 4 categorias · TypeScript"
- Dark por padrão (vertical portfolio)

---

## Navegação das páginas de docs

Cada página de docs (AtomsPage, MoleculesPage, etc.) usa `DocLayout` com:
- Sidebar interno à página (links de âncora **dentro da rota**)
- Scroll to section via `href="#component-id"` (mantido para navegação dentro da página)
- Breadcrumb no topo: `Sistema / Átomos`

### Navbar principal links
```
[dg · ds]   Foundations   Atoms   Molecules   Organisms   Storybook   [☀/🌙]
```

---

## Ordem de implementação

```
1. pnpm add motion react-router-dom
2. src/design-system/utils/useMotionConfig.ts      ← hook reduced motion
3. Animar Button, ActionDisk                        ← motion.button simples
4. Animar Modal                                     ← AnimatePresence + overlay
5. Animar Drawer                                    ← AnimatePresence + slide variants
6. Animar Alert                                     ← AnimatePresence wrapper
7. Animar Toast                                     ← motion.div replace CSS keyframes
8. Animar Accordion                                 ← height animation
9. src/components/Layout.tsx + Layout.module.css    ← shell com Outlet
10. src/components/DocLayout.tsx + DocLayout.module.css  ← layout de docs
11. src/pages/HomePage.tsx                          ← landing DG
12. src/pages/FoundationsPage.tsx                   ← extrair de App.tsx
13. src/pages/AtomsPage.tsx                         ← extrair de App.tsx
14. src/pages/MoleculesPage.tsx                     ← extrair de App.tsx
15. src/pages/OrganismsPage.tsx                     ← extrair de App.tsx
16. src/stories/atoms/*.stories.tsx                 ← 17 arquivos
17. src/stories/molecules/*.stories.tsx             ← 15 arquivos
18. src/stories/organisms/*.stories.tsx             ← 8 arquivos
19. src/pages/StorybookPage.tsx                     ← explorer UI
20. src/pages/StorybookStoryPage.tsx                ← página individual
21. src/App.tsx reescrito                           ← BrowserRouter + Routes
22. src/main.tsx                                    ← verificar, não deve precisar de mudança
```

---

## Arquivos críticos

| Ação | Arquivo |
|---|---|
| INSTALAR | `motion`, `react-router-dom` via pnpm |
| NOVO | `src/design-system/utils/useMotionConfig.ts` |
| MODIFICAR | `Modal.tsx`, `Drawer.tsx`, `Alert.tsx`, `Toast.tsx`, `Accordion.tsx`, `Button.tsx`, `ActionDisk.tsx` |
| NOVO | `src/components/Layout.tsx` + `Layout.module.css` |
| NOVO | `src/components/DocLayout.tsx` + `DocLayout.module.css` |
| NOVO | `src/pages/HomePage.tsx` |
| EXTRAIR de App.tsx | `FoundationsPage.tsx`, `AtomsPage.tsx`, `MoleculesPage.tsx`, `OrganismsPage.tsx` |
| NOVO | `src/pages/StorybookPage.tsx` + `StorybookStoryPage.tsx` |
| NOVO | `src/stories/atoms/*.stories.tsx` (17) + `molecules/*.stories.tsx` (15) + `organisms/*.stories.tsx` (8) |
| REESCREVER | `src/App.tsx` (apenas o router) |
| DELETAR | `src/App.module.css` (layout migra para `DocLayout.module.css`) |

---

## Verificação

1. **Motion**: Abrir Modal → overlay fade + dialog slide up; Abrir Drawer → slide correto por direção; clicar Button → scale tap; Accordion abre com height animation
2. **prefers-reduced-motion**: Com media query ativa, todas animações devem ser instantâneas
3. **Rotas**: `/`, `/foundations`, `/atoms`, `/molecules`, `/organisms` carregam seus conteúdos; `/storybook` abre o explorer; `/storybook/atoms/button` mostra as stories do Button; rota desconhecida redireciona para `/`
4. **Storybook**: Sidebar lista todos os componentes agrupados; busca filtra ao vivo; preview mostra story; snippet pode ser copiado; tema dark/light funciona no preview
5. **Navbar**: Links de rota funcionam (não mais âncoras globais); link ativo recebe estado visual
6. **Mobile**: DocLayout collapsa sidebar; StorybookPage collapsa sidebar; hamburger do Navbar funciona
