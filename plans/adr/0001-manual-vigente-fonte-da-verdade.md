---
status: aceito
---

# Manual vigente como única fonte da verdade

O design system tinha como referência um manual de identidade anterior, guardado no próprio repositório. Decidimos que a única fonte da verdade é o Manual Final 2026 · VIGENTE v2, no projeto do Claude Design da Débora, e que o arquivo antigo não vale mais. Quando o código e o manual divergirem, vale o manual; quando o manual não disser algo, a decisão é da Débora.

## Opções consideradas

- Manter o manual antigo no repositório como referência complementar: rejeitada. As regras dele conflitam com as do manual vigente (raio, fontes, produtos).
- Copiar o manual vigente para dentro do repositório: rejeitada. Os PRDs guiam o desenvolvimento.

## Consequências

- Regras que estavam no código e vinham do manual antigo (ex.: "raio só 0 ou 9999px") deixam de valer.
- Só entra no código o que está APROVADO no manual. Quando um item muda de status no manual, o design system precisa acompanhar.
