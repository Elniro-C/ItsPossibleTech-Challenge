'use client';

import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await api.get('/tasks');
        setTasks(res.data);
      } catch (err) {
        console.error('Erro ao buscar tasks', err);
      }
    }
    fetchTasks();
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1>📝 Lista de Tarefas</h1>
      <ul>
        {tasks.map((task: any) => (
          <li key={task.id}>
            {task.title} - {task.completed ? '✅' : '❌'}
          </li>
        ))}
      </ul>
    </main>
  );
}
