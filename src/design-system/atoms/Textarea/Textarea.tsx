'use client';
import React from 'react';
import styles from './Textarea.module.css';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  errorMessage?: string;
  resize?: 'none' | 'vertical' | 'both';
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { error = false, errorMessage, resize = 'vertical', className, style, ...rest },
  ref,
) {
  return (
    <div className={styles.wrapper}>
      <textarea
        ref={ref}
        className={[styles.textarea, error ? styles.error : '', className].filter(Boolean).join(' ')}
        style={{ resize, ...style }}
        aria-invalid={error}
        {...rest}
      />
      {error && errorMessage && (
        <span className={styles.errorMsg} role="alert">
          {errorMessage}
        </span>
      )}
    </div>
  );
});
