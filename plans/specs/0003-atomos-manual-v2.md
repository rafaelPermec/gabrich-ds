---
feature: atomos-manual-v2
status: em implementação  # rascunho | aprovada | em implementação | concluída
prd: plans/prd/atomos-manual-v2.md
branch: feat/atomos-manual-v2
criado: 2026-11-24
atualizado: 2026-11-24
---

# Spec — Átomos do manual v2

## 1. Resumo

Os átomos do manual entram como componentes novos, ao lado dos que já existem, para não quebrar os genéricos e as páginas de demonstração: `Botao`, `CardManual`, `SeloDesconto`, `SeloGarantia`, `Marcador`, `IndicadorContinuacao` e `LogoCurso`. A exceção é a etiqueta: o `Badge` é migrado no lugar para as props do manual, e os consumidores dele são atualizados. Os átomos novos leem só os 12 tokens de componente do `data-tema` e os tokens do manual (`--dg-*`, `--esp-*`, `--raio-*`, `--fio`). A prova fica em Playwright, medindo o DOM computado das stories.

## 2. Estado atual

- **Button**: componente do manual com tokens legados. Props: `variant` (filled | outline | ghost | text), `size` (lg | md | sm), `shape` (sharp | pill) e `loading`. O `ghost` é usado por genéricos (Modal, Drawer), e o registro de demos usa `shape="pill"`. **Fica como está.**
- **Badge**: componente do manual com `variant` (solid | outline), `color` (ink | paper | ochre | caramel) e `size` (sm | md). Usado em páginas de demonstração e no registro de demos. **É migrado.**
- **Card** (molécula): 5 variantes (content, icon, project, data, value), usadas nas páginas de demonstração. **Fica como está.**
- **ActionDisk** (disco de ação): 52 / 72 / 96px. Fora de escopo, serve de comparação para o indicador.
- **Tokens**: os 10 temas (`dg`, `dg-claro`, `lp`, `lp-claro`, `mqc`, `mqc-claro`, `adf`, `adf-claro`, `ne`, `ne-claro`) definem os 12 tokens de componente: fundo, card, fio-card, texto, texto-apoio, acento, botao, botao-texto, botao-hover, desabilitado, divisoria e selo-garantia. A Black usa o tema `dg`.
- **Fase da campanha**: o tipo `FaseDaCampanha` (normal, lista-de-espera, aberta, ultima-semana, ultimas-24h, encerrada) está no módulo de dados de campanha.
- **Testes**:
  - Playwright contra o Storybook, com medição de DOM computado (prior art: smoke de fundamentos e cores-temas).
  - Auditorias estáticas de `src/` (forma: raio, fio e sombra; HEX; fontes).
  - Fixture independente com os valores do manual (`TEMAS_MANUAL`, `TOKENS_COMPONENTE`).
  - A fixture de genéricos já deixa Button, Badge, Card e ActionDisk de fora do teste visual dos genéricos.
- **Logos**: SVGs de LnP, MqC e NE em `../manual-vigente/assets/cursos/<curso>/`. O de Antes da Foto fica em `../manual-vigente/exportacoes-2026/antes-da-foto/logos/svg/`.

## 3. Decisões de implementação

- **D1. Botao (novo, RF1–RF4)**
  - Props: `variante` (`solido` | `acao` | `contorno`), `tamanho` (`grande` 56 | `medio` 48 | `pequeno` 44), `larguraTotal` e `disabled`. Repassa os atributos nativos de `<button>`.
  - Visual: sem seta nem ícone, raio `--raio-0`, Manrope 600, caixa alta, 0,16em.
  - Hover: troca só `background-color` para `--botao-hover`, sem `transform`, sem escala no toque e sem Motion.
  - `solido`: fundo `--botao`, texto `--botao-texto`.
  - `acao`: a cor de ação do curso é o `--acento`. Nos temas escuros, `--acento` e `--botao` coincidem. A cor do texto sobre o acento nos temas claros se valida no manual 2 · 05.01 durante a T1, e o desvio vai para as notas.
  - `contorno`: sem preenchimento, fio `--fio` na cor do texto.
  - `disabled`: sem preenchimento, fio de 1px e texto em `--desabilitado`.
  - `larguraTotal`: ocupa a coluna abaixo de 768px.
  - O `Button` legado não muda.
