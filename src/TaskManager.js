import React, { useState } from 'react';
import Task from './Task';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const addTask = () => {
    if (newTask.title.trim() !== '') {
      const updatedTasks = [...tasks, { ...newTask, id: Date.now() }];
      setTasks(updatedTasks);
      setNewTask({ title: '', description: '' });
    }
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className="task-manager">
      <h2>Task Manager</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
      >
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        ></textarea>
        <button type="submit">Add Task</button>
      </form>
      {tasks.length > 0 ? (
        <div className="task-list">
          {tasks.map((task) => (
            <Task key={task.id} task={task} onDelete={deleteTask} />
          ))}
        </div>
      ) : (
        <p>No tasks available.</p>
      )}
    </div>
  );
};

export default TaskManager;
