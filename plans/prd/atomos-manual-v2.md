---
feature: atomos-manual-v2
status: aprovado
criado: 2026-10-23
atualizado: 2026-11-24
spec: plans/specs/0003-atomos-manual-v2.md
---

# PRD — Átomos do manual v2

## 1. Problema

O botão e a etiqueta do design system não seguem as medidas, os estados e a forma do manual v2. O botão ainda tem pílula e seta, e a etiqueta não tem as duas versões. Faltam peças pequenas que o manual define e que todos os componentes de oferta usam: card, selos de desconto e de garantia, marcador de lista, indicador de continuação e logo do curso.

## 2. Objetivo e métricas de sucesso

Objetivo: os átomos usados nas páginas dos cursos, na página "cursos" e na Black Friday seguem as fichas do manual (2 · 05.01 a 2 · 05.09) em todos os temas.

- Nenhum raio fora de 0, 16px ou círculo (R3). A pílula (999px) só existe na etiqueta das capas Hotmart, fora deste escopo.
- Typecheck, lint e build do Storybook sem erro.
- Nenhuma violação crítica no verificador de acessibilidade.

## 3. Usuários e contexto

- **Débora Gabrich**: aprova cada átomo no Storybook, em fundo claro e escuro.
- **Time de desenvolvimento e agentes de IA**: montam os componentes de oferta, prova e conteúdo com esses átomos.

## 4. Histórias de usuário

- **H1.** Como dev, quero um botão retangular de canto reto, sem seta, em três tamanhos (56, 48 e 44px), para usar nas páginas dos cursos, na página "cursos" e na Black.
- **H2.** Como dev, quero que o hover do botão troque só a cor de fundo, nunca o tamanho, para seguir o manual.
- **H3.** Como dev, quero um botão desabilitado sem preenchimento, com fio de 1px e texto na cor de desabilitado, para mostrar o estado inativo.
- **H4.** Como dev, quero uma variante do botão na cor de ação do curso e uma opção de largura total no celular, para os cards de preço e o combo.
- **H5.** Como dev, quero uma etiqueta de canto reto em duas versões (site/Black e peça da marca mãe), traçada quando sozinha e cheia quando houver duas ou mais em linha, para seguir o manual.
- **H6.** Como dev, quero um card com raio de 16px, fio de 1px e sem sombra, com foto que recorta no raio, para as páginas dos cursos.
- **H7.** Como dev, quero um selo de desconto quadrado ou em linha, que só aparece na Black, para destacar o 50%.
- **H8.** Como dev, quero um selo de garantia "7 dias de garantia", em linha ou quadrado, na cor do curso e nunca em ocre, para usar uma vez abaixo das ofertas.
- **H9.** Como dev, quero um marcador de lista redondo, uma numeração em disco e uma marcação de seleção em anel, para listas, combo e quiz.
- **H10.** Como dev, quero um indicador de continuação (disco traçado com seta), sempre menor que o disco de ação, para mostrar que a página continua.
- **H11.** Como dev, quero a logo de cada curso como imagem de uma cor só, que assume a cor do tema, para usar no combo, no quiz e na faixa.
- **H12.** Como Débora, quero ver o estado de foco de cada átomo marcado como "proposta", para saber o que ainda não aprovei.

## 5. Requisitos funcionais

