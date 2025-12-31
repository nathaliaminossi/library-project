import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import baseUrl  from "../api/config/base"; 
import axios from "axios";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type User = {
  id: string | number;
  name: string;
  email: string;
};

interface AuthContextValue {
  status: AuthStatus;
  user: User | null;
  isAuthenticated: boolean;

  refreshMe: () => Promise<void>;
  login: (payload: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<User | null>(null);

  const refreshMe = async () => {
    try {
      // ajuste o endpoint conforme seu backend
      const { data } = await baseUrl.get<User>("/user/config/me", {withCredentials: true});
      setUser(data);
      setStatus("authenticated");
    } catch (err) {
      // se 401/403, sessão inválida
      if (axios.isAxiosError(err) && err.response?.status) {
        const s = err.response.status;
        if (s === 401 || s === 403) {
          setUser(null);
          setStatus("unauthenticated");
          return;
        }
      }
      // fallback
      setUser(null);
      setStatus("unauthenticated");
    }
  };

  const login = async (payload: { email: string; password: string }) => {
    // ajuste endpoint: você comentou que usa /sign
    await baseUrl.post("/sign", payload, {withCredentials: true});

    // depois que o backend setar o cookie, carregue o usuário
    await refreshMe();
  };

  const logout = async () => {
    try {
      // recomendado ter endpoint que limpa o cookie
      await baseUrl.post("/logout", {}, {withCredentials: true});
    } finally {
      setUser(null);
      setStatus("unauthenticated");
    }
  };

  useEffect(() => {
    refreshMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    return {
      status,
      user,
      isAuthenticated: status === "authenticated",
      refreshMe,
      login,
      logout,
    };
  }, [status, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
};
