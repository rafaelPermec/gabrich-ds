'use client';
import React from 'react';
import styles from './Toggle.module.css';

export type ToggleSize = 'sm' | 'md';

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  size?: ToggleSize;
  label?: string;
}

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
  { size = 'md', label, className, id, ...rest },
  ref,
) {
  const toggleId = id ?? `toggle-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <input ref={ref} type="checkbox" id={toggleId} role="switch" className={styles.input} {...rest} />
      <label htmlFor={toggleId} className={[styles.track, styles[`size-${size}`]].join(' ')}>
        <span className={styles.thumb} />
        {label && <span className={styles.label}>{label}</span>}
      </label>
    </div>
  );
});