- **D2. Badge migrado = etiqueta (RF5, RF6)**
  - As props `color`, `variant` e `size` saem e entram `versao` (`site` | `peca`) e `cheia`.
  - Visual: Space Mono 9px, caixa alta, +0,08em, fio 1px, raio 0. Padding 4 × 8, e 8 × 12 com altura mínima de 28 na `peca`.
  - A cor vem do tema: traçada em `--texto`, cheia com fundo `--texto` e texto `--fundo`.
  - Grupo novo `Badges` (contêiner em linha): força `cheia` nos filhos quando há dois ou mais e aplica o gap de 4 (`site`/Black) ou 8 (`peca`/marca mãe). Uma etiqueta sozinha é sempre traçada.
  - Consumidores atualizados na mesma task: páginas de demonstração, registro de demos e stories.
  - O nome Badge fica, por decisão do usuário. Na documentação, o componente é chamado de "Etiqueta" (termo do glossário).
- **D3. CardManual (novo, RF7)**
  - Props: `rotulo`, `titulo`, `texto`, `imagem` (`src`, `alt`), `colunas6`, `href` e `children`.
  - Visual: raio `--raio-16`, fio 1px `--fio-card`, fundo `--card`, sem sombra. Padding 24, 32 com `colunas6` e 20 abaixo de 768px. Gap interno 12.
  - A foto fica num contêiner com `overflow: hidden` e recorta no raio.
  - Com `href`, o card é clicável: no hover, o fio vira `--texto` e o rótulo vira `--acento`, sem `transform`.
  - O `Card` legado não muda.
- **D4. IndicadorContinuacao (novo, RF11)**
  - Props: `tamanho` (`minimo` 30 | `padrao` 38 | `capa` 44), `disabled` e `href`/`onClick`.
  - Visual: disco traçado com fio de 1px e seta SVG de 1,4px, sem preenchimento (o manual proíbe fio e preenchimento ao mesmo tempo).
  - A área clicável de 44px vem de um pseudo-elemento invisível; o desenho não muda.
  - No hover, fio e seta ficam em `--acento`. Desabilitado, ficam em `--desabilitado`.
- **D5. Marcador (novo, RF10)**
  - Um componente com `tipo`: `ponto` (7px, `--acento`), `numero` (disco de 20px, Space Mono 9, com prop `numero`) e `selecao` (anel de 20px, fio 1,5px, ponto de 8px quando `marcado`).
  - A `selecao` é só visual (`aria-hidden`). Quem usa (quiz, combo) põe o input e o rótulo com área de 44px.
  - Lista com o marcador `ponto`: gap de 8.
- **D6. SeloDesconto (novo, RF8, R14)**
  - Props: `forma` (`quadrado` | `linha`), `fase: FaseDaCampanha`, `percentual` (string validada, R16) e `papel` (fio preto no papel).
  - Renderiza `null` fora de `aberta`, `ultima-semana` e `ultimas-24h`.
  - Quadrado: 120 × 120 (mínimo 88), fio 1px `--dg-ocre` (preto no papel), número em Urbanist 600 44px, rótulo em Space Mono 7,5px.
  - Linha: `Badges` com duas etiquetas cheias ("50%" e "black friday").
- **D7. SeloGarantia (novo, RF9)**
  - Props: `forma` (`linha` | `quadrado`). Texto fixo "7 dias de garantia". Cor `--selo-garantia`, nunca ocre. Raio 0.
  - Linha: ícone de 22px, Space Mono 9, padding 12 × 16, fio 1px. Quadrado: 120 × 120, mínimo 88.
  - O ícone é um placeholder de 22px marcado como pendente até o ícone "aprovação" chegar (task avulsa, fora desta spec).
- **D8. LogoCurso (novo, RF12, R19)**
  - Props: `curso` (`lnp` | `mqc` | `adf` | `ne`) e `variante` (`horizontal` | `empilhada`, quando o curso tiver as duas).
  - É um `span` com `mask-image` do SVG e `background-color: var(--texto)`, com `role="img"` e `aria-label` com o nome do curso.
  - Os SVGs são copiados (uma versão de cada) para a pasta de assets do DS.
- **D9. Foco "proposta" (RF13)**: todo átomo interativo (Botao, CardManual com `href`, IndicadorContinuacao) tem `:focus-visible` com contorno de 2px em `--texto` e afastamento de 2px, e uma story chamada "Foco (proposta)".
- **D10. Stories**: CSF3 com `autodocs`. Cada átomo tem os estados do manual em fundo escuro e claro, a story de foco quando interativo, e o status de aprovação lido do arquivo único de status.
- **D11. Contrato público**: cada átomo novo e o grupo `Badges` entram em `src/design-system/index.ts`. A mudança de props do `Badge` é a única quebra de contrato, e todos os consumidores são migrados na mesma task.

