'use client';

import { useEffect } from 'react';
import { useThemeStore } from './theme-store';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { mode } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(mode);
  }, [mode]);

  return <>{children}</>;
}
