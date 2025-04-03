import { Link } from "@tanstack/react-router";

import { LogoIcon } from "../../assets";

export const AuthNavBar = () => {
  return (
    <nav className="flex bg-tertiary justify-between px-4 drop-shadow-2xl">
      <Link to="/">
        <img src={LogoIcon} className="h-14" alt="logo" />
      </Link>
      <section className="flex items-center gap-4 text-white">
        <Link className="hover:text-primary" to="/register">Register</Link>
        <Link className="hover:text-primary" to="/login">Login</Link>
      </section>
    </nav>
  );
};
