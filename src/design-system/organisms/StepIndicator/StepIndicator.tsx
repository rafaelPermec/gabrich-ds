'use client';
import React from 'react';
import styles from './StepIndicator.module.css';

export interface Step {
  label: string;
  description?: string;
}

export type StepStatus = 'complete' | 'current' | 'upcoming';

export interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
  dark?: boolean;
  className?: string;
}

export function StepIndicator({
  steps,
  currentStep,
  orientation = 'horizontal',
  dark = false,
  className,
}: StepIndicatorProps) {
  function getStatus(index: number): StepStatus {
    if (index < currentStep) return 'complete';
    if (index === currentStep) return 'current';
    return 'upcoming';
  }

  return (
    <ol
      className={[
        styles.list,
        styles[`orientation-${orientation}`],
        dark ? styles.dark : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label="Progress"
    >
      {steps.map((step, i) => {
        const status = getStatus(i);
        return (
          <li key={i} className={[styles.step, styles[`status-${status}`]].join(' ')}>
            <div className={styles.indicator}>
              <span className={styles.disk} aria-hidden="true">
                {status === 'complete' ? (
                  <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
                    <polyline points="1,6 5,10 13,2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <span className={styles.number}>{i + 1}</span>
                )}
              </span>
              {i < steps.length - 1 && <span className={styles.connector} aria-hidden="true" />}
            </div>
            <div className={styles.content}>
              <span className={styles.label}>{step.label}</span>
              {step.description && <span className={styles.description}>{step.description}</span>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
