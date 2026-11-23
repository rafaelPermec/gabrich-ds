---
feature: fundamentos-manual-v2
status: em implementação  # rascunho | aprovada | em implementação | concluída
prd: plans/prd/fundamentos-manual-v2.md
branch: feat/fundamentos-manual-v2
criado: 2026-11-23
atualizado: 2026-11-23
---

# Spec — Fundamentos do manual v2

## 1. Resumo

Os fundamentos do manual v2 entram ao lado dos tokens antigos (expandir), sem remover nada que os componentes genéricos consomem. Cores por marca, os 10 temas por `data-tema`, a camada `data-campanha="bf"`, as subfontes, o espaçamento, o raio e o fio viram custom properties na fonte da verdade dos tokens, com espelho tipado em TS. Cada fatia publica sua seção na página Fundamentos do Storybook e prova os CAs por Playwright. A baseline visual dos genéricos é capturada antes de qualquer mudança de token. Não há fase de "contrair": os nomes antigos ficam para os genéricos (PRD, decisão de 2026-10-23).

## 2. Estado atual

- **Tokens:** a fonte da verdade CSS tem primitivos em inglês (`--color-*`, `--space-*`, `--radius-none`/`--radius-full`), semânticos (`--bg-base`, `--text-primary`, `--accent-primary`…) remapeados por `.light`/`.dark` e pelas classes `.vertical-*` (portfolio, document, course, blackfriday). O espelho TS exporta `fonts` (inclui `archivoNarrow`, usada como `priceFont` da submarca click) e os temas antigos.
- **Fontes:** um `@import` do Google Fonts carrega Urbanist 300/400/600/900, Tenor Sans, Manrope 300–700, Space Mono (com itálico), Montserrat 200–700, Archivo Narrow 700 e Parkinsans 700. Não há Black Mango nem Urbanist 700. O arquivo da Black Mango existe em `../manual-vigente/exportacoes-2026/sistema/fontes/black-mango/`.
- **Tema no app:** o contexto de tema alterna `.light`/`.dark` no `<html>`; o contexto de vertical aplica `.vertical-*` no palco da documentação.
- **Tema no Storybook:** o preview tem os globals `theme` (light/dark) e `vertical`, e cada story é envolvida por um `div` com a classe da vertical e `padding: var(--space-6)`. `data-tema` não existe.
- **Violações já existentes:** `border-radius: 6px` no scrollbar global; `box-shadow` inset na aba de submarca do app de documentação; `50%` cru nas páginas de demonstração; HEX fora dos tokens em `Foundations.mdx`, `storyFixtures`, `docs/registry`, `verticals/BlackFriday` e nas stories de Avatar, HeroSection e PortfolioGrid.
- **Documentação de tokens:** `Foundations.mdx` ("Foundations/Tokens") documenta só os tokens antigos, com HEX literais.
- **Testes:** nenhum runner. Playwright está planejado em `plans/stack.md`, mas não instalado.
- **Componentes do manual** (consumirão os temas novos nos PRDs seguintes): Button, Badge, Card, ActionDisk, Typography, Divider. Todos os outros são **genéricos** (DataTable, FilterBar, Footer, Navbar, Sidebar, StepIndicator, HeroSection, PortfolioGrid, Accordion, Alert, Breadcrumb, Drawer, FormField, ListItem, Modal, NavigationItem, Pagination, SearchBar, Stat, Table, Tabs, Toast, Avatar, Input, Textarea, Select, Checkbox, Radio, Toggle, ProgressBar, Skeleton, Spinner, Tooltip). Nesta feature, os componentes do manual **não migram**: isso é do PRD `atomos-manual-v2`.

## 3. Decisões de implementação

**D1 — Tokens de cor (RF1, RF12).** Primitivos em `:root`, um por cor de 2 · 01, com prefixo de marca e o nome do manual: `--dg-*`, `--ne-*`, `--lp-*`, `--mqc-*`, `--adf-*`, `--bf-*`. Inclui os de "uso a confirmar" (`--dg-grafite`, `--adf-cobre`, `--adf-linha`, `--adf-trama`) e um token novo para cada cor do manual sem nome (ex.: fundos de card de 2 · 05.05b), com nome descritivo registrado nas notas da spec. O HEX só aparece nessas definições.

