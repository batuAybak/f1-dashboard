import { NavLink } from "react-router";

import { useAuth } from "../../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  return (
    <header id="navbar">
      <section className="logo">
        <img
          src="https://thumbnail.imgbin.com/25/24/5/f1-logo-rsrQT67e_t.jpg"
          alt="Formula 1 Logo"
        />
      </section>
      <section className="navigation">
        <NavLink id="brand" to="/">
          <p>Home</p>
        </NavLink>
        <NavLink to="/drivers">Drivers</NavLink>
        <NavLink to="/teams">Teams</NavLink>
        <NavLink to="/calendar">Calendar</NavLink>
        <nav className="profile-nav">
          {token ? (
            <>
              <NavLink to="/profile">Profile</NavLink>
              <button onClick={logout}>Log out</button>
            </>
          ) : (
            <NavLink to="/login">Log in</NavLink>
          )}
        </nav>
      </section>
    </header>
  );
}
