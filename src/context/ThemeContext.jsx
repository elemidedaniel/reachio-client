import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({});

const ACCENT_COLORS = {
  black:  '#0F0F0F',
  blue:   '#2563EB',
  orange: '#E85D26',
  green:  '#16A34A',
};

export function ThemeProvider({ children }) {
  const [accent, setAccent] = useState('#0F0F0F');

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent);
  }, [accent]);

  const changeAccent = (colorKey) => {
    const color = ACCENT_COLORS[colorKey] || '#0F0F0F';
    setAccent(color);
  };

  return (
    <ThemeContext.Provider value={{ accent, changeAccent, ACCENT_COLORS }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);