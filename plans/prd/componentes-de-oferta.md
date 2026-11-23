---
feature: componentes-de-oferta
status: rascunho
criado: 2026-10-23
atualizado: 2026-10-23
spec: plans/specs/<NNNN>-componentes-de-oferta.md
---

# PRD — Componentes de oferta

## 1. Problema

As páginas dos cursos, a página "cursos" e a Black Friday precisam de um conjunto de componentes de venda que o manual já define: card de preço, Monte seu combo / Monte a sua Black Friday, contador, faixa de fase, cabeçalho, rodapé e formulário de lista de espera. Hoje esses componentes não existem no design system, ou existem em versões antigas com preços fixos e textos errados, como o simulador antigo da página de demonstração da Black Friday.

## 2. Objetivo e métricas de sucesso

Objetivo: os componentes de oferta existem no design system, seguem as fichas do manual e mostram qualquer oferta e qualquer fase da campanha a partir dos dados recebidos.

- Nenhum preço, parcela, porcentagem ou data dentro desses componentes.
- Nenhum raio fora de 0, 16px ou círculo/pílula.
- Typecheck, lint e build do Storybook sem erro.
- Nenhuma violação crítica no verificador de acessibilidade.

## 3. Usuários e contexto

- **Débora Gabrich**: aprova os componentes no Storybook, com mocks, em todos os temas e fases.
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
- **H8.** Como comprador, quero um contador nas janelas antes da abertura e na última semana, para saber quanto tempo falta.
- **H9.** Como Débora, quero que o contador só apareça de 17.10 a 31.10 e de 21.11 a 27.11, e que nas últimas 24h os dias saiam e entrem os segundos, para seguir a estratégia da campanha.
- **H10.** Como dev, quero uma faixa de fase no topo que mostre a etiqueta da fase e o contador (ou as datas, fora das janelas do contador), para indicar a fase da Black.
- **H11.** Como dev, quero um cabeçalho fixo com a logo do curso à esquerda e um botão pequeno à direita, igual com e sem Black, para todas as páginas.
- **H12.** Como dev, quero um rodapé com logo, "um curso Débora Gabrich", contato e @deboragabrich, sem a linha "um curso" na página "cursos", para fechar as páginas.
- **H13.** Como comprador, quero me cadastrar na lista de espera com nome, e-mail, WhatsApp opcional e, na Black, o interesse, para ser avisado da abertura.
- **H14.** Como comprador, quero ver erro de formulário sem vermelho, com mensagem abaixo do campo, para corrigir.
- **H15.** Como dev, quero que o botão de cada oferta leve ao link (ou ao id) de checkout da oferta, para a compra funcionar.

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
| RF12 | Contador: números em Urbanist 600, rótulos em Space Mono 7,5, frase em Urbanist 900 em caixa alta, fio de 1px entre unidades, sempre com a frase e um botão; versão em linha para o cabeçalho. | Obrigatório | H8 |
| RF13 | O contador só aparece nas janelas da campanha recebidas: "a black friday começa em" (lista de espera) e "o desconto de black friday acaba em" (última semana e últimas 24h). Nas últimas 24h, os dias saem e entram os segundos. | Obrigatório | H9 |
| RF14 | Faixa de fase: 36–40px, fundo preto, fio #6B6156, etiqueta traçada ocre + frase + contador ocre nas janelas do contador; fora delas, a etiqueta da fase e as datas. | Obrigatório | H10 |
| RF15 | Cabeçalho: altura 72, logo do curso (altura 18; No Estúdio 20) como imagem, botão pequeno à direita, borda de 1px embaixo, fixo no topo, com a faixa de fase acima na Black. | Obrigatório | H11 |
| RF16 | Rodapé: padding 32 × 24, logo (altura 16; No Estúdio 20), assinatura em Space Mono 10, links em Manrope 13 com sublinhado no hover, borda de 1px em cima; na página "cursos", logo da Débora Gabrich e sem a linha "um curso". | Obrigatório | H12 |
| RF17 | Formulário de lista de espera: campos nome, e-mail e WhatsApp (opcional) e, na Black, interesse (opções: Antes da Foto, Luz na Prática, Mais que um Click e "ainda não sei", com mais de uma marcação permitida); rótulo sempre visível acima do campo; campo com altura 48 e canto reto; botão de largura total com estado "enviando…"; consentimento numa linha, sem caixa pré-marcada. | Obrigatório | H13 |
| RF18 | Estados do campo: padrão (fio 1px `--fio-card`, placeholder em `--texto-apoio`), foco (fio 1px no acento; preto no papel), erro (fio 2px na cor do texto + mensagem abaixo, em Manrope 12, em tom de conversa, dizendo como resolver, sem vermelho), válido (confirmação em Space Mono no acento) e desabilitado. | Obrigatório | H14 |
| RF19 | Todo botão de oferta leva ao link de checkout recebido ou, sem link, ao id de checkout da oferta. | Obrigatório | H15 |
| RF20 | Todos os valores exibidos (preços, parcelas, porcentagens, datas e listas) vêm dos dados recebidos (`dados-dinamicos-e-mocks`). | Obrigatório | H1–H10 |

