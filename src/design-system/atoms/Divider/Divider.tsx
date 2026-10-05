"use client"
import React from "react"
import styles from "./Divider.module.css"

export type DividerOrientation = "horizontal" | "vertical"
export type DividerColor = "neutral" | "border-dark" | "ink" | "paper" | "ochre"

export interface DividerProps {
  orientation?: DividerOrientation
  color?: DividerColor
  className?: string
}

export function Divider({
  orientation = "horizontal",
  color = "neutral",
  className,
}: DividerProps) {
  return (
    <hr
      className={[
        styles.divider,
        styles[`orientation-${orientation}`],
        styles[`color-${color}`],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-orientation={orientation}
    />
  )
}
