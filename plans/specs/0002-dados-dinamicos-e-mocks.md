---
feature: dados-dinamicos-e-mocks
status: aprovada  # rascunho | aprovada | em implementação | concluída
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
  - [ ] `pnpm typecheck`, `pnpm lint` e `pnpm test` verdes
  - [ ] tipos e funções exportados pelo barrel; mocks fora dele
- **Status:** [ ] pendente

### T2 — Campanha: formato, validação e fase
- **Entrega:** a partir de uma campanha e de um "agora", a fase é calculada. Campanha fora de ordem é rejeitada pela validação. O mock da campanha 2026 tem as datas novas.
- **Porte:** M
- **Testes:** 2 de funções: CA2 (tabela de "agora" por fase, limites e fase pulada) e CA4 (validação).
- **Bloqueada por:** nenhuma
- **Arquivos prováveis:** `src/design-system/dados/` (campanha, fase), `src/design-system/mocks/campanha.ts`, `src/design-system/index.ts`, `tests/dados/campanha.spec.ts`
- **Cobre:** RF2, RF3, RF4 (campanha); CA2, CA4 (validação)
- **Pronto quando:**
  - [ ] testes verdes com o fuso da máquina diferente de Brasília (`TZ=UTC pnpm exec playwright test tests/dados`)
- **Status:** [ ] pendente

### T3 — Conteúdo: formatos e mocks sem itens inexistentes
- **Entrega:** existem formatos de lista dos cards, descritivos, módulos e aulas, depoimentos e antes e depois, com mocks do manual. Nenhum mock nem o espelho dos tokens fala em masterclass, e os cursos online não falam em certificado nem em encontro ao vivo.
- **Porte:** M
- **Testes:** 2. Mocks × manual: CA8. Auditoria: CA9 (mocks e espelho dos tokens).
- **Bloqueada por:** T1 (a lista do card pertence à oferta)
- **Arquivos prováveis:** `src/design-system/dados/` (conteúdo, validação de conteúdo), `src/design-system/mocks/conteudo.ts`, `src/design-system/tokens/index.ts`, `tests/fixtures/manual.ts`, `tests/dados/conteudo.spec.ts`
- **Cobre:** RF9, RF10, RF8 (conteúdo); CA8, CA9
- **Pronto quando:**
  - [ ] testes verdes; No Estúdio mantém "certificado de participação"
- **Status:** [ ] pendente

### T4 — Aviso de dado inválido no Storybook
- **Entrega:** no Storybook, uma story com mock de oferta ou de campanha inválido mostra o aviso e o conteúdo continua visível. Com o modo console, nenhum aviso aparece e o erro vai para o console.
- **Porte:** M
- **Testes:** 2 de DOM das stories: CA3 (aviso de oferta) e CA4 (aviso de campanha + modo console).
- **Bloqueada por:** T1, T2
- **Arquivos prováveis:** `src/design-system/dados/` (contexto e hook de validação), `src/design-system/atoms/AvisoDadoInvalido/`, `.storybook/preview.tsx`, stories de validação, `src/design-system/mocks/` (mocks inválidos), `tests/dados/aviso.spec.ts`
- **Cobre:** RF5; CA3 (aviso), CA4 (aviso e console)
- **Pronto quando:**
  - [ ] testes verdes; sem violação crítica no addon a11y; `pnpm build-storybook` verde
- **Status:** [ ] pendente

### T5 — Páginas de demonstração nos mocks e auditoria final
- **Entrega:** as páginas Black Friday e Submarcas mostram os valores oficiais e as fases da campanha 2026 a partir dos mocks, sem masterclass, certificado ou encontro ao vivo nos cursos online. Uma auditoria garante que nenhum valor de preço, parcela, porcentagem ou data fica fixo no DS fora dos mocks.
- **Porte:** G
- **Testes:** 1 de auditoria (CA12, com CA9 estendido às páginas de demonstração); snapshots visuais atualizados.
- **Bloqueada por:** T1, T2, T3
- **Arquivos prováveis:** `src/pages/verticals/blackFridayData.ts` (sai), `src/pages/verticals/BlackFriday.tsx`, `src/pages/verticals/Submarcas.tsx`, `src/pages/verticals/shared.tsx`, `tests/auditoria/dados.spec.ts`, `tests/visual/__snapshots__/`
- **Cobre:** RF8 (demonstração), RF10; CA9, CA12; objetivo do PRD
- **Pronto quando:**
  - [ ] suíte completa verde, `pnpm build` verde, PNGs revisados
- **Status:** [ ] pendente

## 8. Notas de implementação
| Data | Task | Nota (desvio, decisão nova, hipótese de bug confirmada) |
|---|---|---|
