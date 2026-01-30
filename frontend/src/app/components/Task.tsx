'use client';

import { api } from '../../lib/api';

type Task = {
  id: string; 
  title: string;
  completed: boolean;
};

type TaskItemProps = {
  task: Task;
  onUpdate: () => void;
};

export default function TaskItem({ task, onUpdate }: TaskItemProps) {
  const markResolved = async () => {
    try {
      await api.patch(`/tasks/${task.id}/resolve`);
      onUpdate();
    } catch (err) {
      console.error(err);
      alert('Erro ao marcar como resolvida');
    }
  };

  const removeTask = async () => {
    try {
      await api.delete(`/tasks/${task.id}`);
      onUpdate();
    } catch (err) {
      console.error(err);
      alert('Erro ao remover tarefa');
    }
  };

  return (
    <div
      className={`flex justify-between items-center p-4 rounded-lg shadow-md mb-3 transition 
        ${task.completed ? 'bg-green-100' : 'bg-white hover:bg-gray-50'}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg">{task.title}</span>
        {task.completed && (
          <span className="text-sm text-green-800 font-semibold">Concluída</span>
        )}
      </div>
      <div className="flex gap-2">
        {!task.completed && (
          <button
            onClick={markResolved}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Concluir
          </button>
        )}
        <button
          onClick={removeTask}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Remover
        </button>
      </div>
    </div>
  );
}
