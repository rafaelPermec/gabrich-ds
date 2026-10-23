---
feature: documentacao-manual-v2
status: rascunho
criado: 2026-10-23
atualizado: 2026-10-23
spec: plans/specs/<NNNN>-documentacao-manual-v2.md
---

# PRD — Documentação e páginas de demonstração

## 1. Problema

A documentação do design system ainda aponta para o manual antigo. O AGENTS.md diz "raio só 0 ou 9999px" e cita um arquivo de marca que foi removido. O Storybook troca entre "portfolio / document / course / blackfriday", e não entre os temas do manual. As páginas de demonstração (Verticais, Submarcas e Black Friday) mostram preços errados e produtos que não existem. Quem abre o design system, pessoa ou agente de IA, aprende regras que não valem mais.

## 2. Objetivo e métricas de sucesso

Objetivo: a documentação, o Storybook e as páginas de demonstração refletem o Manual Final 2026 · VIGENTE v2 e servem para a Débora validar e aprovar o design system.

- Nenhum raio fora de 0, 16px ou círculo/pílula.
- Typecheck, lint e build do Storybook sem erro.
- Nenhuma violação crítica no verificador de acessibilidade.
- Nenhuma menção a masterclass, nem ao manual antigo como referência.

## 3. Usuários e contexto

- **Débora Gabrich**: valida o design system pelo Storybook e pelas páginas de demonstração publicadas na Vercel.
- **Time de desenvolvimento e agentes de IA**: leem o AGENTS.md e a Introdução antes de mexer no código.
- Contexto: o design system é publicado só como documentação e Storybook na Vercel.

## 4. Histórias de usuário

- **H1.** Como agente de IA, quero um AGENTS.md com as regras vigentes, para não seguir regras antigas.
- **H2.** Como dev, quero uma Introdução que diga que o manual vigente é a fonte da verdade, para saber o que fazer quando houver dúvida.
- **H3.** Como Débora, quero trocar no Storybook entre os 10 temas do manual, para validar cada componente em cada identidade.
- **H4.** Como Débora, quero escolher no Storybook a fase da campanha (normal, lista de espera, aberta, última semana, últimas 24h, encerrada), para ver como os componentes mudam em cada fase.
- **H5.** Como Débora, quero páginas de demonstração da marca mãe, de cada submarca e da Black Friday montadas com os componentes novos e os mocks, para aprovar o conjunto.
- **H6.** Como Débora, quero ver o status de cada componente (APROVADO, EM APROVAÇÃO, PENDENTE) como no manual, para saber o que ainda pode mudar.
- **H7.** Como dev, quero que cada componente novo tenha story com todos os estados e as versões clara e escura, para testar sem montar uma página.

## 5. Requisitos funcionais

| ID | Requisito | Prioridade | História |
|---|---|---|---|
| RF1 | O AGENTS.md é reescrito com o escopo atual: manual vigente como fonte da verdade, tokens e temas novos, regra de raio de três valores, dados dinâmicos com mocks e a regra de não usar a Balgin como fonte. | Obrigatório | H1 |
| RF2 | A Introdução e a página de Fundamentos apontam para o Manual Final 2026 · VIGENTE v2. | Obrigatório | H2 |
| RF3 | O seletor principal de tema do Storybook tem os 10 temas do manual. Os temas antigos (portfolio, document, course, blackfriday) saem do seletor; os componentes genéricos continuam com a aparência atual. | Obrigatório | H3 |
| RF4 | O Storybook tem um seletor de fase da campanha, que troca as datas do mock. | Obrigatório | H4 |
| RF5 | As páginas de demonstração Verticais, Submarcas e Black Friday usam os componentes novos e os mocks, sem preço ou texto fixo. | Obrigatório | H5 |
| RF6 | Cada componente novo mostra no Storybook o status do manual (APROVADO, EM APROVAÇÃO, PENDENTE). O status fica registrado num arquivo único de status no repositório, que o Storybook lê; quando algo é aprovado no manual, só esse arquivo muda. | Obrigatório | H6 |
| RF7 | Cada componente novo tem story com todos os estados do manual, em fundo escuro e claro. | Obrigatório | H7 |
| RF8 | Nenhum texto da documentação ou das demonstrações menciona masterclass. | Obrigatório | H5 |

## 6. Requisitos não funcionais

- O build publica o app de documentação e o Storybook juntos na Vercel.
- O verificador de acessibilidade do Storybook roda em todos os componentes novos.

## 7. Fora de escopo

- As páginas de venda reais (página "cursos", páginas de cada curso e Black Friday).
- Stories novas para os componentes genéricos que ficam como estão.
- Prazo de entrega.

## 8. Critérios de aceitação

- **CA1 (RF1):** Dado o AGENTS.md, quando um agente lê as regras de raio, então encontra os três valores (0, 16px e círculo/pílula) e onde cada um vale.
- **CA2 (RF2):** Dada a Introdução, quando leio a fonte da verdade, então ela é o Manual Final 2026 · VIGENTE v2.
- **CA3 (RF3):** Dado o Storybook, quando abro o seletor de tema, então vejo os 10 temas do manual e não vejo portfolio, document, course nem blackfriday. Dado um componente genérico, então ele aparece como hoje.
- **CA4 (RF4):** Dado o seletor de fase em "últimas 24h", quando vejo o contador, então ele mostra horas, minutos e segundos, sem dias.
- **CA5 (RF5):** Dada a página de demonstração da Black Friday, quando procuro valores no código dela, então não encontro preço ou data fixos.
- **CA6 (RF6):** Dada a story do quiz Black Friday, quando abro, então ela aparece como EM APROVAÇÃO. Quando mudo o status no arquivo de status, a story mostra o novo status.
- **CA7 (RF7):** Dado o card de preço no Storybook, quando abro as stories, então vejo todos os cursos nas versões normal e Black, em fundo escuro e claro.
- **CA8 (RF8):** Dado o repositório, quando procuro "masterclass", então não encontro.

## 9. Fluxos e interface

- Referências: manual, aba 02 Dev (status de aprovação e fichas).
- Páginas de demonstração publicadas na Vercel junto com o Storybook.

## 10. Dependências, restrições e riscos

- Depende de todas as outras entregas: `fundamentos-manual-v2`, `dados-dinamicos-e-mocks`, `atomos-manual-v2`, `componentes-de-oferta`, `quiz-cursos`, `componentes-de-prova` e `componentes-de-conteudo`.
- Risco: o status de aprovação muda a cada aprovação no manual, e o Storybook precisa acompanhar.

## 11. Perguntas em aberto

(nenhum)

## 12. Decisões

| Data | Decisão | Motivo |
|---|---|---|
| 2026-10-23 | O design system é publicado só como documentação e Storybook na Vercel. | Confirmado com o Rafael (pergunta 8). |
| 2026-10-23 | O AGENTS.md é reescrito com o escopo atual. | Pedido da Débora. |
| 2026-10-23 | Temas antigos saem do seletor principal; o seletor passa a ter os 10 temas do manual. | Definido pela Débora. |
| 2026-10-23 | Status de aprovação num arquivo único de status lido pelo Storybook. | Não existe registro de status hoje; sugestão aceita pela Débora. |
