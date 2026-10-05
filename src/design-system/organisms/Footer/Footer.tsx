"use client"
import React from "react"
import styles from "./Footer.module.css"

export interface FooterLinkGroup {
  title: string
  links: Array<{ label: string; href: string }>
}

export interface FooterProps {
  logoText?: string
  logo?: React.ReactNode
  tagline?: string
  groups?: FooterLinkGroup[]
  copyright?: string
  social?: Array<{ label: string; href: string; icon: React.ReactNode }>
  dark?: boolean
  className?: string
}

export function Footer({
  logoText = "débora gabrich",
  logo,
  tagline,
  groups = [],
  copyright,
  social = [],
  dark = true,
  className,
}: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer
      className={[styles.footer, dark ? styles.dark : styles.light, className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            {logo ?? <span className={styles.logoText}>{logoText}</span>}
          </div>
          {tagline && <p className={styles.tagline}>{tagline}</p>}
          {social.length > 0 && (
            <div className={styles.social}>
              {social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={styles.socialLink}
                  aria-label={item.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          )}
        </div>

        {groups.length > 0 && (
          <div className={styles.groups}>
            {groups.map((group) => (
              <div key={group.title} className={styles.group}>
                <p className={styles.groupTitle}>{group.title}</p>
                <ul className={styles.groupLinks}>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className={styles.groupLink}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.bottom}>
        <p className={styles.copyright}>
          {copyright ?? `© ${year} Débora Gabrich. fotografia de produtos.`}
        </p>
      </div>
    </footer>
  )
}
