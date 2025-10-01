import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "./AuthContext";
import { useTheme } from "../components/ThemeContext";

/** A form that allows users to log into an existing account. */
export default function Login() {
  const { login } = useAuth();
  const { theme, oppositeTheme } = useTheme();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const onLogin = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      await login({ username, password });
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="login-page">
      <h2 className="login-title">Log in to your account</h2>
      <form action={onLogin} className="login-form">
        <div className="form-group">
          <label>
            Username
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter username"
              required
              data-bs-theme={theme}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Password
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              required
              data-bs-theme={theme}
            />
          </label>
        </div>
        <button className={`btn btn-${oppositeTheme}`}>Submit</button>
        {error && <output>{error}</output>}
      </form>
      <Link to="/register">Need an account? Register here.</Link>
    </div>
  );
}
