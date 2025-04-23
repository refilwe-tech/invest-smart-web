import { useNavigate } from "@tanstack/react-router";
import { Button, GradientHeading } from "../../common";
import { LineGraphImage } from "../../../assets";

export const LandingPage = () => {
  const navigate = useNavigate({ from: "/" });
  const getStarted = () => navigate({ to: "/register" });

  return (
    <section className="bg-tertiary px-10 grid gap-10 grid-cols-2 min-h-screen place-items-center p-2">
      <section className="flex flex-col gap-5">
        <section className="flex flex-col gap-1">
          <GradientHeading>
            Invest Smart
          </GradientHeading>
          <h2 className="text-white font-bold text-6xl">Grow your money</h2>
        </section>
        <p className="text-white text-base text-left">
          💰 Your trusted guide to smarter investing. <br />
          Finding the best financial institution to grow your money can be
          overwhelming. Whether you're saving for retirement, building wealth,
          or just starting your investment journey, we simplify the process for
          you. Find the best investments—fast. Grow your money with confidence.
          Smart investing starts here. Compare, choose, and grow your wealth.
        </p>
        <Button variant="gradient" onClick={getStarted}>Get Started</Button>
      </section>
      <section className="drop-shadow-2xl min-h-screen place-items-center grid">
        <img src={LineGraphImage} className="w-3/4" alt="line graph" />
      </section>
    </section>
  );
};
