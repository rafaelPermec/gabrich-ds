"use client"
import React from "react"
import styles from "./Stat.module.css"

export interface StatProps {
  value: string | number
  label: string
  change?: string
  changePositive?: boolean
  icon?: React.ReactNode
  dark?: boolean
  className?: string
}

export function Stat({
  value,
  label,
  change,
  changePositive = true,
  icon,
  dark = false,
  className,
}: StatProps) {
  return (
    <div
      className={[styles.stat, dark ? styles.dark : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
      {change && (
        <span
          className={[
            styles.change,
            changePositive ? styles.positive : styles.negative,
          ].join(" ")}
        >
          {changePositive ? "↑" : "↓"} {change}
        </span>
      )}
    </div>
  )
}
