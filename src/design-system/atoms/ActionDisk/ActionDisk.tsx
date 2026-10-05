"use client"
import React from "react"
import { motion, type HTMLMotionProps } from "motion/react"
import styles from "./ActionDisk.module.css"

export type ActionDiskSize = "sm" | "md" | "lg"
export type ActionDiskVariant = "filled" | "outline"

export interface ActionDiskProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ActionDiskSize
  variant?: ActionDiskVariant
  label?: string
  children?: React.ReactNode
}

function ArrowIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <line
        x1="3"
        y1="10"
        x2="17"
        y2="10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <polyline
        points="11,4 17,10 11,16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ActionDisk({
  size = "md",
  variant = "filled",
  label,
  className,
  children,
  ...rest
}: ActionDiskProps) {
  return (
    <motion.button
      whileHover={rest.disabled ? undefined : { rotate: -45 }}
      whileTap={rest.disabled ? undefined : { scale: 0.92 }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
      className={[
        styles.disk,
        styles[`size-${size}`],
        styles[`variant-${variant}`],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={label}
      {...rest as HTMLMotionProps<"button">}
    >
      {children ?? <ArrowIcon />}
    </motion.button>
  )
}
