import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const VALID_CREDENTIALS = {
  username: "agbajeabiodunkay",
  password: "Face123book",
  name: "Abiodun Agbaje",
  role: "Founder & Marketing Director",
};

const STORAGE_KEY = "veltrix_auth_session";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback
    }
    return null;
  });

  const login = (usernameInput, passwordInput) => {
    const cleanUser = (usernameInput || "").trim().toLowerCase();
    const cleanPass = (passwordInput || "").trim();

    const isValidUser =
      cleanUser === "agbajeabiodunkay" || cleanUser === "agbajeabodunkay";

    if (isValidUser && cleanPass === VALID_CREDENTIALS.password) {
      const sessionUser = {
        username: "agbajeabiodunkay",
        name: VALID_CREDENTIALS.name,
        role: VALID_CREDENTIALS.role,
        loginAt: new Date().toISOString(),
      };
      setUser(sessionUser);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser));
      } catch {
        // Storage notice
      }
      return { success: true };
    }
    return {
      success: false,
      message: "Invalid credentials. Please verify your username and password.",
    };
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Storage notice
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
