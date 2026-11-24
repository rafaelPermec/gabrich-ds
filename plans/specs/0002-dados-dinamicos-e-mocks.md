---
feature: dados-dinamicos-e-mocks
status: em implementação  # rascunho | aprovada | em implementação | concluída
prd: plans/prd/dados-dinamicos-e-mocks.md
branch: feat/dados-dinamicos-e-mocks
criado: 2026-11-23
atualizado: 2026-11-23
---

# Spec — Dados dinâmicos e mocks

## 1. Resumo
O design system ganha um módulo de dados com os formatos de oferta, campanha e conteúdo, as funções puras que formatam e calculam (moeda, preço separado, economia, checkout, fase) e a validação de conteúdo. Ele é exportado pelo contrato público. Erro de formato quebra o typecheck pelos tipos; erro de conteúdo é detectado em runtime e vira aviso no Storybook ou erro no console fora dele. Os mocks com os valores do manual ficam num módulo fora do barrel, usado só por stories e páginas de demonstração (R24). As páginas de demonstração migram para esses mocks, e os textos errados (masterclass, certificado, encontro ao vivo) saem.

## 2. Estado atual
- Não há formato de oferta nem de campanha no DS. Os componentes de oferta ainda não existem (PRD `componentes-de-oferta`, que depende deste).
- A página de demonstração da Black Friday tem um módulo de dados local com produtos (preços errados: Antes da Foto R$ 297/147; "masterclass", "certificado", "encontro mensal ao vivo"), fases com datas antigas fixas e um contador próprio. A página usa um formatador de moeda local da pasta de demonstração.
- A página de Submarcas tem textos fixos com "masterclass" no Antes da Foto e "certificado"/"encontro ao vivo" nos cursos online.
- O espelho TS dos tokens descreve o Antes da Foto como "e-book + masterclass".
- A proposta de fotografia na página de verticais tem preços de serviço (R$ 4.800 etc.). É um componente genérico, fora do escopo.
- Testes: Playwright. Já existem testes sem navegador que importam TS de `src/` (auditoria de HEX) e uma transcrição independente do manual em `tests/fixtures/` como fonte dos valores esperados. Não há runner de unidade; o `tsconfig` inclui `tests/`, então `pnpm typecheck` checa testes de tipo.

## 3. Decisões de implementação

**Módulo de dados (público).** Uma pasta de dados no DS, exportada pelo barrel:
- Tipos:
  - `CursoOnline` (`"lp" | "mqc" | "adf"`).
  - `Oferta`, com slug, nome, cursos, `precoNormal`, `parcelaNormal?`, `precoBlack`, `parcelaBlack?`, `descontoCombo?` (combos fora da Black), `descontoBlack`, `checkout` (`` `#checkout-${string}` ``), `checkoutBlack` (`` `#checkout-bf26-${string}` ``), `linkNormal?` e `linkBlack?`. As parcelas são opcionais (RF6) e o resto é obrigatório (CA3).
  - `Campanha`: seis instantes `DataBrasilia`.
  - Conteúdo: `ListaDoCard`, `Descritivo`, `Modulo`/`Aula`, `Depoimento` (nome da aluna e curso) e `AntesEDepois`.
- `DataBrasilia` é uma string ISO com offset fixo, `` `${string}T${string}-03:00` ``. Ela é comparada por `Date.parse`, sem depender do fuso da máquina.
- Valores monetários são `number` em reais (`1397`, `144.48`). As porcentagens são `number` e vêm prontas no dado (R17); a validação exige inteiro.
- Funções puras:
  - `formatarMoeda(valor)`: "R$ 1.397" ou "R$ 144,48". Valor inteiro sai sem centavos e valor com fração sai com 2 casas. O espaço depois de "R$" é não separável (U+00A0), para não quebrar linha.
  - `formatarParcela(valor?)`: "12x R$ 144,48" ou "12x a confirmar".
  - `resumoDePreco(oferta, precosNormaisDosCursos, emBlack)`: devolve preço, parcela, `precoSeparado?` e `economia?`, pela regra do RF7. Fora da Black, curso único fica sem separado nem economia.
  - `destinoDoCheckout(oferta, emBlack)`: devolve o link, se houver; senão, o id.
  - `faseDaCampanha(campanha, agora)`: cada instante abre a fase seguinte, num intervalo fechado no início e aberto no fim. Antes da lista e a partir do fim do encerramento, a fase é normal. Instantes iguais pulam a fase.
  - `validarOferta`, `validarCampanha` e `validarConteudo`: devolvem a lista de problemas (vazia = válido). Verificam porcentagem inteira entre 0 e 100, preços positivos, Black menor que o normal, ordem cronológica não decrescente e, no conteúdo, os termos proibidos do RF10 por curso.
