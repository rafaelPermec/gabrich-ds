"use client"

/* ── elementos do kit ── */

/* ── 1. Fases e contador ── */

/* ── 2. Box de preço ── */

/* ── 3. Simulador ── */

/* ── 4. Peça de curso ── */

import { useEffect, useState } from "react"
import { Badge, Badges } from "../../design-system/atoms/Badge"
import { Tabs } from "../../design-system/molecules/Tabs"
import {
  CURSOS_ONLINE,
  faseDaCampanha,
  formatarMoeda,
  formatarParcela,
  resumoDePreco,
  type CursoOnline,
  type DatasDaCampanha,
  type Oferta,
} from "../../design-system/dados/index"
import { LISTAS_DO_CARD_MOCK } from "../../design-system/mocks/conteudo"
import {
  OFERTAS_MOCK,
  PRECOS_NORMAIS_MOCK,
} from "../../design-system/mocks/ofertas"
import {
  bfThemes,
  submarcas,
  type BFBase,
} from "../../design-system/tokens/index"
import { Wordmark } from "./Submarcas"
import {
  ate,
  CAMPANHA,
  DESCONTO,
  periodo,
  type FaseDaPeca,
} from "./campanha"
import { SUBMARCA_DO_CURSO } from "./cursos"
import { Cta, SubScope } from "./shared"
import styles from "./BlackFriday.module.css"

const ofertaDoCurso = (curso: CursoOnline): Oferta => {
  const oferta = OFERTAS_MOCK.find(
    (o) => o.cursos.length === 1 && o.cursos[0] === curso,
  )
  if (!oferta) throw new Error(`mock sem a oferta do curso ${curso}`)
  return oferta
}
const nomeDoCurso = (curso: CursoOnline) =>
  ofertaDoCurso(curso).nome.toLowerCase()
const itensDoCard = (curso: CursoOnline) =>
  LISTAS_DO_CARD_MOCK.find((l) => l.curso === curso)?.itens ?? []

/** Curso único: a lista oficial do card; combo: o primeiro item da lista de cada curso. */
const beneficios = (oferta: Oferta) =>
  oferta.cursos.length === 1
    ? itensDoCard(oferta.cursos[0]!)
    : oferta.cursos.flatMap((c) => itensDoCard(c).slice(0, 1))

/** O pacote mais barato que contém todos os cursos marcados. */
function pacotePara(marcados: readonly CursoOnline[]) {
  if (marcados.length === 0) return null
  const oferta = OFERTAS_MOCK.filter((o) =>
    marcados.every((c) => o.cursos.includes(c)),
  ).reduce<Oferta | null>(
    (melhor, o) => (!melhor || o.precoBlack < melhor.precoBlack ? o : melhor),
    null,
  )
  return oferta
    ? { oferta, completou: oferta.cursos.length > marcados.length }
    : null
}

function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items]
  return (
    <div className={styles.marquee} aria-label={items.join(" · ")}>
      <div className={styles.track} aria-hidden="true">
        {row.concat(row).map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  )
}

function Title() {
  return (
    <h3 className={styles.bfTitle}>
      <span>BLACK</span>
      <span>FRIDAY</span>
    </h3>
  )
}

function useCountdown(target?: string, active = false) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    if (!active) return
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [active])
  if (!target) return { dias: 0, horas: 0, min: 0, seg: 0 }
  const ms = Math.max(0, Date.parse(target) - now)
  const total = Math.floor(ms / 1000)
  return {
    dias: Math.floor(total / 86400),
    horas: Math.floor((total % 86400) / 3600),
    min: Math.floor((total % 3600) / 60),
    seg: total % 60,
  }
}

interface Phase {
  id: FaseDaPeca
  /** Trecho do nome do arquivo da peça. */
  arquivo: string
  label: string
  tag: string
  base: BFBase
  counter: Array<"dias" | "horas" | "min" | "seg"> | null
  counterText?: string
  /** Data que o contador persegue. */
  alvo?: keyof DatasDaCampanha
  cta: string
  line: string
}

