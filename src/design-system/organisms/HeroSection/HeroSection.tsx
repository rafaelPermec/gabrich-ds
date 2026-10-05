"use client"
import React from "react"
import styles from "./HeroSection.module.css"

export interface HeroSectionProps {
  eyebrow?: string
  title: string
  titleAccent?: string
  subtitle?: string
  body?: string
  primaryAction?: React.ReactNode
  secondaryAction?: React.ReactNode
  image?: React.ReactNode
  dark?: boolean
  centered?: boolean
  className?: string
}

export function HeroSection({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  body,
  primaryAction,
  secondaryAction,
  image,
  dark = false,
  centered = false,
  className,
}: HeroSectionProps) {
  return (
    <section
      className={[
        styles.hero,
        dark ? styles.dark : styles.light,
        centered ? styles.centered : "",
        image ? styles.withImage : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.inner}>
        <div className={styles.content}>
          {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
          <h1 className={styles.title}>
            {title}
            {titleAccent && (
              <span className={styles.titleAccent}> {titleAccent}</span>
            )}
          </h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {body && <p className={styles.body}>{body}</p>}
          {(primaryAction || secondaryAction) && (
            <div className={styles.actions}>
              {primaryAction}
              {secondaryAction}
            </div>
          )}
        </div>
        {image && <div className={styles.image}>{image}</div>}
      </div>
    </section>
  )
}
