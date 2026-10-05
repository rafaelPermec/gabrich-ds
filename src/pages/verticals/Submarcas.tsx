'use client';
import { useState } from 'react';
import { Button } from '../../design-system/atoms/Button';
import { Input } from '../../design-system/atoms/Input';
import { ProgressBar } from '../../design-system/atoms/ProgressBar';
import { Alert } from '../../design-system/molecules/Alert';
import { FormField } from '../../design-system/molecules/FormField';
import { ListItem } from '../../design-system/molecules/ListItem';
import { Stat } from '../../design-system/molecules/Stat';
import { Tabs } from '../../design-system/molecules/Tabs';
import { submarcas, type SubmarcaId } from '../../design-system/tokens/index';
import { Cta, PHOTOS, SubScope, img } from './shared';
import styles from './Submarcas.module.css';

export function Wordmark({ id, size = 'md' }: { id: SubmarcaId; size?: 'sm' | 'md' | 'lg' }) {
  const cls = [styles.wm, styles['wm-' + id], styles['wm-' + size]].join(' ');
  if (id === 'luz') {
    return (
      <span className={cls}>
        <span className={styles.light}>LUZ NA</span>
        <b>PRÁTICA</b>
      </span>
    );
  }
  if (id === 'adf') {
    return (
      <span className={cls}>
        antesdafoto<i className={styles.dot}>.</i>
      </span>
    );
  }
  return (
    <span className={cls}>
      <i className={styles.c1} /><i className={styles.c2} /><i className={styles.c3} /><i className={styles.c4} />
      {id === 'estudio' && <i className={styles.center} />}
      <span className={styles.wmText}>{id === 'estudio' ? 'no estúdio' : <>mais que<br />um click</>}</span>
    </span>
  );
}

interface Copy {
  headline: string;
  desc: string;
  facts: Array<[string, string]>;
  modules: Array<{ label: string; sub: string }>;
  cta: string;
  photo: string;
  enrollLabel: string;
  includes: string;
}

const copy: Record<SubmarcaId, Copy> = {
  estudio: {
    headline: 'aprenda no set, com a luz na mão',
    desc: 'Dois dias dentro do estúdio da Débora: você monta, fotografa e revisa o resultado ao vivo, com feedback na hora.',
    facts: [['2', 'dias de imersão'], ['12', 'vagas por turma'], ['1', 'set por aluno']],
    modules: [
      { label: 'Montagem do set', sub: 'dia 1 · manhã · prática' },
      { label: 'Luz e reflexo', sub: 'dia 1 · tarde · prática' },
      { label: 'Direção do produto', sub: 'dia 2 · manhã · prática' },
      { label: 'Revisão ao vivo', sub: 'dia 2 · tarde · crítica' },
    ],
    cta: 'quero minha vaga',
    photo: PHOTOS.studio,
    enrollLabel: 'turma presencial · 12 vagas',
    includes: 'Dois dias de set, material de apoio impresso, almoço e revisão individual do seu portfólio.',
  },
  luz: {
    headline: 'uma luz, muito critério',
    desc: 'Seis módulos para fotografar com um flash, um rebatedor e decisões que fazem o produto parecer caro.',
    facts: [['6', 'módulos'], ['24', 'aulas'], ['9h', 'de conteúdo']],
    modules: [
      { label: 'Luz dura x luz macia', sub: '12 min · vídeo' },
      { label: 'Controlando reflexos em vidro', sub: '18 min · vídeo' },
      { label: 'Fundo infinito com papel', sub: '15 min · vídeo' },
      { label: 'Exercício: seu primeiro set', sub: '40 min · prática' },
    ],
    cta: 'quero a luz',
    photo: PHOTOS.glasses,
    enrollLabel: 'curso online · acesso por 12 meses',
    includes: 'Aulas gravadas, encontro mensal ao vivo, feedback em 3 exercícios e certificado.',
  },
  click: {
    headline: 'fotografar é decidir antes de clicar',
    desc: 'Composição, narrativa e edição com intenção — o que separa uma foto correta de uma foto que vende.',
    facts: [['5', 'módulos'], ['31', 'aulas'], ['12h', 'de conteúdo']],
    modules: [
      { label: 'Olhar e composição', sub: '22 min · vídeo' },
      { label: 'Narrativa de produto', sub: '28 min · vídeo' },
      { label: 'Edição com intenção', sub: '35 min · vídeo' },
      { label: 'Portfólio que vende', sub: '45 min · prática' },
    ],
    cta: 'quero o click',
    photo: PHOTOS.sunglasses,
    enrollLabel: 'curso online · acesso por 12 meses',
    includes: 'Aulas gravadas, planilhas de planejamento, comunidade fechada e certificado.',
  },
  adf: {
    headline: 'o que acontece antes do clique',
    desc: 'Um e-book e uma masterclass sobre briefing, moodboard e paleta da cena — tudo que se resolve antes de ligar a câmera.',
    facts: [['1', 'e-book'], ['1', 'masterclass'], ['4', 'fichas prontas']],
    modules: [
      { label: 'Ficha de briefing', sub: 'capítulo 1 · exercício' },
      { label: 'Moodboard e referências', sub: 'capítulo 2 · colagem' },
      { label: 'Paleta da cena', sub: 'capítulo 3 · cor' },
      { label: 'Lista de props', sub: 'capítulo 4 · checklist' },
    ],
    cta: 'quero o e-book',
    photo: PHOTOS.vase,
    enrollLabel: 'e-book + masterclass · acesso imediato',
    includes: 'E-book em PDF, masterclass gravada, fichas de briefing editáveis e atualizações.',
  },
};

