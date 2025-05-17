import { createContext, useContext, useState, type ReactNode } from "react";
import Cookies from "js-cookie";
import api from "../services/api";

type AuthContextType = {
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

type LoginResponse = {
  message: string;
  token: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => Cookies.get("token") || null);

  const login = async (username: string, password: string) => {
    const response = await api.post<LoginResponse>("/auth/login", {
        username,
        password,
    });
    const { token: jwt } = response.data;

    Cookies.set("token", jwt, { expires: 7 });
    setToken(jwt);
  };

  const logout = () => {
    Cookies.remove("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}