import { NavLink } from "react-router";

import { useAuth } from "../../auth/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { token, logout } = useAuth();
  const [open, setOpen] = useState(false);
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
        <NavLink id="brand" to="/">
          Home
        </NavLink>
        <NavLink to="/drivers">Drivers</NavLink>
        <NavLink to="/teams">Teams</NavLink>
        <NavLink to="/standings">Standings</NavLink>
        <NavLink to="/calendar">Calendar</NavLink>
        <nav className="profile-nav">
          {token ? (
            <>
              <NavLink to="/profile">Profile</NavLink>
              <button className="logout" onClick={logout}>
                Log out
              </button>
            </>
          ) : (
            <NavLink to="/login">Log in</NavLink>
          )}
        </nav>
      </section>
      <div className="hamburger" onClick={() => setOpen(!open)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
}