**D2 — Temas (RF2, RF3, RF10, RF11).** Bloco `[data-tema="<id>"]` para os 10 ids (`dg`, `dg-claro`, `lp`, `lp-claro`, `mqc`, `mqc-claro`, `adf`, `adf-claro`, `ne`, `ne-claro`). Cada um define os 12 tokens de componente e `--erro`, `--aviso` e `--sucesso`, sempre por `var()` dos primitivos. Nos temas de submarca, os estados apontam para `var(--texto)` ou `var(--acento)` (ADR 0004). `[data-campanha="bf"]` é um seletor de atributo combinável com `dg`/`dg-claro`: aplica `--acento` ocre e os estados sem vermelho. No `dg` sem campanha, os estados seguem o mesmo padrão (o manual não tem vermelho aprovado; 2 · 05 mostra o erro na cor do texto): `--erro: var(--texto)`, `--aviso` e `--sucesso: var(--acento)` em todos os 10 temas e na camada `bf` (usuário, 2026-11-23).

**D3 — Espelho TS.** O módulo de tokens ganha `Tema` (union dos 10 ids), `temas: readonly Tema[]`, `Campanha = 'bf'` e objetos `cores`, `subfontes`, `esp`, `raio` e `fio` com os **nomes** das custom properties (`'var(--dg-ocre)'`), não os valores, para não duplicar HEX. Os exports antigos ficam; `fonts.archivoNarrow` sai e o `priceFont` da submarca click passa a usar Montserrat 700 (PRD, decisão de 2026-11-23).

**D4 — Subfontes (RF4).** Por marca e nível, três tokens: `--<marca>-<nivel>` (shorthand `font`: estilo, peso, tamanho/entrelinha, família), `--<marca>-<nivel>-tracking` e `--<marca>-<nivel>-caixa`. Uso no CSS Module: `font: var(--lp-preco); letter-spacing: var(--lp-preco-tracking); text-transform: var(--lp-preco-caixa)`. Tamanho em faixa (ex.: 36–48) vira `clamp(<min>px, <fluido>, <max>px)`, interpolado entre 375px e 1240px de largura. A Black Friday usa o prefixo `--bf-*` para os níveis de 2 · 02. O mapeamento de níveis comuns por `data-tema` (ex.: `--h1` resolvido pelo tema) fica para o PRD `atomos-manual-v2`.

**D5 — Fontes (RF5, RF6).** O `@import` passa a pedir só os pesos de 2 · 06: Urbanist 300/600/700/900, Tenor Sans 400, Montserrat 200/300/600/700, Parkinsans 700, Manrope 300/400/600, Space Mono 400/700, Nothing You Could Do 400. Archivo Narrow sai. A Black Mango é copiada para `public/fonts/` e declarada por `@font-face` com `font-display: swap`. A Balgin não aparece em nenhum `@font-face` nem `@import`. Efeito colateral aceito: os genéricos que usavam Urbanist 400 ou Manrope 500/700 passam a cair no peso carregado mais próximo; o CA14 diz se isso muda o visual (ver riscos).

**D6 — Espaço, raio e fio (RF7–RF9).** `--esp-1`…`--esp-24` (4, 8, 12, 16, 24, 32, 48, 64, 96px; o sufixo é o múltiplo de 4), `--container` (1240px), `--colunas` (12), `--gutter` (24px), `--dobra` (96px; 64px abaixo de 768px). `--raio-reto` (0), `--raio-card` (16px), `--raio-disco` (50%). `--fio` (1px). Nenhum token de sombra. Correções: o scrollbar passa a `var(--raio-reto)`; a aba de submarca do app de documentação troca o `box-shadow` inset por `border-bottom` com `var(--fio)` (ou o fio de 2px da regra, se for o caso: ver nota em T4); o `50%` das demos vira `var(--raio-disco)`.

**D7 — Storybook (RF2, RF13).** Dois globals novos na toolbar: `tema` (`nenhum` + os 10 ids) e `campanha` (`nenhuma` | `bf`). Um decorator aplica `data-tema` e `data-campanha` no `div` que envolve a story. Com `tema = nenhum`, nada muda para os genéricos; os globals antigos `theme` e `vertical` continuam.

