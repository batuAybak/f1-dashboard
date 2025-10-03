import { useEffect, createContext, useState, useContext } from "react";

/**
 * ThemeContext provides theme state and toggling for the app.
 */
const ThemeContext = createContext();

/**
 * ThemeProvider manages the current theme (light/dark) and provides a toggle function.
 * Wrap your app in this provider to enable theme switching.
 */
export const ThemeProvider = ({ children }) => {
  // Default to 'light' theme if nothing in localStorage
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  // The opposite theme string (for button labels, etc.)
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  /**
   * Toggle between light and dark themes.
   */
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const value = {
    theme,
    oppositeTheme,
    toggleTheme,
  };

  // Persist theme to localStorage and update body class
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
    document.body.classList = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

/**
 * useTheme provides access to the theme context (theme, oppositeTheme, toggleTheme).
 */
export function useTheme() {
  return useContext(ThemeContext);
}
