import { useEffect, createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const theme = isDark ? "dark" : "light";

  const toggleTheme = () => setIsDark(!isDark);
  const value = {
    isDark,
    theme,
    toggleTheme,
  };

  useEffect(() => {
    document.body.className = theme;
    document.body.classList = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export function useTheme() {
  return useContext(ThemeContext);
}