- **Instantes de fim:** são exclusivos. "Fim da Black em 30/11 23h59" vira `2026-12-01T00:00:00-03:00`, e o encerramento até 08/12 vira `2026-12-09T00:00:00-03:00`.
- **Escopo do tipo `Oferta`:** cobre as 7 ofertas online (3 cursos + 4 combos). O No Estúdio não tem Black (componentes-de-oferta CA3) e entra só como conteúdo (lista oficial). Se o manual trouxer preço do No Estúdio, a T1 registra nas notas e propõe o tipo.

**Aviso de dado inválido.**
- O DS expõe um contexto `ValidacaoDeDados` com modo `"aviso" | "console"`; o padrão é `"console"`.
- O hook `useValidacao(problemas)` faz, no modo console, um `console.error` (uma vez por conjunto de problemas). No modo aviso, ele mostra o componente `AvisoDadoInvalido` (tokens do manual, sem vermelho, R21) junto do conteúdo, que continua renderizado (RNF).
- O decorator global do Storybook liga o modo aviso.
- *Descartado:* detectar o Storybook por global de janela ou variável de ambiente, porque acopla o DS ao Storybook e não funciona na cópia para o Next.js.

**Mocks (fora do barrel).**
- Ficam num módulo de mocks do DS, ao lado dos `storyFixtures`, e não são exportados por `src/design-system/index.ts`.
- Trazem as ofertas da tabela 2 · 05.05c / 2 · 05.12, os ids de 2 · 07, as listas de 2 · 05.05b, os módulos de 2 · 05.17 (versão atual), os depoimentos e os antes e depois, e a campanha 2026 com as datas do PRD.
- Também há mocks inválidos nomeados, só para as stories de aviso.
- *Descartado:* mocks dentro das páginas de demonstração, porque as stories também precisam deles e a duplicação já causou divergência.

**Fonte independente dos testes.** A transcrição do manual em `tests/fixtures/` ganha a tabela de preços, parcelas e porcentagens (2 · 05.05c / 2 · 05.12) e a lista de módulos (2 · 05.17), extraídas por grep do manual offline. Os mocks são comparados com ela, nunca consigo mesmos.

**Páginas de demonstração.** Black Friday e Submarcas passam a ler os mocks e as funções do módulo de dados. O módulo de dados local e o formatador local saem. O contador e as fases da Black usam `faseDaCampanha` com o mock 2026. O visual das páginas não muda além dos valores e textos.

## 4. Seams de teste
| Seam | Tipo de teste | Cobre | Prior art no repo |
|---|---|---|---|
| Funções puras do módulo de dados | Playwright sem navegador, importando de `src/` | CA1, CA2, CA4 (validação), CA5, CA6, CA10, CA11 | `tests/auditoria/hex.spec.ts` |
| Tipos | Teste de tipo com `@ts-expect-error`, checado pelo `pnpm typecheck` | CA3 (typecheck) | — (novo) |
| Mocks × transcrição do manual | Playwright sem navegador | CA7, CA8 | `tests/fixtures/manual.ts` + `tests/fundamentos/cores-temas.spec.ts` |
| Auditoria estática de `src/` | Playwright sem navegador (varre arquivos) | CA9, CA12 | `tests/auditoria/hex.spec.ts` |
| DOM das stories | Playwright no Storybook | CA3 (aviso), CA4 (aviso e console) | `tests/fundamentos/smoke.spec.ts` |

Sem E2E novo: as páginas de demonstração continuam cobertas pelo smoke e pelos visuais existentes.

## 5. Segurança e privacidade
Nenhum dado real de aluna: os depoimentos dos mocks usam o que o manual publica. Não há segredo nem chamada externa.

