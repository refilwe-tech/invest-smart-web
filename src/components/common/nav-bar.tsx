import { RiLogoutCircleRLine } from "react-icons/ri";
import { HiOutlineUsers, HiDocument } from "react-icons/hi2";
import { Link, useLocation } from "@tanstack/react-router";
import { Line } from "./line";
import Logo from '../../assets/logo.png';

export const NavBar = () => {

  const { pathname } = useLocation();

  const isActive = (path:string) => pathname === path;

  const ROUTES = [
    {
      path: '/users',
      icon: <HiOutlineUsers/>,
      name: 'Users'

    },
    {
      path: '/investments',
      icon: <HiOutlineUsers/>,
      name: 'Investments'

    },
    {
      path: '/reports',
      icon: <HiDocument/>,
      name: 'Reports'

    }
  ]

  const logout = ()=>void 0;

  return (
    <div className="bg-[#1E3A8A] text-white h-full w-56 flex-shrink-0 p-4">
      <ul className="flex flex-col gap-4">
        <li key={0} className="pb-5">
          <Link
            to="/"
            className="flex items-center gap-2 hover:text-blue-500 pb-1"
          >
            <img src={Logo}/>
          </Link>
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
        className="flex items-center  gap-2 absolute bottom-0 mb-6 hover:text-blue-500"
      >
       <RiLogoutCircleRLine  />
        Logout
      </Link>
    </div>
  );
};