---
feature: dados-dinamicos-e-mocks
status: implementado
criado: 2026-10-23
atualizado: 2026-11-23
spec: plans/specs/0002-dados-dinamicos-e-mocks.md
---

# PRD — Dados dinâmicos e mocks

## 1. Problema

Hoje os preços, parcelas, listas e descrições dos cursos estão escritos dentro do código das páginas de demonstração, e vários estão errados: o Antes da Foto aparece a R$ 297 / R$ 147, e há textos de produtos que não existem, como masterclass, certificado e encontro ao vivo. Qualquer mudança de preço ou data exige mexer no código, e não há como saber se um valor exibido está certo.

## 2. Objetivo e métricas de sucesso

Objetivo: todo dado de oferta e de campanha que um componente exibe (preços, parcelas, porcentagens, datas, listas e textos de produto) chega ao componente como entrada, é validado e nunca fica fixo no código do design system. Para a Débora validar o visual, o Storybook e as páginas de demonstração usam dados de exemplo (mocks) com os valores do manual.

- Nenhum preço, parcela, porcentagem ou data escrito dentro de componente.
- Typecheck, lint e build do Storybook sem erro.
- Todo componente que recebe dado de oferta ou de campanha tem story com mock.

## 3. Usuários e contexto

- **Débora Gabrich**: aprova o visual dos componentes no Storybook com os mocks.
- **Time de desenvolvimento e agentes de IA**: passam os dados reais quando o design system for usado nas páginas de venda. Isso acontece fora deste trabalho.
- Contexto: as páginas de venda reais estão fora de escopo. Os mocks servem só para validação e aprovação.

## 4. Histórias de usuário

- **H1.** Como dev, quero que cada componente de oferta receba preço, parcela e porcentagem como entrada, para que uma mudança de preço não exija mudar o componente.
- **H2.** Como dev, quero que os componentes de campanha recebam as datas das fases como entrada, para que a campanha possa mudar de data sem mudar o código.
- **H3.** Como dev, quero que o componente avise quando o dado recebido está incompleto ou inválido, para não exibir um preço errado sem perceber.
- **H4.** Como Débora, quero ver no Storybook cada componente preenchido com dados de exemplo iguais aos do manual, para aprovar o visual.
- **H5.** Como Débora, quero que nenhum componente mostre masterclass, nem certificado ou encontro ao vivo nos cursos online, porque esses itens não existem.
- **H6.** Como dev, quero um formato único para descrever uma oferta, para todos os componentes lerem o mesmo dado.
- **H7.** Como dev, quero um formato único para a campanha, para todos os componentes saberem em que fase estão.
- **H8.** Como dev, quero formatos para os conteúdos de página (listas dos cards, descritivos, módulos e aulas, depoimentos, antes e depois), para montar as demonstrações sem texto fixo.
- **H9.** Como dev, quero que, enquanto o link de checkout não existir, o botão use o id de checkout da oferta, para os botões funcionarem nas demonstrações.
- **H10.** Como Débora, quero que uma parcela ainda não confirmada apareça como "12x a confirmar", para nunca mostrar uma parcela inventada.

## 5. Requisitos funcionais

