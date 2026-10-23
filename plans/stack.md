# Stack

| Camada | Escolha | Versão | Documentação oficial | Observações |
|---|---|---|---|---|
| Linguagem | TypeScript (strict) | 5.7 | https://www.typescriptlang.org/docs/ |  |
| Framework | React + Vite, React Router | React 19, Vite 8, React Router 8.4 | https://react.dev/reference/react · https://vite.dev/guide/ · https://reactrouter.com/home | Futuro, só depois de concluir o design system: a pasta de componentes será copiada para o projeto do site em Next.js (https://nextjs.org/docs). Não orienta decisões durante o DS |
| UI e estilos | CSS Modules + tokens em CSS custom properties; Motion para animação | Motion 14 | https://github.com/css-modules/css-modules · https://motion.dev/docs/react | Tokens em `src/index.css`. Tailwind será removido (ver "Fora da stack") |
| Componentes | Próprios do projeto, documentados no Storybook (addons docs e a11y) | Storybook 10.6 | https://storybook.js.org/docs |  |
| Dados e estado | React Context para o tema (10 temas do manual via `data-tema`); dados de oferta e campanha chegam por props/contexto e são validados; Storybook como documentação e prova dos estados do frontend | React 19; Storybook 10.6 | https://react.dev/reference/react/createContext · https://storybook.js.org/docs/writing-stories | Storybook é obrigatório: todo estado visual do componente tem story |
| Testes de unidade/integração | - | - | - | Sem runner definido |
| Testes E2E | Playwright | a definir | https://playwright.dev/docs/intro | Ainda não instalado |
| Lint e formatação | ESLint + typescript-eslint, plugins react-hooks e react-refresh → migrar para Biome | ESLint 10; Biome a definir | https://eslint.org/docs/latest/ · https://biomejs.dev/guides/getting-started/ | Biome é o alvo; ESLint segue até a migração |
| Gerenciador de pacotes | pnpm (via mise) | 10.34 | https://pnpm.io/motivation · https://mise.jdx.dev/ |  |
| Runtime e deploy | Node (via mise); Vercel | Node 22 | https://nodejs.org/docs/latest-v22.x/api/ · https://vercel.com/docs |  |
| Observabilidade | - | - | - |  |

## Fora da stack
- Tailwind: o DS usa só CSS Modules e tokens `var(--...)`; utilitários fora do padrão de tokens quebram a regra de estilo.
