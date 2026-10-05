import React from "react"
import { Outlet, useLocation, useNavigate } from "react-router"
import { Navbar, type NavbarLink } from "../design-system/organisms/Navbar"
import { Footer } from "../design-system/organisms/Footer"
import { ThemeToggle, categories } from "../docs/registry"
import styles from "./Layout.module.css"

export function Layout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isStorybook = pathname.startsWith("/storybook")

  const isModifiedEvent = (e: React.MouseEvent) =>
    e.metaKey || e.altKey || e.ctrlKey || e.shiftKey || e.button !== 0

  const links: NavbarLink[] = [
    ...categories.map((c) => ({
      href: c.path,
      label: c.label.toLowerCase(),
      active: pathname === c.path,
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!isModifiedEvent(e)) {
          e.preventDefault()
          navigate(c.path)
        }
      },
    })),
    {
      href: "/verticais",
      label: "verticais",
      active: pathname === "/verticais",
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!isModifiedEvent(e)) {
          e.preventDefault()
          navigate("/verticais")
        }
      },
    },
    {
      href: "/storybook",
      label: "storybook",
      active: pathname.startsWith("/storybook"),
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!isModifiedEvent(e)) {
          e.preventDefault()
          navigate("/storybook")
        }
      },
    },
  ]

  return (
    <div className={styles.app}>
      <Navbar
        logo={
          <span className={styles.brand}>
            <span className={styles.mark} aria-hidden="true">
              dg
            </span>
            <span className={styles.brandText}>
              design system <em>v3</em>
            </span>
          </span>
        }
        logoHref="/"
        onLogoClick={(e) => {
          if (!isModifiedEvent(e)) {
            e.preventDefault()
            navigate("/")
          }
        }}
        links={links}
        cta={<ThemeToggle />}
      />

      <div id="main-content" className={styles.content}>
        <Outlet />
      </div>

      {!isStorybook && (
        <Footer
          tagline="design system — fotografia de produtos"
          copyright={`© ${new Date().getFullYear()} Débora Gabrich. componentes sob licença MIT.`}
        />
      )}
    </div>
  )
}
