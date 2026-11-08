import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { STORAGE_KEYS } from '../utils/constants';

export const ThemeContext = createContext(null);

function readInitialTheme() {
  const fromDom = document.documentElement.dataset.theme; // set by the inline script in index.html
  if (fromDom === 'light' || fromDom === 'dark') return fromDom;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0f241b' : '#12392b');
    try {
      localStorage.setItem(STORAGE_KEYS.theme, theme);
    } catch {
      /* private mode: theme still works for this session */
    }
  }, [theme]);

  const setTheme = useCallback((t) => setThemeState(t === 'dark' ? 'dark' : 'light'), []);
  const toggleTheme = useCallback(() => setThemeState((t) => (t === 'dark' ? 'light' : 'dark')), []);

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
