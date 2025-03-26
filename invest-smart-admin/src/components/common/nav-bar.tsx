import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { Link, useLocation } from "@tanstack/react-router";
import { Line } from "./line";
import Logo from '../../assets/logo.png';
export const NavBar = () => {

  const { pathname } = useLocation();

  const isActive = (path:string) => pathname === path;

  const ROUTES = [
    {
      path: '/',
      icon: <IoHomeOutline/>,
      name: 'Home'

    }
  ]

  const logout = ()=>void 0;

  return (
    <div className="bg-[#0EA5E9] text-white h-full w-56 flex-shrink-0 p-4">
      <ul className="flex flex-col gap-4">
        <li key={0}>
          <Link
            to="/"
            className="flex items-center gap-2 hover:text-blue-500 pb-1"
          >
            <img src={Logo}/>
          </Link>
          {isActive("/") && <Line />}
        </li>
        {ROUTES?.map(({path,icon,name}, index) => (
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

      <Link
        onClick={logout}
        to="/"
        className="flex items-center absolute bottom-0 mb-6 hover:text-blue-500"
      >
       <RiLogoutCircleRLine  />
        Logout
      </Link>
    </div>
  );
};