'use client';
import React from 'react';
import styles from './FormField.module.css';

export interface FormFieldProps {
  label: string;
  htmlFor?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  htmlFor,
  helperText,
  errorMessage,
  required = false,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={[styles.field, className].filter(Boolean).join(' ')}>
      <label htmlFor={htmlFor} className={styles.label}>
        <span className={styles.labelText}>{label}</span>
        {required && <span className={styles.required} aria-hidden="true">*</span>}
      </label>
      <div className={styles.control}>{children}</div>
      {errorMessage ? (
        <span className={styles.error} role="alert">{errorMessage}</span>
      ) : helperText ? (
        <span className={styles.helper}>{helperText}</span>
      ) : null}
    </div>
  );
}
