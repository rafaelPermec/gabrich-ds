---
feature: fundamentos-manual-v2
status: rascunho
criado: 2026-10-23
atualizado: 2026-10-23
spec: plans/specs/<NNNN>-fundamentos-manual-v2.md
---

# PRD — Fundamentos do manual v2

## 1. Problema

Os tokens do design system ainda refletem o manual antigo. Só existem os raios 0 e pílula, falta o raio de 16px de card e foto, as cores têm nomes em inglês (`--color-ochre`) em vez dos nomes do manual (`--dg-ocre`), os temas são "portfolio / document / course / blackfriday", e não as cinco identidades em versão escura e clara, e uma fonte que saiu do manual (Archivo Narrow) continua carregada. Quem monta uma peça, a Débora ou o time, não consegue reproduzir o Manual Final 2026 · VIGENTE v2 sem interpretar.

## 2. Objetivo e métricas de sucesso

Objetivo: os fundamentos do design system (cor, tipografia, espaçamento, raio, fio e temas) correspondem um a um ao Manual Final 2026 · VIGENTE v2, aba 02 Dev, com os mesmos nomes de token.

- Nenhum raio fora de 0, 16px ou círculo/pílula em todo o repositório.
- Typecheck, lint e build do Storybook sem erro.
- Nenhuma violação crítica no verificador de acessibilidade do Storybook.
- 100% das cores aprovadas em 2 · 01 existem como token com o nome e o HEX do manual.

## 3. Usuários e contexto

- **Débora Gabrich**, dona da marca: valida no Storybook se cada token bate com o manual.
- **Time de desenvolvimento e agentes de IA**: usam os tokens para montar componentes e páginas de demonstração sem decidir cor, fonte ou medida.
- Contexto: o design system é publicado só como documentação e Storybook na Vercel. As páginas de venda reais estão fora deste trabalho.

## 4. Histórias de usuário

- **H1.** Como Débora, quero ver no Storybook todas as cores aprovadas de cada marca, com o nome e o HEX do manual, para conferir se nenhuma foi alterada.
- **H2.** Como dev, quero um tema por identidade (marca mãe, Luz na Prática, Mais que um Click, Antes da Foto, No Estúdio), cada um com versão escura e clara, para trocar a identidade de um componente sem mudar o componente.
- **H3.** Como dev, quero que todo componente use os mesmos tokens de componente do manual (`--fundo`, `--card`, `--fio-card`, `--texto`, `--texto-apoio`, `--acento`, `--botao`, `--botao-texto`, `--botao-hover`, `--desabilitado`, `--divisoria`, `--selo-garantia`) em qualquer tema, para não criar exceções por marca.
- **H4.** Como dev, quero tokens de tipografia por nível (as "subfontes") em cada marca, com família, peso, tamanho, entrelinha, tracking e caixa do manual, para usar a fonte certa sem precisar saber qual família cada marca usa.
- **H5.** Como Débora, quero que a Balgin só apareça nas logos, como SVG, e que os títulos usem Urbanist, para não publicar nada com a fonte demo.
- **H6.** Como dev, quero uma escala de espaçamento única em múltiplos de 4, para não inventar medidas.
- **H7.** Como dev, quero só três valores de raio (reto, 16px e círculo), com a regra de onde cada um vale, para não errar a forma.
- **H8.** Como dev, quero que o fio seja sempre de 1px e que não exista sombra, para manter a linguagem do manual.
- **H9.** Como dev, quero os estados de erro, aviso e sucesso nos temas das submarcas e da Black Friday sem vermelho, para seguir o manual.
- **H10.** Como Débora, quero que a Black Friday use o tema da marca mãe (`dg` no preto ou `dg-claro` no papel) com a camada da campanha, para a campanha ter a mesma base da marca.
- **H11.** Como dev, quero que toda cor do manual exista como token, inclusive as marcadas "uso a confirmar", para nunca escrever um HEX no código.
- **H12.** Como dev, quero que os componentes genéricos que ficam como estão continuem funcionando depois da troca dos tokens, para a refatoração não quebrar o que está fora do escopo.

## 5. Requisitos funcionais

