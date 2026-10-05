'use client';
import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { categories, registry } from '../docs/registry';
import styles from './Storybook.module.css';

type Bg = 'auto' | 'paper' | 'ink' | 'sand';
type Viewport = 'full' | 'tablet' | 'mobile';
const viewports: Record<Viewport, { label: string; width: string }> = {
  full: { label: 'Total', width: '100%' },
  tablet: { label: '768', width: '768px' },
  mobile: { label: '375', width: '375px' },
};

export function Storybook() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [bg, setBg] = useState<Bg>('auto');
  const [viewport, setViewport] = useState<Viewport>('full');
  const [outline, setOutline] = useState(false);
  const [panel, setPanel] = useState<'docs' | 'all'>('docs');

  const entry = registry.find((e) => e.id === params.get('id')) ?? registry.find((e) => e.category === 'atoms')!;
  const storyIndex = Math.min(Number(params.get('story') ?? 0) || 0, entry.stories.length - 1);
  const story = entry.stories[storyIndex];
  const catLabel = categories.find((c) => c.id === entry.category)!.label;

  const tree = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories.map((c) => ({
      ...c,
      entries: registry.filter((e) => e.category === c.id && (!q || e.title.toLowerCase().includes(q) || e.stories.some((s) => s.name.toLowerCase().includes(q)))),
    }));
  }, [query]);

  const select = (id: string, s = 0) => setParams({ id, story: String(s) });
  const stageDark = bg === 'ink' || (bg === 'auto' && story.dark);
  const stageClass = [styles.stage, styles[`bg-${bg === 'auto' ? (story.dark ? 'ink' : 'paper') : bg}`], outline ? styles.outline : ''].join(' ');

  return (
    <div className={styles.shell}>
      <aside className={styles.tree} aria-label="Componentes">
        <div className={styles.search}>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar componente"
            aria-label="Buscar componente ou story"
          />
          <kbd>{registry.reduce((n, e) => n + e.stories.length, 0)}</kbd>
        </div>
        <nav className={styles.treeScroll}>
          {tree.map((c) => c.entries.length > 0 && (
            <div key={c.id} className={styles.group}>
              <p className={styles.groupLabel}>{c.label} <span>{c.entries.length}</span></p>
              <ul>
                {c.entries.map((e) => {
                  const active = e.id === entry.id;
                  return (
                    <li key={e.id}>
                      <button className={[styles.node, active ? styles.nodeActive : ''].join(' ')} onClick={() => select(e.id)} aria-expanded={active}>
                        <span className={styles.glyph} aria-hidden="true">{c.id === 'foundations' ? '◇' : '▢'}</span>
                        {e.title}
                      </button>
                      {active && (
                        <ul className={styles.stories}>
                          {e.stories.map((s, i) => (
                            <li key={i}>
                              <button
                                className={[styles.leaf, i === storyIndex ? styles.leafActive : ''].join(' ')}
                                onClick={() => select(e.id, i)}
                                aria-current={i === storyIndex ? 'true' : undefined}
                              >
                                {s.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <section className={styles.work} aria-label="Canvas">
        <div className={styles.toolbar} role="toolbar" aria-label="Ferramentas do canvas">
          <p className={styles.crumb}>
            <span>{catLabel}</span> / <span>{entry.title}</span> / <strong>{story.name}</strong>
          </p>
          <div className={styles.toolGroup} role="group" aria-label="Fundo">
            {(['auto', 'paper', 'sand', 'ink'] as Bg[]).map((b) => (
              <button key={b} className={[styles.swatch, styles[`sw-${b}`], bg === b ? styles.on : ''].join(' ')} onClick={() => setBg(b)} aria-pressed={bg === b} title={`Fundo: ${b}`}>
                <span className="sr">{b}</span>
              </button>
            ))}
          </div>
          <div className={styles.toolGroup} role="group" aria-label="Viewport">
            {(Object.keys(viewports) as Viewport[]).map((v) => (
              <button key={v} className={[styles.tool, viewport === v ? styles.on : ''].join(' ')} onClick={() => setViewport(v)} aria-pressed={viewport === v}>
                {viewports[v].label}
              </button>
            ))}
          </div>
          <button className={[styles.tool, outline ? styles.on : ''].join(' ')} onClick={() => setOutline(!outline)} aria-pressed={outline}>
            Contornos
          </button>
          <Link className={styles.tool} to={`/${entry.category}#${entry.id}`}>Docs ↗</Link>
        </div>

        <div className={styles.canvas}>
          <div className={styles.frame} style={{ width: viewports[viewport].width }} data-dark={stageDark || undefined}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${entry.id}-${storyIndex}`}
                className={stageClass}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <story.Render />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.tabs} role="tablist">
            <button role="tab" aria-selected={panel === 'docs'} className={panel === 'docs' ? styles.tabOn : ''} onClick={() => setPanel('docs')}>Descrição</button>
            <button role="tab" aria-selected={panel === 'all'} className={panel === 'all' ? styles.tabOn : ''} onClick={() => setPanel('all')}>Stories ({entry.stories.length})</button>
          </div>
          <div className={styles.panelBody} role="tabpanel">
            {panel === 'docs' ? (
              <dl className={styles.meta}>
                <div><dt>Componente</dt><dd className={styles.metaTitle}>{entry.title}</dd></div>
                <div><dt>Camada</dt><dd>{entry.tag}</dd></div>
                <div className={styles.wide}><dt>Regra</dt><dd>{entry.subtitle}</dd></div>
                {story.description && <div className={styles.wide}><dt>Story</dt><dd>{story.description}</dd></div>}
              </dl>
            ) : (
              <ol className={styles.storyList}>
                {entry.stories.map((s, i) => (
                  <li key={i}>
                    <button onClick={() => select(entry.id, i)} className={i === storyIndex ? styles.tabOn : ''}>
                      <span>{String(i + 1).padStart(2, '0')}</span> {s.name} {s.dark && <em>dark</em>}
                    </button>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
