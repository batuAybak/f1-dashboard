import { NavLink, useNavigate } from "react-router";

import { useAuth } from "../../auth/AuthContext";
import { useState } from "react";
import { useTheme } from "../ThemeContext";

/**
 * Navbar displays the main navigation bar, including links, theme toggle, and login/logout.
 */
export default function Navbar() {
  const { token, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const { toggleTheme, theme } = useTheme();
  const navigate = useNavigate();

  /**
   * Handles user logout and navigates to home.
   */
  const handleLogout = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  /**
   * Closes the hamburger menu.
   */
  const hamburgerClick = () => {
    setOpen(false);
  };

  return (
    <header id="navbar">
      <section>
        {/* F1 logo */}
        <img
          className="navbar-logo"
          src="https://logos-world.net/wp-content/uploads/2023/12/F1-Logo.png"
          alt="Formula 1 Logo"
        />
      </section>
      <section className={`navigation ${open ? "open" : ""}`}>
        {/* Navigation links */}
        <NavLink id="brand" to="/" onClick={hamburgerClick}>
          Home
        </NavLink>
        <NavLink to="/drivers" onClick={hamburgerClick}>
          Drivers
        </NavLink>
        <NavLink to="/teams" onClick={hamburgerClick}>
          Teams
        </NavLink>
        <NavLink to="/standings" onClick={hamburgerClick}>
          Standings
        </NavLink>
        <NavLink to="/calendar" onClick={hamburgerClick}>
          Calendar
        </NavLink>
        <nav className="profile-nav">
          {token ? (
            <>
              <NavLink to="/forum" onClick={hamburgerClick}>
                Forum
              </NavLink>
              <NavLink to="/profile" onClick={hamburgerClick}>
                Profile
              </NavLink>
              <button className="logout" onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <NavLink to="/login" onClick={hamburgerClick}>
              Log in
            </NavLink>
          )}
        </nav>
        {/* Theme toggle button */}
        <button
          id="toggle"
          className={`dark-light-toggle ${theme}`}
          aria-label="Toggle light/dark mode"
          onClick={toggleTheme}
        >
          <span className="knob"></span>
        </button>
      </section>
      {/* Hamburger menu for mobile */}
      <div className="hamburger" onClick={() => setOpen(!open)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
}
