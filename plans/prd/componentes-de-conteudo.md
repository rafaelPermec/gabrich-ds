---
feature: componentes-de-conteudo
status: rascunho
criado: 2026-10-23
atualizado: 2026-10-23
spec: plans/specs/<NNNN>-componentes-de-conteudo.md
---

# PRD — Componentes de conteúdo

## 1. Problema

As páginas dos cursos precisam mostrar o que a pessoa vai aprender: os módulos e as aulas do Luz na Prática e do Mais que um Click, e as páginas do e-book Antes da Foto. O manual define o padrão da lista de módulos e a página do Antes da Foto define o folheador e a prática animada, mas nada disso existe no design system.

## 2. Objetivo e métricas de sucesso

Objetivo: os componentes de conteúdo existem no design system, seguem o manual e mostram qualquer conteúdo recebido como dado.

- Nenhum raio fora de 0, 16px ou círculo/pílula.
- Typecheck, lint e build do Storybook sem erro.
- Nenhuma violação crítica no verificador de acessibilidade.

## 3. Usuários e contexto

- **Débora Gabrich**: aprova os componentes no Storybook, com mocks.
- **Time de desenvolvimento e agentes de IA**: usam os componentes nas páginas de demonstração.
- **Comprador final** (indireto): conhece o conteúdo do curso antes de comprar.

## 4. Histórias de usuário

- **H1.** Como comprador, quero ver a lista de módulos e, ao escolher um, as aulas dele, para entender o curso.
- **H2.** Como comprador no desktop, quero a lista à esquerda e o painel do módulo à direita, com o módulo 01 já aberto, para navegar rápido.
- **H3.** Como comprador no celular, quero a lista em acordeão, com um módulo aberto por vez, para ler sem sair do lugar.
- **H4.** Como Débora, quero que Luz na Prática e Mais que um Click usem o mesmo padrão, cada um com o visual do seu curso, para manter a consistência.
- **H5.** Como Débora, quero que a contagem siga cada curso: aulas de 01 a 27 no Luz na Prática; conteúdos que recomeçam em cada módulo no Mais que um Click, para refletir a estrutura real.
- **H6.** Como comprador do Antes da Foto, quero folhear páginas do e-book, para ver como ele é por dentro.
- **H7.** Como comprador do Antes da Foto, quero ver uma prática sendo preenchida, para entender como o e-book se usa.

## 5. Requisitos funcionais

| ID | Requisito | Prioridade | História |
|---|---|---|---|
| RF1 | Lista de módulos: etiqueta em Space Mono 12 ("CONTEÚDO DO CURSO · 27 AULAS" no Luz na Prática; "CONTEÚDO DO CURSO · 14 MÓDULOS · 67 CONTEÚDOS" no Mais que um Click), título em Montserrat com a palavra final em 700, e lista com número, nome e quantidade, com fio de 1px entre módulos. | Obrigatório | H1, H4 |
| RF2 | Painel do módulo: imagem 16:9, "MÓDULO [nº]" + quantidade e a lista de aulas ou conteúdos (número, título em Manrope 700 15 e uma linha de resumo em 14). | Obrigatório | H1 |
| RF3 | Desktop: lista à esquerda e painel à direita; o módulo 01 já selecionado; clicar ou passar o mouse troca o painel. | Obrigatório | H2 |
| RF4 | Abaixo de 720px de largura da seção: acordeão, um módulo aberto por vez, o 01 já aberto, botão redondo de 32px com "+" / "−" na cor de acento do curso. | Obrigatório | H3 |
| RF5 | Quantidade: "[nº] AULAS" no Luz na Prática; "[nº] CONTEÚDOS" no Mais que um Click ("1 CONTEÚDO" no singular). | Obrigatório | H5 |
| RF6 | Numeração: contínua de 01 a 27 no Luz na Prática; recomeça em 01 em cada módulo no Mais que um Click. | Obrigatório | H5 |
| RF7 | Mais que um Click: no módulo 12, os conteúdos agrupados em "PROJETO 01" e "PROJETO 02"; no módulo 14, a etiqueta "MATERIAL EXTRA" no lugar de "MÓDULO 14". | Obrigatório | H5 |
| RF8 | Folheador: página dupla no desktop e uma página por vez abaixo de 520px; avança por clique, pelas setas ou arrastando. | Obrigatório | H6 |
| RF9 | Prática animada: mostra as práticas 01 (pág. 26) e 09 (pág. 221) sendo preenchidas. | Obrigatório | H7 |
| RF10 | Módulos, aulas, páginas e práticas entram como dado. | Obrigatório | H1–H7 |
| RF11 | Com a preferência de movimento reduzido, a prática animada não anima e mostra direto a prática já preenchida. | Obrigatório | H7 |

