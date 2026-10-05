'use client';
import React, { useState } from 'react';
import styles from './FilterBar.module.css';
import { SearchBar } from '../../molecules/SearchBar/SearchBar';

export interface FilterOption {
  id: string;
  label: string;
}

export interface FilterBarProps {
  filters?: FilterOption[];
  onFilterChange?: (active: string[]) => void;
  onSearch?: (value: string) => void;
  onSort?: (sort: string) => void;
  sortOptions?: Array<{ value: string; label: string }>;
  className?: string;
}

export function FilterBar({
  filters = [],
  onFilterChange,
  onSearch,
  onSort,
  sortOptions = [],
  className,
}: FilterBarProps) {
  const [active, setActive] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  function toggleFilter(id: string) {
    const next = active.includes(id)
      ? active.filter((x) => x !== id)
      : [...active, id];
    setActive(next);
    onFilterChange?.(next);
  }

  return (
    <div className={[styles.bar, className].filter(Boolean).join(' ')}>
      {filters.length > 0 && (
        <div className={styles.filters}>
          {filters.map((f) => (
            <button
              key={f.id}
              className={[styles.filter, active.includes(f.id) ? styles.filterActive : ''].filter(Boolean).join(' ')}
              onClick={() => toggleFilter(f.id)}
              aria-pressed={active.includes(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}
      <div className={styles.right}>
        <SearchBar
          value={search}
          onChange={(v) => { setSearch(v); onSearch?.(v); }}
          placeholder="filtrar…"
          className={styles.search}
        />
        {sortOptions.length > 0 && (
          <select
            className={styles.sort}
            onChange={(e) => onSort?.(e.target.value)}
            aria-label="Sort by"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}