**D8 — Página Fundamentos (RF13).** Novo `Fundamentos.mdx` (título "Fundamentos/Visão geral") com `Fundamentos.stories.tsx` co-localizado, uma story por seção: `Cores`, `Temas`, `Tipografia`, `Espaco`, `Raio`, `Fio`. As amostras leem as custom properties (nome do token + valor resolvido via `getComputedStyle`), sem HEX no código. A story `Temas` renderiza os 10 temas lado a lado (mais `dg`+`bf` e `dg-claro`+`bf`), o que dá ao addon a11y todos os pares texto/fundo numa página. O `Foundations.mdx` antigo é renomeado para "Genéricos/Tokens antigos" e seus HEX viram leitura de `var()`.

**D9 — Playwright (CA14 e seams).** `@playwright/test` como devDependency, só Chromium. `playwright.config.ts` sobe o Storybook como `webServer` (`pnpm storybook --ci`, porta 6006) e fixa viewport, `deviceScaleFactor` e espera `document.fonts.ready`. Scripts `test` (tudo) e `test:visual`. Os snapshots do CA14 ficam versionados em `tests/visual/__snapshots__/`.

Alternativas descartadas: CSS-in-TS como fonte da verdade (fere a convenção de tokens em `src/index.css`); Chromatic para o CA14 (serviço externo pago); `@axe-core/playwright` para contraste (dependência extra; o addon a11y já cobre, conferido na story `Temas`).

## 4. Seams de teste

| Seam | Tipo de teste | Cobre | Prior art no repo |
|---|---|---|---|
| Stories dos genéricos no Storybook (screenshot) | Visual Playwright (`toHaveScreenshot`) | CA14 | nenhum |
| Stories `Fundamentos/*` no Storybook (DOM e rede) | Integração Playwright: estilos computados sob cada `data-tema`/`data-campanha`, requisições de fonte | CA2, CA3, CA4, CA5, CA6, CA10, CA11, CA13 | nenhum |
| Código-fonte (`src/`) como texto | Auditoria estática no runner do Playwright, sem navegador (Node `fs`) | CA1, CA7, CA8, CA9, CA12 | nenhum |

- O esperado vem de fonte independente: a lista de cores de 2 · 01 (nome + HEX) e a tabela de 2 · 02 ficam transcritas do manual em `tests/fixtures/manual.ts`, e os testes comparam o CSS contra ela, não contra o espelho TS.
- E2E de jornada: nenhuma (feature sem fluxo de usuário).
- A11y: conferência no addon a11y da story `Temas`, registrada no "Pronto quando".

## 5. Segurança e privacidade

Sem dados de usuário nem segredos. Fontes externas só do Google Fonts (já em uso); a Black Mango é servida localmente. Licença: a Black Mango é "arquivo próprio" em 2 · 06; a Balgin não é publicada.

## 6. Riscos técnicos e rollback

- **Pesos de fonte dos genéricos:** tirar Urbanist 400 e Manrope 500/700 (fora de 2 · 06) pode mudar o visual dos genéricos e quebrar o CA14. Se acontecer na T3: pare e leve a decisão ao usuário (manter esses pesos só para os genéricos ou aceitar a diferença no CA14).
- **Screenshots instáveis:** fontes web e animações (Motion). Mitigação: `document.fonts.ready`, `animations: 'disabled'`, `reducedMotion: 'reduce'` e o mesmo viewport.
- **Baseline fora da `main`:** a T1 captura a baseline na branch antes de qualquer mudança de token, o que equivale à `main` (PRD, CA14).
- **Transcrição do manual:** erro ao transcrever 2 · 01/2 · 02 para a fixture propaga para o teste. Mitigação: transcrever por grep do manual offline e a Débora valida pela página Fundamentos (H1).
- **Rollback:** tudo é aditivo até a T5; reverter um commit de task restaura o estado anterior.

## 7. Tasks (fatias verticais)

