import React, { useState, useEffect } from 'react';

function TaskForm({ addTask, editingTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStartDate(editingTask.startDate);
      setEndDate(editingTask.endDate);
    } else {
      setTitle('');
      setDescription('');
      setStartDate('');
      setEndDate('');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTask({ title, description, startDate, endDate });
      setTitle('');
      setDescription('');
      setStartDate('');
      setEndDate('');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label>Task Title</label>
      <input
        type="text"
        placeholder="Enter the task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label>Description(Optional)</label>
      <input
        type="text"
        placeholder="Enter the description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>Start Date</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <label>Deadline</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button type="submit">{editingTask ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
}

export default TaskForm;