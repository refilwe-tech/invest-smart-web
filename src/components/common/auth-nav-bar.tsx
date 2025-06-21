import { useMemo } from "react";
import { Link, useLocation } from "@tanstack/react-router";

import { LogoIcon } from "../../assets";

export const AuthNavBar = () => {
  const allowedRoutes = ["/", "/about"];
  const location = useLocation();
  const isIndex = useMemo(
    () => allowedRoutes.includes(location?.pathname),
    [location?.pathname]
  );

  return (
    isIndex && (
      <nav className="flex bg-tertiary justify-between px-4 drop-shadow-2xl">
        <Link to="/">
          <img src={LogoIcon} className="h-14" alt="logo" />
        </Link>

        <section className="flex items-center gap-5 text-white">
          <Link className="hover:text-primary" to="/about">
            About Us
          </Link>
          <Link className="hover:text-primary" to="/register">
            Register
          </Link>
          <Link className="hover:text-primary" to="/login">
            Login
          </Link>
        </section>
      </nav>
    )
  );
};
