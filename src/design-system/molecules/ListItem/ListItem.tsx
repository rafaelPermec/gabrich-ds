"use client"
import React from "react"
import styles from "./ListItem.module.css"

export type ListItemLeadingType = "icon" | "avatar" | "number" | "dot"

export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  sublabel?: string
  leading?: React.ReactNode
  leadingType?: ListItemLeadingType
  trailing?: React.ReactNode
  clickable?: boolean
  divider?: boolean
}

export function ListItem({
  label,
  sublabel,
  leading,
  leadingType = "dot",
  trailing,
  clickable = false,
  divider = true,
  className,
  ...rest
}: ListItemProps) {
  return (
    <div
      className={[
        styles.item,
        clickable ? styles.clickable : "",
        divider ? styles.divider : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      {...rest}
    >
      {leading && (
        <span
          className={[styles.leading, styles[`leading-${leadingType}`]].join(
            " ",
          )}
        >
          {leading}
        </span>
      )}
      <div className={styles.content}>
        <span className={styles.label}>{label}</span>
        {sublabel && <span className={styles.sublabel}>{sublabel}</span>}
      </div>
      {trailing && <span className={styles.trailing}>{trailing}</span>}
    </div>
  )
}
