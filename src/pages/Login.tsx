import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "@tanstack/react-router";

export function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    loginMutation.mutate(
      {
        name: usuario,
        password,
      },
      {
        onSuccess: () => {
          navigate({
            to: "/",
          });
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950 text-amber-50">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-6 shadow-2xl">
        <h2 className="mb-6 text-2xl font-bold">LOGIN</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block">Usuario</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-2 outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="mb-2 block">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-2 outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-screen rounded-lg bg-emerald-500 px-4 py-2 hover:bg-emerald-600"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
