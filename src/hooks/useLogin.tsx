import { useMutation } from "@tanstack/react-query";
import { createSession } from "../auth/auth";
import users from "../data/users.json";

type LoginData = {
  name: string;
  password: string;
};

const login = async (data: LoginData) => {
  const user = users.find(
    (u) => u.name === data.name && u.password === data.password,
  );

  if (!user) {
    throw new Error("Usuario incorrecto");
  }

  return user;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,

    onSuccess: (user) => {
      createSession({
        name: user.name,
      });
    },
  });
};
