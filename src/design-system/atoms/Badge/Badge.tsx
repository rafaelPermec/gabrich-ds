"use client"
import React from "react"
import styles from "./Badge.module.css"

export type BadgeVariant = "solid" | "outline"
export type BadgeColor = "ink" | "paper" | "ochre" | "caramel"
export type BadgeSize = "sm" | "md"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  color?: BadgeColor
  size?: BadgeSize
  children: React.ReactNode
}

export function Badge({
  variant = "solid",
  color = "ink",
  size = "sm",
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={[
        styles.badge,
        styles[`variant-${variant}`],
        styles[`color-${color}`],
        styles[`size-${size}`],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </span>
  )
}
