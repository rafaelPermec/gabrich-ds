'use client';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import styles from './Alert.module.css';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  description?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  children?: React.ReactNode;
  className?: string;
}

const icons: Record<AlertVariant, React.ReactNode> = {
  info: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4" /><line x1="8" y1="7" x2="8" y2="11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><circle cx="8" cy="5" r="0.75" fill="currentColor" /></svg>
  ),
  success: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4" /><polyline points="5,8 7,10 11,6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><polygon points="8,2 15,14 1,14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><line x1="8" y1="7" x2="8" y2="10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><circle cx="8" cy="12" r="0.75" fill="currentColor" /></svg>
  ),
  error: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4" /><line x1="6" y1="6" x2="10" y2="10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><line x1="10" y1="6" x2="6" y2="10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
};

export function Alert({ variant = 'info', title, description, dismissible = false, onDismiss, children, className }: AlertProps) {
  const [dismissed, setDismissed] = useState(false);

  function handleDismiss() {
    setDismissed(true);
    onDismiss?.();
  }

  return (
    <AnimatePresence initial={false}>
      {!dismissed && (
    <motion.div
      key="alert"
      exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}
      transition={{ duration: 0.22, ease: [0.32, 0, 0.15, 1] as const }}
      style={{ overflow: 'hidden' }}
      className={[styles.alert, styles[`variant-${variant}`], className].filter(Boolean).join(' ')}
      role={variant === 'info' || variant === 'success' ? 'status' : 'alert'}
    >
      <span className={styles.icon}>{icons[variant]}</span>
      <div className={styles.content}>
        {title && <p className={styles.title}>{title}</p>}
        {description && <p className={styles.description}>{description}</p>}
        {children}
      </div>
      {dismissible && (
        <button className={styles.dismiss} onClick={handleDismiss} aria-label="Dismiss">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <line x1="2" y1="2" x2="12" y2="12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <line x1="12" y1="2" x2="2" y2="12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </motion.div>
      )}
    </AnimatePresence>
  );
}
