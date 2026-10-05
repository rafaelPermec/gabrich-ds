"use client"

// Reset scroll on page change; honour deep-link hashes.

// Track the section in view.

import { useEffect, useState } from "react"
import { Outlet, useLocation } from "react-router"
import { Sidebar } from "../design-system/organisms/Sidebar"
import { categories, registry } from "../docs/registry"
import styles from "./DocLayout.module.css"

export function DocLayout() {
  const { pathname, hash } = useLocation()
  const current =
    categories.find((c) => pathname.startsWith(c.path)) ?? categories[0]
  const entries = registry.filter((e) => e.category === current.id)
  const [activeId, setActiveId] = useState(entries[0]?.id ?? "")
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
      setActiveId(hash.slice(1))
    } else {
      window.scrollTo(0, 0)
      setActiveId(entries[0]?.id ?? "")
    }
  }, [pathname, hash])
  useEffect(() => {
    const els = entries
      .map((e) => document.getElementById(e.id))
      .filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (items) => {
        const top = items
          .filter((i) => i.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0]
        if (top) setActiveId(top.target.id)
      },
      { rootMargin: "-80px 0px -60% 0px" },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  return (
    <div className={styles.layout}>
      <aside
        className={styles.sidebar}
        aria-label={`Seções — ${current.label}`}
      >
        <Sidebar
          logoText={current.label.toLowerCase()}
          sections={[
            {
              label: `${entries.length} itens`,
              items: entries.map((e) => ({
                id: e.id,
                label: e.title,
                href: `#${e.id}`,
              })),
            },
          ]}
          activeId={activeId}
          onSelect={setActiveId}
        />
      </aside>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
