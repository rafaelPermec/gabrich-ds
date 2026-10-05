# Plano: Correção de tokenização dark/light mode

## Context
Antes do deploy, é necessário garantir que 100% das cores no projeto passem por tokens semânticos e que o dark mode esteja coberto corretamente. A varredura identificou três categorias de problema: (A) tokens semânticos ausentes do bloco dark mode em `index.css`, (B) cores hardcoded em CSS Modules que não respondem a nenhum tema, e (C) padrões de rgba que precisam de novos tokens alpha.

---

## Categoria A — Tokens ausentes do dark mode (`src/index.css`)

Os blocos `html.dark` e `@media (prefers-color-scheme: dark)` cobrem apenas 8 dos 18 tokens definidos em `:root`.

### Tokens faltando → valores dark a definir

| Token | Valor light atual | Valor dark a definir |
|---|---|---|
| `--accent-primary` | `var(--color-ochre)` | manter ochre ou versão mais clara — confirmar com identidade |
| `--accent-warm` | `var(--color-caramel)` | manter caramel ou ajustar luminosidade |
| `--color-error` | `#B3261E` | `#F2B8B5` (Material M3 dark error) ou similar |
| `--color-error-bg` | `rgba(179,38,30,0.08)` | `rgba(242,184,181,0.12)` |
| `--color-warning` | `#F29900` | `#FFD966` ou similar |
| `--color-warning-bg` | `rgba(242,153,0,0.08)` | `rgba(255,217,102,0.12)` |
| `--color-success` | `#2E7D32` | `#A8D5AA` ou similar |
| `--color-success-bg` | `rgba(46,125,50,0.08)` | `rgba(168,213,170,0.12)` |
| `--color-info` | `var(--color-ochre)` | segue `--accent-primary` dark |
| `--color-info-bg` | `rgba(204,170,102,0.10)` | `rgba(204,170,102,0.15)` |

**Arquivo a editar:** `src/index.css` — adicionar os 10 tokens ausentes aos dois blocos dark (linhas ~109 e ~120).

---

## Categoria B — Cores hardcoded em CSS Modules

Cada ocorrência precisa ser substituída por um token CSS ou por um novo token alpha a ser criado.

### B1. Gradientes de sobreposição escura — `#0B0B0B` / `rgba(11,11,11,*)`

Estes hardcodes representam o token `--color-ink` (`#0B0B0B`) com opacidade. A correção é adicionar tokens alpha ao `index.css` e usar a função `color-mix()` do CSS ou variáveis alpha.

**Ocorrências:**
| Arquivo | Linha | Valor atual | Substituir por |
|---|---|---|---|
| `src/pages/Verticals.module.css` | 157 | `linear-gradient(to top, #0B0B0B 0%, rgba(11,11,11,0.9) 22%, rgba(11,11,11,0) 62%)` | `--gradient-ink-overlay` (novo token) |
| `src/design-system/organisms/PortfolioGrid/PortfolioGrid.module.css` | 65 | `rgba(11,11,11,0.85)` | `--color-ink-85` ou `--overlay-heavy` |
| `src/design-system/molecules/Drawer/Drawer.module.css` | 11 | `rgba(11,11,11,0.6)` | `--overlay-mid` |
| `src/design-system/molecules/Modal/Modal.module.css` | 4 | `rgba(11,11,11,0.72)` | `--overlay-heavy` |
| `src/pages/verticals/BlackFriday.module.css` | 47 | `#0B0B0B` (em seletor de atributo) | converter lógica para classe CSS ou data-attribute sem hex no seletor |

Novos tokens a criar em `src/index.css`:
```css
--overlay-heavy: rgba(11, 11, 11, 0.80);   /* modal/drawer backdrop */
--overlay-mid:   rgba(11, 11, 11, 0.60);   /* drawer overlay */
--gradient-ink-overlay: linear-gradient(to top, var(--color-ink) 0%, rgba(11,11,11,0.9) 22%, transparent 62%);
```
Em dark mode estes valores permanecem os mesmos (já são dark). Em light mode é válido revisar se o `PortfolioGrid` e o gradiente de `Verticals` devem ser mais suaves.

### B2. Fundo paper semitransparente — `rgba(244,240,232,*)`

`#F4F0E8` é o token `--color-paper`. Em dark mode, este rgba precisa mudar para uma versão escura equivalente.

| Arquivo | Linha | Valor atual | Substituir por |
|---|---|---|---|
| `src/docs/DocSection.module.css` | 61 | `rgba(244,240,232,0.5)` | `--bg-subtle-alpha` (novo token) |
| `src/design-system/molecules/Table/Table.module.css` | 49 | `rgba(244,240,232,0.5)` | `--bg-subtle-alpha` |

