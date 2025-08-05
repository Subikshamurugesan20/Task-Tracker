// import React, { useState, useEffect } from 'react';
// import TaskForm from './Components/TaskForm';
// import TaskList from './Components/TaskList';

// function App() {
//   const [tasks, setTasks] = useState([]);
//   const [filter, setFilter] = useState('all');
//   const [editingTask, setEditingTask] = useState(null);

//   // 🔁 Load tasks from backend
//   useEffect(() => {
//     fetch("http://localhost:4000/api/tasks")
//       .then(res => res.json())
//       .then(data => setTasks(data));
//   }, []);

//   const addTask = (taskData) => {
//     if (editingTask) {
//       fetch(`http://localhost:4000/api/tasks/${editingTask.id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(taskData)
//       }).then(() => {
//         setEditingTask(null);
//         fetchTasks();
//       });
//     } else {
//       fetch("http://localhost:4000/api/tasks", {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(taskData)
//       })
//         .then(res => res.json())
//         .then(() => fetchTasks());
//     }
//   };

//   const fetchTasks = () => {
//     fetch("http://localhost:4000/api/tasks")
//       .then(res => res.json())
//       .then(data => setTasks(data));
//   };

//   const deleteTask = (id) => {
//     fetch(`http://localhost:4000/api/tasks/${id}`, { method: 'DELETE' })
//       .then(() => fetchTasks());
//   };

//   const toggleComplete = (id) => {
//     const task = tasks.find(t => t.id === id);
//     fetch(`http://localhost:4000/api/tasks/${id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ ...task, completed: !task.completed })
//     }).then(() => fetchTasks());
//   };

//   const editTask = (task) => setEditingTask(task);

//   const filteredTasks = tasks.filter(task => {
//     if (filter === 'completed') return task.completed;
//     if (filter === 'pending') return !task.completed;
//     return true;
//   });

//   return (
//     <div className="con">
//       <div className="app">
//         <div className="head">Task Management</div>
//         <TaskForm addTask={addTask} editingTask={editingTask} />
//       </div>
//       <div className="filter">
//         <button onClick={() => setFilter('all')}>All</button>
//         <button onClick={() => setFilter('completed')}>Completed</button>
//         <button onClick={() => setFilter('pending')}>Pending</button>
//       </div>
//       <TaskList
//         tasks={filteredTasks}
//         deleteTask={deleteTask}
//         toggleComplete={toggleComplete}
//         editTask={editTask}
//       />
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './Welcome';
import TaskManager from './TaskManager';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/tasks" element={<TaskManager />} />
      </Routes>
    </Router>
  );
}

export default App;
