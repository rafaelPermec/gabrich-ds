"use client"
import React, { useState } from "react"
import styles from "./Navbar.module.css"

export interface NavbarLink {
  label: string
  href: string
  active?: boolean
}

export interface NavbarProps {
  logo?: React.ReactNode
  logoText?: string
  links?: NavbarLink[]
  cta?: React.ReactNode
  dark?: boolean
  className?: string
}

export function Navbar({
  logo,
  logoText = "dg",
  links = [],
  cta,
  dark = true,
  className,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header
      className={[styles.navbar, dark ? styles.dark : styles.light, className]
        .filter(Boolean)
        .join(" ")}
    >
      <a href="#main-content" className={styles.skipLink}>
        Ir para o conteúdo
      </a>

      <div className={styles.inner}>
        <a href="/" className={styles.logo} aria-label="Home">
          {logo ?? <span className={styles.logoText}>{logoText}</span>}
        </a>

        <nav className={styles.nav} aria-label="Navegação principal">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={[styles.link, link.active ? styles.linkActive : ""]
                .filter(Boolean)
                .join(" ")}
              aria-current={link.active ? "page" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          {cta && <div className={styles.cta}>{cta}</div>}
          <button
            className={styles.hamburger}
            aria-expanded={mobileOpen}
            aria-label="Abrir menu"
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span
              className={[styles.bar, mobileOpen ? styles.barOpen : ""]
                .filter(Boolean)
                .join(" ")}
            />
            <span
              className={[
                styles.bar,
                styles.barMid,
                mobileOpen ? styles.barMidOpen : "",
              ]
                .filter(Boolean)
                .join(" ")}
            />
            <span
              className={[styles.bar, mobileOpen ? styles.barOpen : ""]
                .filter(Boolean)
                .join(" ")}
            />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className={styles.mobileMenu}
          role="navigation"
          aria-label="Menu mobile"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={[
                styles.mobileLink,
                link.active ? styles.linkActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-current={link.active ? "page" : undefined}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          {cta && <div className={styles.mobileCta}>{cta}</div>}
        </div>
      )}
    </header>
  )
}
