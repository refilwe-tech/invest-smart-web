import { useNavigate } from "@tanstack/react-router";

import { Button, GradientHeading } from "../../common";
import { LoginForm } from "../../forms";

export const LoginPage = () => {
  const navigate = useNavigate({ from: "/login" });
  const learnMore = () => navigate({ to: "/" });

  return (
    <section className="w-full flex h-screen">
      <section className="w-[60%] grid place-items-center h-full bg-gradient-to-r from-tertiary to-[#3A49F9]">
        <section className="grid gap-3">
          <section className="flex flex-col gap-1">
            <GradientHeading>Smart Invest</GradientHeading>
            <p className="text-base text-center text-white">
              Grow your money with confidence. Smart investing starts here.
            </p>
          </section>
          <section className="flex items-center justify-center w-1/2">
            <Button className="w-1/2" onClick={learnMore}>Learn More</Button>
          </section>
        </section>
      </section>
      <section className="w-[40%] h-full bg-white grid place-items-center">
        <section className="grid gap-3 w-[80%]">
          <section className="grid gap-1">
            <h1 className="font-bold text-black text-xl">Hello!</h1>
            <p className="text-sm text-gray-500">
              Welcome, would you like to access your account?
            </p>
          </section>

          <LoginForm />
          <section className="flex gap-1">
            <p className="text-sm text-gray-500">Don't have an account?</p>
            <a href="/register" className="text-primary text-sm font-semibold">
              Register
            </a>
          </section>
        </section>
      </section>
    </section>
  );
};
