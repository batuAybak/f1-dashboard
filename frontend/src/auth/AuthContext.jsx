import { createContext, useContext, useEffect, useState } from "react";
import { API } from "../api/ApiContext";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));

  // Store token in sessionStorage and fetch user profile when token changes
  useEffect(() => {
    if (token) sessionStorage.setItem("token", token);
    if (userId) sessionStorage.setItem("userId", userId);
  }, [token, userId]);

  const register = async (credentials) => {
    const response = await fetch(API + "/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const result = await response.text();
    if (!response.ok) throw Error(result);
    setToken(result);
  };

  const login = async (credentials) => {
    const response = await fetch(API + "/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const result = await response.text();
    // Add user id as a state variable
    const responseUser = await fetch(API + "/users/profile", {
      headers: { Authorization: `Bearer ${result}` },
    });
    const resultUser = await responseUser.json();
    if (!responseUser.ok) throw Error(resultUser);
    setToken(result);
    setUserId(resultUser.user.id);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    sessionStorage.removeItem("token");
  };

  const value = { token, userId, register, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
