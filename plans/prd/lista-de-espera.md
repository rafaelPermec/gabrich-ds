---
feature: lista-de-espera
status: aprovado
criado: 2026-10-23
atualizado: 2026-11-25
spec: plans/specs/<NNNN>-lista-de-espera.md
---

# PRD — Formulário de lista de espera

<!-- Separado de componentes-de-oferta em 2026-11-25. -->

## 1. Problema

As páginas dos cursos fora de venda e a Black Friday precisam do formulário de lista de espera que o manual define (2 · 05.15). Hoje ele não existe no design system na versão do manual.

## 2. Objetivo e métricas de sucesso

Objetivo: o formulário de lista de espera existe no design system, segue a ficha do manual e mostra todos os estados de campo sem vermelho.

- Nenhum raio fora de 0, 16px ou círculo/pílula.
- Typecheck, lint e build do Storybook sem erro.
- Nenhuma violação crítica no verificador de acessibilidade.

## 3. Usuários e contexto

- **Débora Gabrich**: aprova o formulário no Storybook, com mocks, em todos os temas e estados.
- **Time de desenvolvimento e agentes de IA**: usam o formulário nas páginas de demonstração e, depois, nas páginas reais.
- **Comprador final** (indireto).

## 4. Histórias de usuário

- **H1.** Como comprador, quero me cadastrar na lista de espera com nome, e-mail, WhatsApp opcional e, na Black, o interesse, para ser avisado da abertura.
- **H2.** Como comprador, quero ver erro de formulário sem vermelho, com mensagem abaixo do campo, para corrigir.

## 5. Requisitos funcionais

| ID | Requisito | Prioridade | História |
|---|---|---|---|
| RF1 | Formulário de lista de espera: campos nome, e-mail e WhatsApp (opcional) e, na Black, interesse (opções: Antes da Foto, Luz na Prática, Mais que um Click e "ainda não sei", com mais de uma marcação permitida); rótulo sempre visível acima do campo; campo com altura 48 e canto reto; botão de largura total com estado "enviando…"; consentimento numa linha, sem caixa pré-marcada. | Obrigatório | H1 |
| RF2 | Estados do campo: padrão (fio 1px `--fio-card`, placeholder em `--texto-apoio`), foco (fio 1px no acento; preto no papel), erro (fio 2px na cor do texto + mensagem abaixo, em Manrope 12, em tom de conversa, dizendo como resolver, sem vermelho), válido (confirmação em Space Mono no acento) e desabilitado. | Obrigatório | H2 |

## 6. Requisitos não funcionais

- O formulário funciona por teclado; a mensagem de erro é ligada ao campo (anunciada pelo leitor de tela).
- Funciona em celular e desktop e nos temas escuro e claro de cada curso.

## 7. Fora de escopo

- Enviar o formulário. Formulários e lista de espera ficam na Hotmart, e os e-mails saem pelo Hotmart Send (manual 5 · C04 e C05). Nas demonstrações, o formulário só simula o envio.
- A página de obrigado.

## 8. Critérios de aceitação

- **CA1 (RF1):** Dado o formulário da Black, quando exibido, então tem os campos nome, e-mail, WhatsApp (opcional) e interesse, com as quatro opções e mais de uma marcação possível, e o consentimento não vem pré-marcado.
- **CA2 (RF1):** Dado o formulário fora da Black, quando exibido, então não tem o campo interesse.
- **CA3 (RF2):** Dado um e-mail inválido, quando envio, então o campo fica com fio de 2px na cor do texto e a mensagem aparece abaixo, dizendo como resolver, sem vermelho. Dado um e-mail válido, então aparece a confirmação em Space Mono no acento.
- **CA4 (RF1):** Dado um formulário válido, quando envio na demonstração, então o botão mostra "enviando…" e fica desabilitado durante o envio simulado.

## 9. Fluxos e interface

- Referências: manual 2 · 05.15 (formulário), 5 · C04 e C05; protótipo `Lista Espera BF Pagina - Manual v2.dc.html`.
- Estados do formulário: padrão, foco, erro, válido, enviando, desabilitado.
- O formulário pede só nome, e-mail, WhatsApp (opcional) e, na Black, interesse: "nunca pedir mais que isso na lista" (5 · C05).

## 10. Dependências, restrições e riscos

- Depende de `fundamentos-manual-v2` e `atomos-manual-v2`.
- Risco: a página de lista de espera da Black (5 · C04) está EM APROVAÇÃO no manual. O formulário segue a ficha 2 · 05.15; a página em si não entra (R1).

## 11. Perguntas em aberto

(nenhuma)

## 12. Decisões

| Data | Decisão | Motivo |
|---|---|---|
| 2026-10-23 | O envio do formulário fica fora do design system. | Formulários na Hotmart e e-mails pelo Hotmart Send (5 · C05). |
| 2026-10-23 | Opções do campo "interesse": Antes da Foto, Luz na Prática, Mais que um Click e "ainda não sei", com mais de uma marcação. | Definido pela Débora. |
