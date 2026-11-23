---
feature: componentes-de-prova
status: rascunho
criado: 2026-10-23
atualizado: 2026-10-23
spec: plans/specs/<NNNN>-componentes-de-prova.md
---

# PRD — Componentes de prova

## 1. Problema

As páginas dos cursos e a Black Friday mostram prova de resultado: depoimentos de alunos, fotos de antes e depois, o planejamento comparado com a foto final e a faixa rolante. O manual define como cada um deve ser mostrado (por exemplo, antes e depois sempre como slider de comparação, nunca como duas fotos lado a lado), mas esses componentes não existem no design system.

## 2. Objetivo e métricas de sucesso

Objetivo: os componentes de prova existem no design system, seguem o manual e mostram qualquer conteúdo recebido como dado.

- Nenhum raio fora de 0, 16px ou círculo/pílula.
- Typecheck, lint e build do Storybook sem erro.
- Nenhuma violação crítica no verificador de acessibilidade.

## 3. Usuários e contexto

- **Débora Gabrich**: aprova os componentes no Storybook, com mocks.
- **Time de desenvolvimento e agentes de IA**: usam os componentes nas páginas de demonstração.
- **Comprador final** (indireto): vê a prova nas páginas reais.

## 4. Histórias de usuário

- **H1.** Como comprador, quero comparar a foto de um aluno antes e depois do curso arrastando uma linha, para ver a evolução na mesma foto.
- **H2.** Como Débora, quero que todo antes e depois de aluno use o slider de comparação, no formato do Luz na Prática, em todos os cursos, para manter um padrão.
- **H3.** Como comprador numa página de curso, quero passar de um aluno para outro, com o contador "aluna 01 · 1 de 2", para ver vários resultados.
- **H4.** Como comprador nas páginas da Black Friday, quero ver vários alunos lado a lado no desktop e um por vez no celular, com o contador "01 de 04", para comparar resultados.
- **H5.** Como comprador no celular, quero arrastar o slider sem travar a rolagem da página.
- **H6.** Como comprador, quero ver depoimentos em vídeo e em print, sempre com o nome da aluna e o curso, para confiar no curso.
- **H7.** Como comprador, quero que o vídeo do depoimento só carregue quando eu clicar, sem tocar sozinho, para a página abrir rápido.
- **H8.** Como comprador no celular, quero ver os depoimentos em carrossel, para não rolar uma lista longa.
- **H9.** Como comprador do Antes da Foto, quero comparar o planejamento de uma sessão com a foto final, para entender o que o e-book ensina.
- **H10.** Como comprador, quero uma faixa rolante com a chamada da campanha, que pare quando passo o mouse, para chamar atenção sem atrapalhar a leitura.
- **H11.** Como comprador que prefere menos movimento, quero que a faixa fique parada quando o sistema pede movimento reduzido.

## 5. Requisitos funcionais

| ID | Requisito | Prioridade | História |
|---|---|---|---|
| RF1 | Antes e depois: uma foto 4:5 com raio 16; o "depois" embaixo e o "antes" por cima, recortado até a linha; começa em 50%. | Obrigatório | H1, H2 |
| RF2 | Controle: arrastar a linha ou tocar em qualquer ponto; linha de 2px na cor do texto do curso; alça em disco de 52px na cor do texto, com ←→. | Obrigatório | H1 |
| RF3 | Etiquetas ANTES (esquerda, cheia) e DEPOIS (direita, cheia em contraste), em Space Mono 10, caixa alta. | Obrigatório | H1 |
| RF4 | Páginas dos cursos, vários alunos: botões de canto reto por aluno, anterior/próximo em disco de 48px e o contador "aluna 01 · 1 de 2" (2 · 05.16). | Obrigatório | H3 |
| RF5 | Páginas da Black Friday: galeria de antes e depois com vários alunos (cada um num slider), lado a lado no desktop; no celular, um por vez, com setas e o contador "01 de 04". Cada aluno tem nome e cursos na legenda. | Obrigatório | H4 |
| RF6 | No celular, o slider ocupa a largura toda e o arraste não bloqueia a rolagem vertical. | Obrigatório | H5 |
| RF7 | O antes e depois nunca é exibido como duas fotos lado a lado. | Obrigatório | H2 |
| RF8 | Depoimentos: grade em mural, que aceita alturas diferentes (vídeo vertical, vídeo horizontal, print curto, print longo, foto feita pela aluna), sempre com o nome da aluna e o curso; no celular, carrossel. | Obrigatório | H6, H8 |
| RF9 | Vídeo de depoimento (YouTube): antes do clique, a capa do vídeo com botão de play no estilo da página; o player só carrega no clique; sem reprodução automática, sem som automático e com controles visíveis; 9:16 nos shorts e card 16:9 no celular. | Obrigatório | H7 |
| RF10 | Planejamento × foto final: compara o planejamento com a foto pronta, com os pares do projeto Granado e do projeto Adobe. | Obrigatório | H9 |
| RF11 | Faixa rolante: uma volta a cada 30s (cerca de 40px/s), para a esquerda; pausa no hover; parada para quem usa movimento reduzido; cores: ocre com texto preto (principal), preto com texto papel e separador ocre, ou papel com texto preto, com fio de 1px em cima e embaixo; o título BLACK FRIDAY entra como imagem. | Obrigatório | H10, H11 |
| RF12 | No máximo uma faixa rolante por dobra; duas só empilhadas, em direções opostas e com cores diferentes. | Obrigatório | H10 |
| RF13 | Todo conteúdo (fotos, nomes, textos, vídeos, logos) entra como dado. | Obrigatório | H1–H10 |
| RF14 | O slider funciona pelo teclado: as setas movem a linha 5% por toque. | Obrigatório | H1 |

