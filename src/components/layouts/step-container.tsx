import { type STEPS, useUserStore } from "@project/store";
import type { FC, PropsWithChildren } from "react";

export const StepContainer: FC<
  PropsWithChildren & {
    bgClassName?: string;
    currentStep: STEPS;
  }
> = ({ children, bgClassName = "", currentStep }) => {
  const { isActiveStep, isCompletedStep } = useUserStore();
  return (
    <section
      className={`${isActiveStep(currentStep) ? "animate-pulse !text-black" : ""}
            flex flex-col p-3 h-22 gap-2 text-white rounded-xl ${isCompletedStep(currentStep) ? bgClassName : "bg-gray-400/50"}`}
    >
      {children}
    </section>
  );
};