### T1 — Playwright e baseline visual dos genéricos
- **Entrega:** `pnpm test:visual` captura e compara screenshots de todas as stories dos genéricos, com a baseline gravada antes de qualquer mudança de token.
- **Porte:** M
- **Testes:** 1 spec visual parametrizado pelas stories dos genéricos (lidas de `index.json` do Storybook, filtradas pela lista de genéricos); baseline gravada.
- **Bloqueada por:** nenhuma
- **Arquivos prováveis:** `package.json`, `pnpm-lock.yaml`, `playwright.config.ts`, `tests/visual/genericos.spec.ts`, `tests/fixtures/genericos.ts`, `.gitignore`, `plans/stack.md`, `AGENTS.md` (comandos de teste)
- **Cobre:** CA14 (baseline), RF14
- **Pronto quando:**
  - [x] `@playwright/test` instalado com o OK do usuário; versão registrada em `plans/stack.md`
  - [x] `pnpm test:visual` passa duas vezes seguidas, sem flake
  - [x] seção Verificação do `AGENTS.md` atualizada (diff com OK)
- **Status:** [x] concluída (2026-11-23)

### T2 — Cores e temas, com seletor no Storybook
- **Entrega:** os primitivos de cor de todas as marcas, os 10 temas `data-tema` com os 12 tokens de componente e os estados, e a camada `data-campanha="bf"`; o Storybook troca tema e campanha pela toolbar, e a página Fundamentos mostra as stories `Cores` e `Temas`.
- **Porte:** G
- **Testes:** 4 — auditoria CA1 (todas as cores de 2 · 01 com nome e HEX); integração CA2+CA3 (os 10 temas definem os 12 tokens com os valores da fixture); CA10 (nenhum estado das submarcas e do `dg`+`bf` resolve para vermelho); CA11 (`dg`/`dg-claro` + `bf`: base preto/papel, acento ocre).
- **Bloqueada por:** T1
- **Arquivos prováveis:** `src/index.css`, `src/design-system/tokens/index.ts`, `.storybook/preview.tsx`, `src/design-system/fundamentos/Fundamentos.mdx`, `src/design-system/fundamentos/Fundamentos.stories.tsx`, `tests/fixtures/manual.ts`, `tests/fundamentos/cores-temas.spec.ts`, `tests/auditoria/cores.spec.ts`
- **Cobre:** RF1, RF2, RF3, RF10, RF11, RF12 (tokens), RF13 (parcial); CA1, CA2, CA3, CA10, CA11
- **Pronto quando:**
  - [x] testes da task verdes; `pnpm test:visual` verde (genéricos intactos)
  - [x] addon a11y sem violação crítica na story `Temas`
  - [x] `pnpm typecheck`, `pnpm lint`, `pnpm build-storybook` sem erro
- **Status:** [x] concluída (2026-11-23)

### T3 — Tipografia e fontes
- **Entrega:** só as fontes e os pesos de 2 · 06 são baixados (sem Archivo Narrow, sem Balgin, com Black Mango local); os tokens de subfonte de todas as marcas e da Black existem; a story `Tipografia` mostra cada nível por marca.
- **Porte:** M
- **Testes:** 3 — integração CA4 (um nível por marca: família, peso, tamanho nos dois extremos do viewport, entrelinha, tracking); rede CA5+CA6 (nenhuma Balgin nem Archivo; Black Mango carregada; só os pesos de 2 · 06 pedidos); auditoria (nenhum `@font-face`/`@import` de Balgin em `src/`).
- **Bloqueada por:** T2
- **Arquivos prováveis:** `src/index.css`, `src/design-system/tokens/index.ts`, `public/fonts/BlackMango-Regular.otf`, `src/design-system/fundamentos/Fundamentos.stories.tsx`, `tests/fixtures/manual.ts`, `tests/fundamentos/tipografia.spec.ts`
- **Cobre:** RF4, RF5, RF6, RF13 (parcial); CA4, CA5, CA6
- **Pronto quando:**
  - [x] testes da task verdes; `pnpm test:visual` verde, ou só com a diferença aceita (fonte de preço) e baseline atualizada para ela
  - [x] `pnpm typecheck`, `pnpm lint`, `pnpm build-storybook` sem erro
- **Status:** [x] concluída (2026-11-23)

