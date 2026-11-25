---
feature: campanha-e-navegacao
status: aprovado
criado: 2026-10-23
atualizado: 2026-11-25
spec: plans/specs/<NNNN>-campanha-e-navegacao.md
---

# PRD — Campanha e navegação

<!-- Separado de componentes-de-oferta em 2026-11-25. -->

## 1. Problema

As páginas dos cursos, a página "cursos" e a Black Friday precisam do contador, da faixa de fase, do cabeçalho e do rodapé que o manual define. Hoje esses componentes não existem no design system na versão do manual; os genéricos `Navbar` e `Footer` não seguem as fichas.

## 2. Objetivo e métricas de sucesso

Objetivo: contador, faixa de fase, cabeçalho e rodapé existem no design system, seguem as fichas do manual e mostram qualquer fase da campanha a partir dos dados recebidos.

- Nenhuma data dentro desses componentes.
- Nenhum raio fora de 0, 16px ou círculo/pílula.
- Typecheck, lint e build do Storybook sem erro.
- Nenhuma violação crítica no verificador de acessibilidade.

## 3. Usuários e contexto

- **Débora Gabrich**: aprova os componentes no Storybook, com mocks, em todos os temas e fases.
- **Time de desenvolvimento e agentes de IA**: usam esses componentes nas páginas de demonstração e, depois, nas páginas de venda.
- **Comprador final** (indireto).

## 4. Histórias de usuário

- **H1.** Como comprador, quero um contador nas janelas antes da abertura e na última semana, para saber quanto tempo falta.
- **H2.** Como Débora, quero que o contador só apareça nas fases lista de espera, última semana e últimas 24h, com as datas recebidas no dado (no mock: 17.10–31.10 e 21.11–27.11), e que nas últimas 24h os dias saiam e entrem os segundos, para seguir a estratégia da campanha.
- **H3.** Como dev, quero uma faixa de fase no topo que mostre a etiqueta da fase e o contador (ou as datas, fora das janelas do contador), para indicar a fase da Black.
- **H4.** Como dev, quero um cabeçalho fixo com a logo do curso à esquerda e um botão pequeno à direita, igual com e sem Black, para todas as páginas.
- **H5.** Como dev, quero um rodapé com logo, "um curso Débora Gabrich", contato e @deboragabrich, sem a linha "um curso" na página "cursos", para fechar as páginas.

## 5. Requisitos funcionais

| ID | Requisito | Prioridade | História |
|---|---|---|---|
| RF1 | Contador: números em Urbanist 600, rótulos em Space Mono 7,5, frase em Urbanist 900 em caixa alta, fio de 1px entre unidades, sempre com a frase e um botão; versão em linha para o cabeçalho. | Obrigatório | H1 |
| RF2 | O contador só aparece nas fases calculadas das datas recebidas (`faseDaCampanha`): "a black friday começa em" (lista de espera) e "o desconto de black friday acaba em" (última semana e últimas 24h). Nas últimas 24h, os dias saem e entram os segundos. | Obrigatório | H2 |
| RF3 | Faixa de fase: 36–40px, fundo preto, fio `--bf-fio-cinza`, etiqueta traçada ocre + frase + contador ocre nas janelas do contador; fora delas, a etiqueta da fase e as datas. | Obrigatório | H3 |
| RF4 | Cabeçalho: altura 72, logo do curso (altura 18; No Estúdio 20) como imagem, botão pequeno à direita, borda de 1px embaixo, fixo no topo, com a faixa de fase acima na Black. | Obrigatório | H4 |
| RF5 | Rodapé: padding 32 × 24, logo (altura 16; No Estúdio 20), assinatura em Space Mono 10, links em Manrope 13 com sublinhado no hover, borda de 1px em cima; na página "cursos", logo da Débora Gabrich e sem a linha "um curso". | Obrigatório | H5 |
| RF6 | Todas as datas exibidas vêm dos dados recebidos (`dados-dinamicos-e-mocks`). | Obrigatório | H1–H3 |

## 6. Requisitos não funcionais

- Contador acessível pela convenção ARIA do W3C: rotulado apenas como "contador", sem anunciar os números.
- Os componentes funcionam em celular e desktop e nos temas escuro e claro de cada curso.

## 7. Fora de escopo

- Os componentes genéricos `Navbar` e `Footer` que já existem, que ficam como estão.
- Card de preço e combo (`componentes-de-oferta`); formulário (`lista-de-espera`).

## 8. Critérios de aceitação

- **CA1 (RF1, RF2):** Dada uma data entre a abertura e o início da última semana, quando o contador é chamado, então ele não aparece.
- **CA2 (RF2):** Dada uma data nas últimas 24h, quando o contador é exibido, então não há dias e há segundos.
- **CA3 (RF3):** Dada a fase aberta, quando a faixa é exibida, então mostra a etiqueta da fase e as datas, sem contador.
- **CA4 (RF3):** Dada a fase última semana, quando a faixa é exibida, então mostra a etiqueta, a frase "o desconto de black friday acaba em" e o contador.
- **CA5 (RF4):** Dado o cabeçalho na Black, quando rolo a página, então o cabeçalho e a faixa ficam fixos no topo.
- **CA6 (RF5):** Dado o rodapé na página "cursos", quando exibido, então a logo é a da Débora Gabrich e a linha "um curso" não aparece.
- **CA7 (RF1):** Dado um leitor de tela, quando ele chega ao contador, então anuncia apenas "contador", sem ler os números.
- **CA8 (RF6):** Dado o código desses componentes, quando procuro datas, então não encontro nenhuma.

## 9. Fluxos e interface

- Referências: manual 2 · 05.10 (cabeçalho), 2 · 05.11 (rodapé), 2 · 05.14 (contador), aba 05 (fases da Black); protótipos `Faixa Black Friday.dc.html`, `AdF Faixa Fase.dc.html`.
- Estados do contador: lista de espera, última semana, últimas 24h, fora das janelas (não aparece).

## 10. Dependências, restrições e riscos

- Depende de `fundamentos-manual-v2`, `dados-dinamicos-e-mocks` (`faseDaCampanha`) e `atomos-manual-v2`.

## 11. Perguntas em aberto

(nenhuma)

## 12. Decisões

| Data | Decisão | Motivo |
|---|---|---|
| 2026-10-23 | Contador rotulado apenas como "contador" (convenção ARIA do W3C), sem anunciar números. | Definido pela Débora. |
| 2026-11-25 | As janelas do contador vêm das fases calculadas a partir das datas do dado; as datas da H2 são só as do mock. | R16, R17. |
