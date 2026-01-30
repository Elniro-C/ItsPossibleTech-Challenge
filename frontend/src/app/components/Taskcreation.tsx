'use client';

import { useState } from 'react';
import { api } from '../../lib/api';

type TaskInputProps = {
  onTaskAdded: () => void;
};

export default function TaskInput({ onTaskAdded }: TaskInputProps) {
  const [title, setTitle] = useState('');

  const addTask = async () => {
    if (!title.trim()) return;
    try {
      await api.post('/tasks', { title });
      setTitle('');
      onTaskAdded();
    } catch (err) {
      console.error(err);
      alert('Erro ao adicionar tarefa');
    }
  };

  return (
    <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nova tarefa..."
        style={{
          flex: 1,
          padding: '10px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          fontSize: '16px',
        }}
      />
      <button
        onClick={addTask}
        style={{
          padding: '10px 16px',
          borderRadius: '6px',
          backgroundColor: '#0070f3',
          color: '#363333',
          fontWeight: 'bold',
          cursor: 'pointer',
          border: 'none',
        }}
      >
        Adicionar
      </button>
    </div>
  );
}
