"use client"
import React from "react"
import styles from "./Input.module.css"

export type InputSize = "md" | "lg"

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize
  error?: boolean
  errorMessage?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    { size = "md", error = false, errorMessage, className, ...rest },
    ref,
  ) {
    return (
      <div className={styles.wrapper}>
        <input
          ref={ref}
          className={[
            styles.input,
            styles[`size-${size}`],
            error ? styles.error : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          aria-invalid={error}
          {...rest}
        />
        {error && errorMessage && (
          <span className={styles.errorMsg} role="alert">
            {errorMessage}
          </span>
        )}
      </div>
    )
  },
)
