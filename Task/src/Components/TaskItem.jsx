import React from 'react';

function formatDate(dateString) {
  if (!dateString) return '';
  const [day, month, year] = dateString.split('-');
  return `${day}-${month}-${year}`;
}

function TaskItem({ task, deleteTask, toggleComplete }) {
  const { _id, title, description, startDate, endDate, completed } = task;

  return (
    <li className={`task-item ${completed ? 'completed' : ''}`}>
      <div className="task-details">
        <h3>
          {title} {completed && <span style={{ color: 'green' }}>(Completed)</span>}
        </h3>
        {description && (
          <p>
            <strong>Description:</strong> {description}
          </p>
        )}
        {startDate && (
          <p>
            <strong>Begin:</strong> {formatDate(startDate)}
          </p>
        )}
        {endDate && (
          <p>
            <strong>Deadline:</strong> {formatDate(endDate)}
          </p>
        )}
      </div>

      <div className="task-actions">
        <button onClick={() => toggleComplete(_id)}>
          {completed ? 'Undo' : 'Complete'}
        </button>
        <button onClick={() => deleteTask(_id)}>Delete</button>
      </div>
    </li>
  );
}

export default TaskItem;
