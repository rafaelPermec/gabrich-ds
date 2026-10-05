'use client';
import { useEffect, useState } from 'react';
import { Badge } from '../../design-system/atoms/Badge';
import { Tabs } from '../../design-system/molecules/Tabs';
import { bfThemes, submarcas, type BFBase } from '../../design-system/tokens/index';
import { Wordmark } from './Submarcas';
import { Cta, SubScope, brl } from './shared';
import {
  courseNames, phases, products, resolvePackage,
  type CourseKey, type Phase,
} from './blackFridayData';
import styles from './BlackFriday.module.css';

/* ── elementos do kit ── */

function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className={styles.marquee} aria-label={items.join(' · ')}>
      <div className={styles.track} aria-hidden="true">
        {row.concat(row).map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function Title() {
  return (
    <h3 className={styles.bfTitle}>
      <span>BLACK</span>
      <span>FRIDAY</span>
    </h3>
  );
}

function useCountdown(target?: string, active = false) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [active]);
  if (!target) return { dias: 0, horas: 0, min: 0, seg: 0 };
  const ms = Math.max(0, new Date(target).getTime() - now);
  const total = Math.floor(ms / 1000);
  return {
    dias: Math.floor(total / 86400),
    horas: Math.floor((total % 86400) / 3600),
    min: Math.floor((total % 3600) / 60),
    seg: total % 60,
  };
}

