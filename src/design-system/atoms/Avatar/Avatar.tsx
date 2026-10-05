"use client"
import React from "react"
import styles from "./Avatar.module.css"

export type AvatarSize = "sm" | "md" | "lg" | "xl"

export interface AvatarProps {
  src?: string
  alt: string
  size?: AvatarSize
  initials?: string
  className?: string
}

export function Avatar({
  src,
  alt,
  size = "md",
  initials,
  className,
}: AvatarProps) {
  return (
    <div
      className={[styles.avatar, styles[`size-${size}`], className]
        .filter(Boolean)
        .join(" ")}
      role="img"
      aria-label={alt}
    >
      {src ? (
        <img src={src} alt={alt} className={styles.img} />
      ) : (
        <span className={styles.initials}>
          {initials ?? alt.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  )
}
