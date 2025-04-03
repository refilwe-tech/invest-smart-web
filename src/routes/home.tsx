import { createFileRoute } from "@tanstack/react-router";

import { HomePage } from "../components";

export const Route = createFileRoute("/home")({
  component: HomePage,
});

