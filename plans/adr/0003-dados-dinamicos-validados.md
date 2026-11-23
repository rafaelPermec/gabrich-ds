---
status: aceito
---

# Dados de oferta e de campanha são entrada, nunca fixos no código

Preços, parcelas, porcentagens, datas e listas mudam ao longo da campanha. Decidimos que o design system nunca guarda esses valores como fonte: todo componente os recebe como dado, valida o que recebeu e exibe. Os valores do manual entram só como mocks, usados no Storybook e nas páginas de demonstração para a Débora validar e aprovar.

## Opções consideradas

- Tabela oficial fixa dentro do design system, como fonte única para todos os componentes: era a abordagem dos protótipos do manual v2. Rejeitada, porque qualquer mudança de preço ou data exigiria mudar o design system.

## Consequências

- Os valores da tabela oficial do manual entram só nos mocks; nenhum componente os lê como fonte.
- O quiz e o Monte seu combo dependem dos dados recebidos. O teste das 16.000 combinações do quiz roda com mocks iguais à tabela oficial.
- As porcentagens exibidas no combo continuam fixas por oferta, mas como parte do dado, não do código.
