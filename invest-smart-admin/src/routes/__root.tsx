import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { NavBar } from "../components";

export const Route = createRootRoute({
  component: () => (
    <main className="w-full h-screen flex flex-col">
      <section className="flex w-full h-full">
        <NavBar />
        <section className="bg-light-gray p-5 w-full">
          <Outlet />
        </section>
      </section>
      <TanStackRouterDevtools />
    </main>
  ),
});