| ID | Requisito | Prioridade | História |
|---|---|---|---|
| RF1 | Existe um formato de dado de oferta com: nome, cursos incluídos, preço normal à vista, parcela normal em 12x, preço da Black à vista, parcela da Black em 12x, porcentagem de desconto exibida (combo fora da Black, combo + Black e Black do curso único), id de checkout normal e da Black, e link de checkout opcional. | Obrigatório | H1, H6 |
| RF2 | Existe um formato de dado de campanha com seis datas, no horário de Brasília: início da lista de espera, abertura, início da última semana, início das últimas 24h, fim da Black e fim do encerramento. | Obrigatório | H2, H7 |
| RF3 | A fase da campanha (normal, lista de espera, aberta, última semana, últimas 24h, encerrada) é calculada a partir das datas recebidas e de um "agora" recebido, nunca de datas fixas no código. Cada data abre a fase seguinte; depois do fim do encerramento, a fase volta a normal. Duas datas iguais pulam a fase entre elas. | Obrigatório | H2, H7 |
| RF4 | Validação do dado de oferta: campos obrigatórios presentes; preços como número; porcentagens como número inteiro; ids de checkout no padrão `#checkout-<slug>` / `#checkout-bf26-<slug>`. Validação do dado de campanha: as seis datas presentes e em ordem cronológica (datas iguais são permitidas). | Obrigatório | H3 |
| RF5 | Dado com formato inválido impede a compilação do projeto (typecheck e build falham). No Storybook, quando um mock não passa na validação de conteúdo, o componente mostra um aviso visível. Fora do Storybook, não há aviso visível: o componente renderiza o dado recebido e registra o erro no console. | Obrigatório | H3 |
| RF6 | Sem a parcela de uma oferta, o componente mostra "12x a confirmar". | Obrigatório | H10 |
| RF7 | O "preço separado" é a soma dos preços normais à vista dos cursos da oferta, e o "você economiza" é a diferença entre o preço separado e o preço da oferta (o normal fora da Black, o da Black na Black). Fora da Black, o curso único não tem preço separado nem "você economiza"; na Black, tem. As porcentagens não são calculadas: vêm no dado. | Obrigatório | H1 |
| RF8 | Existe um conjunto de mocks com os valores do manual (2 · 05.05b, 2 · 05.05c, 2 · 05.12, 2 · 05.14, 2 · 05.17 e 2 · 07), usado só no Storybook e nas páginas de demonstração. | Obrigatório | H4 |
| RF9 | Existem formatos para as listas dos cards de preço, os descritivos dos cursos, os módulos e aulas, os depoimentos (com nome da aluna e curso) e os antes e depois. | Obrigatório | H8 |
| RF10 | Os mocks não contêm masterclass. Os cursos online não contêm certificado nem encontro ao vivo. O No Estúdio mantém "certificado de participação", que está na lista oficial dele. | Obrigatório | H5 |
| RF11 | Sem link de checkout, o botão aponta para o id de checkout da oferta (ex.: `#checkout-bf26-completo`). | Obrigatório | H9 |
| RF12 | O valor monetário é exibido no formato brasileiro: valor inteiro sem centavos (R$ 1.397) e valor com fração sempre com 2 casas (12x R$ 144,48; R$ 20,30). | Obrigatório | H1 |

## 6. Requisitos não funcionais

- Uma mudança de preço ou data nos mocks aparece em todos os componentes sem mexer neles.
- No Storybook, a validação não trava a renderização: o componente continua visível com o aviso.

## 7. Fora de escopo

- Buscar preços ou datas de uma fonte externa (Hotmart ou outra). As parcelas são calculadas pela Hotmart e chegam prontas no dado.
- Os 14 links reais de checkout (PENDENTE no manual).
- As páginas de venda reais.
- Prazo de entrega.

## 8. Critérios de aceitação

- **CA1 (RF1):** Dado um mock de oferta, quando ele passa pela validação, então todos os campos do RF1 estão presentes e com o tipo certo.
- **CA2 (RF2, RF3):** Para cada fase, dado um "agora" dentro da janela dela (inclusive no instante exato da data que a abre), quando a fase é calculada, então o resultado é essa fase. Dado um "agora" depois do fim do encerramento, então a fase é normal. Dadas a abertura e o início da última semana na mesma data, então a fase "aberta" não ocorre.
- **CA3 (RF4, RF5):** Dado um dado de oferta sem preço da Black, quando rodo o typecheck, então ele falha. Dado um mock com conteúdo inválido no Storybook, então aparece o aviso.
- **CA4 (RF4, RF5):** Dado um mock de campanha com a abertura depois do fim da Black, quando exibido no Storybook, então aparece o aviso de dado inválido. Fora do Storybook, não aparece aviso e o erro vai para o console.
- **CA5 (RF6):** Dada uma oferta sem parcela da Black, quando a parcela é formatada, então o texto é "12x a confirmar".
- **CA6 (RF7):** Dado Luz na Prática + Antes da Foto, com os preços oficiais no mock: fora da Black, o preço separado é R$ 644 e "você economiza" é R$ 67; na Black, o preço é R$ 287 e "você economiza" é R$ 357. Dado Mais que um Click na Black, então "você economiza" é R$ 500; fora da Black, não há preço separado nem "você economiza".
- **CA7 (RF8):** Dados os mocks de oferta, quando comparo com a tabela oficial do manual (2 · 05.05c e 2 · 05.12), então todos os preços, parcelas e porcentagens são iguais.
- **CA8 (RF9):** Dado um mock de módulos, quando ele passa pela validação, então tem os módulos e as aulas do manual (2 · 05.17), na mesma ordem.
- **CA9 (RF10):** Dado os mocks, quando procuro "masterclass", então não encontro. Nos cursos online, "certificado" e "encontro ao vivo" também não aparecem.
- **CA10 (RF11):** Dada uma oferta da Black sem link, quando o destino do checkout é resolvido, então é o id de checkout da Black da oferta (ex.: `#checkout-bf26-completo`). Com link, é o link.
- **CA11 (RF12):** Dado o preço 1397, quando é exibido, então aparece "R$ 1.397". Dado 144.48, então "R$ 144,48". Dado 20.3, então "R$ 20,30".
- **CA12 (RF1–RF3):** Dado o código do design system fora dos mocks, quando procuro valores de preço, parcela, porcentagem ou data, então não encontro nenhum.

