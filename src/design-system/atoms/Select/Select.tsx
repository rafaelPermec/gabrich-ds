"use client"
import React from "react"
import styles from "./Select.module.css"

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export type SelectSize = "md" | "lg"

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  options: SelectOption[]
  size?: SelectSize
  error?: boolean
  errorMessage?: string
  placeholder?: string
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      options,
      size = "md",
      error = false,
      errorMessage,
      placeholder,
      className,
      ...rest
    },
    ref,
  ) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.selectWrapper}>
          <select
            ref={ref}
            className={[
              styles.select,
              styles[`size-${size}`],
              error ? styles.error : "",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            aria-invalid={error}
            {...rest}
          >
            {placeholder && (
              <option value="" selected disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className={styles.chevron} aria-hidden="true">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <polyline
                points="1,1 6,7 11,1"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </span>
        </div>
        {error && errorMessage && (
          <span className={styles.errorMsg} role="alert">
            {errorMessage}
          </span>
        )}
      </div>
    )
  },
)
