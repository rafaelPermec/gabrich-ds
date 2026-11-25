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
  - As props `color`, `variant` e `size` saem e entram `versao` (`site` | `peca`), `cheia` e `acento` (desvio da T2, ver notas).
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
  - Props: `forma` (`quadrado` | `linha`), `fase: FaseDaCampanha`, `percentual` (inteiro de `oferta.descontoBlack`, R16; desvio da T5, ver notas) e `papel` (fio preto no papel).
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
  - [x] Os testes de CA5 e CA6 estão verdes.
  - [x] `pnpm typecheck` passa sem uso das props antigas.
- **Status:** [x] concluída

### T3 — CardManual e IndicadorContinuacao
- **Entrega:** card com foto recortada no raio, hover só de cor e foco "proposta", e indicador de continuação em três tamanhos com área de 44px.
- **Porte:** M
- **Testes:** 3 em `tests/atomos/card-indicador.spec.ts` (CA7, CA8, CA12), mais as entradas em temas (CA15) e foco (CA14)
- **Bloqueada por:** T1 (listas de temas e foco)
- **Arquivos prováveis:** `src/design-system/molecules/CardManual/*`, `src/design-system/atoms/IndicadorContinuacao/*`, `src/design-system/index.ts`, `tests/atomos/card-indicador.spec.ts`
- **Cobre:** RF7, RF11, RF13, RF14 · CA7, CA8, CA12, CA14, CA15
- **Pronto quando:**
  - [x] Os testes estão verdes.
  - [x] O indicador é menor que o disco de ação de 52px.
  - [x] Nada se move no hover.
- **Status:** [x] concluída

### T4 — Marcador e LogoCurso
- **Entrega:** ponto, disco numerado e anel de seleção, e a logo dos quatro cursos em máscara de uma cor, que lê `--texto`.
- **Porte:** M
- **Testes:** 2 em `tests/atomos/marcador-logo.spec.ts` (CA11, CA13), mais as entradas em temas (CA15)
- **Bloqueada por:** T1 (lista de temas)
- **Arquivos prováveis:** `src/design-system/atoms/Marcador/*`, `src/design-system/atoms/LogoCurso/*`, `src/design-system/assets/logos/*.svg`, `src/design-system/index.ts`, `tests/atomos/marcador-logo.spec.ts`
- **Cobre:** RF10, RF12, RF14 · CA11, CA13, CA15
- **Pronto quando:**
  - [x] Os testes estão verdes.
  - [x] As quatro logos aparecem nos temas claro e escuro.
  - [x] O manual vigente não foi alterado.
- **Status:** [x] concluída

### T5 — Selos de desconto e de garantia
- **Entrega:** o selo de desconto (quadrado e linha) só aparece nas fases aberta, última semana e últimas 24h. O selo de garantia (linha e quadrado) mostra "7 dias de garantia" na cor do curso, com placeholder no lugar do ícone.
- **Porte:** M
- **Testes:** 2 em `tests/atomos/selos.spec.ts` (CA9, CA10), mais as entradas em temas (CA15)
- **Bloqueada por:** T2 (a versão em linha usa `Badges`)
- **Arquivos prováveis:** `src/design-system/atoms/SeloDesconto/*`, `src/design-system/atoms/SeloGarantia/*`, `src/design-system/index.ts`, `tests/atomos/selos.spec.ts`
- **Cobre:** RF8, RF9, RF14 · CA9, CA10, CA15
- **Pronto quando:**
  - [x] Os testes estão verdes.
  - [x] O selo de desconto renderiza nada em normal, lista-de-espera e encerrada.
  - [x] O selo de garantia não usa ocre em nenhum tema.
- **Status:** [x] concluída

