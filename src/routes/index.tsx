import { createFileRoute, redirect } from "@tanstack/react-router";
import { Tasks } from "../pages/index";
import { getSession } from "../auth/auth";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    const user = getSession();

    if (!user) {
      throw redirect({
        to: "/login",
      });
    }
  },

  component: Tasks,
});
