// user-hooks.ts
import { useEffect } from "react";
import { useUserStore } from "@project/store";

export const useUserStepper = () => {
  const { user, step, setStep, clearStep } = useUserStore();


  useEffect(() => {
    // If user is logged out (empty id), clear the step
    if (!user.id) {
      clearStep();
    }
  }, [user.id, clearStep]);

  return {
    step,
    setStep,
    isActiveStep: useUserStore.getState().isActiveStep,
    isPendingStep: useUserStore.getState().isPendingStep,
    isCompletedStep: useUserStore.getState().isCompletedStep,
  };
};