## 8. Notas de implementação
| Data | Task | Nota (desvio, decisão nova, hipótese de bug confirmada) |
|---|---|---|
| 2026-11-24 | T1 | Raio pelo token `--raio-reto` (nome real em `src/index.css`; a spec dizia `--raio-0`). |
| 2026-11-24 | T1 | `acao` nos temas claros (dg, lp, mqc, ne): texto `--texto` sobre o `--acento`, como no manual 2 · 05.01 e em `Cards de Preco.dc.html`. No adf-claro (acento = botão) o texto é `--botao-texto`. Hover da `acao` clara = hover do `solido` (fundo `--botao-hover`, texto `--botao-texto`), decisão do usuário; o `contorno` segue a mesma regra no hover. Exceção ao "troca só o fundo", para manter o texto legível. |
| 2026-11-24 | T1 | Status de aprovação escrito na descrição da story (decisão do usuário): o arquivo único de status é da `documentacao-manual-v2` e ainda não existe. |
| 2026-11-24 | T1 | Corpo do botão em px fixos por tamanho (14/13/12, ficha 2 · 05.01); família, peso, entrelinha, tracking e caixa vêm de `--dg-botao*`. Alturas 56/48/44 também fixas: não há token de altura no manual. |
| 2026-11-24 | T1 | a11y (axe nos 10 temas): nenhuma violação crítica. Uma *serious* de contraste (1,94) no hover do `solido` no dg-claro (ocre `#CCAA66` com texto papel `#F4F0E8`), valores do próprio manual: levar à Débora. |
| 2026-11-24 | T1 | Os 6 testes de `botao.spec.ts`: CA1, CA2, CA3, CA4 (ação por curso), CA4 (largura total) e a `acao` clara com o hover dela (decisão acima). Helper comum das stories em `tests/atomos/storybook.ts`. |
| 2026-11-24 | T2 | Prop `acento` no Badge (decisão do usuário): traçada com fio e texto em `--acento`; cheia com fundo `--acento` e texto pela regra do Botao `acao`. Vem da ficha 2 · 05.02 (1ª etiqueta do grupo em ocre, "no máximo uma em ocre") e serve à linha do SeloDesconto (T5). `color` sai do tipo do Badge (`Omit<HTMLAttributes, "color">`) para o typecheck acusar o uso antigo. |
| 2026-11-24 | T2 | Consumidores fora de `data-tema` (registro de demos, `Verticals.tsx`, stories de ListItem e Table) ficam dentro de `TemaManual` (`src/design-system/utils/TemaManual.tsx`, interno, fora do `index.ts`), que aplica o `data-tema` e pinta `--fundo` (decisões do usuário: envolver em tema, sem fallback; extrair o wrapper após a revisão Padrões). Etiquetas em linha nas páginas viraram `Badges` (cheias). Snapshots visuais de ListItem e Table atualizados (mudança intencional). |
| 2026-11-24 | T2 | Corpo 9px, entrelinha 1,3, tracking 0,08em e altura mínima 28 em valores fixos (ficha 2 · 05.02; sem token de etiqueta). Família e peso de `--dg-rotulo`. |
| 2026-11-24 | T2 | Tema dentro de tema: o texto da cheia em acento vem de uma variável declarada em cada `data-tema` (herdada do mais próximo); seletor por ancestral pegava o tema de fora. O Botao (T1) tem o mesmo padrão `[data-tema="…-claro"] .acao` e o mesmo risco em temas aninhados (fora do escopo da T2). Follow-up: um token de componente por tema para o texto sobre o acento, usado pelo Badge e pelo Botao. |
| 2026-11-24 | T2 | a11y (axe, 10 temas): nenhuma violação crítica. *Serious* de contraste na etiqueta traçada em acento nos temas claros (ex.: ocre sobre papel 1,94) e no ne (4,34): valores do manual; levar à Débora se a traçada em acento vale fora do preto. |
| 2026-11-24 | T2 | `test.slow()` no CA4 do Botao: percorre 8 temas e estourava os 30s às vezes. |
| 2026-11-24 | T3 | CardManual: `imagem.proporcao` (`4/3` padrão, `16/9`), da ficha 2 · 05.03 ("faixa no topo, 4:3 ou 16:9, sangrando até o fio"). A foto fica fora do padding; o padding (24/32/20) e o gap de 12 são do corpo. Sem `href` é `<article>` nomeado pelo título (`aria-labelledby`); com `href`, `<a>`. |
| 2026-11-24 | T3 | Tipografia do card (a ficha não traz amostra): rótulo `--dg-rotulo` em `--texto-apoio`, título `<h3>` em `--dg-intertitulo` e texto `--dg-corpo` em `--texto-apoio`. Validar com a Débora no Storybook. |
| 2026-11-24 | T3 | Padding de 20 no celular fora da escala de R9 (o manual manda, R1): `calc(var(--esp-4) + var(--esp-1))`, sem px fixo. |
| 2026-11-24 | T3 | IndicadorContinuacao: prop `rotulo` (nome acessível, padrão "continuar"), já que o desenho é só a seta. Seta para baixo (path da ficha 2 · 05.09) a 40% do disco. Fio por `border` (o manual desenha com `box-shadow` inset, proibido por R8). Diâmetros 30/38/44 em px fixos (sem token). |
| 2026-11-24 | T3 | a11y (axe, 10 temas): nenhuma violação crítica. *Serious* de contraste no `--texto-apoio` sobre `--card` no lp (4,36) e no ne-claro (3,92), valores do manual: levar à Débora. |
| 2026-11-24 | T3 | `tests/visual/genericos.spec.ts` (ListItem) estourou os 30s uma vez na suíte com 4 workers e passou sozinho (35,7s). Instabilidade anterior à T3; candidato a `test.slow()`. |
| 2026-11-24 | T4 | LogoCurso: os lockups de `../manual-vigente/assets/cursos/` desenham o nome com `<text>` e fonte web, que não carrega dentro de `mask-image` (sairia em fonte de fallback). Os SVGs vêm de `../manual-vigente/exportacoes-2026/<curso>/logos/svg/` (em curvas; são os que as páginas do manual usam): lnp `horizontal`/`vertical-justificada`, mqc `horizontal`/`empilhada-principal`, ne `horizontal`/`empilhada`, adf `horizontal_ponto-whiskey`/`duas-linhas_no-escuro`. Na cópia para `src/design-system/assets/logos/`, `fill` vira `black` e os metadados c2pa saem (a auditoria de HEX varre `src/`; a máscara só usa o alfa). As logos de duas cores (mqc, adf) viram uma cor só, como pede o RF12. |
| 2026-11-24 | T4 | LogoCurso: altura padrão de 32 (`--esp-8`), largura pela proporção do viewBox (`aspect-ratio`); quem usa ajusta a altura por `className`/`style`. |
| 2026-11-24 | T4 | Marcador: o anel da `selecao` é SVG (círculo com traço de 1,5): o Chrome arredonda borda de 1,5px para 1px em tela 1x. O ponto de 8px fica no `--acento`. Com `children`, o marcador vira item com gap de 8 até o texto (o ponto alinha à linha de base, `translateY(-1px)` como na ficha). `numero` numérico sai com dois dígitos ("02"). |
| 2026-11-24 | T4 | Marcador em px fixos da ficha 2 · 05.08 (ponto 7, disco e anel 20, miolo 8, traço 1,5, Space Mono 9): sem token de tamanho no manual. Família e peso do número de `--dg-rotulo`. |
| 2026-11-24 | T4 | Ponto e miolo da seleção no `--acento` em todos os temas, pelo texto da ficha 2 · 05.08 e pela tabela de box de preço (marcador no acento do curso no papel). A amostra "fundo claro" da 05.08 pinta os dois em preto: levar à Débora se o dg-claro fica em ocre ou em preto. |
| 2026-11-24 | T4 | a11y (axe, 6 stories × 10 temas): nenhuma violação. CA15 ganhou o papel `testid` para os marcadores decorativos (`aria-hidden`). |
| 2026-11-24 | T5 | SeloDesconto: `percentual: number` (inteiro, de `oferta.descontoBlack`, já validado por `validarOferta`), decisão do usuário; a D6 pedia string. O quadrado mostra "50%" e a linha "−50%" (U+2212), como na ficha 2 · 05.06: só formatação, nada calculado (R17). |
| 2026-11-24 | T5 | SeloDesconto `papel` (prop, como na D6): fio e rótulo em `--texto` (o preto do dg-claro), não em `--dg-preto-tinta`, para ficar só nos tokens do tema. Fora do papel, fio e rótulo em `--dg-ocre`; número em `--texto`. A linha é `Badges` com `Badge acento` ("−50%") + `Badge` ("black friday"). |
| 2026-11-24 | T5 | Números dos selos em `--bf-numero` (Urbanist 600, /0,85, −0,02em) com corpo da ficha: 44 no desconto e 52 no 7 da garantia (a tabela da 05.07 só diz "Urbanist 600"; o 52 vem da amostra). Rótulos em `--dg-rotulo` com corpo e tracking da ficha (7,5/0,12em; 9/0,1em). Quadrados em 120px com `min-width: 88px` e `aspect-ratio: 1` (sem token de tamanho). |
| 2026-11-24 | T5 | SeloGarantia: fio em `--selo-garantia`, texto em `--texto`, e "dias de garantia" do quadrado em `--texto-apoio` (cores das amostras da 05.07). O placeholder do ícone é um quadrado tracejado de 22px em `--selo-garantia`, `aria-hidden`, com `data-placeholder="icone-aprovacao"` para a troca. O quadrado não leva ícone (a ficha não mostra). |
| 2026-11-24 | T5 | a11y (axe, 7 stories × 10 temas): nenhuma violação crítica. *Serious* de contraste no rótulo ocre do selo de desconto sem `papel` nos temas claros (uso previsto: `papel` no claro) e no `--texto-apoio` do ne-claro (4,24), valores do manual. |
