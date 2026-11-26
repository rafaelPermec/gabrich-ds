"use client"
import { Fragment, useId, useState, type HTMLAttributes } from "react"
import { AvisoDadoInvalido } from "../../atoms/AvisoDadoInvalido/index"
import { Badge, Badges } from "../../atoms/Badge/index"
import { Botao } from "../../atoms/Botao/index"
import botaoStyles from "../../atoms/Botao/Botao.module.css"
import { LogoCurso, type LogoCursoCurso } from "../../atoms/LogoCurso/index"
import { Marcador } from "../../atoms/Marcador/index"
import { formatarMoeda, formatarParcela } from "../../dados/moeda"
import {
  destinoDoCheckout,
  ofertaDaSelecao,
  resumoDePreco,
  type CursoOnline,
  type Oferta,
  type PrecosNormaisDosCursos,
} from "../../dados/oferta"
import styles from "./MonteSeuCombo.module.css"

type Comum = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  /** Curso da página: vem primeiro e já marcado. */
  cursoDaPagina: CursoOnline
  /** As ofertas online (cursos únicos e combos); a da seleção é achada por `ofertaDaSelecao`. */
  ofertas: readonly Oferta[]
  /** Preço normal à vista de cada curso, base do "preço separado". */
  precosNormais: PrecosNormaisDosCursos
  /** Descritivo de cada linha (Manrope 12). */
  descritivos: Readonly<Record<CursoOnline, string>>
  /** O que cada curso marcado inclui, uma linha por curso no resumo. */
  inclusos: Readonly<Record<CursoOnline, string>>
}

export type MonteSeuComboProps = Comum &
  (
    | { blackFriday?: false; descontoDaCampanha?: never }
    /** Monte a sua Black Friday. `descontoDaCampanha` é o "50%" da etiqueta e do botão, como dado (R16, R17). */
    | { blackFriday: true; descontoDaCampanha: number }
  )

/** Ordem do manual (2 · 05.12) depois do curso da página. */
const ORDEM: readonly CursoOnline[] = ["adf", "lp", "mqc"]
/** Ordem das logos no resumo (protótipo). */
const ORDEM_DO_RESUMO: readonly CursoOnline[] = ["mqc", "lp", "adf"]

/** O dado usa `lp`; o átomo da logo, `lnp`. */
const LOGO: Record<CursoOnline, LogoCursoCurso> = { lp: "lnp", mqc: "mqc", adf: "adf" }

/** "12x R$ 72,09" → ["12x", "R$ 72,09"]: o "12x" sai menor. */
function partesDaParcela(textoDaParcela: string): [string, string] {
  const [vezes = "", ...resto] = textoDaParcela.split(" ")
  return [vezes, resto.join(" ")]
}

function textoDoBotao(cursos: readonly CursoOnline[], emBlack: boolean, descontoDaCampanha?: number): string {
  if (cursos.length === 3) return "quero o completo"
  if (cursos.length === 2) return "quero o combo"
  // Curso único: o Antes da Foto é sempre "quero o e-book" (decisão do PRD).
  if (cursos[0] === "adf") return "quero o e-book"
  return emBlack ? `garantir com ${descontoDaCampanha}%` : "quero o curso"
}

/**
 * Monte seu combo / Monte a sua Black Friday (manual 2 · 05.12): três cursos para marcar em
 * qualquer combinação, o da página primeiro e marcado. A linha inteira é o alvo (checkbox nativo
 * oculto). O resumo mostra a oferta da combinação, com valores e porcentagens do dado; o botão
 * leva ao checkout dela. Cores dos 12 tokens do `data-tema` da página; fontes `--combo-*`.
 */