Os critérios de tela (card de preço, lista de módulos, botão) ficam no PRD `componentes-de-oferta`, que depende deste.

## 9. Fluxos e interface

- Referências: manual 2 · 05.05b (listas oficiais), 2 · 05.05c (tabela de preços), 2 · 05.12 (porcentagens e tabela do combo), 2 · 05.14 (janelas do contador), 2 · 05.17 (módulos), 2 · 07 (ids de checkout) e aba 05 (datas das fases).
- Estado de erro: aviso de dado inválido, visível só no Storybook; fora dele, erro no console.
- Mock de campanha (horário de Brasília): início da lista de espera 01/11/2026 00h00 · abertura 24/11/2026 00h00 · início da última semana 24/11/2026 00h00 · início das últimas 24h 30/11/2026 00h00 · fim da Black 30/11/2026 23h59 · fim do encerramento 08/12/2026 23h59.

## 10. Dependências, restrições e riscos

- Não depende de outras entregas. O PRD `componentes-de-oferta` depende deste e verifica os dados na tela.
- Risco: os valores oficiais existem só nos protótipos do manual (ex.: `_src/logic.js`). Transcrevê-los para os mocks com erro faria a Débora aprovar o design system com valores errados.
- Restrição: as porcentagens do combo são fixas por oferta e nunca calculadas na tela (2 · 05.12).
- Risco: a campanha mudou de data (abertura em 24/11/2026 e fim em 30/11/2026), e o manual ainda traz as datas antigas (contador 21.11–27.11, encerramento 28.11–05.12). O PRD `componentes-de-oferta` (H9) também tem as datas antigas fixas no texto.
- Restrição: os textos completos dos módulos do Luz na Prática e do Mais que um Click estão EM APROVAÇÃO; os mocks usam a versão atual do manual.

## 11. Perguntas em aberto

(nenhum)

## 12. Decisões

| Data | Decisão | Motivo |
|---|---|---|
| 2026-10-23 | Preços, datas e parcelas são dinâmicos e só validados, nunca fixos no código. | Pedido da Débora. |
| 2026-10-23 | Dados de exemplo (mocks) servem só para a Débora validar e aprovar o design system. | Pedido da Débora. |
| 2026-10-23 | Não existe masterclass; o Antes da Foto é só e-book. | Combinado com a Débora; registro de mudanças do manual v2. |
| 2026-10-23 | Parcela sem valor aparece como "12x a confirmar". | Manual v2, registro de mudanças. |
| 2026-10-23 | "Preço separado" = soma dos preços normais dos cursos; "você economiza" = preço separado − preço da oferta. | Manual 2 · 05.12 (a tabela confirma os valores). |
| 2026-10-23 | Os mocks dos módulos usam os textos atuais do manual. | Eles estão EM APROVAÇÃO e servem só para validação. |
| 2026-10-23 | O aviso de dado inválido existe só no Storybook; erro de formato impede a compilação. | Definido pela Débora. |
| 2026-11-23 | A campanha de 2026 vai de 24/11 (abertura) a 30/11 às 23h59 (fim da Black); as últimas 24h começam em 30/11 00h00; a última semana começa na abertura; a lista de espera começa em 01/11 e o encerramento dura 8 dias, como no manual. | Mudança de data informada pelo usuário; o manual ainda não foi atualizado. |
| 2026-11-23 | Os critérios desta feature verificam o dado (formatos, validação, cálculos e mocks); os critérios de tela ficam no `componentes-de-oferta`. | Os componentes de oferta ainda não existem e dependem deste PRD. |
| 2026-11-23 | Valor inteiro sem centavos; valor com fração com 2 casas. | Manual (R$ 197 · 12x R$ 20,37). |
| 2026-11-23 | Fora do Storybook, dado inválido renderiza como veio e registra erro no console. | Revisão do PRD. |
