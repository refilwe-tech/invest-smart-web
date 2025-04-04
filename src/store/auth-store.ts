import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthStore {
  isAuthenticated: boolean;
  token: string | null;
  setToken: (token: string | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      setToken: (token) => set({ token }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    }),
    {
      name: "auth-storage", // unique name
    }
  )
);
