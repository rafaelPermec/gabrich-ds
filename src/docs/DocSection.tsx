import React from "react"
import styles from "./DocSection.module.css"

export interface DocSectionProps {
  id: string
  title: string
  subtitle?: string
  tag?: string
  children: React.ReactNode
}

export function DocSection({
  id,
  title,
  subtitle,
  tag,
  children,
}: DocSectionProps) {
  return (
    <section id={id} className={styles.section}>
      <div className={styles.header}>
        {tag && <span className={styles.tag}>{tag}</span>}
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      <div className={styles.content}>{children}</div>
    </section>
  )
}

export interface ComponentDemoProps {
  title: string
  description?: string
  dark?: boolean
  children: React.ReactNode
}

export function ComponentDemo({
  title,
  description,
  dark = false,
  children,
}: ComponentDemoProps) {
  return (
    <div className={styles.demo}>
      <div className={styles.demoHeader}>
        <h3 className={styles.demoTitle}>{title}</h3>
        {description && <p className={styles.demoDesc}>{description}</p>}
      </div>
      <div
        className={[styles.demoStage, dark ? styles.demoStageDark : ""]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </div>
    </div>
  )
}
