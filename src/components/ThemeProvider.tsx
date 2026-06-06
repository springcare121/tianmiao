'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

const LIGHT_BG = '#f8f9fa';
const LIGHT_FG = '#0f172a';
const DARK_BG = '#2d2a26';   /* 暖调炭灰 */
const DARK_FG = '#faf6f1';   /* 暖白文字 */

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const body = document.body;

  if (theme === 'dark') {
    root.classList.add('dark');
    body.style.backgroundColor = DARK_BG;
    body.style.color = DARK_FG;
  } else {
    root.classList.remove('dark');
    body.style.backgroundColor = LIGHT_BG;
    body.style.color = LIGHT_FG;
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  // Initialize and apply theme
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    const saved = localStorage.getItem('theme') as Theme | null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    const initialTheme = saved === 'dark' || saved === 'light' ? saved : 'light';
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  // Apply theme whenever it changes
  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
