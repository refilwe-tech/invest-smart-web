import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  server: {
    /*     allowedHosts: ["localhost", ".ngrok-free.app"], */
  },
  plugins: [
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    react(),
  ],
  resolve: {
    alias: {
      "@project": path.resolve(__dirname, "./src"),
    },
  },
});
