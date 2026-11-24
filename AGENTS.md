# Projeto
Design system da Débora Gabrich (marca mãe, cursos Luz na Prática, Mais que um Click, Antes da Foto e No Estúdio, e Black Friday 2026): tokens, componentes React, app de documentação e Storybook, publicados na Vercel.
Fora de escopo: as páginas de venda reais e os componentes genéricos (ficam como estão).

# Verificação
- typecheck: `pnpm typecheck`
- lint: `pnpm lint` (correção: `pnpm lint:fix`; passa com 24 warnings de base de `react-refresh`)
- testes (todos): `pnpm test` (Playwright; sobe o Storybook sozinho ou reusa o da porta 6006)
- um teste: `pnpm exec playwright test -g "<nome>"`; visuais: `pnpm test:visual`
- build: `pnpm build` (app Vite em `dist/` + Storybook em `dist/storybook-static/`); só Storybook: `pnpm build-storybook`
- dev: `pnpm dev` (app de docs, porta 5173) e `pnpm storybook` (porta 6006)
- Pronto quando: `pnpm typecheck`, `pnpm lint`, `pnpm test` e `pnpm build-storybook` sem erro, e nenhuma violação crítica no addon a11y.

# Mapa
- `src/main.tsx`, `src/App.tsx`: entrypoint e providers (`ThemeProvider`, `ToastProvider`, `RouterProvider`)
- `src/app/`: rotas (`routes.tsx`) e layouts do app de docs
- `src/pages/`: páginas de docs; `src/pages/verticals/`: páginas de demonstração (Submarcas, Black Friday)
- `src/docs/registry.tsx`: registro de demos das páginas de categoria
- `src/design-system/`: o DS; `index.ts` é o contrato público
  - `atoms/`, `molecules/`, `organisms/`: `Componente.tsx`, `.module.css`, `.stories.tsx`, `index.ts`
  - `tokens/index.ts`: espelho TS dos tokens e temas
  - `icons/`: SVGs e `icon-selector.ts`; `context/`: `ThemeContext`, `VerticalContext`; `utils/`: `focusTrap`, `motionVariants`, `storyFixtures`
- `src/index.css`: fonte da verdade dos tokens CSS
- `.storybook/`: config e toolbar de tema
- `../manual-vigente/`: cópia offline do manual vigente (`Manual Final 2026 - VIGENTE (offline).html`) e protótipos `*.dc.html`

# Convenções
- Estilo só com CSS Modules e tokens `var(--…)` de `src/index.css`; nada de cor, medida ou fonte fixa.
- Componente do manual usa os nomes de token do manual (`--dg-*`, `--esp-*`, `--raio-*`, `--fio`) e os 12 tokens de componente por `data-tema`; use as subfontes do tema, não a família.
- Componente com estado ou hooks começa com `"use client"` (sem efeito no Vite; preparo para a cópia ao Next.js).
- Componente novo entra em `src/design-system/index.ts`.
- Stories co-located (CSF3, `tags: ['autodocs']`), com todos os estados do manual, fundo escuro e claro, preenchidas com mocks; a doc mostra o status de aprovação, lido do arquivo único de status.

# Testes
- Seams: Playwright contra o Storybook: screenshots (`tests/visual/`), DOM/rede das stories e auditoria estática de `src/`. Stories são a prova de estados, com addon a11y (`test: "todo"`).
- Prior art: `tests/visual/genericos.spec.ts`

# Regras de negócio (invariantes)
- Manual vigente manda; só entra o APROVADO; sem resposta no manual, pergunte à Débora (R1, R2).
- Raio só 0, 16px (contextos de R4) ou círculo; nenhum outro, nem no app de docs (R3–R6).
- Fio sempre 1px; nenhuma sombra (R7, R8).
- Espaçamento só na escala 4–96px, `--esp-*` (R9).
- Toda cor é token; nenhum HEX fora da definição dos tokens (R29).
- Preços, parcelas, %, datas e listas chegam como dado validado; % nunca calculada na tela (R16, R17).
- Mocks só em stories e páginas de demonstração (R24).
- Balgin nunca carregada: logos como imagem, títulos em Urbanist (R19, R20).
- Erro/aviso/sucesso sem vermelho nas submarcas e na Black (R21).
- Botão sem seta, sem mudar de tamanho; um de acento por dobra (R10, R11).
- Glossário e regras completas (R1–R33): `CONTEXT.md`

# Áreas protegidas
- `CONTEXT.md` e `plans/adr/` (domínio e decisões: propor diff, gravar com OK)
- Tokens: `src/index.css` e `src/design-system/tokens/` (mudou um, mude o outro)
- `src/design-system/index.ts` e props públicas dos componentes
- Deploy: `vercel.json` e scripts `build`/`build-storybook` (Vercel: output `dist`, build `pnpm build`)
- `../manual-vigente/`: somente leitura; muda só com nova versão vinda da Débora

# Pegadinhas
- O manual offline tem 24 MB: busque com grep; os protótipos `*.dc.html` e `_src/logic.js` (preços, slugs, quiz) são a referência de comportamento.
- Tokens antigos (`--color-*`, `--space-*`, `--radius-*`, classes `.light`/`.dark`) seguem só para os componentes genéricos.
- Tailwind: plugin ainda ativo no `vite.config.ts`, mas não importado; não use (sai da stack).
- Rota `/storybook` é iframe: em `pnpm dev` aponta para `localhost:6006` (rode `pnpm storybook` junto); em produção, `/storybook-static/`.
- Ícone novo (em `src/design-system/icons/`): SVG em `<Nome>/<Nome>.tsx`, export em `index.ts`, nome em `IconSelectorStrings` e entrada no `icon-selector.ts`. `NomeDoIcone` é placeholder.
- Snapshots visuais: `pnpm test:visual --update-snapshots` só quando a mudança visual for intencional (revise os PNGs no diff). Layout que depende da largura intrínseca de `<input>` oscila no Chrome: dê largura definida.
- Storybook antigo na porta 6006 (sobra de execução interrompida do Playwright) é reaproveitado pelos testes; depois de editar `src/index.css`, ele pode duplicar o `@import` das fontes e quebrar o CA5+CA6. Encerre o processo e rode de novo.

# Ponteiros
- Stack, documentação oficial e pendências de ferramenta: `plans/stack.md`
- Domínio: `CONTEXT.md`
- Decisões: `plans/adr/`
- Decisões técnicas por PRD: `plans/notas-tecnicas.md`
- PRDs e specs: `plans/prd/`, `plans/specs/` (specs nascem no `/prd-to-code`)
- Skills do projeto: `.agents/skills/SELECTED.md`