## 6. Riscos técnicos e rollback
- **Transcrição errada do manual** (risco do PRD): por isso a fixture é extraída por grep do manual offline e conferida separadamente dos mocks. Na revisão, a Débora valida os valores no Storybook.
- **Datas da campanha diferentes do manual:** o mock usa as datas novas do PRD; o manual e o PRD `componentes-de-oferta` (H9) seguem desatualizados.
- **Snapshots visuais das páginas de demonstração** mudam com os valores novos: atualize na T5 revisando os PNGs.
- Rollback: cada task é um commit; reverter a T5 devolve as páginas antigas sem afetar o módulo de dados.

## 7. Tasks (fatias verticais)

### T1 — Oferta: formato, preço e checkout
- **Entrega:** um dev descreve uma oferta com o tipo `Oferta` e obtém preço, parcela, preço separado, economia e destino de checkout formatados. As 7 ofertas oficiais existem como mock e batem com o manual.
- **Porte:** G
- **Testes:** 6. Funções: CA1, CA5, CA6, CA10, CA11. Tipos: CA3 (typecheck). Mocks × manual: CA7.
- **Bloqueada por:** nenhuma
- **Arquivos prováveis:** `src/design-system/dados/` (tipos, moeda, oferta, validação de oferta), `src/design-system/mocks/ofertas.ts`, `src/design-system/index.ts`, `tests/fixtures/manual.ts`, `tests/dados/oferta.spec.ts`, `tests/tipos/oferta.ts`
- **Cobre:** RF1, RF4 (oferta), RF6, RF7, RF8 (ofertas), RF11, RF12; CA1, CA3 (typecheck), CA5, CA6, CA7, CA10, CA11
- **Pronto quando:**
  - [x] `pnpm typecheck`, `pnpm lint` e `pnpm test` verdes
  - [x] tipos e funções exportados pelo barrel; mocks fora dele
- **Status:** [x] concluída

### T2 — Campanha: formato, validação e fase
- **Entrega:** a partir de uma campanha e de um "agora", a fase é calculada. Campanha fora de ordem é rejeitada pela validação. O mock da campanha 2026 tem as datas novas.
- **Porte:** M
- **Testes:** 2 de funções: CA2 (tabela de "agora" por fase, limites e fase pulada) e CA4 (validação).
- **Bloqueada por:** nenhuma
- **Arquivos prováveis:** `src/design-system/dados/` (campanha, fase), `src/design-system/mocks/campanha.ts`, `src/design-system/index.ts`, `tests/dados/campanha.spec.ts`
- **Cobre:** RF2, RF3, RF4 (campanha); CA2, CA4 (validação)
- **Pronto quando:**
  - [x] testes verdes com o fuso da máquina diferente de Brasília (`TZ=UTC pnpm exec playwright test tests/dados`)
- **Status:** [x] concluída

### T3 — Conteúdo: formatos e mocks sem itens inexistentes
- **Entrega:** existem formatos de lista dos cards, descritivos, módulos e aulas, depoimentos e antes e depois, com mocks do manual. Nenhum mock nem o espelho dos tokens fala em masterclass, e os cursos online não falam em certificado nem em encontro ao vivo.
- **Porte:** M
- **Testes:** 2. Mocks × manual: CA8. Auditoria: CA9 (mocks e espelho dos tokens).
- **Bloqueada por:** T1 (a lista do card pertence à oferta)
- **Arquivos prováveis:** `src/design-system/dados/` (conteúdo, validação de conteúdo), `src/design-system/mocks/conteudo.ts`, `src/design-system/tokens/index.ts`, `tests/fixtures/manual.ts`, `tests/dados/conteudo.spec.ts`
- **Cobre:** RF9, RF10, RF8 (conteúdo); CA8, CA9
- **Pronto quando:**
  - [x] testes verdes; No Estúdio mantém "certificado de participação"
- **Status:** [x] concluída

### T4 — Aviso de dado inválido no Storybook
- **Entrega:** no Storybook, uma story com mock de oferta ou de campanha inválido mostra o aviso e o conteúdo continua visível. Com o modo console, nenhum aviso aparece e o erro vai para o console.
- **Porte:** M
- **Testes:** 2 de DOM das stories: CA3 (aviso de oferta) e CA4 (aviso de campanha + modo console).
- **Bloqueada por:** T1, T2
- **Arquivos prováveis:** `src/design-system/dados/` (contexto e hook de validação), `src/design-system/atoms/AvisoDadoInvalido/`, `.storybook/preview.tsx`, stories de validação, `src/design-system/mocks/` (mocks inválidos), `tests/dados/aviso.spec.ts`
- **Cobre:** RF5; CA3 (aviso), CA4 (aviso e console)
- **Pronto quando:**
  - [x] testes verdes; sem violação crítica no addon a11y; `pnpm build-storybook` verde
