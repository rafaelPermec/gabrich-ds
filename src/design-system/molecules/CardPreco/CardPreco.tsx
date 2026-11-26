"use client"
import type { HTMLAttributes } from "react"
import { Badge, Badges } from "../../atoms/Badge/index"
import { LogoCurso, type LogoCursoCurso } from "../../atoms/LogoCurso/index"
import { Marcador } from "../../atoms/Marcador/index"
import { useValidacao } from "../../context/ValidacaoDeDados"
import type { Curso } from "../../dados/conteudo"
import { formatarMoeda, formatarMoedaComCentavos, formatarParcela, formatarParcelaComCentavos } from "../../dados/moeda"
import { destinoDoCheckout, type Oferta, type OfertaPresencial } from "../../dados/oferta"
import { validarOferta, validarOfertaPresencial } from "../../dados/validacao"
import styles from "./CardPreco.module.css"

type Comum = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  /** Lista oficial do card (`ListaDoCard.itens`), na ordem. */
  lista: readonly string[]
  /** Card no fundo claro: aplica `<curso>-claro`. */
  claro?: boolean
}

export type CardPrecoProps = Comum &
  (
    | { oferta: Oferta | OfertaPresencial; blackFriday?: false; descontoDaCampanha?: never }
    /**
     * Versão Black Friday: só oferta online de curso único (o No Estúdio não entra na Black).
     * `descontoDaCampanha` é o "50%" aprovado da etiqueta e do botão, que chega como dado (R16, R17).
     */
    | { oferta: Oferta; blackFriday: true; descontoDaCampanha: number }
  )

/** O dado usa `lp`; o átomo da logo, `lnp`. */
const LOGO: Record<Curso, LogoCursoCurso> = { lp: "lnp", mqc: "mqc", adf: "adf", ne: "ne" }

const TIPO: Record<Curso, string> = {
  adf: "E-BOOK",
  lp: "CURSO ONLINE",
  mqc: "CURSO ONLINE",
  ne: "WORKSHOP FOTOGRAFIA DE PRODUTOS",
}

const BOTAO_NORMAL: Record<Curso, string> = {
  adf: "quero o e-book",
  lp: "quero o curso",
  mqc: "quero o curso",
  ne: "quero me inscrever no workshop",
}

/** Marcador da lista (2 · 05.05b): travessão no Antes da Foto, triângulo no No Estúdio, ponto nos outros. */
const MARCA: Record<Curso, "travessao" | "ponto" | "triangulo"> = {
  adf: "travessao",
  lp: "ponto",
  mqc: "ponto",
  ne: "triangulo",
}

const ehPresencial = (oferta: Oferta | OfertaPresencial): oferta is OfertaPresencial => !("cursos" in oferta)

function problemasDaOferta(oferta: Oferta | OfertaPresencial): string[] {
  if (ehPresencial(oferta)) return validarOfertaPresencial(oferta)
  const problemas = validarOferta(oferta)
  if (oferta.cursos.length !== 1) problemas.push("o card de preço mostra uma oferta de curso único")
  return problemas
}

/** "12x R$ 22,44" → ["12x", "R$ 22,44"]: o "12x" sai menor no card. */
function partesDaParcela(textoDaParcela: string): [string, string] {
  const [vezes = "", ...resto] = textoDaParcela.split(" ")
  return [vezes, resto.join(" ")]
}

/**
 * Card de preço de cada curso (manual 2 · 05.05b): mesmo conteúdo e mesma ordem em todos, com o
 * visual do curso (`data-tema` próprio e os tokens `--card-preco-*`). Raio 16; botão e etiqueta
 * retos. Os valores vêm do dado; o selo de garantia fica fora do card (`CardsDePreco`).
 */
export function CardPreco(props: CardPrecoProps) {
  const { oferta, lista, claro = false, blackFriday, descontoDaCampanha, className, ...resto } = props
  const aviso = useValidacao(problemasDaOferta(oferta), "oferta")

  const presencial = ehPresencial(oferta)
  const curso: Curso = presencial ? oferta.curso : (oferta.cursos[0] ?? "lp")
  const emBlack = !presencial && blackFriday === true
  // No Estúdio com centavos ("R$ 1.547,00"), como no protótipo (RF14); cursos online sem.
  const moeda = presencial ? formatarMoedaComCentavos : formatarMoeda
  const textoDaParcela = presencial ? formatarParcelaComCentavos : formatarParcela
  const preco = presencial ? oferta.preco : emBlack ? oferta.precoBlack : oferta.precoNormal
  const parcela = presencial ? oferta.parcela : emBlack ? oferta.parcelaBlack : oferta.parcelaNormal
  const [vezes, valorDaParcela] = partesDaParcela(textoDaParcela(parcela))
  const marca = MARCA[curso]

  return (
    <>
      {aviso}
      <article
        data-card-preco=""
        data-tema={claro ? `${curso}-claro` : curso}
        className={[styles.card, presencial ? styles.centralizado : "", className].filter(Boolean).join(" ")}
        {...resto}
      >
        <LogoCurso data-parte="logo" curso={LOGO[curso]} className={styles.logo} />
        <p data-parte="tipo" className={styles.tipo}>
          {TIPO[curso]}
        </p>
        {presencial && (
          <p data-parte="vagas" className={styles.vagas}>
            VAGAS LIMITADAS <br />
            PARA O WORKSHOP PRESENCIAL
          </p>
        )}
        {emBlack && (
          <Badges data-parte="etiqueta" className={styles.etiqueta}>
            <Badge acento>{`-${descontoDaCampanha}%`}</Badge>
            <Badge>BLACK FRIDAY</Badge>
          </Badges>
        )}
        {emBlack && (
          <p data-parte="de-por" className={styles.dePor}>
            de R$ <s>{formatarMoeda(oferta.precoNormal).replace(/^R\$\s*/, "")}</s> por
          </p>
        )}
        <p data-parte="parcela" className={[styles.parcela, emBlack ? styles.aposDePor : ""].filter(Boolean).join(" ")}>
          <span className={styles.vezes}>{vezes} </span>
          {valorDaParcela}
        </p>
        <p data-parte="a-vista" className={styles.aVista}>
          {`ou ${moeda(preco)} à vista`}
        </p>
        <hr data-parte="fio" className={styles.fio} />
        <ul data-parte="lista" className={styles.lista}>
          {lista.map((item) => (
            <li key={item} className={styles.item}>
              {marca === "ponto" ? (
                <span className={styles.marca}>
                  <Marcador />
                </span>
              ) : (
                <span className={[styles.marca, styles[marca]].join(" ")} aria-hidden="true">
                  {marca === "travessao" ? "—" : null}
                </span>
              )}
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <a data-parte="botao" href={destinoDoCheckout(oferta, emBlack)} className={styles.botao}>
          {emBlack ? `garantir com ${descontoDaCampanha}%` : BOTAO_NORMAL[curso]}
        </a>
        <p data-parte="garantia" className={styles.garantia}>
          PAGAMENTO SEGURO · GARANTIA DE 7 DIAS
        </p>
      </article>
    </>
  )
}