| ID | Requisito | Prioridade | História |
|---|---|---|---|
| RF1 | Existe um token para cada cor de 2 · 01, com o prefixo da marca (`--dg-*`, `--ne-*`, `--lp-*`, `--mqc-*`, `--adf-*`, `--bf-*`) e o nome e o HEX do manual. | Obrigatório | H1 |
| RF2 | Existem os 10 temas do manual, selecionados por `data-tema`: `dg`, `dg-claro`, `lp`, `lp-claro`, `mqc`, `mqc-claro`, `adf`, `adf-claro`, `ne`, `ne-claro`. | Obrigatório | H2 |
| RF3 | Cada tema define os 12 tokens de componente de 2 · 01, com os valores do manual. | Obrigatório | H3 |
| RF4 | Existem tokens de tipografia por nível e por marca, conforme 2 · 02: marca mãe (título, linha de apoio, subtítulo/abertura, corpo, intertítulo, rótulo/numeração, botão, manuscrita), No Estúdio (H1, H2, H3, apoio, corpo, legenda), Luz na Prática (H1, H2, H3, corpo, legenda, preço), Mais que um Click (H1, H2, H3, corpo, preço), Antes da Foto (H1, H2, H3, corpo, rótulo, anotação) e Black Friday (número 50%, parcela, "de R$ X por", "ou R$ Z à vista", frase do contador, etiqueta, botão, corpo, lista do box, quiz). | Obrigatório | H4 |
| RF5 | A Balgin não é carregada como fonte em nenhum lugar. Títulos que seriam em Balgin usam Urbanist (900 no título, 300 na linha de apoio). O título BLACK FRIDAY e as logos entram como imagem. | Obrigatório | H5 |
| RF6 | As fontes carregadas são as de 2 · 06, só com os pesos de lá: Urbanist 300/600/700/900, Tenor Sans 400, Montserrat 200/300/600/700, Parkinsans 700, Manrope 300/400/600, Space Mono 400/700, Nothing You Could Do 400 e Black Mango 400 (arquivo próprio). A Archivo Narrow é removida. | Obrigatório | H4, H5 |
| RF7 | A escala de espaçamento é a de 2 · 03 (`--esp-1` a `--esp-24`: 4, 8, 12, 16, 24, 32, 48, 64 e 96px), mais container de 1240px, 12 colunas, gutter de 24px e dobra de 96px (desktop) e 64px (celular). | Obrigatório | H6 |
| RF8 | Existem só os raios de 2 · 03: `--raio-reto` (0), `--raio-card` (16px) e `--raio-disco` (50%). Nenhum outro valor aparece no código, nem na interface do app de documentação. | Obrigatório | H7 |
| RF9 | O fio é sempre de 1px (`--fio`) e não existe token de sombra. | Obrigatório | H8 |
| RF10 | Nos temas das submarcas e da Black Friday, erro, aviso e sucesso usam a cor do texto ou do acento, nunca vermelho. | Obrigatório | H9 |
| RF11 | A Black Friday usa o tema `dg` ou `dg-claro` com os tokens `--bf-*` da campanha. | Obrigatório | H10 |
| RF12 | Toda cor usada no design system é um token. Os tokens `--dg-grafite`, `--adf-cobre`, `--adf-linha` e `--adf-trama` são criados e usados onde o manual usa essas cores (temas `adf` e `adf-claro`, cards de preço). Cores que aparecem no manual sem token próprio (ex.: fundos de card de 2 · 05.05b) ganham um token. Nenhum HEX fica escrito fora da definição dos tokens. | Obrigatório | H11 |
| RF13 | Existe uma página de Fundamentos no Storybook com cores, temas, tipografia, espaçamento, raio e fio. | Obrigatório | H1, H2 |
| RF14 | Os componentes genéricos que ficam fora do escopo continuam funcionando, sem mudança visual, depois da troca dos nomes dos tokens. | Obrigatório | H12 |

## 6. Requisitos não funcionais

- Contraste: todo par texto/fundo de cada tema passa no verificador de acessibilidade do Storybook, sem violação crítica.
- Temas escuro e claro de cada marca funcionam em qualquer componente do manual.
- As fontes carregam só os pesos de 2 · 06.

## 7. Fora de escopo

- Mudar componentes genéricos que o manual v2 não cita (tabela de dados, barra lateral, filtros, paginação, navbar e outros). Eles ficam como estão.
- Comprar ou configurar a licença web da Balgin.
- A etiqueta em pílula (999px) das capas de produto da Hotmart, que não fazem parte do design system.
- Prazo de entrega.

## 8. Critérios de aceitação

