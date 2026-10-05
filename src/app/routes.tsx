import { createBrowserRouter } from 'react-router';
import { Layout } from './Layout';
import { DocLayout } from './DocLayout';
import { Home } from '../pages/Home';
import { CategoryPage } from '../pages/CategoryPage';
import { Verticals } from '../pages/Verticals';
import { Storybook } from '../pages/Storybook';
import { NotFound } from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      {
        Component: DocLayout,
        children: [
          { path: 'foundations', element: <CategoryPage category="foundations" /> },
          { path: 'atoms', element: <CategoryPage category="atoms" /> },
          { path: 'molecules', element: <CategoryPage category="molecules" /> },
          { path: 'organisms', element: <CategoryPage category="organisms" /> },
        ],
      },
      { path: 'verticais', Component: Verticals },
      { path: 'storybook', Component: Storybook },
      { path: 'storybooks', Component: Storybook },
      { path: '*', Component: NotFound },
    ],
  },
]);
