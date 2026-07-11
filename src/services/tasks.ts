import type { Task } from "../types/task";

const URL = "https://pgaobhmaanpjregfmkfa.supabase.co/rest/v1/Task";

const headers = {
  apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
  "Content-Type": "application/json",
};

export const getTasks = async (): Promise<Task[]> => {
  const res = await fetch(`${URL}`, {
    headers,
  });

  return await res.json();
};

export const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      ...headers,
      Prefer: "return=representation",
    },
    body: JSON.stringify(task),
  });

  if (!res.ok) throw new Error("Error al crear la tarea");
  const data = await res.json();
  return data[0];
};

export const updateTask = async (
  id: string,
  task: Omit<Task, "id">,
): Promise<Task> => {
  const res = await fetch(`${URL}?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      ...headers,
      Prefer: "return=representation",
    },
    body: JSON.stringify(task),
  });

  if (!res.ok) throw new Error("Error al actualizar");
  const data = await res.json();
  return data[0];
};

export const deleteTask = async (id: string): Promise<void> => {
  const res = await fetch(`${URL}?id=eq.${id}`, {
    method: "DELETE",
    headers,
  });

  if (!res.ok) throw new Error("Error al eliminar");
};
