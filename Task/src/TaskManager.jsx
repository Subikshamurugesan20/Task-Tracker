import React, { useState, useEffect } from 'react';
import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskList';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);

  const API_URL = 'http://localhost:4000/tasks';

  // 📦 Fetch tasks from backend
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  // ➕ Add or update task
  const addTask = async (taskData) => {
    try {
      const response = editingTask
        ? await fetch(`${API_URL}/${editingTask._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData),
          })
        : await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData),
          });

      const newTask = await response.json();

      if (editingTask) {
        setTasks(tasks.map(t => (t._id === editingTask._id ? newTask : t)));
        setEditingTask(null);
      } else {
        setTasks([...tasks, newTask]);
      }
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  // 🗑 Delete task
  const deleteTask = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setTasks(tasks.filter(task => task._id !== id));
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // ✅ Toggle completion (only in frontend)
  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task._id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const editTask = (task) => {
    setEditingTask(task);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="con">
      <div className="app">
        <div className="head"><b>Task Tracker</b></div>
        <TaskForm addTask={addTask} editingTask={editingTask} />
      </div>
      <div className="filter">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
      </div>
      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
        editTask={editTask}
      />
    </div>
  );
}

export default TaskManager;
