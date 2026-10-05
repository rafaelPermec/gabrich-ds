"use client"
import React from "react"
import styles from "./ProgressBar.module.css"

export type ProgressBarColor = "ink" | "ochre" | "caramel"

export interface ProgressBarProps {
  value: number
  max?: number
  color?: ProgressBarColor
  height?: number
  showLabel?: boolean
  label?: string
  className?: string
}

export function ProgressBar({
  value,
  max = 100,
  color = "ink",
  height = 4,
  showLabel = false,
  label,
  className,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={[styles.container, className].filter(Boolean).join(" ")}>
      {(showLabel || label) && (
        <div className={styles.header}>
          {label && <span className={styles.label}>{label}</span>}
          {showLabel && (
            <span className={styles.value}>{Math.round(pct)}%</span>
          )}
        </div>
      )}
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        style={{ height }}
      >
        <div
          className={[styles.fill, styles[`color-${color}`]].join(" ")}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