const phases: Phase[] = [
  {
    id: "lista-de-espera",
    arquivo: "espera",
    label: "lista de espera",
    tag: "Lista de espera · abre em",
    base: "preto",
    counter: ["dias", "horas", "min"],
    counterText: "a black friday começa em",
    alvo: "abertura",
    cta: "entrar na lista",
    line: `${DESCONTO}% na black friday`,
  },
  {
    id: "aberta",
    arquivo: "aberto",
    label: "aberto",
    tag: "Aberto",
    base: "preto",
    counter: null,
    cta: `garantir com ${DESCONTO}%`,
    line: `${DESCONTO}% em todos os cursos, até ${ate("fimBlack")}`,
  },
  {
    id: "ultima-semana",
    arquivo: "semana",
    label: "última semana",
    tag: "Última semana · termina em",
    base: "papel",
    counter: ["dias", "horas", "min", "seg"],
    counterText: "o desconto de black friday acaba em",
    alvo: "fimBlack",
    cta: `garantir com ${DESCONTO}%`,
    line: `São os últimos dias pra garantir a sua vaga com ${DESCONTO}% de desconto.`,
  },
  {
    id: "ultimas-24h",
    arquivo: "h24",
    label: "últimas 24h",
    tag: "Últimas 24h",
    base: "preto",
    counter: ["horas", "min", "seg"],
    counterText: "o desconto de black friday acaba em",
    alvo: "fimBlack",
    cta: `garantir com ${DESCONTO}%`,
    line: `Hoje é o último dia pra garantir a sua vaga com ${DESCONTO}% de desconto.`,
  },
  {
    id: "encerrada",
    arquivo: "encerrado",
    label: "encerrado",
    tag: "Encerrado",
    base: "papel",
    counter: null,
    cta: "entrar na lista",
    line: "A black friday terminou. Entre na lista para o próximo lançamento.",
  },
]