## 6. Requisitos não funcionais

- Imagens com texto alternativo vindo do dado.
- O player do YouTube usa o endereço e a política de referência definidos no manual (ver notas técnicas).

## 7. Fora de escopo

- As fotos finais de antes e depois do Mais que um Click e os nomes nas legendas dos vídeos do Luz na Prática e do Mais que um Click, que estão PENDENTES no manual.
- Depoimentos, "sobre" e perguntas frequentes com texto final, que no manual são só estrutura.
- A versão parada da faixa rolante para e-mail.

## 8. Critérios de aceitação

- **CA1 (RF1):** Dado um aluno no mock, quando o slider abre, então a linha está em 50% e a foto tem raio 16.
- **CA2 (RF2):** Dado o slider, quando toco num ponto da foto, então a linha vai para esse ponto.
- **CA3 (RF3):** Dado o slider, quando exibido, então ANTES aparece à esquerda e DEPOIS à direita.
- **CA4 (RF4):** Dados dois alunos no mock de uma página de curso, quando clico em próximo, então o contador mostra "aluna 02 · 2 de 2".
- **CA5 (RF5):** Dados quatro alunos no mock da Black, quando vejo no celular, então aparece um por vez e o contador "01 de 04".
- **CA6 (RF6):** Dado o celular, quando arrasto na vertical sobre o slider, então a página rola.
- **CA7 (RF7):** Dado qualquer antes e depois de aluno, quando exibido, então não aparece como duas fotos lado a lado.
- **CA8 (RF8):** Dados depoimentos de formatos diferentes, quando exibidos no desktop, então ficam em mural, cada um com nome e curso. No celular, ficam em carrossel.
- **CA9 (RF9):** Dado um depoimento em vídeo, quando a página carrega, então nenhum player é carregado até o clique, e o vídeo não toca sozinho.
- **CA10 (RF10):** Dado o mock da Granado, quando exibido, então mostra o planejamento e a foto final do mesmo projeto.
- **CA11 (RF11):** Dada a preferência de movimento reduzido, quando a faixa é exibida, então ela fica parada. Sem a preferência, ela rola para a esquerda e pausa no hover.
- **CA12 (RF12):** Dadas duas faixas empilhadas, quando exibidas, então rolam em direções opostas e têm cores diferentes.
- **CA13 (RF13):** Dado o código dos componentes, quando procuro nomes de alunos ou textos de depoimento, então não encontro nenhum.
- **CA14 (RF14):** Dado o slider com foco, quando aperto a seta para a direita, então a linha anda 5%.

## 9. Fluxos e interface

- Referências: manual 2 · 05.16 (antes e depois), aba 4 (depoimentos e planejamento × foto final nas páginas dos cursos), aba 5 · C06 (depoimentos), páginas dos cursos na Black (galeria de antes e depois) e aba 5 · E02 (faixa rolante).
- Referência do slider: seção 05 da página do Luz na Prática (LnP Pagina - Manual v2).

## 10. Dependências, restrições e riscos

- Depende de `fundamentos-manual-v2` e `atomos-manual-v2`.
- Risco: a página do Antes da Foto, onde fica o planejamento × foto final, está com o layout EM APROVAÇÃO.
- Risco: os depoimentos das páginas além da "cursos" estão EM APROVAÇÃO, junto com cada página.

## 11. Perguntas em aberto

(nenhum)

## 12. Decisões

| Data | Decisão | Motivo |
|---|---|---|
| 2026-10-23 | Todo antes e depois de aluno usa o slider de comparação, no formato do Luz na Prática. | Regra do manual (2 · 05.16). |
| 2026-10-23 | Botões por aluno com contador "aluna 01 · 1 de 2" nas páginas dos cursos; galeria com contador "01 de 04" nas páginas da Black. | Manual 2 · 05.16 e páginas da aba 5. |
| 2026-10-23 | Planejamento × foto final só com os pares Granado e Adobe; o par "040" não entra. | A página do manual mostra só esses dois. |
| 2026-10-23 | Slider pelo teclado: setas movem a linha 5% por toque. | Definido pela Débora. |
