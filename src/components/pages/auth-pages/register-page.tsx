import { useNavigate } from "@tanstack/react-router";

import { Button, GradientHeading } from "../../common";
import { RegisterForm } from "../../forms";

export const RegisterPage = () => {
  const navigate = useNavigate({from:'/register'});
  const learnMore = ()=> navigate({to:'/'})

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
        <section className="text-center"> <Button onClick={learnMore}>Learn More</Button></section>
       
      </section>
    </section>
    <section className="w-[40%] h-full bg-white grid place-items-center">
      <section className="grid gap-3 w-[80%]">
        <section className="grid gap-1">
          <h1 className="font-bold text-black text-xl">Hello!</h1>
          <p className="text-sm text-gray-500">
          Create an account to get started.
        </p>
        </section>

       
        <RegisterForm />
        <section className="flex gap-1">
          <p className="text-sm text-gray-500">Already have an account?</p>
          <a href="/login" className="text-primary text-sm font-semibold">
            Login
          </a>
        </section>
      </section>
    </section>
  </section>
);}
