import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {NavBar} from '../components/common'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
       <NavBar/>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})