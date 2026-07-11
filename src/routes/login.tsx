import { createFileRoute } from "@tanstack/react-router";
import { Login } from "../pages/index";

export const Route = createFileRoute("/login")({
  component: Login,
});
