import { create } from "zustand";
import { persist } from "zustand/middleware";

export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
  SUPER_ADMIN: "super_admin",
};

export type STEPS = 0 | 1 | 2 | 3;
export interface UserStore {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    userRole: string;
  };
  setUser: (user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    userRole: string;
  }) => void;
  clearUser: () => void;
  step: STEPS; // 0 = no  financial data, 1 = has financial data but no investment goal, 2 = has financial profile and investment goal but no investment plan, 3 = has financial profile, investment goal and investment plan
  setStep: (step: STEPS) => void;
  clearStep: () => void;
  isActiveStep: (step: STEPS) => boolean;
  isPendingStep: (step: STEPS) => boolean;
  isCompletedStep: (step: STEPS) => boolean;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: undefined,
        userRole: "",
      },
      setUser: (user) => set({ user }),
      clearUser: () =>
        set({
          user: {
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: undefined,
            userRole: "",
          },
        }),
      step: 0,
      setStep: (step: STEPS) => set({ step }),
      clearStep: () => set({ step: 0 }),
      isActiveStep: (step: STEPS) => step === get().step,
      isPendingStep: (step: STEPS) => step > get().step,
      isCompletedStep: (step: STEPS) => step < get().step && get().step !== 0,
    }),
    {
      name: "user-storage",
    }
  )
);
