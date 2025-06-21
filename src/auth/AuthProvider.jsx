import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userData, token) => {
    setLoading(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
    setLoading(false);
  };

  const logout = () => {
    setLoading(true);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    const userStored = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (userStored && token) {
      setUser(userStored);
    } else {
      logout();
    }
    setLoading(false);
  }, []);

  return (
    <div>
      <AuthContext.Provider
        value={{ user, login, logout, loading, isAuthenticated: user !== null }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthContextProvider;
