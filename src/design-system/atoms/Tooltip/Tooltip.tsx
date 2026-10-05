"use client"
import React, { useState } from "react"
import styles from "./Tooltip.module.css"

export type TooltipPlacement = "top" | "right" | "bottom" | "left"

export interface TooltipProps {
  content: React.ReactNode
  placement?: TooltipPlacement
  children: React.ReactElement
  className?: string
}

export function Tooltip({
  content,
  placement = "top",
  children,
  className,
}: TooltipProps) {
  const [visible, setVisible] = useState(false)

  return (
    <span
      className={[styles.wrapper, className].filter(Boolean).join(" ")}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span
          className={[styles.tooltip, styles[`placement-${placement}`]].join(
            " ",
          )}
          role="tooltip"
        >
          {content}
        </span>
      )}
    </span>
  )
}
