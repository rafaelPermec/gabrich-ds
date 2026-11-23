# Design System Débora Gabrich

Conjunto de tokens, componentes e documentação que traduz o Manual Final 2026 · VIGENTE v2 da marca Débora Gabrich para código. Ele existe para que a marca mãe, os cursos e a Black Friday sejam montados sem interpretar o manual.

## Glossário

### Marca

**Manual vigente**:
O Manual Final 2026 · VIGENTE v2, no projeto do Claude Design da Débora. É a fonte da verdade do design system.
_Evitar_: manual antigo, sistema visual (como nome do documento), manual v1

**Status de aprovação**:
A situação de cada item no manual vigente: APROVADO (pode ser construído), EM APROVAÇÃO (pode mudar) ou PENDENTE (sem conteúdo final).
_Evitar_: status do componente, versão

**Marca mãe**:
A marca Débora Gabrich em si, com logo, selo DG e tema `dg`.
_Evitar_: marca principal, DG (sozinho, para a marca)

**Submarca**:
A identidade de cada curso dentro do sistema: Luz na Prática, Mais que um Click, Antes da Foto e No Estúdio.
_Evitar_: vertical (para curso), sub-brand

**Black Friday**:
A campanha de 2026 dos cursos, com camada própria (`bf`) sobre a base da marca mãe.
_Evitar_: BF26 (em texto), promoção

**Antes da Foto**:
E-book de direção criativa da Débora. Não tem masterclass.
_Evitar_: e-book + masterclass, ADF (em texto para usuário)

**Luz na Prática**:
Curso online de iluminação.
_Evitar_: LnP (em texto para usuário)

**Mais que um Click**:
Curso online completo de fotografia de gastronomia.
_Evitar_: MQC (em texto para usuário)

**No Estúdio**:
Workshop presencial de fotografia de produtos. Não entra na Black Friday.
_Evitar_: NE (em texto para usuário)

### Fundamentos

**Tema**:
O conjunto de valores dos tokens de componente para uma identidade, em versão escura ou clara. São 10: `dg`, `dg-claro`, `lp`, `lp-claro`, `mqc`, `mqc-claro`, `adf`, `adf-claro`, `ne`, `ne-claro`.
_Evitar_: skin, modo, vertical

**Token de componente**:
O nome que todo componente usa para uma cor (fundo, card, fio do card, texto, texto de apoio, acento, botão, texto do botão, hover do botão, desabilitado, divisória, selo de garantia), com valor definido pelo tema.
_Evitar_: variável de tema, cor semântica

**Base**:
A cor de fundo dominante de uma peça: preto ou papel.
_Evitar_: background, cor principal

**Acento**:
A cor de destaque do tema. Na marca mãe e na Black, o ocre.
_Evitar_: cor de destaque, highlight

**Voz**:
Cada família tipográfica do sistema, usada num papel definido.
_Evitar_: fonte (quando se fala do papel), estilo

**Subfonte**:
A tipografia de um nível do manual (por exemplo: título, linha de apoio, subtítulo, corpo, rótulo, botão, preço, manuscrita) dentro de uma marca, com família, peso, tamanho, entrelinha, tracking e caixa.
_Evitar_: estilo de texto, variante de fonte

**Raio de card**:
O raio de 16px, usado em foto, card, card de preço, quiz e combo nas páginas dos cursos, na página "cursos" e na Black Friday.
_Evitar_: arredondado, cantos suaves

**Fio**:
Toda linha simples, sempre de 1px.
_Evitar_: borda (para a linha), stroke

### Peças e componentes

**Componente genérico**:
Componente do design system que o manual vigente não cita (ex.: tabela de dados, barra lateral, filtros, paginação, navbar, rodapé). Fica como está e continua usando os tokens antigos.
_Evitar_: componente legado, componente antigo

**Peça**:
Qualquer material individual de comunicação: post, story, lâmina, banner, card de preço, seção de página ou e-mail.
_Evitar_: arte, criativo (no contexto do design system)

**Lâmina**:
Cada tela de um carrossel ou de uma apresentação.
_Evitar_: slide, card (para tela de carrossel)

**Etiqueta**:
Caixa de texto curta em caixa alta, de canto reto, não interativa.
_Evitar_: tag, badge, chip, pílula

**Disco de ação**:
O botão redondo com seta das peças da marca mãe.
_Evitar_: botão redondo, FAB

**Indicador de continuação**:
Disco traçado com seta, menor que o disco de ação, que mostra que a página continua.
_Evitar_: seta de rolagem, scroll hint

**Marcador**:
Ponto redondo de lista, disco numerado ou anel de seleção.
_Evitar_: bullet, checkbox (para a seleção do combo e do quiz)

**Selo de desconto**:
O quadrado ou par de etiquetas com "50%" e "black friday". Só aparece na Black.
_Evitar_: badge de desconto

**Selo de garantia**:
O selo "7 dias de garantia", na cor do curso, uma vez por página, fora do card de preço.
_Evitar_: garantia (como item da lista do card)

**Oferta**:
Um produto ou combinação à venda, com preço normal, preço da Black, parcelas e id de checkout.
_Evitar_: produto (para combinações), plano

**Combo**:
Oferta com dois cursos.
_Evitar_: pacote, bundle

**Completo**:
A oferta com os três cursos online (Antes da Foto, Luz na Prática e Mais que um Click).
_Evitar_: combo completo, os três

**Preço separado**:
A soma dos preços normais dos cursos de uma combinação.
_Evitar_: preço cheio, de

**Economia**:
O "você economiza" de uma combinação: preço separado menos o preço da oferta.
_Evitar_: desconto (para o valor em reais), sobra

