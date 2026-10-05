'use client';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Button } from '../design-system/atoms/Button';
import { categories, registry } from '../docs/registry';
import { staggerContainer, staggerItem } from '../design-system/utils/motionVariants';
import styles from './Home.module.css';

const total = registry.filter((e) => e.category !== 'foundations').length;
const stories = registry.reduce((n, e) => n + e.stories.length, 0);

export function Home() {
  const navigate = useNavigate();
  return (
    <main className={styles.home}>
      <section className={styles.hero}>
        <motion.p className={styles.eyebrow} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          Débora Gabrich — Design System
        </motion.p>
        <motion.h1
          className={styles.display}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.32, 0, 0.15, 1] }}
        >
          o reto <span className={styles.accent}>enquadra</span>.<br />o redondo marca.
        </motion.h1>
        <div className={styles.heroFoot}>
          <p className={styles.lede}>
            {total} componentes em três camadas atômicas, extraídos da identidade visual de uma fotógrafa de produto.
            Tipados em TypeScript, prontos para Next.js, com tema claro e escuro nativos.
          </p>
          <div className={styles.actions}>
            <Button size="lg" onClick={() => navigate('/atoms')}>Explorar componentes</Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/storybook')}>Abrir Storybook</Button>
          </div>
        </div>
      </section>

      <motion.ol className={styles.index} variants={staggerContainer} initial="initial" animate="animate">
        {categories.map((c, i) => {
          const n = registry.filter((e) => e.category === c.id).length;
          return (
            <motion.li key={c.id} variants={staggerItem}>
              <Link to={c.path} className={styles.row}>
                <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.rowTitle}>{c.label.toLowerCase()}</span>
                <span className={styles.rowBlurb}>{c.blurb}</span>
                <span className={styles.count}>{n}</span>
                <span className={styles.disk} aria-hidden="true">→</span>
              </Link>
            </motion.li>
          );
        })}
      </motion.ol>

      <section className={styles.facts} aria-label="Em números">
        <div><strong>{total}</strong><span>componentes</span></div>
        <div><strong>{stories}</strong><span>stories</span></div>
        <div><strong>3</strong><span>verticais — portfólio, documento, curso</span></div>
        <div><strong>2</strong><span>temas, um sistema semântico</span></div>
      </section>
    </main>
  );
}
