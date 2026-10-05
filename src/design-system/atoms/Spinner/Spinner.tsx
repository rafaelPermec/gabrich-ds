'use client';
import React from 'react';
import styles from './Spinner.module.css';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerColor = 'ink' | 'paper' | 'ochre' | 'caramel';

export interface SpinnerProps {
  size?: SpinnerSize;
  color?: SpinnerColor;
  label?: string;
  className?: string;
}

export function Spinner({ size = 'md', color = 'ink', label = 'Loading…', className }: SpinnerProps) {
  return (
    <span
      className={[styles.spinner, styles[`size-${size}`], styles[`color-${color}`], className]
        .filter(Boolean)
        .join(' ')}
      role="status"
      aria-label={label}
    />
  );
}
