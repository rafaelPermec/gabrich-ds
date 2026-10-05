import styles from './Storybook.module.css';

export function Storybook() {
  const src = import.meta.env.DEV
    ? 'http://localhost:6006'
    : '/storybook-static/';

  return (
    <div className={styles.container}>
      <iframe
        src={src}
        title="Storybook Débora Gabrich"
        className={styles.iframe}
        allow="clipboard-write"
      />
    </div>
  );
}
