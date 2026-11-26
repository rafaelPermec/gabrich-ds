---
feature: componentes-de-oferta
status: concluída  # rascunho | aprovada | em implementação | concluída
prd: plans/prd/componentes-de-oferta.md
branch: feat/componentes-de-oferta
criado: 2026-11-25
atualizado: 2026-11-25
---

# Spec — Componentes de oferta

## 1. Resumo

Três peças novas sobre os átomos do manual: o `CardPreco` (um curso, normal ou Black, escuro ou claro), o grupo `CardsDePreco` (cards + selo de garantia único abaixo) e o `MonteSeuCombo` (seleção de 1 a 3 cursos com resumo). Os valores vêm do módulo de dados: o tipo `Oferta` fica como está e ganha um irmão, `OfertaPresencial`, para o No Estúdio; a escolha da oferta pela seleção é uma função pura nova, testada sem navegador. O combo substitui o simulador antigo da página de demonstração da Black. A prova fica em Playwright: funções puras, DOM das stories e a auditoria estática que já existe.

## 2. Estado atual

- **Dados de oferta**: o tipo `Oferta` cobre só os cursos online (`lp`, `mqc`, `adf`), com preço e parcela normal e da Black, `descontoCombo`, `descontoBlack`, ids e links de checkout. Funções puras: `resumoDePreco` (preço, parcela, preço separado, economia), `destinoDoCheckout` (link ou id), `formatarMoeda`, `formatarParcela` e `validarOferta`.
- **Mocks**: as 7 ofertas online e os preços normais por curso (`OFERTAS_MOCK`, `PRECOS_NORMAIS_MOCK`), fora do barrel (R24). Listas oficiais dos cards (`LISTAS_DO_CARD_MOCK`, tipo `ListaDoCard`), que já incluem o No Estúdio.
- **Sem No Estúdio no dado de oferta**: não há preço, parcela nem id de checkout do workshop.
- **Átomos prontos** (`atomos-manual-v2`): `Botao`, `Badge`/`Badges` (etiqueta), `Marcador` (`selecao` é só visual), `LogoCurso` (ids `lnp`/`mqc`/`adf`/`ne`; o dado usa `lp`), `SeloGarantia`, `SeloDesconto`, `AvisoDadoInvalido`.
- **Temas**: os 10 `data-tema` com os 12 tokens de componente. Não há token próprio do card de preço.
- **Simulador antigo** na página de demonstração da Black Friday, com preços e textos fora do manual.
- **Testes**: funções puras de dados (`tests/dados/oferta.spec.ts`), casos de tipo no typecheck (`tests/tipos/oferta.ts`), auditoria estática de valores fixos em `src/design-system` e `src/pages/verticals` (`tests/auditoria/dados.spec.ts`, que já cobre o CA11), DOM das stories (`tests/atomos/*`, helper `tests/atomos/storybook.ts`).
- **Protótipos**: `Cards de Preco.dc.html` (a linha "de R$ X por", com o X riscado, só aparece na Black), `Monte seu Combo.dc.html` (descritivo de uma linha por curso, ex.: "luz na prática · 27 aulas em vídeo"; o protótipo calcula a % do combo na tela, o DS não).

## 3. Decisões de implementação

- **D1. `OfertaPresencial` (RF14)**
  - Tipo novo, ao lado de `Oferta`: `slug`, `nome`, `curso: "ne"`, `preco`, `parcela?`, `checkout: IdCheckout`, `link?`. Sem campos de Black: o typecheck impede o card Black do No Estúdio (CA3).
  - `validarOfertaPresencial` (mesmas regras de número positivo e `#checkout-<slug>`) e `destinoDoCheckout` aceita as duas ofertas.
  - Mock `OFERTA_NO_ESTUDIO_MOCK`: 1.547 à vista, 12x 160, `#checkout-no-estudio` (protótipo `NE Pagina - Manual v2`).
  - `Oferta` não muda: nenhum consumidor nem caso de tipo quebra.
- **D2. `ofertaDaSelecao(ofertas, cursos)` (RF7)**
  - Função pura: devolve a oferta cujos `cursos` são exatamente o conjunto marcado (qualquer ordem), ou `undefined` (nada marcado ou oferta ausente no dado).
  - O resumo usa `resumoDePreco` e as % prontas (`descontoCombo` fora da Black, `descontoBlack` na Black). Nenhuma % é calculada (R16, R17).
