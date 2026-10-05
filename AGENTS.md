# gabrich-ds

Design system da Débora Gabrich — React 19 + Vite 8 + TypeScript, estilizado com CSS Modules e tokens em CSS custom properties. Documentação de componentes via Storybook.

## Comandos (sempre `pnpm`)

- `pnpm dev` — servidor Vite do app de documentação
- `pnpm build` — build unificado de produção (app Vite em `dist/` + Storybook estático em `dist/storybook-static/`)
- `pnpm storybook` — Storybook em http://localhost:6006
- `pnpm build-storybook` — build estático apenas do Storybook (`dist/storybook-static/`)
- `pnpm typecheck` — validação de tipos TypeScript
- `pnpm format` — formatação com oxfmt

## Deploy na Vercel

- Configuração em `vercel.json` com rewrites para SPA (React Router) e entrega de arquivos estáticos em `/storybook-static/*`.
- A rota `/storybook` renderiza um `<iframe>` que aponta dinamicamente para `http://localhost:6006` em desenvolvimento local (`pnpm dev`) e para `/storybook-static/index.html` em produção.
- Output Directory na Vercel: `dist`
- Build Command na Vercel: `pnpm build`

## Estrutura do projeto

- `src/main.tsx` — entrypoint React; importa `src/index.css` e monta `src/App.tsx`
- `src/App.tsx` — providers (`ThemeProvider`, `ToastProvider`) + `RouterProvider`
- `src/app/` — rotas (`routes.tsx`) e layouts
- `src/pages/` — páginas do app de docs (Home, categorias, Verticais, catálogo interno `/storybook`)
- `src/docs/registry.tsx` — registro de demos usado pelas páginas internas
- `src/design-system/` — o design system em si
  - `tokens/index.ts` — tokens em TypeScript
  - `atoms/`, `molecules/`, `organisms/` — componentes (`Componente.tsx`, `Componente.module.css`, `Componente.stories.tsx`, `index.ts`)
  - `context/` — `ThemeContext` (light/dark) e `VerticalContext`
  - `utils/` — `focusTrap`, `motionVariants`
- `src/index.css` — fonte da verdade dos tokens CSS (`:root`, dark mode, verticais)
- `src/imports/sistema_visual_debora_gabrich.md` — manual de identidade visual (referência de marca)
- `.storybook/` — configuração do Storybook (toolbar de tema e vertical)

## Estilo

- Use CSS Modules por componente e **sempre** tokens `var(--...)` de `src/index.css`; nada de cores hardcoded.
- Raio: apenas `0` ou `9999px` (regra-mãe do manual).
- Espaçamento na grade de 4px (`--space-*`).
- Tailwind v4 está instalado via `@tailwindcss/vite`, mas não é importado em `index.css`; o DS não depende dele.

## Stories

Stories ficam co-located ao componente (`*.stories.tsx`, CSF3, `tags: ['autodocs']`).