### T4 — Espaçamento, raio e fio
- **Entrega:** os tokens `--esp-*`, de grid e dobra, `--raio-*` e `--fio`; o scrollbar, a aba de submarca do app de documentação e as demos deixam de ter raio, sombra e medida fora da regra; as stories `Espaco`, `Raio` e `Fio` completam a página Fundamentos.
- **Porte:** M
- **Testes:** 3 auditorias — CA7 (CSS dos tokens, dos temas e de Fundamentos sem espaçamento fora de `--esp-*`); CA8 (fora dos genéricos, nenhum `border-radius` que não seja `var(--raio-*)`); CA9 (nenhum `box-shadow` em `src/`; todo `border` fora dos genéricos usa `var(--fio)` ou o fio de erro de 2px do ADR 0004). Mais 1 smoke CA13 (as 6 stories de Fundamentos renderizam).
- **Bloqueada por:** T2
- **Arquivos prováveis:** `src/index.css`, `src/design-system/tokens/index.ts`, `src/pages/Verticals.module.css`, `src/pages/verticals/Submarcas.module.css`, `src/pages/verticals/BlackFriday.module.css`, `src/design-system/fundamentos/Fundamentos.stories.tsx`, `tests/auditoria/forma.spec.ts`, `tests/fundamentos/smoke.spec.ts`
- **Cobre:** RF7, RF8, RF9, RF13; CA7, CA8, CA9, CA13
- **Pronto quando:**
  - [ ] testes da task verdes; `pnpm test:visual` verde
  - [ ] confirmar com o usuário a troca do `box-shadow` da aba de submarca (fio de 1px ou de 2px)
  - [ ] `pnpm typecheck`, `pnpm lint`, `pnpm build-storybook` sem erro
- **Status:** [ ] pendente

### T5 — Nenhum HEX fora dos tokens e demos em `data-tema`
- **Entrega:** `src/` sem HEX fora da fonte da verdade e do espelho TS; as páginas de demonstração (Submarcas, Black Friday) usam `data-tema` e `data-campanha="bf"`; o `Foundations.mdx` antigo vira "Genéricos/Tokens antigos" sem HEX literal.
- **Porte:** M
- **Testes:** 1 auditoria CA12 (nenhum HEX em `src/` fora de `src/index.css` e `src/design-system/tokens/`); `pnpm test:visual` como regressão dos genéricos (stories de Avatar, HeroSection e PortfolioGrid trocam HEX por token sem mudar o visual).
- **Bloqueada por:** T2, T4
- **Arquivos prováveis:** `src/pages/verticals/BlackFriday.tsx`, `src/pages/verticals/Submarcas.tsx`, `src/pages/verticals/shared.tsx`, `src/design-system/utils/storyFixtures.tsx`, `src/docs/registry.tsx`, `src/design-system/Foundations.mdx`, `src/design-system/atoms/Avatar/Avatar.stories.tsx`, `src/design-system/organisms/HeroSection/HeroSection.stories.tsx`, `src/design-system/organisms/PortfolioGrid/PortfolioGrid.stories.tsx`, `tests/auditoria/hex.spec.ts`
- **Cobre:** RF11 (demos), RF12, RF14; CA12, CA14
- **Pronto quando:**
  - [ ] suíte completa (`pnpm test`) verde, CA14 incluído
  - [ ] `pnpm typecheck`, `pnpm lint`, `pnpm build-storybook` sem erro; addon a11y sem violação crítica
- **Status:** [ ] pendente

