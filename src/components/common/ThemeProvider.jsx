import React, { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'smart-pet-care-theme-mode';
const DEFAULT_MODE = 'system';

const ThemeContext = createContext({
  mode: DEFAULT_MODE,
  theme: 'light',
  setMode: () => {}
});

const fetchPreferredMode = () => {
  return new Promise((resolve) => {
    const stored = (() => {
      try {
        return localStorage.getItem(STORAGE_KEY);
      } catch (error) {
        return null;
      }
    })();
    resolve(stored || DEFAULT_MODE);
  });
};

const saveMode = (mode) => {
  return new Promise((resolve) => {
    resolve(mode);
  });
};

const getInitialMode = () => {
  if (typeof window === 'undefined') return DEFAULT_MODE;
  try {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_MODE;
  } catch (error) {
    return DEFAULT_MODE;
  }
};

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(getInitialMode);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    if (mode !== 'system') {
      return mode;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useState(() => {
    fetchPreferredMode().then((remoteMode) => {
      if (remoteMode && remoteMode !== mode) {
        setMode(remoteMode);
      }
    });
    return null;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch (error) {
      /* ignore */
    }
    saveMode(mode);
  }, [mode]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (mode !== 'system') {
      setTheme(mode);
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateTheme = (event) => {
      setTheme(event.matches ? 'dark' : 'light');
    };

    setTheme(mediaQuery.matches ? 'dark' : 'light');

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateTheme);
      return () => mediaQuery.removeEventListener('change', updateTheme);
    }

    mediaQuery.addListener(updateTheme);
    return () => mediaQuery.removeListener(updateTheme);
  }, [mode]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ mode, theme, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };
