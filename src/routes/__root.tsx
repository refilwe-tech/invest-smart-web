import { createRootRoute, Outlet } from "@tanstack/react-router";
import { NavBar, AuthNavBar } from "../components";
import { useAuthStore } from "../store";
import { useEffect } from "react";

export const Route = createRootRoute({
  component: () => {
  /*   useEffect(()=>{
      localStorage.clear()
    },[]) */
     const {isAuthenticated } = useAuthStore();
    return (
      <main className="w-full h-screen flex flex-col">
        {!isAuthenticated ? (
          <main className="flex flex-col h-full">
            <AuthNavBar />
            <section>
              <Outlet />
            </section>
          </main>
        ) : (
          <section className="flex w-full h-full">
            <NavBar />
            <section className="bg-light-gray p-5 w-full">
              <Outlet />
            </section>
          </section>
        )}
      </main>
    );
  },
});
