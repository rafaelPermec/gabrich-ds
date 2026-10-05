"use client"
import React from "react"
import styles from "./Radio.module.css"

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  function Radio({ label, className, id, ...rest }, ref) {
    const radioId = id ?? `radio-${Math.random().toString(36).slice(2, 9)}`

    return (
      <div className={[styles.wrapper, className].filter(Boolean).join(" ")}>
        <input
          ref={ref}
          type="radio"
          id={radioId}
          className={styles.input}
          {...rest}
        />
        <span className={styles.control} aria-hidden="true">
          <span className={styles.dot} />
        </span>
        {label && (
          <label htmlFor={radioId} className={styles.label}>
            {label}
          </label>
        )}
      </div>
    )
  },
)
