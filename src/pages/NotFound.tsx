import { Link } from "react-router"
import styles from "./CategoryPage.module.css"

export function NotFound() {
  return (
    <main
      style={{ padding: "0 var(--space-6)", maxWidth: 960, margin: "0 auto" }}
    >
      <header className={styles.head}>
        <p className={styles.eyebrow}>
          <span>404</span>
        </p>
        <h1 className={styles.title}>fora de quadro</h1>
        <p className={styles.blurb}>
          Esta página não existe.{" "}
          <Link to="/" className={styles.sbLink}>
            Voltar ao início
          </Link>
        </p>
      </header>
    </main>
  )
}