## 8. Notas de implementação
| Data | Task | Nota (desvio, decisão nova, hipótese de bug confirmada) |
|---|---|---|
| 2026-11-23 | T1 | Flake confirmado no CA14: o `<input type="search">` do SearchBar tem largura intrínseca instável no Chrome (175 ou 182px com as mesmas fontes carregadas), e isso vaza para o FilterBar (e o PortfolioGrid) via `width: 100%` + `max-width: 240px` (233 ou 240px). Correção aprovada pelo usuário, exceção pontual a "genéricos ficam como estão": `.right > .search { width: 240px }` no FilterBar (a especificidade maior vence o `width: 100%` do SearchBar, que carrega depois). Visual igual à baseline (240px). Descartados: aquecer fontes, forçar reflow, `flex-basis`. |
| 2026-11-23 | T1 | Teste visual: 34 testes (um por título de genérico), cada um lê o `index.json` do Storybook e captura todas as stories em `light` e `dark` (210 snapshots). `Atoms/Icon` entra como genérico (não é componente do manual). Antes do screenshot, o teste carrega todas as faces de `document.fonts` (`fonts.ready` não espera fonte ainda não pedida). |
| 2026-11-23 | T2 | Desvio da D2 aprovado pelo usuário: o manual não define `--erro/--aviso/--sucesso` em tema nenhum nem tem vermelho aprovado. Todos os 10 temas e a camada `bf` usam `--erro: var(--texto)`, `--aviso: var(--acento)`, `--sucesso: var(--acento)`. O `--mqc-ambar` ("só estado confirmado") fica só como primitivo. |
| 2026-11-23 | T2 | Tema `dg`: `--fio-card` (#6B6156) e `--botao-hover` (#B8964F) não têm primitivo `--dg-*` com esse HEX; apontam para `--bf-fio-cinza` e `--bf-hover-ocre`. Os demais valores usam o primitivo da própria marca. Nenhuma cor sem nome em 2 · 01, então nenhum token descritivo novo (D1) foi criado nesta task. |
| 2026-11-23 | T2 | A11y da story `Temas`: nenhuma violação crítica. Uma *serious* de contraste no `ne-claro`: `--texto-apoio` (#876851) sobre `--fundo` (#EEEAE3) = 4,24:1 em 12px. O par é do manual; levar à Débora (não bloqueia o "Pronto quando"). |
| 2026-11-23 | T2 | `data-campanha="bf"` vale no mesmo elemento do `data-tema` (`[data-tema="dg"][data-campanha="bf"]`). A página Fundamentos ainda usa `--space-*`/`--border-width`: a T4 troca por `--esp-*`/`--fio`. |
| 2026-11-23 | T2 | Revisão: estados numa regra comum `[data-tema]` (a camada `bf` só troca `--acento`); espelho TS separa `tokensComponente` (12) de `tokensEstado`; a story `Cores` mostra o tema da toolbar (CA2); o CA10 cobre também `dg`/`dg-claro` sem campanha. |
| 2026-11-23 | T3 | Risco da seção 6 confirmado: sem Manrope 500, o ListItem e o NavigationItem mudam de peso (500 → 400). Usuário aceitou a diferença; baseline atualizada só desses dois (14 PNGs) e PRD (CA14 e decisões) ajustado. Os outros usos de 500/700 nos genéricos não mudaram o visual. |
| 2026-11-23 | T3 | Subtítulo da marca mãe: o manual (2 · 02) traz Black Mango 400, mas vale a decisão do PRD (2026-10-23): Tenor Sans 400; Black Mango só no No Estúdio. Saem também Montserrat 400 e o itálico da Space Mono (fora de 2 · 06). |
| 2026-11-23 | T3 | Níveis: `dg` titulo, titulo-apoio, subtitulo, corpo, intertitulo, rotulo, botao, manuscrita; `ne` h1–h3, apoio, corpo, legenda; `lp` h1–h3, corpo, legenda, preco; `mqc` h1–h3, corpo, preco; `adf` h1–h3, corpo, rotulo, anotacao; `bf` numero, parcela, de-por, a-vista, contador, etiqueta, botao, corpo, lista, quiz-titulo, quiz-pergunta (o título BLACK FRIDAY é imagem). Caixa: "alta" → uppercase, "baixa" → none, "baixa, sempre" → lowercase. "28 mín." (anotação do Antes da Foto) vira 28px fixo. Notas de uso que não cabem no token (palavra em 700 no H1 do LP, ênfase 600, 0,22em em caixa alta, "12x" a 42%) ficam no comentário do CSS. |
| 2026-11-23 | T3 | `public/` criado (Black Mango em `public/fonts/`); o Storybook ganhou `staticDirs: ['../public']`. Em produção, `/fonts/` resolve no `dist/` do app, que é a raiz do deploy. O CA4 roda em 375px e 1240px (dois casos do mesmo teste) e confere todos os níveis da tabela, não um por marca. |