function Counter({ phase }: { phase: Phase }) {
  const c = useCountdown(phase.target, !!phase.counter);
  if (!phase.counter) return null;
  const labels = { dias: 'dias', horas: 'horas', min: 'min', seg: 'seg' };
  return (
    <div className={styles.counter} role="timer" aria-label={phase.counterText}>
      <p className={styles.mono}>{phase.counterText}</p>
      <div className={styles.units}>
        {phase.counter.map((u) => (
          <div key={u}>
            <strong>{String(c[u]).padStart(2, '0')}</strong>
            <span className={styles.mono}>{labels[u]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 1. Fases e contador ── */
function Phases() {
  const [id, setId] = useState<Phase['id']>('espera');
  const [openBase, setOpenBase] = useState<BFBase>('preto');
  const phase = phases.find((p) => p.id === id)!;
  const base: BFBase = phase.id === 'aberto' ? openBase : phase.base;
  const fileName = `bf26_feed_${phase.id}_${base}_1080x1350`;
  const tagColor = base === 'preto' ? 'ochre' : 'ink';

  return (
    <div className={styles.phases}>
      <div className={styles.phaseNav} role="radiogroup" aria-label="Fase da campanha">
        {phases.map((p) => (
          <button
            key={p.id}
            role="radio"
            aria-checked={p.id === id}
            className={[styles.phaseBtn, p.id === id ? styles.phaseOn : ''].join(' ')}
            onClick={() => setId(p.id)}
          >
            <span className={styles.mono}>{p.dates}</span>
            <strong>{p.label}</strong>
          </button>
        ))}
      </div>

      <div className={styles.phaseBody}>
        <SubScope theme={bfThemes[base]} className={[styles.piece, base === 'preto' ? styles.pieceInk : ''].join(' ')}>
          <div className={styles.frame}>
            <div className={styles.pieceTop}>
              <Badge variant="outline" color={tagColor} size="sm">Black Friday</Badge>
              <Badge variant="outline" color={tagColor} size="sm">{phase.tag}</Badge>
            </div>
            <Title />
            <p className={styles.fifty} aria-label="50 por cento">50<small>%</small></p>
            <p className={styles.support}>{phase.line}</p>
            <Counter phase={phase} />
            <Cta size="g">{phase.cta}</Cta>
            <p className={[styles.mono, styles.foot].join(' ')}>{fileName}</p>
          </div>
        </SubScope>

        <dl className={styles.spec}>
          <div><dt>etiqueta</dt><dd>{phase.tag}</dd></div>
          <div><dt>período</dt><dd>{phase.dates}</dd></div>
          <div><dt>base</dt><dd>{phase.id === 'aberto' ? 'alterna preto / papel' : phase.base}</dd></div>
          <div><dt>contador</dt><dd>{phase.counter ? phase.counter.join(' · ') : 'não aparece'}</dd></div>
          <div><dt>botão</dt><dd>{phase.cta}</dd></div>
          {phase.id === 'aberto' && (
            <div>
              <dt>alternar base</dt>
              <dd>
                <button className={styles.toggle} onClick={() => setOpenBase((b) => (b === 'preto' ? 'papel' : 'preto'))}>
                  usar {openBase === 'preto' ? 'papel' : 'preto'}
                </button>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}

/* ── 2. Box de preço ── */
function PriceBox() {
  const [id, setId] = useState('click+luz');
  const p = products.find((x) => x.id === id)!;
  const highlight = p.id === 'click+luz';
  const [base, setBase] = useState<BFBase>('preto');
  const tagColor = base === 'preto' ? 'ochre' : 'ink';

  return (
    <div className={styles.priceWrap}>
      <div className={styles.productList} role="radiogroup" aria-label="Produto">
        {products.map((x) => (
          <button
            key={x.id}
            role="radio"
            aria-checked={x.id === id}
            className={[styles.productBtn, x.id === id ? styles.productOn : ''].join(' ')}
            onClick={() => setId(x.id)}
          >
            <span className={styles.mark} aria-hidden="true" />
            <span>{x.name}</span>
            <span className={styles.mono}>{brl(x.por)}</span>
          </button>
        ))}
      </div>

      <div className={styles.priceStage}>
        <div className={styles.baseSwitch} role="group" aria-label="Base da peça">
          {(['preto', 'papel'] as BFBase[]).map((b) => (
            <button key={b} aria-pressed={base === b} onClick={() => setBase(b)} className={styles.toggle}>
              {b}
            </button>
          ))}
        </div>
        <SubScope theme={bfThemes[base]} className={styles.priceBox}>
          <div className={[styles.boxFrame, highlight ? styles.boxHighlight : ''].join(' ')}>
            <div className={styles.pieceTop}>
              {p.tag && <Badge variant="outline" color={tagColor} size="sm">{p.tag}</Badge>}
              <Badge variant="outline" color="ink" size="sm" className={styles.info}>À vista ou 12x</Badge>
            </div>
            <div className={styles.logos}>
              {p.courses.length === 0 ? (
                <span className={styles.ebook}>e-book antes da foto</span>
              ) : (
                p.courses.map((c) => (
                  <span key={c} className={styles.logoTile} style={{ background: submarcas[c].theme.bg }}>
                    <SubScope theme={submarcas[c].theme} className={styles.logoInner}>
                      <Wordmark id={c} size="sm" />
                    </SubScope>
                  </span>
                ))
              )}
            </div>
            <div className={styles.weave}>
              <p className={styles.de}>de {brl(p.de)} por</p>
              <p className={styles.x12}>12x {brl(p.x12)}</p>
              <p className={styles.mono}>ou {brl(p.por)} à vista</p>
            </div>
            <ul className={styles.benefits}>
              {p.benefits.map((b, i) => (
                <li key={`${b}-${i}`}>{b}</li>
              ))}
            </ul>
            <Cta size="m">{p.courses.length > 1 ? 'quero o combo' : p.id === 'ebook' ? 'quero o e-book' : 'garantir com 50%'}</Cta>
            <p className={[styles.mono, styles.guarantee].join(' ')}>7 dias de garantia</p>
          </div>
        </SubScope>
      </div>
    </div>
  );
}

/* ── 3. Simulador ── */
function Simulator() {
  const [page, setPage] = useState<CourseKey>('luz');
  const [sel, setSel] = useState<CourseKey[]>(['luz']);
  const order: CourseKey[] = [page, ...(['luz', 'click', 'adf'] as CourseKey[]).filter((k) => k !== page)];
  const pkg = resolvePackage(sel);

  let suggestion: { key: CourseKey; extra: number } | null = null;
  if (pkg) {
    for (const k of order.filter((x) => !sel.includes(x))) {
      const next = resolvePackage([...sel, k])!;
      const extra = next.product.por - pkg.product.por;
      if (!suggestion || extra < suggestion.extra) suggestion = { key: k, extra };
    }
  }

  return (
    <SubScope theme={bfThemes.papel} className={styles.sim}>
      <div className={styles.simList}>
        <p className={styles.mono}>você está na página de</p>
        <div className={styles.pageSwitch} role="radiogroup" aria-label="Curso da página atual">
          {(Object.keys(courseNames) as CourseKey[]).map((k) => (
            <button
              key={k}
              role="radio"
              aria-checked={page === k}
              className={[styles.toggle, page === k ? styles.toggleOn : ''].join(' ')}
              onClick={() => {
                setPage(k);
                setSel([k]);
              }}
            >
              {courseNames[k]}
            </button>
          ))}
        </div>
        <h4 className={styles.simTitle}>monte a sua black friday</h4>
        <ul className={styles.simItems}>
          {order.map((k) => {
            const on = sel.includes(k);
            return (
              <li key={k}>
                <label className={[styles.simRow, on ? styles.simOn : ''].join(' ')}>
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => setSel((s) => (on ? s.filter((x) => x !== k) : [...s, k]))}
                  />
                  <span className={styles.round} aria-hidden="true" />
                  <SubScope theme={submarcas[k].theme} className={styles.simLogo}>
                    <Wordmark id={k} size="sm" />
                  </SubScope>
                  {k === page && <span className={styles.mono}>desta página</span>}
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.simSum} aria-live="polite">
        <p className={styles.mono}>resumo</p>
        {pkg ? (
          <>
            <p className={styles.simName}>{pkg.product.name}</p>
            {pkg.completed && (
              <p className={styles.simNote}>Essa combinação não existe como pacote — completamos com o pacote mais barato que contém tudo.</p>
            )}
            <p className={styles.de}>de {brl(pkg.product.de)} por</p>
            <p className={styles.x12}>12x {brl(pkg.product.x12)}</p>
            <p className={styles.mono}>ou {brl(pkg.product.por)} à vista</p>
            <p className={styles.save}>você economiza {brl(pkg.product.de - pkg.product.por)}</p>
            {suggestion && (
              <p className={styles.simNote}>
                Por mais {brl(suggestion.extra)} você leva também <strong>{courseNames[suggestion.key]}</strong>.
              </p>
            )}
            <Cta size="m">garantir com 50%</Cta>
          </>
        ) : (
          <p className={styles.simNote}>Marque o que você quer levar. O preço só aparece aqui, no resumo.</p>
        )}
      </div>
    </SubScope>
  );
}

/* ── 4. Peça de curso ── */
const courseVoice: Record<CourseKey, { contrast: string; button: string }> = {
  luz: { contrast: 'ocre sobre o fundo do curso: 7,8:1', button: 'dourado #D9A648, texto carvão' },
  click: { contrast: 'ocre sobre o fundo do curso: 7,5:1', button: 'amarelo #F5C242, texto carvão' },
  adf: { contrast: 'ocre sobre o fundo do curso: 8,9:1', button: 'whiskey sour #D39858, texto preto' },
};
const coursePrice: Record<CourseKey, number> = { luz: 217, click: 497, adf: 147 };

function CoursePiece({ k }: { k: CourseKey }) {
  const sub = submarcas[k];
  const p = products.find((x) => x.id === k)!;
  return (
    <div className={styles.courseWrap}>
      <SubScope theme={sub.theme} className={styles.coursePiece}>
        <Wordmark id={k} size="lg" />
        <div className={styles.cpBody}>
          <span className={styles.bfTag}>Black Friday · 50%</span>
          <p className={styles.de}>de {brl(p.de)} por</p>
          <p
            className={styles.cpPrice}
            style={{ fontFamily: sub.priceFont, fontWeight: sub.priceWeight }}
          >
            12x {brl(p.x12)}
          </p>
          <p className={styles.mono}>ou {brl(coursePrice[k])} à vista</p>
        </div>
        <Cta size="m">garantir com 50%</Cta>
      </SubScope>
      <dl className={styles.spec}>
        <div><dt>identidade</dt><dd>fundo, logo, fonte e botão do curso — intactos</dd></div>
        <div><dt>etiqueta</dt><dd>traçada ocre, sempre acima do preço, nunca sobre a logo</dd></div>
        <div><dt>preço</dt><dd>{sub.priceFont.split(',')[0].replace(/'/g, '')} {sub.priceWeight}</dd></div>
        <div><dt>botão</dt><dd>{courseVoice[k].button}</dd></div>
        <div><dt>contraste</dt><dd>{courseVoice[k].contrast}</dd></div>
      </dl>
    </div>
  );
}

function CoursePieceTabs() {
  return (
    <Tabs
      items={(['luz', 'click', 'adf'] as CourseKey[]).map((k) => ({
        id: k,
        label: courseNames[k],
        content: <CoursePiece k={k} />,
      }))}
    />
  );
}

export const bfCases = {
  phases: () => (
    <div className={styles.root}>
      <Marquee items={['BLACK FRIDAY', '50% EM TODOS OS CURSOS', 'ATÉ 27.11', '12X OU À VISTA']} />
      <Phases />
    </div>
  ),
  price: () => <PriceBox />,
  simulator: () => <Simulator />,
  course: () => <CoursePieceTabs />,
};
