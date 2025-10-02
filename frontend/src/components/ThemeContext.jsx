import { useEffect, createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Default to 'light' theme if nothing in localStorage
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light" // arrow function to avoid running on every render
  );

  const oppositeTheme = theme === "dark" ? "light" : "dark";

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const value = {
    theme,
    oppositeTheme,
    toggleTheme,
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
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