| ID | Requisito | Prioridade | História |
|---|---|---|---|
| RF1 | Botão: alturas 56 / 48 / 44, padding 0 × 24 (pequeno 0 × 16), Manrope 600 em 14 / 13 / 12, caixa alta, 0,16em, raio 0, sem seta. | Obrigatório | H1 |
| RF2 | Botão: o hover troca só o fundo para o token de hover do tema; o tamanho nunca muda, nem ao toque. | Obrigatório | H2 |
| RF3 | Botão desabilitado: sem preenchimento, fio 1px e texto na cor de desabilitado. | Obrigatório | H3 |
| RF4 | Botão: variante na cor de ação do curso e opção de largura total no celular. | Obrigatório | H4 |
| RF5 | Etiqueta: Space Mono 9px, caixa alta, +0,08em, padding 4 × 8 (marca mãe em peça: 8 × 12, altura mínima 28), fio 1px, raio 0. Não é interativa. | Obrigatório | H5 |
| RF6 | Etiqueta: sozinha é traçada; cheia só com duas ou mais em linha. Gap de 4 (Black) ou 8 (marca mãe). | Obrigatório | H5 |
| RF7 | Card: raio 16, padding 24 (32 em card de 6 colunas, 20 no celular), gap interno 12, fio 1px, sem sombra. No hover, o fio vira a cor do texto e o rótulo vira o acento, e nada se move. | Obrigatório | H6 |
| RF8 | Selo de desconto: quadrado 120 × 120 (mínimo 88), fio 1px ocre (preto no papel), número em Urbanist 600 44, rótulo em Space Mono 7,5; versão em linha com duas etiquetas cheias. Só aparece na Black. | Obrigatório | H7 |
| RF9 | Selo de garantia: texto "7 dias de garantia", em linha (ícone de 22, Space Mono 9, padding 12 × 16, fio 1px) ou quadrado (120 × 120, mínimo 88), na cor do curso, nunca ocre, raio 0. Até o ícone "aprovação" chegar, o selo usa um placeholder no lugar dele. | Obrigatório | H8 |
| RF10 | Marcador: ponto de 7px no acento, gap de 8; disco numerado de 20px com Space Mono 9; seleção em anel de 20px com fio de 1,5px e ponto de 8px quando marcado. O anel é visual; a área clicável de 44px é a linha/rótulo do componente que o usa (quiz, combo). | Obrigatório | H9 |
| RF11 | Indicador de continuação: 30 mínimo / 38 padrão / 44 em capa, fio 1px, seta 1,4px; no hover, fio e seta no acento; desabilitado na cor de desabilitado. Área clicável de 44px em todos os tamanhos, sem mudar o desenho. | Obrigatório | H10 |
| RF12 | Logo do curso (Luz na Prática, Mais que um Click, Antes da Foto e No Estúdio) em máscara de uma cor, que lê a cor do tema; arquivos de `../manual-vigente/assets/`. | Obrigatório | H11 |
| RF13 | Os estados de foco (contorno de 2px na cor do texto, afastado 2px) aparecem documentados como "proposta". | Obrigatório | H12 |
| RF14 | Todos os átomos funcionam nos 10 temas. | Obrigatório | H1–H11 |

## 6. Requisitos não funcionais

- Área clicável mínima de 44px nos elementos interativos.
- Foco visível no teclado em botão, card clicável e indicador de continuação.
- O botão não muda de tamanho em nenhum estado.

## 7. Fora de escopo

- O disco de ação das peças da marca mãe, que já existe e não muda neste trabalho.
- Componentes genéricos que o manual não cita.
- A etiqueta em pílula das capas de produto da Hotmart.

## 8. Critérios de aceitação

