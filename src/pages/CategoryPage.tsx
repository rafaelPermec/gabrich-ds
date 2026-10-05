"use client"
import { Link } from "react-router"
import { DocSection, ComponentDemo } from "../docs/DocSection"
import { categories, registry, type Category } from "../docs/registry"
import styles from "./CategoryPage.module.css"

export function CategoryPage({ category }: { category: Category }) {
  const meta = categories.find((c) => c.id === category)!
  const index = categories.indexOf(meta)
  const entries = registry.filter((e) => e.category === category)

  return (
    <>
      <header className={styles.head}>
        <p className={styles.eyebrow}>
          <span>{String(index + 1).padStart(2, "0")} / 04</span>
          <span>
            {entries.length}{" "}
            {category === "foundations" ? "seções" : "componentes"}
          </span>
        </p>
        <h1 className={styles.title}>{meta.label.toLowerCase()}</h1>
        <p className={styles.blurb}>{meta.blurb}</p>
      </header>

      {entries.map((e) => (
        <DocSection
          key={e.id}
          id={e.id}
          tag={e.tag}
          title={e.title}
          subtitle={e.subtitle}
        >
          {e.stories.map((s, i) => (
            <ComponentDemo
              key={i}
              title={s.name}
              description={s.description}
              dark={s.dark}
            >
              <s.Render />
            </ComponentDemo>
          ))}
          <Link className={styles.sbLink} to={`/storybook?id=${e.id}`}>
            Abrir {e.title} no Storybook <span aria-hidden="true">→</span>
          </Link>
        </DocSection>
      ))}
    </>
  )
}