export function MonteSeuCombo(props: MonteSeuComboProps) {
  const {
    cursoDaPagina,
    ofertas,
    precosNormais,
    descritivos,
    inclusos,
    blackFriday,
    descontoDaCampanha,
    className,
    ...resto
  } = props
  const emBlack = blackFriday === true
  const [marcados, setMarcados] = useState<ReadonlySet<CursoOnline>>(() => new Set([cursoDaPagina]))
  const idDoTitulo = useId()

  const itens = [cursoDaPagina, ...ORDEM.filter((c) => c !== cursoDaPagina)]
  const selecao = ORDEM_DO_RESUMO.filter((c) => marcados.has(c))
  const oferta = ofertaDaSelecao(ofertas, selecao)

  const alternar = (curso: CursoOnline) =>
    setMarcados((atual) => {
      const novo = new Set(atual)
      if (novo.has(curso)) novo.delete(curso)
      else novo.add(curso)
      return novo
    })

  return (
    <section
      data-monte-seu-combo=""
      aria-labelledby={idDoTitulo}
      className={[styles.combo, className].filter(Boolean).join(" ")}
      {...resto}
    >
      <div role="group" aria-labelledby={idDoTitulo} className={styles.escolha}>
        {emBlack && (
          <Badges data-parte="etiqueta" className={styles.etiqueta}>
            <Badge acento>{`-${descontoDaCampanha}%`}</Badge>
            <Badge>BLACK FRIDAY</Badge>
          </Badges>
        )}
        <p id={idDoTitulo} data-parte="titulo" className={styles.titulo}>
          {emBlack ? "monte a sua black friday" : "monte seu combo"}
        </p>
        <p className={styles.subtitulo}>marque o que você quer levar.</p>
        {itens.map((curso) => (
          <label key={curso} data-curso={curso} className={styles.item}>
            <input
              type="checkbox"
              className={styles.oculto}
              checked={marcados.has(curso)}
              onChange={() => alternar(curso)}
            />
            <Marcador tipo="selecao" marcado={marcados.has(curso)} />
            <span className={styles.textos}>
              <LogoCurso curso={LOGO[curso]} className={styles.logo} />
              <span className={styles.descritivo}>{descritivos[curso]}</span>
            </span>
          </label>
        ))}
      </div>

      <div data-parte="resumo" aria-live="polite" className={styles.resumo}>
        <p className={styles.rotulo}>sua escolha</p>
        {selecao.length === 0 ? (
          <>
            <p className={styles.vazio}>marque pelo menos um curso.</p>
            <Botao data-parte="botao" variante="acao" disabled className={styles.botao}>
              {emBlack ? `garantir com ${descontoDaCampanha}%` : "quero o combo"}
            </Botao>
          </>
        ) : !oferta ? (
          <AvisoDadoInvalido origem="oferta" problemas={[`sem oferta para a seleção: ${selecao.join(" + ")}`]} />
        ) : (
          <Resumo
            oferta={oferta}
            selecao={selecao}
            precosNormais={precosNormais}
            inclusos={inclusos}
            emBlack={emBlack}
            descontoDaCampanha={descontoDaCampanha}
          />
        )}
      </div>
    </section>
  )
}

type ResumoProps = {
  oferta: Oferta
  selecao: readonly CursoOnline[]
  precosNormais: PrecosNormaisDosCursos
  inclusos: Readonly<Record<CursoOnline, string>>
  emBlack: boolean
  descontoDaCampanha?: number
}

/** RF9, RF10: logos, inclusões, preço separado e desconto (do dado), preço, economia e botão. */
function Resumo({ oferta, selecao, precosNormais, inclusos, emBlack, descontoDaCampanha }: ResumoProps) {
  const { preco, parcela, precoSeparado, economia } = resumoDePreco(oferta, precosNormais, emBlack)
  const [vezes, valorDaParcela] = partesDaParcela(formatarParcela(parcela))
  const desconto = emBlack
    ? { rotulo: selecao.length > 1 ? "desconto combo + black friday" : "desconto black friday", valor: `−${oferta.descontoBlack}%` }
    : oferta.descontoCombo === undefined
      ? undefined
      : { rotulo: "desconto combo", valor: `${oferta.descontoCombo}%` }

  return (
    <>
      <p data-parte="logos" className={styles.logos}>
        {selecao.map((curso, i) => (
          <Fragment key={curso}>
            {i > 0 && (
              <span className={styles.mais} aria-hidden="true">
                +
              </span>
            )}
            <LogoCurso curso={LOGO[curso]} className={styles.logo} />
          </Fragment>
        ))}
      </p>
      <ul data-parte="inclusos" className={styles.inclusos}>
        {selecao.map((curso) => (
          <li key={curso}>{inclusos[curso]}</li>
        ))}
      </ul>
      {precoSeparado !== undefined && (
        <dl data-parte="linhas" className={styles.linhas}>
          <div data-linha="separado" className={styles.linha}>
            <dt>preço separado</dt>
            <dd>{emBlack ? <s>{formatarMoeda(precoSeparado)}</s> : formatarMoeda(precoSeparado)}</dd>
          </div>
          {desconto && (
            <div data-linha="desconto" className={styles.linha}>
              <dt>{desconto.rotulo}</dt>
              <dd>{desconto.valor}</dd>
            </div>
          )}
        </dl>
      )}
      <p data-parte="parcela" className={styles.parcela}>
        <span className={styles.vezes}>{vezes} </span>
        {valorDaParcela}
      </p>
      <p data-parte="a-vista" className={styles.aVista}>{`ou ${formatarMoeda(preco)} à vista`}</p>
      {economia !== undefined && (
        <p data-parte="economia" className={styles.economia}>{`você economiza ${formatarMoeda(economia)}`}</p>
      )}
      <a
        data-parte="botao"
        href={destinoDoCheckout(oferta, emBlack)}
        className={[botaoStyles.botao, botaoStyles.acao, botaoStyles.medio, styles.botao].join(" ")}
      >
        {textoDoBotao(selecao, emBlack, descontoDaCampanha)}
      </a>
    </>
  )
}
