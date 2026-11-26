---
feature: componentes-de-oferta
status: implementado
criado: 2026-10-23
atualizado: 2026-11-25
spec: plans/specs/0004-componentes-de-oferta.md
---

# PRD — Componentes de oferta

## 1. Problema

As páginas dos cursos, a página "cursos" e a Black Friday precisam dos componentes de venda que o manual já define: card de preço e Monte seu combo / Monte a sua Black Friday. Hoje esses componentes não existem no design system, ou existem em versões antigas com preços fixos e textos errados, como o simulador antigo da página de demonstração da Black Friday.

Contador, faixa de fase, cabeçalho e rodapé ficaram em `campanha-e-navegacao`; o formulário de lista de espera, em `lista-de-espera`.

## 2. Objetivo e métricas de sucesso

Objetivo: o card de preço e o combo existem no design system, seguem as fichas do manual e mostram qualquer oferta, fora e dentro da Black, a partir dos dados recebidos.

- Nenhum preço, parcela ou porcentagem dentro desses componentes.
- Nenhum raio fora de 0, 16px ou círculo/pílula.
- Typecheck, lint e build do Storybook sem erro.
- Nenhuma violação crítica no verificador de acessibilidade.

## 3. Usuários e contexto

- **Débora Gabrich**: aprova os componentes no Storybook, com mocks, em todos os temas.
- **Time de desenvolvimento e agentes de IA**: usam esses componentes nas páginas de demonstração e, depois deste trabalho, nas páginas de venda.
- **Comprador final** (indireto): é quem vê esses componentes nas páginas reais. As páginas reais estão fora deste trabalho.

## 4. Histórias de usuário

- **H1.** Como dev, quero um card de preço para cada curso (Antes da Foto, Luz na Prática, Mais que um Click e No Estúdio), na versão normal e na Black, no fundo escuro e no claro, para fechar cada página com a oferta.
- **H2.** Como Débora, quero que todo card de preço tenha o mesmo conteúdo na mesma ordem, com o visual de cada curso, para as ofertas serem comparáveis.
- **H3.** Como Débora, quero que o No Estúdio só tenha card na versão normal, porque ele não entra na Black.
- **H4.** Como comprador, quero marcar os cursos que quero levar e ver na hora o preço da combinação, para montar minha compra.
- **H5.** Como Débora, quero que o curso da página venha primeiro e já marcado no combo, para o combo partir do curso que a pessoa está vendo.
- **H6.** Como comprador, quero ver o preço separado, o desconto e quanto economizo, para entender a vantagem do combo.
- **H7.** Como comprador, quando nada está marcado, quero ver "marque pelo menos um curso" e o botão desabilitado, para entender o que fazer.
- **H8.** Como dev, quero que o botão de cada oferta leve ao link (ou ao id) de checkout da oferta, para a compra funcionar.

## 5. Requisitos funcionais

| ID | Requisito | Prioridade | História |
|---|---|---|---|
| RF1 | Card de preço na ordem: logo · tipo · etiqueta da Black · "de R$ X por" · 12x R$ Y · ou R$ Z à vista · fio · lista · botão · linha "PAGAMENTO SEGURO · GARANTIA DE 7 DIAS". | Obrigatório | H1, H2 |
| RF2 | Card de preço com raio 16; botão e etiqueta retos; cores, fonte do preço, marcador e botão de cada curso conforme as tabelas de 2 · 05.05b (escuro e claro). | Obrigatório | H1, H2 |
| RF3 | Textos do botão: normal — Antes da Foto "quero o e-book", Luz na Prática e Mais que um Click "quero o curso", No Estúdio "quero me inscrever no workshop"; Black — "garantir com 50%". | Obrigatório | H1 |
| RF4 | Etiqueta da Black no card: "-50%" no acento do curso + "BLACK FRIDAY" em preto. Não aparece no No Estúdio. | Obrigatório | H1, H3 |
| RF5 | O No Estúdio não tem card na versão Black. | Obrigatório | H3 |
| RF6 | O selo de garantia não fica dentro do card: aparece uma vez, abaixo da última oferta, a 32px, centralizado. | Obrigatório | H2 |
| RF7 | Monte seu combo / Monte a sua Black Friday: um componente só, com três itens (Antes da Foto, Luz na Prática, Mais que um Click), em qualquer combinação; o curso da página primeiro e marcado. | Obrigatório | H4, H5 |
| RF8 | Linha do combo: anel de seleção de 20 + logo (altura 14) + descritivo em Manrope 12; a linha inteira é clicável, com altura mínima de 44; sem preço na lista. | Obrigatório | H4 |
| RF9 | Resumo fora da Black: com 2 ou 3 itens, mostra "preço separado", "desconto combo: X%", preço em 12x e à vista e "você economiza R$ X". Com 1 item, só o preço. | Obrigatório | H6 |
| RF10 | Resumo na Black: "preço separado" riscado, "desconto combo + black friday −X%" ("desconto black friday −X%" com curso único), preço em 12x e à vista e "você economiza R$ X". | Obrigatório | H6 |
| RF11 | Sem nada marcado: "marque pelo menos um curso." e botão desabilitado. | Obrigatório | H7 |
| RF12 | Todo botão de oferta leva ao link de checkout recebido ou, sem link, ao id de checkout da oferta. | Obrigatório | H8 |
| RF13 | Todos os valores exibidos (preços, parcelas, porcentagens e listas) vêm dos dados recebidos (`dados-dinamicos-e-mocks`). | Obrigatório | H1–H7 |
| RF14 | O dado de oferta inclui o No Estúdio, só na versão normal, com preço à vista, parcela e id de checkout; o mock usa os valores do protótipo do manual (`NE Pagina - Manual v2`: 12x R$ 160,00 ou R$ 1.547,00 à vista, `#checkout-no-estudio`). O card do No Estúdio não tem a linha "de R$ X por"; o tipo é "WORKSHOP FOTOGRAFIA DE PRODUTOS", seguido da linha "VAGAS LIMITADAS PARA O WORKSHOP PRESENCIAL" (manual e protótipo; decisão de 2026-11-25). | Obrigatório | H1, H3 |

