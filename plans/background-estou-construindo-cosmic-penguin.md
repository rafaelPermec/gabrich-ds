# Execução: tokenização dark/light (Débora Gabrich DS)

## Context
Executa o plano `plans/background-estou-construindo-linear-parasol.md` (verificado contra o código: todas as linhas/valores conferem). Objetivo: 100% das cores via tokens semânticos e dark mode completo antes do deploy.

## Passos

1. **`src/index.css`**
   - `:root`: adicionar `--overlay-heavy: rgba(11,11,11,0.80)` (token global único, usado por Modal e PortfolioGrid; decisão: unificar em 0.80), `--overlay-mid: rgba(11,11,11,0.6)` (Drawer), `--gradient-ink-overlay`, `--bg-subtle-alpha`, `--bg-hover`, `--accent-subtle`, `--accent-mid`, `--skeleton-shimmer` (light: 0.6 conforme plano).
   - `html.dark` e `@media (prefers-color-scheme: dark) html:not(.light)`: adicionar os 10 tokens de estado (error/warning/success/info + `-bg`; `--accent-primary`/`--accent-warm` mantidos em ochre/caramel) e overrides dark de `--bg-subtle-alpha`, `--bg-hover`, `--accent-subtle`, `--accent-mid`, `--skeleton-shimmer`.
   - Valores dark dos tokens de estado e alpha: exatamente os do plano linear-parasol (error `#F2B8B5`/`rgba(242,184,181,.12)`, warning `#FFD966`/`rgba(255,217,102,.12)`, success `#A8D5AA`/`rgba(168,213,170,.12)`, info-bg `rgba(204,170,102,.15)`, `--info` segue `--accent-primary`; subtle-alpha `rgba(255,255,255,.06)`, hover `.10`, accent-subtle `.18`, accent-mid `.65`, shimmer `.08`).
   - Overlays/gradiente ink não mudam em dark.
2. **Substituições nos CSS Modules** (uma linha cada):
   - `Skeleton.module.css:15` → `var(--skeleton-shimmer)`
   - `PortfolioGrid.module.css:65` → `var(--overlay-heavy)` (gradiente: `linear-gradient(to top, var(--overlay-heavy) 0%, transparent 55%)`)
   - `Sidebar.module.css:100` → `var(--accent-subtle)`
   - `Drawer.module.css:11` → `var(--overlay-mid)`
   - `Modal.module.css:4` → `var(--overlay-heavy)`
   - `Table.module.css:46` → `var(--bg-hover)`; `:49` → `var(--bg-subtle-alpha)`
   - `DocSection.module.css:61` → `var(--bg-subtle-alpha)`
   - `Verticals.module.css:157` → `var(--gradient-ink-overlay)`; `:182` → `var(--bg-surface)`
   - `Storybook.module.css:102` → `var(--accent-mid)`
3. **`BlackFriday.module.css:47`**: ler como o `style` com `#0B0B0B` é gerado no TSX da peça; trocar o seletor `[style*='#0B0B0B']` por um `data-tone="ink"` (ou classe) setado no componente, e ajustar o CSS.
4. **`registry.tsx`**: não alterar hex dos swatches; apenas checar contraste de texto do `ColorSwatch` em dark.

## Verificação
- `npx tsc --noEmit`
- `grep -rnE "rgba\((11|244|191|204|255)|#0B0B0B|#fff\b" src --include=*.module.css` deve retornar vazio.
- No preview, alternar `html.dark` e checar `/`, `/atoms`, `/molecules`, `/organisms`, `/verticais`, `/storybook`: Skeleton, Modal, Drawer, PortfolioGrid, Alert/Toast, Table striped/hover.
