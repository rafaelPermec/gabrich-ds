'use client';
import { NavLink, Outlet, useLocation } from 'react-router';
import { Footer } from '../design-system/organisms/Footer';
import { ThemeToggle, categories } from '../docs/registry';
import styles from './Layout.module.css';

const links = [...categories.map((c) => ({ to: c.path, label: c.label })), { to: '/verticais', label: 'Verticais' }, { to: '/storybook', label: 'Storybook' }];

export function Layout() {
  const { pathname } = useLocation();
  const isStorybook = pathname.startsWith('/storybook');

  return (
    <div className={styles.app}>
      <a href="#main-content" className={styles.skip}>Pular para o conteúdo</a>
      <header className={styles.header}>
        <NavLink to="/" className={styles.brand} aria-label="Início — Débora Gabrich Design System">
          <span className={styles.mark} aria-hidden="true">dg</span>
          <span className={styles.brandText}>design system <em>v3</em></span>
        </NavLink>
        <nav aria-label="Principal" className={styles.nav}>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => [styles.link, isActive ? styles.active : ''].join(' ')}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className={styles.tools}><ThemeToggle /></div>
      </header>

      <div id="main-content" className={styles.content}>
        <Outlet />
      </div>

      {!isStorybook && (
        <Footer
          tagline="design system — fotografia de produtos"
          dark
          copyright={`© ${new Date().getFullYear()} Débora Gabrich. componentes sob licença MIT.`}
        />
      )}
    </div>
  );
}
