'use client';

import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import TaskInput from './components/Taskcreation';
import TaskItem from './components/Task';

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      alert('Erro ao carregar tarefas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <main
      style={{
        maxWidth: '600px',
        margin: '40px auto',
        padding: '0 20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <header
        style={{
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#0a0b0b',
        }}
      >
        ITSPOSSIBLE TECH CHALLENGE
      </header>

      <TaskInput onTaskAdded={loadTasks} />

      {loading ? (
        <p>Carregando tarefas...</p>
      ) : tasks.length === 0 ? (
        <p>Nenhuma tarefa encontrada</p>
      ) : (
        <div>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onUpdate={loadTasks} />
          ))}
        </div>
      )}
    </main>
  );
}
