'use client';
import React, { useState, useRef } from 'react';
import styles from './Tabs.module.css';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export type TabsOrientation = 'horizontal' | 'vertical';

export interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  orientation?: TabsOrientation;
  className?: string;
}

export function Tabs({ items, defaultTab, orientation = 'horizontal', className }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? items[0]?.id);
  const activeItem = items.find((t) => t.id === active);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const enabledItems = items.filter((t) => !t.disabled);

  function handleKeyDown(e: React.KeyboardEvent, currentId: string) {
    const idx = enabledItems.findIndex((t) => t.id === currentId);
    let next: TabItem | undefined;

    if (orientation === 'horizontal') {
      if (e.key === 'ArrowRight') next = enabledItems[(idx + 1) % enabledItems.length];
      else if (e.key === 'ArrowLeft') next = enabledItems[(idx - 1 + enabledItems.length) % enabledItems.length];
    } else {
      if (e.key === 'ArrowDown') next = enabledItems[(idx + 1) % enabledItems.length];
      else if (e.key === 'ArrowUp') next = enabledItems[(idx - 1 + enabledItems.length) % enabledItems.length];
    }
    if (e.key === 'Home') next = enabledItems[0];
    if (e.key === 'End') next = enabledItems[enabledItems.length - 1];

    if (next) {
      e.preventDefault();
      setActive(next.id);
      tabRefs.current.get(next.id)?.focus();
    }
  }

  return (
    <div className={[styles.tabs, styles[`orientation-${orientation}`], className].filter(Boolean).join(' ')}>
      <div className={styles.tabList} role="tablist" aria-orientation={orientation}>
        {items.map((item) => (
          <button
            key={item.id}
            ref={(el) => {
              if (el) tabRefs.current.set(item.id, el);
              else tabRefs.current.delete(item.id);
            }}
            role="tab"
            id={`tab-${item.id}`}
            aria-selected={active === item.id}
            aria-controls={`tabpanel-${item.id}`}
            disabled={item.disabled}
            tabIndex={active === item.id ? 0 : -1}
            onClick={() => !item.disabled && setActive(item.id)}
            onKeyDown={(e) => handleKeyDown(e, item.id)}
            className={[styles.tab, active === item.id ? styles.tabActive : ''].filter(Boolean).join(' ')}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div
        className={styles.panel}
        role="tabpanel"
        id={`tabpanel-${active}`}
        aria-labelledby={`tab-${active}`}
        tabIndex={0}
      >
        {activeItem?.content}
      </div>
    </div>
  );
}