/* ── 1. Ficha da submarca ── */
function Identity({ id }: { id: SubmarcaId }) {
  const sub = submarcas[id];
  return (
    <SubScope theme={sub.theme} className={styles.sheet}>
      <header className={styles.sheetHead}>
        <Wordmark id={id} size="lg" />
        <div>
          <p className={styles.label}>{sub.kind}</p>
          <p className={styles.label}>um curso Débora Gabrich</p>
        </div>
      </header>

      <section aria-label="Paleta" className={styles.block}>
        <h4 className={styles.label}>paleta</h4>
        <ul className={styles.swatches}>
          {sub.palette.map((c, i) => (
            <li key={`${c.hex}-${i}`}>
              <span className={styles.chip} style={{ background: c.hex }} aria-hidden="true" />
              <strong>{c.name}</strong>
              <code>{c.hex}</code>
              <small>{c.role}</small>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Tipografia" className={[styles.block, styles.typeBlock].join(' ')}>
        <h4 className={styles.label}>tipografia</h4>
        <p className={styles.typeDisplay}>{id === 'luz' ? <><span className={styles.light}>luz na</span> <b>prática</b></> : sub.name}</p>
        <p className={styles.typeBody}>Texto de apoio em {id === 'estudio' || id === 'adf' ? 'Manrope' : 'Montserrat'}, entrelinha 1,65, com ênfase só em peso.</p>
        <p className={styles.label}>rótulo em space mono · caixa alta</p>
      </section>

      <section aria-label="Não fazer" className={styles.block}>
        <h4 className={styles.label}>não fazer</h4>
        <ul className={styles.donts}>
          {sub.dont.map((d, i) => (
            <li key={`${d}-${i}`}>{d}</li>
          ))}
        </ul>
        <p className={styles.label}>grafismo próprio: {sub.grafismo}</p>
      </section>
    </SubScope>
  );
}

/* ── 2. Apresentação do curso ── */
function Cover({ id }: { id: SubmarcaId }) {
  const sub = submarcas[id];
  const c = copy[id];
  return (
    <SubScope theme={sub.theme} className={[styles.cover, styles['pattern-' + id]].join(' ')}>
      <div className={styles.coverText}>
        <p className={styles.label}>{sub.kind}</p>
        <Wordmark id={id} size="lg" />
        <h3 className={styles.headline}>{c.headline}</h3>
        <p className={styles.desc}>{c.desc}</p>
        <div className={styles.facts}>
          {c.facts.map(([v, l], i) => (
            <Stat key={`${l}-${i}`} dark value={v} label={l} />
          ))}
        </div>
        <div className={styles.actions}>
          <Cta size="g">{c.cta}</Cta>
          <span className={styles.label}>um curso Débora Gabrich</span>
        </div>
      </div>
      <figure className={styles.photo}>
        <img src={img(c.photo, 640, 800)} alt="Fotografia de produto feita em estúdio" />
      </figure>
    </SubScope>
  );
}

/* ── 3. Módulos e progresso ── */
function Modules({ id }: { id: SubmarcaId }) {
  const sub = submarcas[id];
  const c = copy[id];
  const [done, setDone] = useState<number[]>([0]);
  const pct = Math.round((done.length / c.modules.length) * 100);
  return (
    <SubScope theme={sub.theme} className={styles.modules}>
      <div className={styles.progressBlock}>
        <p className={styles.label}>módulo 2 · seu progresso</p>
        <Wordmark id={id} size="md" />
        <ProgressBar label="Concluído" value={pct} color="ochre" showLabel />
        <p className={styles.desc}>{done.length} de {c.modules.length} etapas concluídas</p>
      </div>
      <div role="list" className={styles.lessons}>
        {c.modules.map((m, i) => {
          const isDone = done.includes(i);
          return (
            <ListItem
              key={`${m.label}-${i}`}
              role="listitem"
              leadingType="number"
              leading={String(i + 1).padStart(2, '0')}
              label={m.label}
              sublabel={m.sub}
              trailing={
                <Button
                  size="sm"
                  variant={isDone ? 'ghost' : 'outline'}
                  aria-pressed={isDone}
                  onClick={() => setDone((d) => (isDone ? d.filter((x) => x !== i) : [...d, i]))}
                >
                  {isDone ? 'Concluída' : 'Marcar'}
                </Button>
              }
            />
          );
        })}
      </div>
    </SubScope>
  );
}

/* ── 4. Inscrição ── */
function Enroll({ id }: { id: SubmarcaId }) {
  const sub = submarcas[id];
  const c = copy[id];
  const [sent, setSent] = useState(false);
  return (
    <SubScope theme={sub.theme} className={styles.enroll}>
      <div className={styles.enrollInfo}>
        <p className={styles.label}>{c.enrollLabel}</p>
        <Wordmark id={id} size="md" />
        <Tabs
          items={[
            { id: 'inc', label: 'O que inclui', content: <p className={styles.desc}>{c.includes}</p> },
            { id: 'req', label: 'Para quem é', content: <p className={styles.desc}>Para quem fotografa produto e quer decidir melhor — com ou sem equipamento profissional.</p> },
          ]}
        />
      </div>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        {sent ? (
          <Alert variant="success" title="Recebemos seu cadastro" description="Você recebe o link por e-mail assim que a próxima turma abrir." />
        ) : (
          <>
            <FormField label="Nome" htmlFor={`n-${id}`} required>
              <Input id={`n-${id}`} placeholder="Como você assina seu trabalho" required />
            </FormField>
            <FormField label="E-mail" htmlFor={`e-${id}`} helperText="Enviamos o acesso aqui." required>
              <Input id={`e-${id}`} type="email" placeholder="voce@estudio.com" required />
            </FormField>
            <Cta size="g" type="submit">{c.cta}</Cta>
            <p className={styles.consent}>Ao enviar, você concorda em receber e-mails sobre este curso. Nada vem pré-marcado.</p>
          </>
        )}
      </form>
    </SubScope>
  );
}

export const submarcaCases = {
  identity: (id: SubmarcaId) => <Identity id={id} key={id} />,
  cover: (id: SubmarcaId) => <Cover id={id} key={id} />,
  modules: (id: SubmarcaId) => <Modules id={id} key={id} />,
  enroll: (id: SubmarcaId) => <Enroll id={id} key={id} />,
};