Alternativas descartadas:
- Migrar Button e Card no lugar: perderia variantes usadas pelos genéricos e pelas demos.
- Criar uma `Etiqueta` nova: o usuário preferiu migrar o Badge.

## 4. Seams de teste

| Seam | Tipo de teste | Cobre | Prior art no repo |
|---|---|---|---|
| Story no Storybook + DOM computado (Playwright) | Integração: mede altura, padding, raio, fio, sombra, fonte e cor contra a fixture do manual | CA1–CA13 | `tests/fundamentos/smoke.spec.ts`, `tests/fundamentos/cores-temas.spec.ts` |
| Story nos 10 temas (Playwright) | Integração parametrizada: cor computada = token do tema na fixture | CA15 | `tests/fundamentos/cores-temas.spec.ts` |
| Índice do Storybook (`/index.json`) | Integração: todo átomo interativo tem a story "Foco (proposta)" | CA14 | `tests/fundamentos/smoke.spec.ts` |
| Auditoria estática de `src/` | Já existe: raio, fio, sombra, HEX e fontes. Os átomos novos entram nela sem teste novo | R3–R9, R29 | `tests/auditoria/forma.spec.ts`, `tests/auditoria/hex.spec.ts` |
| Addon a11y | Verificação manual nas stories, sem violação crítica | RNF | — |

Sem snapshots visuais novos: a Débora aprova o visual no Storybook.

## 5. Segurança e privacidade

Sem dados pessoais nem rede. Os mocks ficam só nas stories (R24). O percentual do selo chega como string validada e nunca é calculado (R16, R17).

## 6. Riscos técnicos e rollback

- **Cor do texto na variante `acao` em tema claro**: o contraste pode falhar. Validar no manual e no a11y na T1; o desvio vai para as notas.
- **Migração do Badge**: quebra todos os consumidores de uma vez. O typecheck acusa todos, e o rollback é reverter o commit da T2.
- **`mask-image`**: depende de SVG com alfa limpo. Se algum SVG vier com fundo, recortar o fundo na cópia para o DS (nunca editar `../manual-vigente/`).
- **Hover medido no Playwright**: precisa de `page.hover` e de `getComputedStyle` após a transição. Usar `transition: none` com movimento reduzido (R33), ou esperar o valor final.

## 7. Tasks (fatias verticais)

### T1 — Botao do manual
- **Entrega:** a Débora vê no Storybook o `Botao` nos três tamanhos e nas três variantes (com e sem larguraTotal, desabilitado e foco), em fundo escuro e claro, nos 10 temas. O Button legado fica intacto.
- **Porte:** M
- **Testes:** 6 em `tests/atomos/botao.spec.ts` (CA1–CA4), mais `tests/atomos/temas.spec.ts` (CA15) e `tests/atomos/foco.spec.ts` (CA14), criados aqui com a lista de átomos que as próximas tasks estendem.
- **Bloqueada por:** nenhuma
- **Arquivos prováveis:** `src/design-system/atoms/Botao/*`, `src/design-system/index.ts`, `tests/atomos/*.spec.ts`, `tests/fixtures/manual.ts`
- **Cobre:** RF1–RF4, RF13, RF14 · CA1–CA4, CA14, CA15
- **Pronto quando:**
  - [x] Os testes de CA1–CA4, CA14 e CA15 estão verdes.
  - [x] Nenhuma violação crítica no a11y.
  - [x] Button legado e genéricos sem mudança.
- **Status:** [x] concluída

### T2 — Badge migrado (etiqueta) e grupo Badges
- **Entrega:** o Badge segue o manual (traçado sozinho; cheio em grupo, com gap de 4 ou 8; versão de peça) e todos os consumidores compilam com as props novas.
- **Porte:** M
- **Testes:** 2 em `tests/atomos/etiqueta.spec.ts` (CA5, CA6), mais as entradas do Badge em temas (CA15)
- **Bloqueada por:** nenhuma
- **Arquivos prováveis:** `src/design-system/atoms/Badge/*`, `src/design-system/index.ts`, `src/pages/**`, `src/docs/registry.tsx`, `tests/atomos/etiqueta.spec.ts`
- **Cobre:** RF5, RF6, RF14 · CA5, CA6, CA15
- **Pronto quando:**
  - [ ] Os testes de CA5 e CA6 estão verdes.
  - [ ] `pnpm typecheck` passa sem uso das props antigas.
- **Status:** [ ] pendente

