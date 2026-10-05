'use client';
import React from 'react';
import styles from './Icon.module.css';

export type IconSize = 16 | 20 | 24 | 32;
export type IconColor = 'ink' | 'paper' | 'ochre' | 'caramel' | 'sand' | 'current';

export interface IconProps {
  size?: IconSize;
  color?: IconColor;
  label?: string;
  className?: string;
  children: React.ReactNode;
}

export function Icon({ size = 24, color = 'current', label, className, children }: IconProps) {
  return (
    <span
      className={[styles.icon, styles[`size-${size}`], styles[`color-${color}`], className]
        .filter(Boolean)
        .join(' ')}
      role={label ? 'img' : 'presentation'}
      aria-label={label}
      aria-hidden={!label}
    >
      {children}
    </span>
  );
}
