---
feature: quiz-cursos
status: rascunho
criado: 2026-10-23
atualizado: 2026-10-23
spec: plans/specs/<NNNN>-quiz-cursos.md
---

# PRD — Quiz "qual curso é pra você"

## 1. Problema

Quem chega na página "cursos" ou na Black Friday não sabe qual curso combina com o próprio nível e objetivo. O manual define um quiz com 5 perguntas e regras de resultado, mas ele ainda não existe no design system. Sem ele, a pessoa precisa ler todas as páginas para decidir.

## 2. Objetivo e métricas de sucesso

Objetivo: o quiz do manual existe no design system nas versões permanente e Black Friday, com o mesmo resultado do protótipo para qualquer combinação de respostas.

- Resultado idêntico ao protótipo do manual nas 16.000 combinações de resposta.
- Nenhum raio fora de 0, 16px ou círculo/pílula.
- Typecheck, lint e build do Storybook sem erro.
- Nenhuma violação crítica no verificador de acessibilidade.

## 3. Usuários e contexto

- **Débora Gabrich**: aprova o quiz no Storybook nas duas versões.
- **Time de desenvolvimento e agentes de IA**: usam o quiz na página "cursos" e na Black Friday.
- **Comprador final** (indireto): responde ao quiz para descobrir o curso.

## 4. Histórias de usuário

- **H1.** Como comprador em dúvida, quero responder perguntas curtas sobre mim, para saber qual curso é o meu próximo passo.
- **H2.** Como comprador, quero ver uma pergunta por tela, com barra de progresso e contador "1 de 5", para saber quanto falta.
- **H3.** Como comprador, quero que escolher uma opção nas perguntas 1 a 4 já me leve para a próxima, para responder rápido.
- **H4.** Como comprador, quero marcar mais de uma opção na pergunta 5 e ver o resultado num botão, para responder com mais precisão.
- **H5.** Como comprador, quero voltar uma pergunta ou refazer o quiz, para corrigir uma resposta.
- **H6.** Como comprador, quero ver no resultado a etiqueta "O SEU PRÓXIMO PASSO", a capa do produto, o texto, o preço e o bloco "PARA IR ALÉM", para decidir a compra.
- **H7.** Como Débora, quero uma versão permanente (página "cursos", preço normal) e uma versão Black Friday (preços da Black, sem No Estúdio nem Mentoria no resultado principal), para usar o mesmo quiz nos dois momentos.
- **H8.** Como Débora, quero que o resultado leve em conta os cursos que a pessoa já fez, para não indicar um curso que ela já tem.
- **H9.** Como dev, quero passar as capas, os links e os preços como entrada, para o quiz não ter conteúdo fixo.

## 5. Requisitos funcionais

| ID | Requisito | Prioridade | História |
|---|---|---|---|
| RF1 | Abertura: etiquetas "QUIZ" e "1 MINUTO", título "tá em dúvida de qual curso é pra você?", texto "Responde essas 5 perguntinhas rápidas que eu te conto!", botão "bora começar" e legenda "LEVA 1 MINUTO · SEM CADASTRO". | Obrigatório | H1 |
| RF2 | Uma pergunta por tela, com barra de progresso e contador "1 de 5". | Obrigatório | H2 |
| RF3 | As 5 perguntas, os pontos e as regras de resultado (1 a 10) são os do manual (2 · 10, item 06). Os pontos nunca aparecem na tela. | Obrigatório | H1, H8 |
| RF4 | Perguntas 1 a 4: uma resposta, e escolher a opção avança sozinho. | Obrigatório | H3 |
| RF5 | Pergunta 5: mais de uma resposta e botão "ver o meu resultado", ativo depois de marcar uma opção. | Obrigatório | H4 |
| RF6 | "← voltar" em todas as perguntas, mantendo marcada a resposta anterior; "voltar" e "refazer" em Space Mono 10, caixa alta, sublinhado. | Obrigatório | H5 |
| RF7 | Resultado: etiqueta "O SEU PRÓXIMO PASSO", capa do produto, texto, card da oferta com raio 16, botão reto e o bloco "PARA IR ALÉM"; o selo de garantia fica abaixo do resultado. | Obrigatório | H6 |
| RF8 | O bloco "PARA IR ALÉM" segue as regras 7 a 9 de 2 · 10 (incluindo a troca pelo bloco da Mentoria quando a pessoa pede acompanhamento individual). | Obrigatório | H6 |
| RF9 | Versão permanente com preço normal; versão Black Friday com os preços da Black, sem No Estúdio nem Mentoria no resultado principal. | Obrigatório | H7 |
| RF10 | Card do quiz: raio 16, padding 34 × 28, fundo `--card` e fio `--fio-card` do tema (na página "cursos", tema `dg`), rodapé em Space Mono 8,5; título em Urbanist 900 34–52 minúsculo, −0,03em; pergunta em Urbanist 700 22–28; opção em Manrope 400 16, padding 16 × 20, altura mínima 58, raio 16, marcada com fio ocre; marcação em anel 20 e ponto 8. | Obrigatório | H1, H2 |
| RF11 | Capas, links, textos de resultado e preços entram como dado; nada fica fixo no quiz. | Obrigatório | H9 |