- **D3. Tokens do card de preço (RF2)**
  - O card aplica o próprio `data-tema` (`<curso>` ou `<curso>-claro`), também na Black (CA1: cores do curso).
  - Na T2, a tabela de 2 · 05.05b é comparada com os 12 tokens de cada tema. Papel que coincide usa o token do tema. Papel que diverge (fonte do preço, marcador, botão etc.) vira token próprio do card, declarado em cada `data-tema` em `src/index.css` e espelhado em `tokens/` (área protegida: o diff vai ao usuário antes de gravar).
  - Fonte do preço por curso (Parkinsans no adf, Montserrat no lp e no mqc, conforme a ficha) também como token.
- **D4. `CardPreco` (RF1–RF5, RF12, RF14)**
  - Props: `oferta: Oferta | OfertaPresencial`, `lista: readonly string[]`, `blackFriday?: boolean` com `descontoDaCampanha: number` (só com `Oferta`, por sobrecarga de tipo; curso único conferido na validação), `claro?: boolean`. O curso vem da oferta. O "50%" da etiqueta e do botão chega em `descontoDaCampanha` (R16, R17; T2).
  - Ordem: logo · tipo · etiqueta da Black · "de R$ X por" (só na Black, X riscado = preço normal) · `12x R$ Y` · `ou R$ Z à vista` · fio · lista (`Marcador` ponto) · `Botao` · "PAGAMENTO SEGURO · GARANTIA DE 7 DIAS".
  - Tipo: "CURSO ONLINE" (lp, mqc), "E-BOOK" (adf), "WORKSHOP FOTOGRAFIA DE PRODUTOS" (ne), seguido no ne da linha "VAGAS LIMITADAS PARA O WORKSHOP PRESENCIAL" no acento, no lugar da etiqueta da Black (manual e protótipo; T2).
  - Etiqueta da Black: `Badges` com "-50%" no acento + "BLACK FRIDAY" em preto (RF4, valor aprovado no manual).
  - Botão: normal "quero o e-book" (adf), "quero o curso" (lp, mqc), "quero me inscrever no workshop" (ne); Black "garantir com 50%". É um link (`<a>` com a aparência do `Botao`) para `destinoDoCheckout`.
  - Raio `--raio-card`; botão e etiqueta retos. Botão com altura mínima 60 (protótipo); hover (proposta) inverte para `--card-preco-texto` com texto `--card-preco-fundo`.
  - No Estúdio com centavos ("R$ 1.547,00"): `formatarMoedaComCentavos` e `formatarParcelaComCentavos`, irmãs das funções atuais (a assinatura delas não muda).
- **D5. `CardsDePreco` (RF6)**: contêiner dos cards; renderiza um único `SeloGarantia` abaixo do último, a 32px (`--esp-8`), centralizado. O `CardPreco` nunca leva selo.
- **D6. `MonteSeuCombo` (RF7–RF11)**
  - Props: `cursoDaPagina: CursoOnline`, `blackFriday?`, `ofertas: readonly Oferta[]`, `precosNormais: PrecosNormaisDosCursos`, `descritivos: Readonly<Record<CursoOnline, string>>` (mock novo com as linhas do protótipo).
  - Ordem dos itens: o curso da página primeiro, marcado; depois os outros na ordem adf, lp, mqc (manual 2 · 05.12; T4).
  - Linha: `<label>` com `<input type="checkbox">` visualmente oculto, `Marcador` `selecao`, `LogoCurso` (altura 14) e descritivo em Manrope 12; a linha toda é o alvo, altura mínima 44, sem preço. Teclado: Tab e Espaço do próprio checkbox.
  - Resumo (região `aria-live="polite"`):
    - nada marcado: "marque pelo menos um curso." e botão desabilitado (`Botao disabled`, sem link);
    - fora da Black, 1 curso: só o preço; 2 ou 3: "preço separado", "desconto combo: X%", preço e "você economiza R$ X";
    - Black: "preço separado" riscado, "desconto combo + black friday −X%" (ou "desconto black friday −X%" com um curso), preço e "você economiza R$ X".
  - Botão: 1 curso fora da Black "quero o curso" (adf "quero o e-book"); 1 curso na Black "garantir com 50%" (adf "quero o e-book", decisão do PRD); 2 cursos "quero o combo"; 3 "quero o completo".
  - Oferta da seleção ausente no dado: `AvisoDadoInvalido` no lugar do resumo.