## 6. Requisitos não funcionais

- O acordeão e o folheador funcionam pelo teclado.
- A prática animada respeita a preferência de movimento reduzido: sem animação, mostra direto a prática já preenchida.

## 7. Fora de escopo

- O cronograma do No Estúdio, que terá formato próprio e ainda está PENDENTE.
- Os capítulos do e-book na página do Antes da Foto, que continuam como estão.
- Os textos finais dos módulos, que estão EM APROVAÇÃO.

## 8. Critérios de aceitação

- **CA1 (RF1):** Dado o mock do Mais que um Click, quando a lista é exibida, então a etiqueta diz "CONTEÚDO DO CURSO · 14 MÓDULOS · 67 CONTEÚDOS".
- **CA2 (RF2):** Dado um módulo selecionado, quando vejo o painel, então ele mostra a imagem 16:9, o número do módulo, a quantidade e as aulas.
- **CA3 (RF3):** Dado o desktop, quando a lista abre, então o módulo 01 está selecionado. Quando passo o mouse no módulo 03, o painel mostra o 03.
- **CA4 (RF4):** Dada uma seção com menos de 720px, quando abro o módulo 02, então o 01 fecha.
- **CA5 (RF5):** Dado um módulo do Mais que um Click com um conteúdo, quando exibido, então aparece "1 CONTEÚDO".
- **CA6 (RF6):** Dado o Luz na Prática, quando vejo o módulo 02, então as aulas continuam a numeração do módulo 01.
- **CA7 (RF7):** Dado o módulo 14 do Mais que um Click, quando aberto, então a etiqueta é "MATERIAL EXTRA".
- **CA8 (RF8):** Dada uma largura abaixo de 520px, quando abro o folheador, então vejo uma página por vez.
- **CA9 (RF9):** Dado o mock das práticas, quando a animação roda, então mostra as práticas 01 e 09 sendo preenchidas.
- **CA10 (RF10):** Dado o código dos componentes, quando procuro nomes de módulos ou aulas, então não encontro nenhum.
- **CA11 (RF11):** Dada a preferência de movimento reduzido, quando a prática animada é exibida, então aparece já preenchida, sem animação.

## 9. Fluxos e interface

- Referências: manual 2 · 05.17 (módulos e conteúdos), página do Antes da Foto na aba 4 · 02 (folheador e prática animada).
- Estados do acordeão: fechado, aberto, foco.

## 10. Dependências, restrições e riscos

- Depende de `fundamentos-manual-v2` e `dados-dinamicos-e-mocks`.
- Risco: o layout da página do Antes da Foto está EM APROVAÇÃO; folheador e prática animada podem mudar.

## 11. Perguntas em aberto

(nenhum)

## 12. Decisões

| Data | Decisão | Motivo |
|---|---|---|
| 2026-10-23 | O folheador mostra uma página por vez abaixo de 520px. | Resposta da Débora (pergunta 7). |
| 2026-10-23 | Com movimento reduzido, a prática animada mostra direto a prática preenchida. | Definido pela Débora. |
