'use client';
import React, { useState } from 'react';
import styles from './PortfolioGrid.module.css';
import { FilterBar } from '../FilterBar/FilterBar';

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageSrc?: string;
  label?: string;
  href?: string;
}

export interface PortfolioGridProps {
  items: PortfolioItem[];
  categories?: string[];
  columns?: 2 | 3 | 4;
  dark?: boolean;
  className?: string;
}

export function PortfolioGrid({
  items,
  categories = [],
  columns = 3,
  dark = false,
  className,
}: PortfolioGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const filters = categories.map((c) => ({ id: c, label: c }));

  const filtered = activeCategory
    ? items.filter((i) => i.category === activeCategory)
    : items;

  return (
    <section className={[styles.section, dark ? styles.dark : '', className].filter(Boolean).join(' ')}>
      {categories.length > 0 && (
        <FilterBar
          filters={filters}
          onFilterChange={(active) => setActiveCategory(active[active.length - 1] ?? null)}
          className={styles.filterBar}
        />
      )}
      <div className={[styles.grid, styles[`cols-${columns}`]].join(' ')}>
        {filtered.map((item) => (
          <a
            key={item.id}
            href={item.href ?? '#'}
            className={styles.card}
            aria-label={item.title}
          >
            <div className={styles.imageWrapper}>
              {item.imageSrc ? (
                <img src={item.imageSrc} alt={item.title} className={styles.image} />
              ) : (
                <div className={styles.placeholder} aria-hidden="true" />
              )}
              <div className={styles.overlay}>
                <span className={styles.overlayCategory}>{item.category}</span>
                <span className={styles.overlayTitle}>{item.title}</span>
              </div>
            </div>
            {item.label && <span className={styles.label}>{item.label}</span>}
          </a>
        ))}
      </div>
    </section>
  );
}
