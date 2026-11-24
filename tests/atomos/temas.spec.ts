import { expect, test } from "@playwright/test"
import { TEMAS_MANUAL, type TemaManual, type TokenComponente } from "../fixtures/manual"
import { abrirStory, idDaStory, rgb } from "./storybook"

/**
 * CA15 (RF14): cada átomo do manual, nos 10 temas, pinta com os tokens de componente do tema.
 * As próximas tasks acrescentam os átomos delas em ATOMOS.
 */

type Amostra = {
  /** Nome acessível do elemento na story (texto do botão, rótulo etc.); com papel "texto", o texto exato. */
  nome: string
  /** Papel ARIA, ou "texto" para elementos sem papel (a etiqueta), achados pelo texto. */
  papel: "button" | "link" | "img" | "texto"
  /** Propriedade CSS computada → token de componente esperado. */
  cores: Partial<Record<"background-color" | "color" | "border-top-color", TokenComponente>>
}

type Atomo = { titulo: string; story: string; amostras: Amostra[] }

const ATOMOS: Atomo[] = [
  {
    titulo: "Atoms/Botao",
    story: "Variantes",
    amostras: [
      { nome: "sólido", papel: "button", cores: { "background-color": "botao", color: "botao-texto" } },
      { nome: "ação", papel: "button", cores: { "background-color": "acento" } },
      { nome: "contorno", papel: "button", cores: { color: "texto", "border-top-color": "texto" } },
    ],
  },
  {
    titulo: "Atoms/Badge",
    story: "Variantes",
    amostras: [
      { nome: "traçada", papel: "texto", cores: { color: "texto", "border-top-color": "texto" } },
      { nome: "traçada em acento", papel: "texto", cores: { color: "acento", "border-top-color": "acento" } },
      { nome: "cheia em acento", papel: "texto", cores: { "background-color": "acento" } },
      { nome: "cheia", papel: "texto", cores: { "background-color": "texto", color: "fundo" } },
    ],
  },
]

const TEMAS = Object.keys(TEMAS_MANUAL) as TemaManual[]

for (const atomo of ATOMOS) {
  test(`CA15: ${atomo.titulo} segue os tokens dos 10 temas`, async ({ page, request }) => {
    test.slow() // percorre os 10 temas
    const id = await idDaStory(request, atomo.titulo, atomo.story)
    for (const tema of TEMAS) {
      await abrirStory(page, id, tema)
      for (const amostra of atomo.amostras) {
        const alvo =
          amostra.papel === "texto"
            ? page.getByText(amostra.nome, { exact: true })
            : page.getByRole(amostra.papel, { name: amostra.nome, exact: true })
        for (const [propriedade, token] of Object.entries(amostra.cores)) {
          await expect
            .soft(alvo, `${tema} · ${amostra.nome} · ${propriedade} = --${token}`)
            .toHaveCSS(propriedade, rgb(TEMAS_MANUAL[tema][token]))
        }
      }
    }
  })
}
