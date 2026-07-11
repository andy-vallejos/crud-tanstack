import { useState } from "react";
import { Card, Modal } from "../components/index";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { removeSession } from "../auth/auth";
import { useNavigate } from "@tanstack/react-router";
import type { Task } from "../types/task";
import {
  getTasks,
  deleteTask,
  createTask,
  updateTask,
} from "../services/tasks";

export function Tasks() {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const queryClient = useQueryClient();
  const { data = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      task,
    }: {
      id: string;
      task: {
        title: string;
        description: string;
      };
    }) => updateTask(id, task),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setModalIsOpen(true);
  };

  const handleSave = async () => {
    if (editingTask) {
      await updateMutation.mutateAsync({
        id: editingTask.id,
        task: {
          title,
          description,
        },
      });
    } else {
      await createMutation.mutateAsync({
        title,
        description,
      });
    }

    setEditingTask(null);
    setTitle("");
    setDescription("");
    setModalIsOpen(false);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setEditingTask(null);
    setTitle("");
    setDescription("");
  };

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);
  };

  return (
    <div className="bg-zinc-950 min-h-screen p-6 text-zinc-100 relative">
      {modalIsOpen ? (
        <Modal
          editingTask={editingTask}
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          handleSave={handleSave}
          handleCloseModal={handleCloseModal}
        />
      ) : (
        <></>
      )}
      <header className="flex max-w-7xl mx-auto justify-between items-center mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Prueba Noxun</h1>
        <section className="flex gap-10">
          <button
            disabled={createMutation.isPending}
            className="bg-emerald-500 hover:bg-emerald-600 font-medium px-4 py-2 rounded-xl transition-colors"
            onClick={() => {
              setEditingTask(null);
              setTitle("");
              setDescription("");
              setModalIsOpen(true);
            }}
          >
            Agregar tarea
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 font-medium px-4 py-2 rounded-xl transition-colors"
            onClick={() => {
              removeSession();
              navigate({ to: "/login" });
            }}
          >
            Cerrar sesion
          </button>
        </section>
      </header>

      <main className="max-w-7xl mx-auto">
        {isLoading ? (
          <h1>Cargando...</h1>
        ) : (
          <section className="flex gap-10">
            {data.map((task) => {
              return (
                <Card
                  task={task}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  key={task.id}
                ></Card>
              );
            })}
          </section>
        )}
      </main>
    </div>
  );
}