function Counter({ phase }: { phase: Phase }) {
  const c = useCountdown(
    phase.alvo && CAMPANHA[phase.alvo],
    !!phase.counter,
  )
  if (!phase.counter) return null
  const labels = { dias: "dias", horas: "horas", min: "min", seg: "seg" }
  return (
    <div className={styles.counter} role="timer" aria-label={phase.counterText}>
      <p className={styles.mono}>{phase.counterText}</p>
      <div className={styles.units}>
        {phase.counter.map((u) => (
          <div key={u}>
            <strong>{String(c[u]).padStart(2, "0")}</strong>
            <span className={styles.mono}>{labels[u]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
function Phases() {
  // Abre na fase de agora (fora da campanha, na lista de espera).
  const [id, setId] = useState<FaseDaPeca>(() => {
    const agora = faseDaCampanha(CAMPANHA, new Date())
    return agora === "normal" ? "lista-de-espera" : agora
  })
  const [openBase, setOpenBase] = useState<BFBase>("preto")
  const phase = phases.find((p) => p.id === id)!
  const base: BFBase = phase.id === "aberta" ? openBase : phase.base
  const fileName = `bf26_feed_${phase.arquivo}_${base}_1080x1350`

  return (
    <div className={styles.phases}>
      <div
        className={styles.phaseNav}
        role="radiogroup"
        aria-label="Fase da campanha"
      >
        {phases.map((p) => (
          <button
            key={p.id}
            role="radio"
            aria-checked={p.id === id}
            className={[
              styles.phaseBtn,
              p.id === id ? styles.phaseOn : "",
            ].join(" ")}
            onClick={() => setId(p.id)}
          >
            <span className={styles.mono}>{periodo(p.id)}</span>
            <strong>{p.label}</strong>
          </button>
        ))}
      </div>

      <div className={styles.phaseBody}>
        <SubScope
          theme={bfThemes[base]}
          className={[
            styles.piece,
            base === "preto" ? styles.pieceInk : "",
          ].join(" ")}
        >
          <div className={styles.frame}>
            <div className={styles.pieceTop}>
              <Badges>
                <Badge acento>Black Friday</Badge>
                <Badge>{phase.tag}</Badge>
              </Badges>
            </div>
            <Title />
            <p className={styles.fifty} aria-label={`${DESCONTO} por cento`}>
              {DESCONTO}
              <small>%</small>
            </p>
            <p className={styles.support}>{phase.line}</p>
            <Counter phase={phase} />
            <Cta size="g">{phase.cta}</Cta>
            <p className={[styles.mono, styles.foot].join(" ")}>{fileName}</p>
          </div>
        </SubScope>

        <dl className={styles.spec}>
          <div>
            <dt>etiqueta</dt>
            <dd>{phase.tag}</dd>
          </div>
          <div>
            <dt>período</dt>
            <dd>{periodo(phase.id)}</dd>
          </div>
          <div>
            <dt>base</dt>
            <dd>
              {phase.id === "aberta" ? "alterna preto / papel" : phase.base}
            </dd>
          </div>
          <div>
            <dt>contador</dt>
            <dd>{phase.counter ? phase.counter.join(" · ") : "não aparece"}</dd>
          </div>
          <div>
            <dt>botão</dt>
            <dd>{phase.cta}</dd>
          </div>
          {phase.id === "aberta" && (
            <div>
              <dt>alternar base</dt>
              <dd>
                <button
                  className={styles.toggle}
                  onClick={() =>
                    setOpenBase((b) => (b === "preto" ? "papel" : "preto"))
                  }
                >
                  usar {openBase === "preto" ? "papel" : "preto"}
                </button>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  )
}

const MAIS_ESCOLHIDA = "click-luz"
const TAG_DA_OFERTA: Readonly<Record<string, string>> = {
  "antes-da-foto": "Lançamento",
  "luz-antes-da-foto": "Combo",
  "click-antes-da-foto": "Combo",
  "click-luz": "Mais escolhido",
  completo: "Completo",
}

function PriceBox() {
  const [slug, setSlug] = useState(MAIS_ESCOLHIDA)
  const p = OFERTAS_MOCK.find((x) => x.slug === slug)!
  const resumo = resumoDePreco(p, PRECOS_NORMAIS_MOCK, true)
  const tag = TAG_DA_OFERTA[p.slug]
  const highlight = p.slug === MAIS_ESCOLHIDA
  const [base, setBase] = useState<BFBase>("preto")

  return (
    <div className={styles.priceWrap}>
      <div
        className={styles.productList}
        role="radiogroup"
        aria-label="Produto"
      >
        {OFERTAS_MOCK.map((x) => (
          <button
            key={x.slug}
            role="radio"
            aria-checked={x.slug === slug}
            className={[
              styles.productBtn,
              x.slug === slug ? styles.productOn : "",
            ].join(" ")}
            onClick={() => setSlug(x.slug)}
          >
            <span className={styles.mark} aria-hidden="true" />
            <span>{x.nome.toLowerCase()}</span>
            <span className={styles.mono}>{formatarMoeda(x.precoBlack)}</span>
          </button>
        ))}
      </div>

      <div className={styles.priceStage}>
        <div
          className={styles.baseSwitch}
          role="group"
          aria-label="Base da peça"
        >
          {(["preto", "papel"] as BFBase[]).map((b) => (
            <button
              key={b}
              aria-pressed={base === b}
              onClick={() => setBase(b)}
              className={styles.toggle}
            >
              {b}
            </button>
          ))}
        </div>
        <SubScope theme={bfThemes[base]} className={styles.priceBox}>
          <div
            className={[
              styles.boxFrame,
              highlight ? styles.boxHighlight : "",
            ].join(" ")}
          >
            <Badges>
              {tag && (
                <Badge acento={base === "preto"}>{tag}</Badge>
              )}
              <Badge>À vista ou 12x</Badge>
            </Badges>
            <div className={styles.logos}>
              {p.cursos.map((c) => (
                <span key={c} className={styles.logoTile}>
                  <SubScope
                    theme={submarcas[SUBMARCA_DO_CURSO[c]].theme}
                    className={styles.logoInner}
                  >
                    <Wordmark id={SUBMARCA_DO_CURSO[c]} size="sm" />
                  </SubScope>
                </span>
              ))}
            </div>
            <div className={styles.weave}>
              <p className={styles.de}>
                de {formatarMoeda(resumo.precoSeparado ?? p.precoNormal)} por
              </p>
              <p className={styles.x12}>{formatarParcela(resumo.parcela)}</p>
              <p className={styles.mono}>
                ou {formatarMoeda(resumo.preco)} à vista
              </p>
            </div>
            <ul className={styles.benefits}>
              {beneficios(p).map((b, i) => (
                <li key={`${b}-${i}`}>{b}</li>
              ))}
            </ul>
            <Cta size="m">
              {p.cursos.length > 1
                ? "quero o combo"
                : `garantir com ${DESCONTO}%`}
            </Cta>
            <p className={[styles.mono, styles.guarantee].join(" ")}>
              7 dias de garantia
            </p>
          </div>
        </SubScope>
      </div>
    </div>
  )
}
function Simulator() {
  const [page, setPage] = useState<CursoOnline>("lp")
  const [sel, setSel] = useState<CursoOnline[]>(["lp"])
  const order: CursoOnline[] = [
    page,
    ...CURSOS_ONLINE.filter((k) => k !== page),
  ]
  const pkg = pacotePara(sel)
  const resumo = pkg && resumoDePreco(pkg.oferta, PRECOS_NORMAIS_MOCK, true)

  let suggestion: { key: CursoOnline; extra: number } | null = null
  if (pkg) {
    for (const k of order.filter((x) => !sel.includes(x))) {
      const next = pacotePara([...sel, k])
      if (!next) continue
      const extra = next.oferta.precoBlack - pkg.oferta.precoBlack
      if (!suggestion || extra < suggestion.extra)
        suggestion = { key: k, extra }
    }
  }

  return (
    <SubScope theme={bfThemes.papel} className={styles.sim}>
      <div className={styles.simList}>
        <p className={styles.mono}>você está na página de</p>
        <div
          className={styles.pageSwitch}
          role="radiogroup"
          aria-label="Curso da página atual"
        >
          {CURSOS_ONLINE.map((k) => (
            <button
              key={k}
              role="radio"
              aria-checked={page === k}
              className={[
                styles.toggle,
                page === k ? styles.toggleOn : "",
              ].join(" ")}
              onClick={() => {
                setPage(k)
                setSel([k])
              }}
            >
              {nomeDoCurso(k)}
            </button>
          ))}
        </div>
        <h4 className={styles.simTitle}>monte a sua black friday</h4>
        <ul className={styles.simItems}>
          {order.map((k) => {
            const on = sel.includes(k)
            return (
              <li key={k}>
                <label
                  className={[styles.simRow, on ? styles.simOn : ""].join(" ")}
                >
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() =>
                      setSel((s) => (on ? s.filter((x) => x !== k) : [...s, k]))
                    }
                  />
                  <span className={styles.round} aria-hidden="true" />
                  <SubScope
                    theme={submarcas[SUBMARCA_DO_CURSO[k]].theme}
                    className={styles.simLogo}
                  >
                    <Wordmark id={SUBMARCA_DO_CURSO[k]} size="sm" />
                  </SubScope>
                  {k === page && (
                    <span className={styles.mono}>desta página</span>
                  )}
                </label>
              </li>
            )
          })}
        </ul>
      </div>

      <div className={styles.simSum} aria-live="polite">
        <p className={styles.mono}>resumo</p>
        {pkg && resumo ? (
          <>
            <p className={styles.simName}>{pkg.oferta.nome.toLowerCase()}</p>
            {pkg.completou && (
              <p className={styles.simNote}>
                Essa combinação não existe como pacote — completamos com o
                pacote mais barato que contém tudo.
              </p>
            )}
            <p className={styles.de}>
              de {formatarMoeda(resumo.precoSeparado ?? resumo.preco)} por
            </p>
            <p className={styles.x12}>{formatarParcela(resumo.parcela)}</p>
            <p className={styles.mono}>
              ou {formatarMoeda(resumo.preco)} à vista
            </p>
            {resumo.economia !== undefined && (
              <p className={styles.save}>
                você economiza {formatarMoeda(resumo.economia)}
              </p>
            )}
            {suggestion && (
              <p className={styles.simNote}>
                Por mais {formatarMoeda(suggestion.extra)} você leva também{" "}
                <strong>{nomeDoCurso(suggestion.key)}</strong>.
              </p>
            )}
            <Cta size="m">garantir com {DESCONTO}%</Cta>
          </>
        ) : (
          <p className={styles.simNote}>
            Marque o que você quer levar. O preço só aparece aqui, no resumo.
          </p>
        )}
      </div>
    </SubScope>
  )
}
const courseVoice: Record<CursoOnline, { contrast: string; button: string }> = {
  lp: {
    contrast: "ocre sobre o fundo do curso: 7,8:1",
    button: "dourado, texto carvão",
  },
  mqc: {
    contrast: "ocre sobre o fundo do curso: 7,5:1",
    button: "amarelo, texto carvão",
  },
  adf: {
    contrast: "ocre sobre o fundo do curso: 8,9:1",
    button: "whiskey sour, texto preto",
  },
}

function CoursePiece({ k }: { k: CursoOnline }) {
  const sub = submarcas[SUBMARCA_DO_CURSO[k]]
  const p = ofertaDoCurso(k)
  const resumo = resumoDePreco(p, PRECOS_NORMAIS_MOCK, true)
  return (
    <div className={styles.courseWrap}>
      <SubScope theme={sub.theme} className={styles.coursePiece}>
        <Wordmark id={SUBMARCA_DO_CURSO[k]} size="lg" />
        <div className={styles.cpBody}>
          <span className={styles.bfTag}>Black Friday · {DESCONTO}%</span>
          <p className={styles.de}>
            de {formatarMoeda(resumo.precoSeparado ?? p.precoNormal)} por
          </p>
          <p
            className={styles.cpPrice}
            style={{ fontFamily: sub.priceFont, fontWeight: sub.priceWeight }}
          >
            {formatarParcela(resumo.parcela)}
          </p>
          <p className={styles.mono}>ou {formatarMoeda(resumo.preco)} à vista</p>
        </div>
        <Cta size="m">garantir com {DESCONTO}%</Cta>
      </SubScope>
      <dl className={styles.spec}>
        <div>
          <dt>identidade</dt>
          <dd>fundo, logo, fonte e botão do curso — intactos</dd>
        </div>
        <div>
          <dt>etiqueta</dt>
          <dd>traçada ocre, sempre acima do preço, nunca sobre a logo</dd>
        </div>
        <div>
          <dt>preço</dt>
          <dd>
            {sub.priceFont.split(",")[0].replace(/'/g, "")} {sub.priceWeight}
          </dd>
        </div>
        <div>
          <dt>botão</dt>
          <dd>{courseVoice[k].button}</dd>
        </div>
        <div>
          <dt>contraste</dt>
          <dd>{courseVoice[k].contrast}</dd>
        </div>
      </dl>
    </div>
  )
}

function CoursePieceTabs() {
  return (
    <Tabs
      items={CURSOS_ONLINE.map((k) => ({
        id: k,
        label: nomeDoCurso(k),
        content: <CoursePiece k={k} />,
      }))}
    />
  )
}


export const bfCases = {
  phases: () => (
    <div className={styles.root}>
      <Marquee
        items={[
          "BLACK FRIDAY",
          `${DESCONTO}% EM TODOS OS CURSOS`,
          `ATÉ ${ate("fimBlack")}`,
          "12X OU À VISTA",
        ]}
      />
      <Phases />
    </div>
  ),
  price: () => <PriceBox />,
  simulator: () => <Simulator />,
  course: () => <CoursePieceTabs />,
}
