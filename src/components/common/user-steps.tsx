import { StepContainer } from "../layouts";
import { Button } from "./button";
import { useUserStore } from "@project/store";
import { useNavigate } from "@tanstack/react-router";

export const UserSteps = () => {
  const { step } = useUserStore();
  const navigate = useNavigate({ from: "/home" });

  const goToStep1 = () => navigate({ to: "/finances" });
  const goToStep2 = () => navigate({ to: "/invest" });
  return (
    <section className="grid md:grid-cols-3 gap-4 w-full">
      <StepContainer currentStep={0} bgClassName="bg-primary hover:bg-dark">
        <section className="flex gap-2 items-center">
          <h1 className="font-bold">Step 1:</h1>
          <h4 className="font-semibold text-sm">Create Financial Profile</h4>
        </section>
        <p className="text-xs">
          Let us understand your finances for better analysis
        </p>
        {step === 0 && (
          <Button variant="solid" onClick={goToStep1}>
            Take Me There
          </Button>
        )}
      </StepContainer>
      <StepContainer
        currentStep={1}
        bgClassName="hover:bg-secondary/80 bg-secondary"
      >
        <section className="flex gap-2 items-center">
          <h1 className="font-bold">Step 2:</h1>
          <h4 className="font-semibold text-sm">Create Investment Goal</h4>
        </section>
        <p className="text-xs">
          Set an investment goal and see how your money will grow.
        </p>
        {step === 1 && (
          <Button variant="solid" onClick={goToStep2}>
            Take Me There
          </Button>
        )}
      </StepContainer>
      <StepContainer currentStep={2} bgClassName="hover:bg-dark bg-tertiary">
        <section className="flex gap-2 items-center">
          <h4 className="font-semibold text-sm">Step 3: Grow your money</h4>
        </section>
        <p className="text-xs">Save Plans, and Start Growing your money.</p>
        {step === 2 && (
          <Button variant="solid" onClick={goToStep2}>
            Take Me There
          </Button>
        )}
      </StepContainer>
    </section>
  );
};
