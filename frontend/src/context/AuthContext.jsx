import { createContext, useContext, useEffect, useState } from "react";
import api from "../pages/apiInterceptor";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    setLoading(true);
    try {
      const { data } = await api.get("/api/auth/me");
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await api.post("/api/auth/logout");
    } catch {
      // still clear locally even if request fails
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("email");
    setUser(null);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const isAuth = !!user;

  return (
    <AppContext.Provider
      value={{
        isAuth,
        user,
        loading,
        fetchUser,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAuth must be used within the AppProvider");
  return context;
};