## 6. Requisitos não funcionais

- O combo funciona por teclado; a linha do combo tem área clicável de no mínimo 44px.
- Os componentes funcionam em celular e desktop e nos temas escuro e claro de cada curso.

## 7. Fora de escopo

- Os 14 links reais de checkout.
- Contador, faixa de fase, cabeçalho e rodapé (`campanha-e-navegacao`).
- Formulário de lista de espera (`lista-de-espera`).
- Os componentes genéricos que já existem, que ficam como estão.

## 8. Critérios de aceitação

- **CA1 (RF1, RF2):** Dado o mock do Luz na Prática na Black, quando o card é exibido, então os elementos aparecem na ordem do manual, com raio 16 e as cores do Luz na Prática.
- **CA2 (RF3):** Dado o card do Antes da Foto fora da Black, quando exibido, então o botão diz "quero o e-book".
- **CA3 (RF4, RF5):** Dado o No Estúdio, quando a fase é Black, então não existe card da Black nem etiqueta "-50%".
- **CA4 (RF6):** Dado uma página com três cards, quando exibida, então há um único selo de garantia, abaixo do último card.
- **CA5 (RF7):** Dado o combo na página do Luz na Prática, quando aberto, então o Luz na Prática vem primeiro e marcado.
- **CA6 (RF8):** Dado uma linha do combo, quando clico em qualquer ponto dela, então o item é marcado ou desmarcado.
- **CA7 (RF9):** Dado Luz na Prática + Antes da Foto fora da Black, com o mock oficial, quando marcados, então o resumo mostra preço separado R$ 644, desconto combo 10%, R$ 577 e você economiza R$ 67.
- **CA8 (RF10):** Dado o Completo na Black, com o mock oficial, quando marcado, então o resumo mostra R$ 1.641 riscado, −57%, R$ 697 e você economiza R$ 944.
- **CA9 (RF11):** Dado nenhum curso marcado, quando vejo o resumo, então aparece "marque pelo menos um curso." e o botão está desabilitado.
- **CA10 (RF12):** Dada uma oferta sem link, quando clico no botão, então ele aponta para o id de checkout.
- **CA11 (RF13):** Dado o código dos componentes de oferta, quando procuro valores de preço ou porcentagem, então não encontro nenhum.
- **CA12 (RF14):** Dado o mock do No Estúdio, quando o card é exibido, então mostra 12x R$ 160,00 e R$ 1.547,00 à vista vindos do dado, sem a linha "de R$ X por", e o botão "quero me inscrever no workshop" aponta para `#checkout-no-estudio`.

## 9. Fluxos e interface

- Referências: manual 2 · 05.05b (card de preço), 2 · 05.12 (combo); protótipos `Cards de Preco.dc.html`, `Monte seu Combo.dc.html`, `NE Pagina - Manual v2.dc.html`.
- Estados do combo: nada marcado, um item, dois itens, três itens; fora da Black e na Black.

## 10. Dependências, restrições e riscos

- Depende de `fundamentos-manual-v2`, `dados-dinamicos-e-mocks` e `atomos-manual-v2`.
- Restrição: as porcentagens do combo são fixas e chegam no dado; nunca são calculadas na tela.
- Restrição: os selos, etiquetas e botões dizem "50%", como aprovado no manual. A pendência 03 do manual ("mais de 50%" na estratégia) não muda os componentes.
- RF14 estende o tipo de oferta de `dados-dinamicos-e-mocks` (hoje só cursos online): mudança em contrato público, tratada na spec.

## 11. Perguntas em aberto

(nenhuma)

## 12. Decisões

| Data | Decisão | Motivo |
|---|---|---|
| 2026-10-23 | No combo, curso avulso fora da Black: botão "quero o curso". Antes da Foto na Black, no combo: "quero o e-book". | Resposta da Débora (pergunta 7). |
| 2026-10-23 | O Monte seu combo substitui o simulador antigo da página de demonstração da Black Friday. | Registrado no manual v2 (mudanças de 11.10.2026). |
| 2026-10-23 | Os componentes mantêm "50%" nos selos, etiquetas e botões. | Aprovado no manual; a pendência 03 manteve como está. |
| 2026-11-25 | PRD original dividido em três: `componentes-de-oferta` (card, combo, selo), `campanha-e-navegacao` (contador, faixa, cabeçalho, rodapé) e `lista-de-espera` (formulário). | Sete componentes não cabem numa spec de até 5 tasks. |
| 2026-11-25 | O dado de oferta passa a incluir o No Estúdio (só versão normal), com os valores do protótipo do manual. | O card do No Estúdio precisa de preço vindo do dado (R16, R17). |
