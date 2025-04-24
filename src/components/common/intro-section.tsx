import { useNavigate } from "@tanstack/react-router";
import { Button } from "./button";
import { GradientHeading } from "./gradient-heading";

export const IntroSection = () => {
  const navigate = useNavigate();
  const learnMore = () => navigate({ to: "/" });
  
  return (
    <section className="grid gap-3">
      <section className="flex flex-col gap-1">
        <GradientHeading>Smart Invest</GradientHeading>
        <p className="text-base text-center text-white">
          Grow your money with confidence. Smart investing starts here.
        </p>
      </section>
      <section className="text-center">
        <Button variant="gradient" onClick={learnMore}>
          Learn More
        </Button>
      </section>
    </section>
  );
};