### T3 — CardManual e IndicadorContinuacao
- **Entrega:** card com foto recortada no raio, hover só de cor e foco "proposta", e indicador de continuação em três tamanhos com área de 44px.
- **Porte:** M
- **Testes:** 3 em `tests/atomos/card-indicador.spec.ts` (CA7, CA8, CA12), mais as entradas em temas (CA15) e foco (CA14)
- **Bloqueada por:** T1 (listas de temas e foco)
- **Arquivos prováveis:** `src/design-system/molecules/CardManual/*`, `src/design-system/atoms/IndicadorContinuacao/*`, `src/design-system/index.ts`, `tests/atomos/card-indicador.spec.ts`
- **Cobre:** RF7, RF11, RF13, RF14 · CA7, CA8, CA12, CA14, CA15
- **Pronto quando:**
  - [ ] Os testes estão verdes.
  - [ ] O indicador é menor que o disco de ação de 52px.
  - [ ] Nada se move no hover.
- **Status:** [ ] pendente

### T4 — Marcador e LogoCurso
- **Entrega:** ponto, disco numerado e anel de seleção, e a logo dos quatro cursos em máscara de uma cor, que lê `--texto`.
- **Porte:** M
- **Testes:** 2 em `tests/atomos/marcador-logo.spec.ts` (CA11, CA13), mais as entradas em temas (CA15)
- **Bloqueada por:** T1 (lista de temas)
- **Arquivos prováveis:** `src/design-system/atoms/Marcador/*`, `src/design-system/atoms/LogoCurso/*`, `src/design-system/assets/logos/*.svg`, `src/design-system/index.ts`, `tests/atomos/marcador-logo.spec.ts`
- **Cobre:** RF10, RF12, RF14 · CA11, CA13, CA15
- **Pronto quando:**
  - [ ] Os testes estão verdes.
  - [ ] As quatro logos aparecem nos temas claro e escuro.
  - [ ] O manual vigente não foi alterado.
- **Status:** [ ] pendente

### T5 — Selos de desconto e de garantia
- **Entrega:** o selo de desconto (quadrado e linha) só aparece nas fases aberta, última semana e últimas 24h. O selo de garantia (linha e quadrado) mostra "7 dias de garantia" na cor do curso, com placeholder no lugar do ícone.
- **Porte:** M
- **Testes:** 2 em `tests/atomos/selos.spec.ts` (CA9, CA10), mais as entradas em temas (CA15)
- **Bloqueada por:** T2 (a versão em linha usa `Badges`)
- **Arquivos prováveis:** `src/design-system/atoms/SeloDesconto/*`, `src/design-system/atoms/SeloGarantia/*`, `src/design-system/index.ts`, `tests/atomos/selos.spec.ts`
- **Cobre:** RF8, RF9, RF14 · CA9, CA10, CA15
- **Pronto quando:**
  - [ ] Os testes estão verdes.
  - [ ] O selo de desconto renderiza nada em normal, lista-de-espera e encerrada.
  - [ ] O selo de garantia não usa ocre em nenhum tema.
- **Status:** [ ] pendente

## 8. Notas de implementação
| Data | Task | Nota (desvio, decisão nova, hipótese de bug confirmada) |
|---|---|---|
| 2026-11-24 | T1 | Raio pelo token `--raio-reto` (nome real em `src/index.css`; a spec dizia `--raio-0`). |
| 2026-11-24 | T1 | `acao` nos temas claros (dg, lp, mqc, ne): texto `--texto` sobre o `--acento`, como no manual 2 · 05.01 e em `Cards de Preco.dc.html`. No adf-claro (acento = botão) o texto é `--botao-texto`. Hover da `acao` clara = hover do `solido` (fundo `--botao-hover`, texto `--botao-texto`), decisão do usuário; o `contorno` segue a mesma regra no hover. Exceção ao "troca só o fundo", para manter o texto legível. |
| 2026-11-24 | T1 | Status de aprovação escrito na descrição da story (decisão do usuário): o arquivo único de status é da `documentacao-manual-v2` e ainda não existe. |
| 2026-11-24 | T1 | Corpo do botão em px fixos por tamanho (14/13/12, ficha 2 · 05.01); família, peso, entrelinha, tracking e caixa vêm de `--dg-botao*`. Alturas 56/48/44 também fixas: não há token de altura no manual. |
| 2026-11-24 | T1 | a11y (axe nos 10 temas): nenhuma violação crítica. Uma *serious* de contraste (1,94) no hover do `solido` no dg-claro (ocre `#CCAA66` com texto papel `#F4F0E8`), valores do próprio manual: levar à Débora. |
| 2026-11-24 | T1 | Os 6 testes de `botao.spec.ts`: CA1, CA2, CA3, CA4 (ação por curso), CA4 (largura total) e a `acao` clara com o hover dela (decisão acima). Helper comum das stories em `tests/atomos/storybook.ts`. |