Novo token em `src/index.css`:
```css
/* light */ --bg-subtle-alpha: rgba(244, 240, 232, 0.5);
/* dark  */ --bg-subtle-alpha: rgba(255, 255, 255, 0.06);
```

### B3. Hover em Table — `rgba(191,176,155,0.15)`

`#BFB09B` é `--color-sand`. 

| Arquivo | Linha | Valor atual | Substituir por |
|---|---|---|---|
| `src/design-system/molecules/Table/Table.module.css` | 46 | `rgba(191,176,155,0.15)` | `--bg-hover` (novo token) |

Novo token:
```css
/* light */ --bg-hover: rgba(191, 176, 155, 0.15);
/* dark  */ --bg-hover: rgba(191, 176, 155, 0.10);
```

### B4. Accent ochre semitransparente — `rgba(204,170,102,*)`

`#CCAA66` é `--color-ochre`.

| Arquivo | Linha | Valor atual | Substituir por |
|---|---|---|---|
| `src/design-system/organisms/Sidebar/Sidebar.module.css` | 100 | `rgba(204,170,102,0.12)` | `--accent-subtle` (novo token) |
| `src/pages/Storybook.module.css` | 102 | `rgba(204,170,102,0.55)` | `--accent-mid` (novo token) |

Novos tokens:
```css
/* light */ --accent-subtle: rgba(204, 170, 102, 0.12);
/* dark  */ --accent-subtle: rgba(204, 170, 102, 0.18);
/* light */ --accent-mid:    rgba(204, 170, 102, 0.55);
/* dark  */ --accent-mid:    rgba(204, 170, 102, 0.65);
```

### B5. Skeleton shimmer — `rgba(255,255,255,0.4)`

Este é o único token verdadeiramente problemático em dark: branco semitransparente sobre fundo escuro cria efeito errado.

| Arquivo | Linha | Valor atual | Substituir por |
|---|---|---|---|
| `src/design-system/atoms/Skeleton/Skeleton.module.css` | 15 | `rgba(255,255,255,0.4)` | `--skeleton-shimmer` (novo token) |

Novo token:
```css
/* light */ --skeleton-shimmer: rgba(255, 255, 255, 0.60);
/* dark  */ --skeleton-shimmer: rgba(255, 255, 255, 0.08);
```

### B6. `#fff` em Verticals — `src/pages/Verticals.module.css` linha 182

| Arquivo | Linha | Valor | Substituir por |
|---|---|---|---|
| `src/pages/Verticals.module.css` | 182 | `background: #fff` | `background: var(--bg-surface)` |

---

## Categoria C — `registry.tsx` (documentação interna)

Os hex values nas linhas 303–311 de `src/docs/registry.tsx` são intencionais — são os swatches da paleta de cores na documentação. **Não substituir.** Confirmar apenas que o componente `ColorSwatch` tem contraste de texto adequado em dark mode (texto sobre `#0B0B0B` precisa ser claro).

---

## Arquivos a editar (em ordem de execução)

1. **`src/index.css`** — adicionar 10 tokens de estado nos blocos dark + 6 novos tokens alpha com overrides dark
2. **`src/design-system/atoms/Skeleton/Skeleton.module.css`** — linha 15
3. **`src/design-system/organisms/PortfolioGrid/PortfolioGrid.module.css`** — linha 65
4. **`src/design-system/organisms/Sidebar/Sidebar.module.css`** — linha 100
5. **`src/design-system/molecules/Drawer/Drawer.module.css`** — linha 11
6. **`src/design-system/molecules/Modal/Modal.module.css`** — linha 4
7. **`src/design-system/molecules/Table/Table.module.css`** — linhas 46 e 49
8. **`src/docs/DocSection.module.css`** — linha 61
9. **`src/pages/Verticals.module.css`** — linhas 157 e 182
10. **`src/pages/Storybook.module.css`** — linha 102
11. **`src/pages/verticals/BlackFriday.module.css`** — linha 47 (refatorar seletor)

---

## Verificação

Após as edições:
1. Alternar `html.dark` class no DevTools e verificar visualmente todas as rotas (`/`, `/atoms`, `/molecules`, `/organisms`, `/verticais`, `/storybook`)
2. Confirmar que Skeleton, Modal backdrop, Drawer overlay e PortfolioGrid overlay estão corretos em dark
3. Confirmar que Alert/Toast com cores de estado (error, warning, success, info) têm contraste adequado em dark
4. Rodar `tsc --noEmit` para confirmar que nenhum tipo foi quebrado
5. Checar `@media (prefers-color-scheme: dark)` no DevTools (emular dark scheme) em paralelo ao `html.dark`
