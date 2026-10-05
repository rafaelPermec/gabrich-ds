'use client';
import React, { useState } from 'react';
import styles from './Sidebar.module.css';

export interface SidebarSection {
  label?: string;
  items: Array<{
    id: string;
    label: string;
    href?: string;
    icon?: React.ReactNode;
    badge?: string | number;
  }>;
}

export interface SidebarProps {
  logo?: React.ReactNode;
  logoText?: string;
  sections: SidebarSection[];
  activeId?: string;
  onSelect?: (id: string) => void;
  collapsible?: boolean;
  className?: string;
}

export function Sidebar({ logo, logoText = 'dg', sections, activeId, onSelect, collapsible = false, className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={[styles.sidebar, collapsed ? styles.collapsed : '', className].filter(Boolean).join(' ')}
      aria-label="Sidebar navigation"
    >
      <div className={styles.top}>
        <div className={styles.logo}>
          {logo ?? <span className={styles.logoText}>{logoText}</span>}
        </div>
        {collapsible && (
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <polyline
                points={collapsed ? '5,2 10,7 5,12' : '9,2 4,7 9,12'}
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      <nav className={styles.nav}>
        {sections.map((section, si) => (
          <div key={si} className={styles.section}>
            {section.label && !collapsed && (
              <span className={styles.sectionLabel}>{section.label}</span>
            )}
            {section.items.map((item) => {
              const isActive = activeId === item.id;
              const itemClass = [styles.item, isActive ? styles.itemActive : ''].filter(Boolean).join(' ');
              const itemContent = (
                <>
                  {item.icon && <span className={styles.itemIcon}>{item.icon}</span>}
                  {!collapsed && <span className={styles.itemLabel}>{item.label}</span>}
                  {!collapsed && item.badge !== undefined && (
                    <span className={styles.badge}>{item.badge}</span>
                  )}
                </>
              );

              if (item.href) {
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className={itemClass}
                    onClick={() => onSelect?.(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {itemContent}
                  </a>
                );
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  className={itemClass}
                  onClick={() => onSelect?.(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {itemContent}
                </button>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
