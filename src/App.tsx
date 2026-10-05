'use client';
import { RouterProvider } from 'react-router';
import { ThemeProvider } from './design-system/context/ThemeContext';
import { ToastProvider } from './design-system/molecules/Toast';
import { router } from './app/routes';

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider position="top-right">
        <RouterProvider router={router} />
      </ToastProvider>
    </ThemeProvider>
  );
}
