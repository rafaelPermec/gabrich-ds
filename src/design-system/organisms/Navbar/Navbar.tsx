"use client"
import React, { useState } from "react"
import styles from "./Navbar.module.css"

export interface NavbarLink {
  label: string
  href: string
  active?: boolean
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export interface NavbarProps {
  logo?: React.ReactNode
  logoText?: string
  logoHref?: string
  onLogoClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  links?: NavbarLink[]
  cta?: React.ReactNode
  dark?: boolean
  className?: string
}

export function Navbar({
  logo,
  logoText = "dg",
  logoHref = "/",
  onLogoClick,
  links = [],
  cta,
  dark,
  className,
}: Readonly<NavbarProps>) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const isDark = dark ? styles.dark : styles.light;
  const themeClass = dark !== undefined ? isDark : ""

  React.useEffect(() => {
    if (!mobileOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [mobileOpen])

  return (
    <header
      className={[styles.navbar, themeClass, className]
        .filter(Boolean)
        .join(" ")}
    >
      <a href="#main-content" className={styles.skipLink}>
        Ir para o conteúdo
      </a>

      <div className={styles.inner}>
        <a
          href={logoHref}
          className={styles.logo}
          aria-label="Home"
          onClick={onLogoClick}
        >
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
              onClick={link.onClick}
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
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
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
        <nav
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
              onClick={(e) => {
                link.onClick?.(e)
                setMobileOpen(false)
              }}
            >
              {link.label}
            </a>
          ))}
          {cta && <div className={styles.mobileCta}>{cta}</div>}
        </nav>
      )}
    </header>
  )
}