- **CA1 (RF1):** Dado o botão nos três tamanhos, quando medido, então tem 56 / 48 / 44px de altura, padding lateral 24 / 24 / 16, Manrope 600 em 14 / 13 / 12, caixa alta, raio 0 e nenhuma seta.
- **CA2 (RF2):** Dado o botão, quando passo o mouse ou toco, então só a cor de fundo muda para o token de hover do tema e o tamanho continua o mesmo.
- **CA3 (RF3):** Dado o botão desabilitado, quando exibido, então não tem preenchimento, tem fio de 1px e o texto está na cor de desabilitado.
- **CA4 (RF4):** Dado o botão na variante de ação do curso, quando exibido em cada tema de curso, então o fundo é a cor de ação do curso. Dado o botão com largura total, quando a tela tem menos de 768px, então ele ocupa a coluna toda.
- **CA5 (RF5, RF6):** Dado uma etiqueta sozinha, quando exibida, então é traçada, com fio de 1px, raio 0 e Space Mono 9px em caixa alta. Dadas duas ou mais em linha, então são cheias, com gap de 4 na Black e 8 na marca mãe.
- **CA6 (RF5):** Dado a etiqueta da marca mãe em peça, quando medida, então tem padding 8 × 12 e altura mínima de 28px.
- **CA7 (RF7):** Dado um card com foto, quando exibido, então a foto recorta no raio de 16, o fio tem 1px e não há sombra. No hover, o fio vira a cor do texto, o rótulo vira o acento e nada se move.
- **CA8 (RF7):** Dado o card, quando medido, então o padding é 24 (32 no card de 6 colunas, 20 abaixo de 768px) e o gap interno é 12.
- **CA9 (RF8):** Dado o selo de desconto, quando a fase da campanha não é da Black, então ele não aparece. Na Black, o quadrado mede 120 × 120 (mínimo 88), o fio é ocre (preto no papel) e a versão em linha tem duas etiquetas cheias.
- **CA10 (RF9):** Dado o selo de garantia em qualquer tema, nas versões em linha e quadrada, quando exibido, então o texto é "7 dias de garantia", o raio é 0, a cor não é ocre e, enquanto o ícone não chega, aparece o placeholder no lugar dele.
- **CA11 (RF10):** Dado uma lista, quando exibida, então os marcadores são pontos redondos de 7px no acento, com gap de 8. Dado um disco numerado, então tem 20px e Space Mono 9. Dado o anel de seleção, então tem 20px e fio de 1,5px, e o ponto de 8px aparece só quando marcado.
- **CA12 (RF11):** Dado o indicador de continuação, quando medido, então tem 30 / 38 / 44px, é menor que o menor disco de ação (52px) e a área clicável tem 44px. No hover, fio e seta ficam no acento. Desabilitado, ficam na cor de desabilitado.
- **CA13 (RF12):** Dado a logo de cada curso no tema claro e no escuro, quando exibida, então assume a cor do tema.
- **CA14 (RF13):** Dado o Storybook, quando vejo o estado de foco, então ele está marcado como "proposta".
- **CA15 (RF14):** Dado qualquer átomo, quando troco entre os 10 temas, então as cores seguem os tokens do tema.

## 9. Fluxos e interface

- Referência: manual 2 · 05.01 (botão), 2 · 05.02 (etiqueta), 2 · 05.03 (card), 2 · 05.06 (selo de desconto), 2 · 05.07 (selo de garantia), 2 · 05.08 (marcador), 2 · 05.09 (indicador de continuação) e 2 · 04 (forma).
- Estados documentados no Storybook: padrão, hover, desabilitado e foco (proposta), em fundo escuro e claro.

## 10. Dependências, restrições e riscos

- Depende de `fundamentos-manual-v2`.
- Restrição: um botão de acento por dobra.
- Restrição: os estados de foco estão EM APROVAÇÃO no manual (2 · 05). Eles entram como estão na proposta, marcados como "proposta", e podem mudar quando forem aprovados.
- Pendência: o ícone "aprovação" de 22px do selo de garantia ainda não existe no repositório. O selo usa um placeholder, e a troca pelo ícone final fica fora desta spec, como task avulsa.

## 11. Perguntas em aberto

- [ ] Não bloqueante: trocar o placeholder do selo de garantia pelo ícone "aprovação" de 22px quando o arquivo chegar (fora desta spec; task avulsa).

## 12. Decisões

| Data | Decisão | Motivo |
|---|---|---|
| 2026-10-23 | Manter a inversão do hover no botão do card de preço claro. | Resposta da Débora (pergunta 7). |
| 2026-10-23 | O botão não usa escala no toque. | O manual diz que o botão nunca muda de tamanho. |
| 2026-10-23 | Estados de foco entram como "proposta" (contorno 2px na cor do texto, afastado 2px). | Status do manual: EM APROVAÇÃO; confirmado pela Débora. |
| 2026-10-23 | Selo de garantia com placeholder no lugar do ícone até o arquivo chegar; troca no fim do projeto. | Definido pela Débora. |
| 2026-11-24 | Pílula fora deste PRD; R3 do `CONTEXT.md` intacta. | Pela ficha 2 · 04 do manual, ela só existe na etiqueta das capas Hotmart, que está fora de escopo. |
| 2026-11-24 | Indicador de continuação com área clicável de 44px sem mudar o desenho. | RNF de área mínima de 44px. |
| 2026-11-24 | Anel de seleção é só visual; a área de 44px fica na linha/rótulo do componente que o usa. | RNF de área mínima de 44px. |
| 2026-11-24 | Troca do ícone "aprovação" fora desta spec. | A feature não fica presa esperando o arquivo. |
