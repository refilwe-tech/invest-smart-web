import { create } from "zustand";
import { persist } from "zustand/middleware";

export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
  SUPER_ADMIN:'super_admin'
}
export interface UserStore {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    userRole: string;
  }
  setUser: (user: {
    id: string;
    firstName: string;      
    lastName: string;
    email: string;
    phoneNumber?: string;
    userRole: string;
  }) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: undefined,
        userRole: "",
      },
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: { id: "", firstName: "", lastName: "", email: "", phoneNumber: undefined, userRole: "" } }),
    }),
    {
      name: "user-storage", 
    }
  )
);