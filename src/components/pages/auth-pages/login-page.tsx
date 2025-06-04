import { IntroSection } from "../../common";
import { LoginForm } from "../../forms";
import { useDocumentTitle } from "../../../hooks";
import { Link } from "@tanstack/react-router";

export const LoginPage = () => {
  const pageTitle = "Login";
  useDocumentTitle(pageTitle);
  return (
    <section className="w-full flex h-screen">
      <section className="w-[60%] grid place-items-center h-full bg-gradient-to-r from-tertiary to-[#3A49F9]">
        <IntroSection />
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
            <Link to="/register" className="text-primary text-sm font-semibold">
              Register
            </Link>
          </section>
        </section>
      </section>
    </section>
  );
};
