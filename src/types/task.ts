export type Task = {
  id: string;
  title: string;
  description: string;
};

export type CardProps = {
  task: Task;
  handleDelete: (id: string) => void;
  handleEdit: (task: Task) => void;
};

export type ModalProps = {
  editingTask: Task | null;
  title: string;
  description: string;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  handleSave: () => void;
  handleCloseModal: () => void;
};