- **D7. Contrato público**: `CardPreco`, `CardsDePreco`, `MonteSeuCombo`, `OfertaPresencial`, `validarOfertaPresencial` e `ofertaDaSelecao` entram no barrel. `destinoDoCheckout` amplia o tipo do parâmetro (compatível).
- **D8. Stories**: CSF3 com `autodocs`; card: 4 cursos × normal/Black (sem Black no ne) × escuro/claro; grupo com três cards; combo: nada, 1, 2 e 3 itens × normal/Black, com `play` que marca os itens. Status de aprovação na descrição, como nos átomos.
- **D9. Demonstração da Black**: o `MonteSeuCombo` substitui o simulador antigo, com os mocks.

Alternativas descartadas:
- `Oferta` como união `OfertaOnline | OfertaPresencial` (sugestão do planejador): obriga a estreitar o tipo em `resumoDePreco` e em todo consumidor; o tipo separado não quebra nada.
- Resumo do combo com rótulos e % prontos no dado (`ResumoCombo`, sugestão do planejador): os rótulos são microtexto fixo do manual; as % já chegam em `descontoCombo` e `descontoBlack`.
- Card com prop `curso` separada da oferta (nota técnica antiga): duplicaria o dado e permitiria combinação inválida.

## 4. Seams de teste

| Seam | Tipo de teste | Cobre | Prior art no repo |
|---|---|---|---|
| Funções puras do módulo de dados (Playwright sem navegador) | Unidade: `ofertaDaSelecao`, `validarOfertaPresencial`, `destinoDoCheckout` | CA7, CA8 (valores), CA10, CA12 (dado) | `tests/dados/oferta.spec.ts` |
| Casos de tipo no typecheck | `@ts-expect-error`: card Black com `OfertaPresencial`, No Estúdio sem preço | CA3 | `tests/tipos/oferta.ts` |
| Story no Storybook + DOM (Playwright) | Integração: ordem dos elementos, raio, cores do tema, textos, `href`, clique na linha, resumo | CA1, CA2, CA4–CA10, CA12 | `tests/atomos/selos.spec.ts`, `tests/atomos/storybook.ts` |
| Auditoria estática de `src/` | Já existe: valores fixos, raio, fio, sombra, HEX. Os componentes novos entram sem teste novo | CA11, R3–R9, R29 | `tests/auditoria/dados.spec.ts`, `tests/auditoria/forma.spec.ts` |
| Addon a11y | Verificação nas stories, sem violação crítica | RNF | — |

Sem E2E no app de docs nem snapshots visuais novos: a Débora aprova o visual no Storybook.

## 5. Segurança e privacidade

Sem dados pessoais nem rede. Links de checkout chegam no dado; os reais estão fora de escopo. Mocks só em stories e na página de demonstração (R24).

## 6. Riscos técnicos e rollback

- **Tabela 2 · 05.05b × tokens dos temas**: se muitas cores divergirem, a T2 cresce. Mitigação: a comparação é o primeiro passo da T2 e o diff dos tokens vai ao usuário antes do código.
- **Textos do botão do combo**: o protótipo usa "quero garantir" no curso único; o PRD manda "quero o curso". O Antes da Foto sozinho fica com "quero o e-book" também fora da Black (decisão do usuário, 2026-11-25, igual ao RF3). Validar com a Débora no Storybook.
- **`LogoCurso` usa `lnp`, o dado usa `lp`**: mapa interno no card e no combo, sem mudar a prop pública do átomo.
- **Rollback**: cada task é um commit; a T1 só acrescenta tipos e funções.

## 7. Tasks (fatias verticais)

### T1 — Dado do No Estúdio e oferta da seleção
- **Entrega:** o módulo de dados tem `OfertaPresencial` com validação e mock do No Estúdio, `destinoDoCheckout` aceita as duas ofertas e `ofertaDaSelecao` acha a oferta de qualquer combinação dos três cursos.
- **Porte:** P
- **Testes:** 3 em `tests/dados/oferta.spec.ts` (seleção nas 7 combinações + vazio; validação do No Estúdio; destino do No Estúdio) e 2 casos em `tests/tipos/oferta.ts`
- **Bloqueada por:** nenhuma
- **Arquivos prováveis:** `src/design-system/dados/oferta.ts`, `src/design-system/dados/validacao.ts`, `src/design-system/mocks/ofertas.ts`, `src/design-system/index.ts`, `tests/dados/oferta.spec.ts`, `tests/tipos/oferta.ts`, `tests/fixtures/manual.ts`
- **Cobre:** RF13, RF14 · CA10, CA12 (dado)
- **Pronto quando:**
  - [x] Os testes estão verdes e `pnpm typecheck` passa sem mudar consumidores de `Oferta`.
