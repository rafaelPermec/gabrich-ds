"use client"
import React, { useRef, useEffect } from "react"
import styles from "./Checkbox.module.css"

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string
  indeterminate?: boolean
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    { label, indeterminate = false, className, id, ...rest },
    forwardedRef,
  ) {
    const internalRef = useRef<HTMLInputElement>(null)
    const checkboxId =
      id ?? `checkbox-${Math.random().toString(36).slice(2, 9)}`

    useEffect(() => {
      const el = internalRef.current
      if (el) el.indeterminate = indeterminate
    }, [indeterminate])

    function setRef(el: HTMLInputElement | null) {
      ;(internalRef as React.MutableRefObject<HTMLInputElement | null>).current =
        el
      if (typeof forwardedRef === "function") {
        forwardedRef(el)
      } else if (forwardedRef) {
        ;(forwardedRef as React.MutableRefObject<HTMLInputElement | null>).current =
          el
      }
    }

    return (
      <div className={[styles.wrapper, className].filter(Boolean).join(" ")}>
        <input
          ref={setRef}
          type="checkbox"
          id={checkboxId}
          className={styles.input}
          {...rest}
        />
        <span className={styles.control} aria-hidden="true">
          {indeterminate ? (
            <svg width="10" height="2" viewBox="0 0 10 2">
              <line
                x1="1"
                y1="1"
                x2="9"
                y2="1"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="10" height="8" viewBox="0 0 10 8">
              <polyline
                points="1,4 4,7 9,1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
        {label && (
          <label htmlFor={checkboxId} className={styles.label}>
            {label}
          </label>
        )}
      </div>
    )
  },
)
