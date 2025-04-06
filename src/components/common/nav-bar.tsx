import { RiLogoutCircleRLine } from "react-icons/ri";
import {
  HiOutlineUsers,
  HiDocument,
  HiOutlineBanknotes,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";

import { Line } from "./line";
import Logo from "../../assets/logo.png";
import { useAuthStore } from "../../store";
import { useQuery } from "@tanstack/react-query";
import { userModel, userService } from "../../services";
import { useUserStore } from "../../store/user-store";

export const NavBar = () => {
  const { setUser } = useUserStore();
  const {token} = useAuthStore()
  const { data: currentUser, isLoading: userLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => userService.getCurrentUser(),
    select: userModel,
    enabled:!!token
  });
  const { pathname } = useLocation();
  const { setIsAuthenticated, setToken } = useAuthStore();
  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
  };

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    if (!userLoading) {
      setUser({
        id: currentUser?.id ?? "",
        firstName: currentUser?.firstName ?? "",
        lastName: currentUser?.lastName ?? "",
        email: currentUser?.email ?? "",
        phoneNumber: currentUser?.phoneNumber ?? "",
        userRole: currentUser?.userRole ?? "",
      });
    }
  }, [currentUser]);

  const ROUTES = {
    admin: [
      {
        path: "/admins",
        icon: <HiOutlineUserGroup />,
        name: "Admins",
      },
      {
        path: "/users",
        icon: <HiOutlineUsers />,
        name: "Users",
      },
      {
        path: "/investments",
        icon: <HiOutlineBanknotes />,
        name: "Investments",
      },
      {
        path: "/reports",
        icon: <HiDocument />,
        name: "Reports",
      },
    ],
    user: [
      {
        path: "/invest",
        icon: <HiOutlineBanknotes />,
        name: "Invest",
      },
    ],
  };

  return (
    <div className="bg-gradient-to-br to-[#812DE2] from-[#423EE0] text-white h-full w-56 flex-shrink-0 p-4">
      <ul className="flex flex-col gap-4">
        <li key={0} className="pb-5">
          <Link
            to="/home"
            className="border-b-2 flex items-center gap-2 hover:text-blue-500 pb-1"
          >
            <img src={Logo} />
          </Link>
        </li>

        {ROUTES?.[
          currentUser?.userRole  as keyof typeof ROUTES ?? ("user")
        ]?.map(({ path, icon, name }, index) => (
          <li key={index + 1}>
            <Link
              to={path}
              className="flex items-center gap-2 hover:text-blue-500 pb-1"
            >
              {icon}
              {name}
            </Link>
            {isActive(path) && <Line />}
          </li>
        ))}
      </ul>
      <section className="absolute bottom-0 mb-6 flex flex-col gap-6">
        <Link
          to="/profile"
          className="flex gap-2 items-center hover:text-blue-500"
        >
          <img
            src={`https://eu.ui-avatars.com/api/?name=${currentUser?.firstName}+${currentUser?.lastName}&background=1E2D40&color=fff`}
            alt="profile"
            className="w-8 h-8 rounded-full"
          />
          Profile
        </Link>

        <Link
          onClick={logout}
          to="/login"
          className="flex items-center  gap-2  hover:text-blue-500"
        >
          <RiLogoutCircleRLine className="w-8 h-8" />
          Logout
        </Link>
      </section>
    </div>
  );
};