- **Status:** [x] concluída

### T2 — Tokens e CardPreco dos quatro cursos
- **Entrega:** a Débora vê no Storybook o card de cada curso, normal e Black (sem Black no No Estúdio), escuro e claro, com o botão apontando para o checkout.
- **Porte:** G
- **Testes:** 4 em `tests/oferta/card-preco.spec.ts` (CA1 ordem/raio/cores, CA2, CA10 no card, CA12) e 1 caso em `tests/tipos/oferta.ts` (CA3)
- **Bloqueada por:** T1
- **Arquivos prováveis:** `src/index.css`, `src/design-system/tokens/index.ts`, `src/design-system/molecules/CardPreco/*`, `src/design-system/index.ts`, `tests/oferta/card-preco.spec.ts`, `tests/fixtures/manual.ts`
- **Cobre:** RF1–RF5, RF12, RF14 · CA1, CA2, CA3, CA10, CA12
- **Pronto quando:**
  - [x] Diff dos tokens do card aprovado pelo usuário antes do código.
  - [x] Os testes estão verdes; nenhuma violação crítica no a11y.
- **Status:** [x] concluída

### T3 — Grupo de cards com selo de garantia
- **Entrega:** três cards lado a lado (empilhados no celular) com um único selo de garantia abaixo do último, a 32px, centralizado.
- **Porte:** P
- **Testes:** 1 em `tests/oferta/card-preco.spec.ts` (CA4)
- **Bloqueada por:** T2
- **Arquivos prováveis:** `src/design-system/molecules/CardsDePreco/*`, `src/design-system/index.ts`, `tests/oferta/card-preco.spec.ts`
- **Cobre:** RF6 · CA4
- **Pronto quando:**
  - [x] O teste está verde; nenhum `CardPreco` contém selo.
- **Status:** [x] concluída

### T4 — Monte seu combo / Monte a sua Black Friday
- **Entrega:** o combo com os três cursos, o da página primeiro e marcado, linha inteira clicável por mouse e teclado, e o resumo em todos os estados, fora e dentro da Black.
- **Porte:** G
- **Testes:** 5 em `tests/oferta/combo.spec.ts` (CA5, CA6, CA7, CA8, CA9)
- **Bloqueada por:** T1
- **Arquivos prováveis:** `src/design-system/organisms/MonteSeuCombo/*`, `src/design-system/mocks/conteudo.ts`, `src/design-system/index.ts`, `tests/oferta/combo.spec.ts`
- **Cobre:** RF7–RF11, RF12, RF13 · CA5–CA9
- **Pronto quando:**
  - [x] Os testes estão verdes; nenhuma violação crítica no a11y; linha com 44px de altura mínima.
- **Status:** [x] concluída

### T5 — Combo no lugar do simulador da Black
- **Entrega:** a página de demonstração da Black Friday mostra o `MonteSeuCombo` com os mocks; o simulador antigo e o CSS dele saem.
- **Porte:** P
- **Testes:** nenhum novo (auditoria estática e typecheck existentes)
- **Bloqueada por:** T4
- **Arquivos prováveis:** `src/pages/verticals/BlackFriday.tsx`, `src/pages/verticals/BlackFriday.module.css`
- **Cobre:** decisão do PRD (simulador) · CA11
- **Pronto quando:**
  - [x] `pnpm typecheck`, `pnpm lint` e `tests/auditoria/` verdes; o simulador não existe mais no código.
- **Status:** [x] concluída

