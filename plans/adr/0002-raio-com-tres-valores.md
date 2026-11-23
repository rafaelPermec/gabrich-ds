---
status: aceito
---

# Raio com três valores: reto, 16px e círculo

A regra antiga dizia que só existiam canto reto e pílula. O manual vigente mantém a lógica "o que enquadra é reto, o que marca é círculo", mas abre uma exceção: foto, card, card de preço, quiz e combo usam 16px nas páginas dos cursos, na página "cursos" e na Black Friday. Nenhum outro valor existe.

## Opções consideradas

- Manter só reto e pílula: rejeitada pelo manual vigente.
- Vários raios intermediários (24, 22/14, 16 a 20 no quiz): existiam em versões anteriores do manual e foram retirados na v2.

## Consequências

- O 16px vale só nos contextos listados. Fora deles (por exemplo, foto de produto em peça da marca mãe, ou foto na largura toda), a foto continua reta.
- Botão e etiqueta continuam retos mesmo dentro de um card de 16px.
- Qualquer raio fora desses três valores no repositório, inclusive na interface do app de documentação, é um erro.
