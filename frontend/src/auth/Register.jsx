import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "./AuthContext";
import { useTheme } from "../components/ThemeContext";

/** A form that allows users to register for a new account */
export default function Register() {
  const { register } = useAuth();
  const { theme, oppositeTheme } = useTheme();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const onRegister = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      await register({ username, password });
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="register-page">
      <h2 className="register-title">Create a new account</h2>
      <form action={onRegister} className="register-form">
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
        <button className={`btn btn-${oppositeTheme}`}>Register</button>
        {error && <output>{error}</output>}
      </form>
      <Link to="/login">Already have an account? Log in here.</Link>
    </div>
  );
}
