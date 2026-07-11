import type { CardProps } from "../types/task";

export function Card({ task, handleDelete, handleEdit }: CardProps) {
  return (
    <article className="bg-zinc-900 border border-zinc-800 w-64 min-h-44 p-5 rounded-2xl shadow-xl max-h-60 overflow-auto">
      <header className="flex justify-between items-center gap-3">
        <h2 className="text-lg font-semibold text-zinc-200">{task.title}</h2>
        <section className="flex gap-2 text-xs font-medium">
          <button
            className="bg-zinc-800 hover:bg-red-950/40 hover:text-red-400 text-zinc-400 px-2 py-1 rounded-lg border border-zinc-700/50 transition-colors"
            onClick={() => {
              handleDelete(task.id);
            }}
          >
            Eliminar
          </button>
          <button
            className="bg-zinc-800 hover:bg-amber-950/40 hover:text-amber-400 text-zinc-400 px-2 py-1 rounded-lg border border-zinc-700/50 transition-colors"
            onClick={() => handleEdit(task)}
          >
            Editar
          </button>
        </section>
      </header>
      <p>{task.description}</p>
    </article>
  );
}
