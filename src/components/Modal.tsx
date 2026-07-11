import type { ModalProps } from "../types/task";

export function Modal({
  editingTask,
  title,
  description,
  setTitle,
  setDescription,
  handleSave,
  handleCloseModal,
}: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-6 shadow-2xl">
        <h2 className="mb-6 text-2xl font-bold">
          {" "}
          {editingTask ? "Editar tarea" : "Nueva tarea"}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="space-y-4"
        >
          <div>
            <label className="mb-2 block">Título</label>
            <input
              type="text"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-2 outline-none focus:border-emerald-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block">Descripción</label>

            <textarea
              rows={5}
              className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-800 p-2 outline-none focus:border-emerald-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              className="rounded-lg bg-zinc-700 px-4 py-2"
              onClick={handleCloseModal}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-lg bg-emerald-500 px-4 py-2 hover:bg-emerald-600"
            >
              {editingTask ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