- **Status:** [x] concluída

### T5 — Páginas de demonstração nos mocks e auditoria final
- **Entrega:** as páginas Black Friday e Submarcas mostram os valores oficiais e as fases da campanha 2026 a partir dos mocks, sem masterclass, certificado ou encontro ao vivo nos cursos online. Uma auditoria garante que nenhum valor de preço, parcela, porcentagem ou data fica fixo no DS fora dos mocks.
- **Porte:** G
- **Testes:** 1 de auditoria (CA12, com CA9 estendido às páginas de demonstração); snapshots visuais atualizados.
- **Bloqueada por:** T1, T2, T3
- **Arquivos prováveis:** `src/pages/verticals/blackFridayData.ts` (sai), `src/pages/verticals/BlackFriday.tsx`, `src/pages/verticals/Submarcas.tsx`, `src/pages/verticals/shared.tsx`, `tests/auditoria/dados.spec.ts`, `tests/visual/__snapshots__/`
- **Cobre:** RF8 (demonstração), RF10; CA9, CA12; objetivo do PRD
- **Pronto quando:**
  - [x] suíte completa verde, `pnpm build` verde, PNGs revisados (nenhum snapshot cobre as páginas)
- **Status:** [x] concluída

## 8. Notas de implementação
| Data | Task | Nota (desvio, decisão nova, hipótese de bug confirmada) |
|---|---|---|
| 2026-11-23 | T1 | Os testes sem navegador importam de `src/design-system/dados/index`, não do barrel: o barrel puxa CSS Modules, que o Node não carrega. O barrel reexporta `dados/` (o typecheck garante). |
| 2026-11-23 | T1 | O manual (2 · 05.05c) tem preço do No Estúdio: R$ 1.547 · 12x R$ 160,00, sem Black ("não entra"). Proposta: tipo próprio `OfertaPresencial` (slug, nome, `precoNormal`, `parcelaNormal?`, `checkout?`), sem campos da Black, criado junto do `componentes-de-oferta` quando houver componente que o exiba. Fora da T1. |
| 2026-11-23 | T1 | `PRECOS_NORMAIS_MOCK` é derivado das ofertas de curso único do mock, sem repetir valores. `validarOferta` recebe `unknown` (dado de fora do TS, sem cast) e também exige que os ids batam com o slug (`#checkout-<slug>`, `#checkout-bf26-<slug>`). |
| 2026-11-23 | T2 | Desvio de nome: o formato das seis datas é `DatasDaCampanha`, não `Campanha`, porque o barrel já exporta `type Campanha = "bf"` (camada de tema em `tokens/`). Onde a spec diz "`Campanha`" para o dado, leia `DatasDaCampanha`. |
| 2026-11-23 | T2 | `FaseDaCampanha`: `"normal" \| "lista-de-espera" \| "aberta" \| "ultima-semana" \| "ultimas-24h" \| "encerrada"`. `faseDaCampanha(datas, agora: Date)`. `DATAS_DA_CAMPANHA` (ordem das datas e a fase que cada uma abre) é exportado e serve à fase e à validação. `validarCampanha` exige ISO com `-03:00` e data existente. |
| 2026-11-23 | T3 | `Curso = CursoOnline \| "ne"`. `ModulosDoCurso` só para `lp` e `mqc`, com `numeracao: "continua" \| "por-modulo"`; o Antes da Foto (capítulos) e o No Estúdio (cronograma PENDENTE) ficam fora do padrão de 2 · 05.17. A quantidade do módulo é `aulas.length`, e a fixture guarda a quantidade declarada no manual, que o teste confere. |
| 2026-11-23 | T3 | `Descritivo` (2 · 07b / 6 · 03b, blocos de parágrafo e lista) existe só como tipo: a spec não lista mock de descritivo. `Depoimento` tem `curso` obrigatório e `nome?` opcional: o manual transcreve poucos nomes (no print, o nome está na imagem). O mock usa os arquivos de `manual-vigente/assets/dep/` e os vídeos da aba 04. |
| 2026-11-23 | T3 | `validarConteudo(conteudo, curso)` varre todos os textos do dado. "Encontro ao vivo" casa com "encontro(s) … ao vivo"; "ao vivo" sozinho é permitido (aula 12 do Luz na Prática: "balanço de branco ajustado ao vivo"). A fixture e o mock de conteúdo foram gerados por script do `Manual Final 2026 - VIGENTE v2.dc.html` (2 · 05.05b, 05.16, 05.17). |
| 2026-11-23 | T3 | O espelho dos tokens passou a "e-book" no Antes da Foto. O texto aparece em Submarcas e Verticals; nenhum snapshot visual cobre essas páginas. |
| 2026-11-23 | T4 | Desvio de local: contexto e hook ficam em `src/design-system/context/ValidacaoDeDados.tsx` (ao lado dos outros contextos), não em `dados/`, porque `dados/index` é importado pelos testes em Node puro e não pode puxar React nem CSS Modules. API: `ValidacaoDeDadosProvider({ modo })`, `useModoValidacao()` e `useValidacao(problemas, origem?)`, que devolve o `AvisoDadoInvalido` a renderizar ou `null`; o `console.error` sai uma vez por conjunto (guarda por `useRef`, imune ao efeito duplo do StrictMode). |
| 2026-11-23 | T4 | O decorator global do Storybook liga o modo aviso; uma story volta ao modo console com `parameters: { validacao: { modo: "console" } }`. O `AvisoDadoInvalido` usa fio no `--aviso` do tema, com `var(--dg-ocre)` quando não há `data-tema` (genéricos), e as subfontes `--dg-rotulo`/`--dg-corpo` (aviso de dev, sem subfonte por tema). Mocks inválidos em `mocks/invalidos.ts`. O contexto soma 2 warnings `react-refresh` ao lint (24 no total), mesmo padrão de `ThemeContext`. |
| 2026-11-23 | T5 | O "50%" da campanha ("garantir com 50%", "50% em todos os cursos", etiqueta da peça de curso) é a manchete do manual, não o `descontoBlack` de cada oferta (50–57%): virou `DESCONTO_DA_CAMPANHA_2026_MOCK` em `mocks/campanha.ts`. Os textos das fases ficam na página como modelo (`` `garantir com ${DESCONTO}%` ``); períodos e "até 30.11" saem do `CAMPANHA_2026_MOCK` (fim exclusivo − 1 ms, formatado em `America/Sao_Paulo`). A fase "aberta" aparece como "não ocorre nesta campanha". A peça abre na fase de agora (`faseDaCampanha`); fora da campanha, na lista de espera. |
| 2026-11-23 | T5 | Arquivos novos fora da spec: `src/pages/verticals/campanha.ts` (formatação das datas, `periodo()`, `bfMeta`: o cabeçalho da Black que estava fixo em `Verticals.tsx` com 17.10 → 27.11) e `src/pages/verticals/cursos.ts` (`SUBMARCA_DO_CURSO`/`CURSO_DA_SUBMARCA`: o dado usa `lp/mqc/adf/ne`, tokens e logos usam `luz/click/adf/estudio`). Ficam em `.ts` para não somar warnings `react-refresh` (lint: 23, uma abaixo da base). |
| 2026-11-23 | T5 | Box de preço: 7 ofertas do mock (sai o "e-book" avulso de R$ 97, que é o próprio Antes da Foto). Benefícios: curso único usa a lista oficial do card; combo, o primeiro item da lista de cada curso. Tags ("Mais escolhido" etc.) seguem como texto da página. Simulador: pacote mais barato que contém os cursos marcados, entre os mocks (todas as 7 combinações existem). Submarcas: fatos e aulas de `MODULOS_LP_MOCK`/`MODULOS_MQC_MOCK`, "O que inclui" da lista do card, "1 ano de acesso"; o grid de módulos passou a `minmax(0, 1fr)` porque os títulos reais estouravam a coluna. |
| 2026-11-23 | T5 | Auditoria `tests/auditoria/dados.spec.ts` (CA12 + CA9): varre `src/design-system/` e `src/pages/verticals/`, sem comentários. CA12 deixa de fora mocks, stories e `storyFixtures` (R24: stories são mock) e literais que são só comprimento CSS (`"100%"`). CA9 deixa de fora mocks e `dados/validacao.ts`. `Verticals.tsx` não é varrido: guarda a proposta de fotografia (genérico, fora do escopo, com R$ 4.800). Nenhum snapshot visual cobre as páginas: nada a atualizar. |
