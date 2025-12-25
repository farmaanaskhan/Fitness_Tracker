import React, { createContext, useState, useEffect } from "react";
import { getProfileFromToken } from "../utils/auth";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(token ? getProfileFromToken(token) : null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      setUser(getProfileFromToken(token));
    } else {
      localStorage.removeItem("token");
      setUser(null);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
