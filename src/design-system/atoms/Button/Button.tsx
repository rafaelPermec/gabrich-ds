"use client"
import React from "react"
import { motion, type HTMLMotionProps } from "motion/react"
import styles from "./Button.module.css"

export type ButtonVariant = "filled" | "outline" | "ghost" | "text"
export type ButtonSize = "lg" | "md" | "sm"
export type ButtonShape = "sharp" | "pill"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  shape?: ButtonShape
  loading?: boolean
  children: React.ReactNode
}

export function Button({
  variant = "filled",
  size = "md",
  shape = "sharp",
  loading = false,
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <motion.button
      whileTap={disabled || loading ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 600, damping: 30 }}
      className={[
        styles.button,
        styles[`variant-${variant}`],
        styles[`size-${size}`],
        styles[`shape-${shape}`],
        loading ? styles.loading : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      disabled={disabled || loading}
      aria-busy={loading}
      {...rest as HTMLMotionProps<"button">}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      <span className={loading ? styles.labelHidden : ""}>{children}</span>
    </motion.button>
  )
}
