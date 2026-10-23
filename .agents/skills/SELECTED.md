# Skills do projeto

Origens e licenças: ver a coluna Fonte e os arquivos `LICENSE-<fonte>` (Apache 2.0); cópias MIT trazem origem e copyright no rodapé. Cópias da skill-library adaptadas: bloco de precedência reescrito (regras do projeto prevalecem) e descrição reformatada. Gerenciado por `/skill-selector` (rode de novo para revisar).

| Skill | Fonte | Categoria | Motivo | Fixo | Ao usar | Desde |
|---|---|---|---|---|---|---|
| `typescript-strict` | skill-library | frontend/type-safety | TS 5.7 strict; props públicas e dados validados (R16, R17) | ~72 | ~5,6k | 2026-10-23 |
| `react-patterns` | skill-library | frontend/react | Composição e hooks dos componentes React 19 do DS | ~80 | ~6,7k | 2026-10-23 |
| `accessibility` | skill-library | design/acessibilidade-web | Pronto exige zero violação crítica no addon a11y; teclado e foco | ~250 | ~8,0k | 2026-10-23 |

**Custo fixo total:** ~402 tk/sessão por IA (~1.206 nas 3 IAs).

**Atenção:** os exemplos de CSS em `references/` (sobretudo de `accessibility`) usam vermelho para erro, `box-shadow` no foco, `border-radius: 2px` e HEX fixo. São genéricos: aqui valem R3–R8, R21 e R29 do `CONTEXT.md` (foco com `outline` em token, erro sem vermelho nas submarcas e na Black, cor só por token).

## Lacunas
| Necessidade | Sugestão (criar em owned/ ou procurar) |
|---|---|
| Motion 14 (`motion/react`) | Criar `owned/motion-react`: variantes, `useReducedMotion`, `AnimatePresence`, sem mudar tamanho do botão (R10). `skill-library/motion-design` descartada: Framer Motion legado |
| Storybook 10 (CSF3, autodocs, addon a11y) | Criar `owned/storybook-ds`: uma story por estado do manual, fundo escuro e claro, mocks só em stories (R24), status de aprovação |
| CSS Modules + tokens do manual | Criar `owned/css-modules-tokens`: `--dg-*`, `--esp-*`, `--raio-*`, `--fio`, `data-tema`; R3–R9, R29. `skill-library/design-systems` e `color-theory` descartadas: sombras, raios livres e paletas geradas conflitam com o manual |
| Biome (migração do ESLint) | Procurar fora ou criar ao iniciar a migração |
| Playwright E2E | Reavaliar `skill-library/testing-strategies` ao montar o Playwright (hoje insiste em pirâmide unitária) |
| Cópia para Next.js | `skill-library/nextjs-app-router` só quando a cópia começar (`plans/stack.md`) |