## 6. Requisitos não funcionais

- O quiz pode ser respondido só com o teclado, e a pergunta atual é anunciada para leitores de tela.
- Funciona em celular e desktop.
- O hover da opção (fio na cor do texto) entra como "proposta", como está no manual.

## 7. Fora de escopo

- Enviar o resultado por e-mail.
- Guardar as respostas.
- As capas 2:3 finais, que estão PENDENTES no manual.

## 8. Critérios de aceitação

- **CA1 (RF1):** Dado o quiz aberto, quando vejo a abertura, então aparecem as etiquetas, o título, o texto, o botão "bora começar" e a legenda do manual.
- **CA2 (RF2):** Dado o quiz iniciado, quando estou na primeira pergunta, então vejo a barra de progresso e "1 de 5".
- **CA3 (RF3):** Dadas as 16.000 combinações de resposta (perguntas 1 a 4 × ex-aluno × versão normal e Black), quando comparo o resultado com o protótipo do manual, então não há nenhuma diferença.
- **CA4 (RF3):** Dado qualquer momento do quiz, quando procuro pontos na tela, então não encontro.
- **CA5 (RF4):** Dada a pergunta 2, quando escolho uma opção, então a pergunta 3 aparece.
- **CA6 (RF5):** Dada a pergunta 5 sem nada marcado, quando a vejo, então o botão "ver o meu resultado" está desabilitado; ao marcar uma opção, ele fica ativo.
- **CA7 (RF6):** Dada a pergunta 3, quando clico em "← voltar", então volto para a pergunta 2 com a minha resposta anterior marcada.
- **CA8 (RF7):** Dado o fim do quiz, quando vejo o resultado, então aparecem a etiqueta "O SEU PRÓXIMO PASSO", a capa, o texto, o card da oferta, o bloco "PARA IR ALÉM" e, abaixo, o selo de garantia.
- **CA9 (RF8):** Dado que escolhi "Um acompanhamento individual…" na pergunta 3 e o resultado não é a Mentoria, quando vejo o resultado, então o "PARA IR ALÉM" mostra o bloco da Mentoria.
- **CA10 (RF9):** Dada a versão Black Friday, quando o resultado seria No Estúdio ou Mentoria, então o resultado principal mostra uma oferta da Black, conforme as regras do manual.
- **CA11 (RF10):** Dada uma opção marcada, quando exibida, então tem fio ocre e raio 16.
- **CA12 (RF11):** Dado um mock com outra capa e outro preço, quando o resultado é exibido, então mostra a capa e o preço do mock.

## 9. Fluxos e interface

- Fluxo: abertura → perguntas 1 a 4 (avançam sozinhas) → pergunta 5 (múltipla, "ver o meu resultado") → resultado → refazer.
- Referências: manual 2 · 05.13 (ficha do quiz), 2 · 10 item 06 (abertura, funcionamento, perguntas, pontos e regras), aba 4 (página "cursos") e aba 5 (quiz da Black Friday).

## 10. Dependências, restrições e riscos

- Depende de `dados-dinamicos-e-mocks`, `atomos-manual-v2` e `componentes-de-oferta` (card da oferta no resultado).
- Risco: a versão Black Friday do quiz está EM APROVAÇÃO no manual e pode mudar. Ela é construída agora mesmo assim.
- Nota: o registro de mudanças do manual (11.10.2026) diz que o bloco "para ir além" saiu, mas a ficha 2 · 05.13 e as regras 7 a 9 de 2 · 10, mais recentes, o incluem. Vale a ficha.

## 11. Perguntas em aberto

(nenhum)

## 12. Decisões

| Data | Decisão | Motivo |
|---|---|---|
| 2026-10-23 | Sucesso = resultado idêntico ao protótipo nas 16.000 combinações. | Resposta da Débora (pergunta 2). |
| 2026-10-23 | O resultado tem o bloco "PARA IR ALÉM". | Ficha 2 · 05.13 e regras 7 a 9 de 2 · 10. |
| 2026-10-23 | Pergunta 5 com várias respostas e botão "ver o meu resultado". | Manual 2 · 10, item 06. |
| 2026-10-23 | Ao voltar, a resposta anterior continua marcada. | Definido pela Débora. |
| 2026-10-23 | A versão Black Friday é construída agora, mesmo em aprovação. | Definido pela Débora. |