- **CA1 (RF1):** Dado o manual 2 · 01, quando comparo cada cor com os tokens, então todas existem com o mesmo nome e o mesmo HEX.
- **CA2 (RF2):** Dado o Storybook, quando escolho qualquer um dos 10 temas, então os componentes trocam fundo, texto e acento para os valores do tema.
- **CA3 (RF3):** Dado qualquer tema, quando leio seus tokens de componente, então os 12 nomes de 2 · 01 estão definidos com os valores do manual.
- **CA4 (RF4):** Dado um nível tipográfico (ex.: preço do Luz na Prática), quando uso o token, então família, peso, tamanho, entrelinha e tracking são os de 2 · 02 (Montserrat 700, 36–48, 0,9, −0,02em).
- **CA5 (RF5):** Dado o carregamento de fontes, quando inspeciono a página, então nenhuma fonte Balgin é baixada.
- **CA6 (RF6):** Dado o carregamento de fontes, quando inspeciono a página, então a Archivo Narrow não é baixada, a Black Mango está disponível e só os pesos de 2 · 06 são pedidos.
- **CA7 (RF7):** Dado o código dos componentes do manual, quando procuro valores de espaçamento fora da escala, então não encontro nenhum.
- **CA8 (RF8):** Dado o repositório, quando procuro valores de raio, então só encontro 0, 16px e círculo/pílula.
- **CA9 (RF9):** Dado o código, quando procuro sombras e fios, então não há sombra, e todo fio simples tem 1px.
- **CA10 (RF10):** Dado um campo em erro num tema de submarca ou da Black, quando ele é exibido, então não há vermelho.
- **CA11 (RF11):** Dado o tema da Black Friday, quando o aplico, então a base é preto ou papel da marca mãe, com acento ocre.
- **CA12 (RF12):** Dado o código dos componentes, dos temas e das páginas de demonstração, quando procuro valores HEX fora da definição dos tokens, então não encontro nenhum.
- **CA13 (RF13):** Dado o Storybook, quando abro Fundamentos, então vejo cores, temas, tipografia, espaçamento, raio e fio.
- **CA14 (RF14):** Dado um componente genérico (ex.: tabela de dados), quando comparo antes e depois da refatoração, então ele aparece igual.

## 9. Fluxos e interface

- Referência: Manual Final 2026 · VIGENTE v2, aba 02 Dev, seções 2 · 01 (cor), 2 · 02 (tipografia), 2 · 03 (espaçamento, raio e fio), 2 · 04 (forma), 2 · 06 (fontes e licenças) e 2 · 08 (fontes e cores por marca).
- Página de Fundamentos no Storybook, com seletor de tema.

## 10. Dependências, restrições e riscos

- Fonte da verdade: o Manual Final 2026 · VIGENTE v2. Se algo divergir do código, vale o manual.
- Só entra o que está APROVADO no manual. O que está EM APROVAÇÃO pode mudar.
- Restrição: a Black Mango é usada apenas no No Estúdio. O subtítulo/abertura da marca mãe é Tenor Sans 400.
- Risco: trocar os nomes dos tokens pelos do manual mexe em tokens que os componentes genéricos usam (RF14).

## 11. Perguntas em aberto

(nenhum)

## 12. Decisões

| Data | Decisão | Motivo |
|---|---|---|
| 2026-10-23 | O escopo segue 100% o Manual Final 2026 · VIGENTE v2. | Ele é a fonte da verdade. |
| 2026-10-23 | Os nomes dos tokens são os do manual (`--dg-*`, `--esp-*`, `--raio-*`, `--fio`, `data-tema` e os tokens de componente). | Manual vigente, 2 · 01 e 2 · 03. |
| 2026-10-23 | A Balgin só é usada nas logos, como SVG. Títulos em Urbanist. | Combinado com a Débora; regra provisória de 2 · 06. |
| 2026-10-23 | As fontes primárias continuam as mesmas, organizadas em tokens por nível ("subfontes"), para validar o uso de cada uma. | Pedido da Débora. |
| 2026-10-23 | A Archivo Narrow sai. | Não existe mais no manual (2 · 06). |
| 2026-10-23 | Black Mango apenas no No Estúdio; subtítulo da marca mãe em Tenor Sans 400. | Definido pela Débora (2 · 06 e 2 · 08). |
| 2026-10-23 | Toda cor é token; os tokens "uso a confirmar" são criados e usados; nenhum HEX espalhado no código. | Definido pela Débora. |
| 2026-10-23 | Os nomes antigos dos tokens continuam só para os componentes genéricos. | Confirmado pela Débora. |
| 2026-10-23 | Componentes genéricos que o manual não cita ficam como estão. | Resposta da Débora (pergunta 3). |
