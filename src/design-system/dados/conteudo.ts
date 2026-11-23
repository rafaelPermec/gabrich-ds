/**
 * Formatos de conteúdo dos cursos (RF9): listas dos cards de preço, descritivos, módulos e aulas,
 * depoimentos e antes e depois. Os textos chegam no dado; o design system só os exibe.
 */
import type { CursoOnline } from "./oferta"

/** Cursos online + No Estúdio (workshop presencial). */
export type Curso = CursoOnline | "ne"

/** 2 · 05.05b: lista oficial do card de preço, na ordem; a numeração ("01 · ") é da exibição. */
export type ListaDoCard = {
  curso: Curso
  itens: readonly string[]
}

/** 2 · 07b / 6 · 03b: descrição do produto (Hotmart), em parágrafos e listas, como aprovada. */
export type Descritivo = {
  curso: Curso
  blocos: readonly ({ tipo: "paragrafo"; texto: string } | { tipo: "lista"; itens: readonly string[] })[]
}

/** 2 · 05.17: aula (Luz na Prática) ou conteúdo (Mais que um Click). */
export type Aula = {
  numero: number
  titulo: string
  /** Uma linha de resumo. */
  resumo: string
  /** Agrupamento dentro do módulo, ex.: "PROJETO 01" no módulo 12 do Mais que um Click. */
  grupo?: string
}

export type Modulo = {
  numero: number
  nome: string
  /** Troca o "MÓDULO [nº]" do painel, ex.: "MATERIAL EXTRA" no módulo 14 do Mais que um Click. */
  etiqueta?: string
  /** A quantidade exibida ("2 AULAS", "1 CONTEÚDO") é o tamanho desta lista. */
  aulas: readonly Aula[]
}

/** Módulos de um curso; o No Estúdio tem cronograma próprio e o Antes da Foto, capítulos (fora do padrão). */
export type ModulosDoCurso = {
  curso: Exclude<CursoOnline, "adf">
  /** "continua": 01 a 27 no curso (Luz na Prática); "por-modulo": recomeça em 01 (Mais que um Click). */
  numeracao: "continua" | "por-modulo"
  modulos: readonly Modulo[]
}

/**
 * Depoimento nas palavras da aluna, sem editar (C06). O curso é obrigatório; o nome vem no
 * dado quando é conhecido (no print, ele já aparece na imagem).
 */
export type Depoimento = {
  curso: Curso
  nome?: string
  midia:
    | { tipo: "video"; youtubeId: string; legenda?: string }
    | { tipo: "print"; arquivo: string }
    | { tipo: "texto"; texto: string }
}

/** 2 · 05.16: uma aluna, uma foto antes e uma depois, com a legenda do manual. */
export type AntesEDepois = {
  nome: string
  /** Ex.: "Aluna Mais que um Click e Luz na Prática". */
  legenda: string
  fotoAntes: string
  fotoDepois: string
}