## 6. Requisitos não funcionais

- O combo e o formulário funcionam por teclado; a linha do combo tem área clicável de no mínimo 44px.
- Contador acessível pela convenção ARIA do W3C: rotulado apenas como "contador", sem anunciar os números.
- Os componentes funcionam em celular e desktop e nos temas escuro e claro de cada curso.

## 7. Fora de escopo

- Enviar o formulário. Formulários e lista de espera ficam na Hotmart, e os e-mails saem pelo Hotmart Send (manual 5 · C04 e C05). Nas demonstrações, o formulário só simula o envio.
- A página de obrigado.
- Os 14 links reais de checkout.
- Os componentes genéricos `Navbar` e `Footer` que já existem, que ficam como estão.

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
- **CA10 (RF12, RF13):** Dada uma data entre a abertura e o início da última semana, quando o contador é chamado, então ele não aparece.
- **CA11 (RF13):** Dada uma data nas últimas 24h, quando o contador é exibido, então não há dias e há segundos.
- **CA12 (RF14):** Dada a fase aberta, quando a faixa é exibida, então mostra a etiqueta da fase e as datas, sem contador.
- **CA13 (RF15):** Dado o cabeçalho na Black, quando rolo a página, então o cabeçalho e a faixa ficam fixos no topo.
- **CA14 (RF16):** Dado o rodapé na página "cursos", quando exibido, então a logo é a da Débora Gabrich e a linha "um curso" não aparece.
- **CA15 (RF17):** Dado o formulário da Black, quando exibido, então tem os campos nome, e-mail, WhatsApp (opcional) e interesse, com as quatro opções e mais de uma marcação possível, e o consentimento não vem pré-marcado.
- **CA19 (RF12):** Dado um leitor de tela, quando ele chega ao contador, então anuncia apenas "contador", sem ler os números.
- **CA16 (RF18):** Dado um e-mail inválido, quando envio, então o campo fica com fio de 2px na cor do texto e a mensagem aparece abaixo, dizendo como resolver, sem vermelho. Dado um e-mail válido, então aparece a confirmação em Space Mono no acento.
- **CA17 (RF19):** Dada uma oferta sem link, quando clico no botão, então ele aponta para o id de checkout.
- **CA18 (RF20):** Dado o código dos componentes de oferta, quando procuro valores de preço ou data, então não encontro nenhum.

## 9. Fluxos e interface

- Referências: manual 2 · 05.05b (card de preço), 2 · 05.10 (cabeçalho), 2 · 05.11 (rodapé), 2 · 05.12 (combo), 2 · 05.14 (contador), 2 · 05.15 (formulário), aba 05 (fases da Black).
- Estados do combo: nada marcado, um item, dois itens, três itens; fora da Black e na Black.
- Estados do formulário: padrão, foco, erro, válido, enviando, desabilitado.
- O formulário pede só nome, e-mail, WhatsApp (opcional) e, na Black, interesse: "nunca pedir mais que isso na lista" (5 · C05).
- Estados do contador: lista de espera, última semana, últimas 24h, fora das janelas (não aparece).

## 10. Dependências, restrições e riscos

- Depende de `fundamentos-manual-v2`, `dados-dinamicos-e-mocks` e `atomos-manual-v2`.
- Restrição: as porcentagens do combo são fixas e chegam no dado; nunca são calculadas na tela.
- Risco: a página de lista de espera da Black (5 · C04) está EM APROVAÇÃO no manual.
- Restrição: os selos, etiquetas e botões dizem "50%", como aprovado no manual. A pendência 03 do manual ("mais de 50%" na estratégia) não muda os componentes.

## 11. Perguntas em aberto

(nenhum)

## 12. Decisões

| Data | Decisão | Motivo |
|---|---|---|
| 2026-10-23 | No combo, curso avulso fora da Black: botão "quero o curso". Antes da Foto na Black, no combo: "quero o e-book". | Resposta da Débora (pergunta 7). |
| 2026-10-23 | O Monte seu combo substitui o simulador antigo da página de demonstração da Black Friday. | Registrado no manual v2 (mudanças de 11.10.2026). |
| 2026-10-23 | Os componentes mantêm "50%" nos selos, etiquetas e botões. | Aprovado no manual; a pendência 03 manteve como está. |
| 2026-10-23 | O envio do formulário fica fora do design system. | Formulários na Hotmart e e-mails pelo Hotmart Send (5 · C05). |
| 2026-10-23 | Opções do campo "interesse": Antes da Foto, Luz na Prática, Mais que um Click e "ainda não sei", com mais de uma marcação. | Definido pela Débora. |
| 2026-10-23 | Contador rotulado apenas como "contador" (convenção ARIA do W3C), sem anunciar números. | Definido pela Débora. |