**Card de preço**:
O bloco de fim de página com logo, tipo, preço, lista e botão de um curso.
_Evitar_: box de preço, pricing card

**Monte seu combo**:
Componente em que a pessoa marca os cursos e vê o preço da combinação. Na Black, chama-se Monte a sua Black Friday.
_Evitar_: simulador, configurador

**Quiz**:
As 5 perguntas que indicam qual curso é o próximo passo da pessoa.
_Evitar_: teste, questionário

**Fase da campanha**:
O momento da Black Friday: normal, lista de espera, aberta, última semana, últimas 24h ou encerrada.
_Evitar_: etapa, status da campanha

**Faixa de fase**:
A faixa fina no topo que mostra a etiqueta da fase e, nas janelas do contador, o contador.
_Evitar_: barra de aviso, top bar

**Contador**:
A contagem regressiva das janelas de lista de espera e de última semana.
_Evitar_: cronômetro, timer

**Faixa de perfuração**:
O grafismo que imita a borda de um filme fotográfico e sangra de ponta a ponta.
_Evitar_: faixa de filme, borda perfurada

**Faixa rolante**:
A faixa em movimento contínuo com logos e chamada, que pausa no hover.
_Evitar_: marquee, letreiro

**Antes e depois**:
A comparação de foto de aluno em slider, numa foto só.
_Evitar_: comparativo lado a lado

**Planejamento × foto final**:
A comparação entre o rascunho do planejamento e a foto pronta, do Antes da Foto.
_Evitar_: rascunho vs. final

**Folheador**:
O componente que mostra páginas do e-book Antes da Foto como um livro.
_Evitar_: flipbook (em texto para usuário), visualizador

**Prática animada**:
A animação de uma prática do e-book sendo preenchida.
_Evitar_: demo animada

**Checkout**:
A página de pagamento da Hotmart de uma oferta. Cada oferta tem um id de checkout normal e um da Black.
_Evitar_: link de compra, carrinho

**Mock**:
Dado de exemplo usado só no Storybook e nas páginas de demonstração, para validação e aprovação.
_Evitar_: dado fixo, dado oficial

**Página de demonstração**:
Página do app de documentação que monta componentes com mocks para a Débora validar (ex.: Submarcas, Black Friday). Não é página de venda.
_Evitar_: vitrine, página real, landing

## Regras de negócio

- **R1.** O manual vigente é a fonte da verdade. Em caso de divergência com o código, vale o manual.
- **R2.** Só se constrói o que está APROVADO no manual. O que está EM APROVAÇÃO pode mudar, e o que está PENDENTE não tem conteúdo final.
- **R3.** Existem só três valores de raio: reto (0), 16px e círculo (50%).
- **R4.** O raio de 16px vale para foto, card, card de preço, quiz e combo, só nas páginas dos cursos, na página "cursos" e na Black Friday.
- **R5.** Botão, etiqueta, selos, quadro, tabela, folha de contato e campo de formulário têm canto reto.
- **R6.** Marcador, numeração, seleção, retrato da Débora e disco de ação são círculos.
- **R7.** Todo fio simples tem 1px.
- **R8.** Nenhum componente usa sombra.
- **R9.** Toda medida de espaçamento é múltiplo de 4, dentro da escala 4, 8, 12, 16, 24, 32, 48, 64 e 96.
- **R10.** O botão não tem seta dentro e nunca muda de tamanho, em nenhum estado.
- **R11.** Há no máximo um botão de acento por dobra.
- **R12.** A etiqueta sozinha é traçada; cheia só quando há duas ou mais em linha.
- **R13.** O selo de garantia aparece uma vez por página, fora do card de preço, e nunca em ocre.
- **R14.** O selo de desconto só aparece na Black Friday.
- **R15.** O No Estúdio não entra na Black Friday.
- **R16.** Preços, parcelas, porcentagens, datas e listas nunca ficam fixos num componente: chegam como dado e são validados.
- **R17.** As porcentagens de desconto exibidas são as definidas para cada oferta, nunca calculadas na tela.
- **R18.** O contador só aparece em duas janelas: na lista de espera, até a abertura, e da última semana até o fim da Black. Nas últimas 24h, os dias saem e entram os segundos.
- **R19.** A Balgin só aparece nas logos, como vetor. Títulos que seriam em Balgin usam Urbanist.
- **R20.** Toda logo entra como imagem, nunca montada com fonte.
- **R21.** Nos temas das submarcas e da Black Friday, erro, aviso e sucesso não usam vermelho.
- **R22.** Todo antes e depois de aluno é um slider numa foto só, nunca duas fotos lado a lado.
- **R23.** Não existe masterclass em nenhum produto, texto ou oferta.
- **R24.** Mocks só existem no Storybook e nas páginas de demonstração.
- **R25.** Parcela sem valor confirmado aparece como "12x a confirmar".
- **R26.** O formulário de lista de espera pede só nome, e-mail, WhatsApp (opcional) e, na Black, interesse.
- **R27.** Todo depoimento mostra o nome da aluna e o curso.
- **R28.** Há no máximo uma faixa rolante por dobra; duas só empilhadas, em direções opostas e com cores diferentes.
- **R29.** Toda cor é um token; nenhum valor HEX aparece fora da definição dos tokens.
- **R30.** Os pontos do quiz nunca aparecem na tela.
- **R31.** A Black Mango é usada apenas no No Estúdio.
- **R32.** O contador é rotulado apenas como "contador" para leitores de tela, sem anunciar os números.
- **R33.** Com a preferência de movimento reduzido, nada se anima: a faixa rolante fica parada e a prática animada aparece já preenchida.
