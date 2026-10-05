'use client';
import React from 'react';
import styles from './NavigationItem.module.css';

export interface NavigationItemProps {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: string | number;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function NavigationItem({
  label,
  href,
  icon,
  badge,
  active = false,
  disabled = false,
  onClick,
  className,
}: NavigationItemProps) {
  const sharedClass = [
    styles.item,
    active ? styles.active : '',
    disabled ? styles.disabled : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.label}>{label}</span>
      {badge !== undefined && <span className={styles.badge}>{badge}</span>}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        aria-current={active ? 'page' : undefined}
        className={sharedClass}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-current={active ? 'page' : undefined}
      className={sharedClass}
    >
      {content}
    </button>
  );
}
