import { useEffect } from 'react';
import type { Decorator, Preview } from '@storybook/react-vite';
import { ToastProvider } from '../src/design-system/molecules/Toast';
import '../src/index.css';

type ThemeGlobal = 'light' | 'dark';
type VerticalGlobal = 'none' | 'portfolio' | 'document' | 'course' | 'blackfriday';

/**
 * Aplica o tema no <html> exatamente como o ThemeProvider do app faz
 * (classes `light`/`dark`), para que os tokens de `index.css` respondam.
 */
const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme ?? 'light') as ThemeGlobal;

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove('light', 'dark');
    html.classList.add(theme);
  }, [theme]);

  return <Story />;
};

/** Envolve a story no escopo de vertical (`.vertical-*`) e no ToastProvider. */
const withVertical: Decorator = (Story, context) => {
  const vertical = (context.globals.vertical ?? 'none') as VerticalGlobal;
  const className = vertical === 'none' ? undefined : `vertical-${vertical}`;
  const isFullscreen = context.parameters.layout === 'fullscreen';

  return (
    <ToastProvider position="top-right">
      <div
        className={className}
        style={{
          background: 'var(--bg-base)',
          color: 'var(--text-primary)',
          padding: isFullscreen ? 0 : 'var(--space-6)',
          minHeight: isFullscreen ? '100vh' : undefined,
        }}
      >
        <Story />
      </div>
    </ToastProvider>
  );
};

const preview: Preview = {
  tags: ['autodocs'],
  globalTypes: {
    theme: {
      description: 'Tema de contraste do design system',
      toolbar: {
        title: 'Tema',
        icon: 'contrast',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
    vertical: {
      description: 'Vertical de marca (remapeia os tokens semânticos)',
      toolbar: {
        title: 'Vertical',
        icon: 'paintbrush',
        items: [
          { value: 'none', title: 'Padrão (sem vertical)' },
          { value: 'portfolio', title: 'Portfólio' },
          { value: 'document', title: 'Documento' },
          { value: 'course', title: 'Curso' },
          { value: 'blackfriday', title: 'Black Friday' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
    vertical: 'none',
  },
  parameters: {
    layout: 'padded',
    backgrounds: { disable: true },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
    options: {
      storySort: {
        order: ['Introdução', 'Foundations', 'Atoms', 'Molecules', 'Organisms'],
      },
    },
  },
  decorators: [withVertical, withTheme],
};

export default preview;
