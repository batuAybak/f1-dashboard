import { NavLink, useNavigate } from "react-router";

import { useAuth } from "../../auth/AuthContext";
import { useState } from "react";
import { useTheme } from "../ThemeContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const { toggleTheme, theme } = useTheme();
  const navigate = useNavigate();
  const handleLogout = () => {
    // Navigate to home on logout
    logout();
    navigate("/");
    setOpen(false);
  };

  const hamburgerClick = () => {
    setOpen(false);
  };

  return (
    <header id="navbar">
      <section>
        <img
          className="navbar-logo"
          src="https://logos-world.net/wp-content/uploads/2023/12/F1-Logo.png"
          alt="Formula 1 Logo"
        />
      </section>
      <section className={`navigation ${open ? "open" : ""}`}>
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
            <NavLink to="/login">Log in</NavLink>
          )}
        </nav>
        <button
          id="toggle"
          className={`dark-light-toggle ${theme}`}
          aria-label="Toggle light/dark mode"
          onClick={toggleTheme}
        >
          <span className="knob"></span>
        </button>
      </section>
      <div className="hamburger" onClick={() => setOpen(!open)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
}