## 8. Notas de implementação
| Data | Task | Nota (desvio, decisão nova, hipótese de bug confirmada) |
|---|---|---|
| 2026-11-25 | Spec | Aprovada pelo usuário: tipo irmão `OfertaPresencial` (não a união sugerida pelo planejador), seams sem E2E nem snapshot novo, 5 tasks como estão, "quero o e-book" no Antes da Foto avulso do combo fora da Black. |
| 2026-11-25 | T1 | `validarOfertaPresencial` entra no barrel via `dados/index`, sem mexer em `src/design-system/index.ts`. `destinoDoCheckout` distingue as ofertas por `"checkoutBlack" in oferta`; no No Estúdio, `emBlack` é ignorado. Fixture `OFERTA_NO_ESTUDIO_MANUAL` do protótipo `NE Pagina - Manual v2`. |
| 2026-11-25 | T2 | Tokens `--card-preco-{fundo,fio,texto,apoio,marcador,botao,botao-texto,selo}` e fontes `--card-preco-fonte-{preco,a-vista,de-por,botao}`, `-botao-tracking`, `-botao-caixa` nos 8 temas dos cursos; primitivos novos `--lp-card-preco` (#2A241F) e `--adf-card-preco-claro` (#E6D6C6). Etiqueta "-50%" em `--card-preco-botao`/`--bf-preto`; "BLACK FRIDAY" em `--bf-preto`/`--bf-papel`. `--card-preco-selo` já declarado para a T3. |
| 2026-11-25 | T2 | Desvios aprovados pelo usuário: tipo do ne + linha de vagas (D4); `descontoDaCampanha` no card Black, porque a auditoria CA11 barra "50%" fixo; botão 60 e hover invertido (proposta); botão do adf em Manrope 600, porque a 2 · 06 só carrega até 600 (a tabela pede 700: perguntar à Débora); à vista do ne em Urbanist 600 (tabela), não 300 (protótipo). Espaçamentos do protótipo levados à escala `--esp-*` (R9). Marcadores travessão (adf) e triângulo (ne) desenhados no card; o `Marcador` ponto fica para lp e mqc. |
| 2026-11-25 | T2 | a11y: sem violação crítica; "serious color-contrast" no No Estúdio claro (terracota da linha de vagas sobre linho, cor do protótipo): levar à Débora. |
| 2026-11-25 | T3 | Layout em flex com quebra (base 400, máximo 460), não a grade `auto-fit` do protótipo: com máximo fixo, a grade conta colunas de 460 e quebra os três cards em 1440px. Selo na cor `--card-preco-selo` do tema da página, com recuo para `--selo-garantia` fora dos temas de curso (variável intermediária `--selo-do-grupo`, sem ciclo). Prop `formaDoSelo` (linha ou quadrado do átomo); o protótipo usa um quadro de 72px com texto ao lado, que não existe no 2 · 05.07. `data-selo-garantia` no átomo como seam de teste. Helpers `ofertaDoCursoMock` e `listaDoCardMock` nos mocks, usados pelas stories (revisão Padrões). |
| 2026-11-25 | T4 | Desvios aprovados pelo usuário, pelo manual 2 · 05.12 (APROVADO): ordem adf, lp, mqc depois do curso da página (não lp, mqc, adf); cabeçalho com título ("monte seu combo" / "monte a sua black friday"), subtítulo e etiqueta "-X% BLACK FRIDAY" na Black; resumo com "sua escolha", logos unidas por "+" (ordem mqc, lp, adf) e uma linha de inclusão por curso (prop `inclusos`, mock `INCLUSOS_COMBO_MOCK`; descritivos da linha em `DESCRITIVOS_COMBO_MOCK`). `descontoDaCampanha` no combo Black, como no card (CA11). Tokens `--combo-fonte-titulo`, `--combo-titulo-tracking`, `--combo-fonte-preco` em dg, lp, mqc e adf (escuro e claro), espelhados em `tokensCombo`; cores dos 12 tokens de componente. Botão ativo é `<a>` com as classes do `Botao` (ação, médio); desabilitado é o `Botao`. Grupo com `role="group"` (a etiqueta vem antes do título, o que a `legend` não permite). |
| 2026-11-25 | T4 | Propostas a validar com a Débora: "sua escolha" e "você economiza" na cor do texto em dg-claro, lp-claro e mqc-claro (acento claro sobre fundo claro); hover e foco da linha. a11y: sem violação crítica; "serious color-contrast" no Luz na Prática escuro (`--lp-areia` sobre `--lp-penumbra`, 4,36:1, cores do protótipo). Suíte completa: cada rodada falhou um teste diferente fora da T4 (`card-indicador` CA7, visual do `DataTable`), ambos verdes isolados: intermitência sob carga. |
| 2026-11-25 | T5 | O combo da demonstração fica no `data-tema` do curso da página (os tokens `--combo-*` existem só nos temas de curso e dg), não no `bfThemes.papel` sugerido pelo planejador; seletor "você está na página de" mantido, com `key` para reiniciar a seleção. Saem o `Simulator`, o `pacotePara` (completava com o pacote mais barato) e a sugestão de próximo curso; `.pageSwitch` passa a `--esp-2`. Texto do caso em `Verticals.tsx` atualizado. Suíte completa: 103 verdes. |
