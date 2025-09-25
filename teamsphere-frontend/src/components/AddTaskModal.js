import React, { useState } from 'react';
import './modal.css';

const AddTaskModal = ({ show, onClose, onTaskCreated }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('pending');
  const [selectedProject, setSelectedProject] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!taskTitle) {
      setMessage('Please fill in required fields (Title).');
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/tasks`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          title: taskTitle,
          description: taskDescription,
          status: taskStatus,
          project: selectedProject,
          dueDate: dueDate || undefined
        })
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if (data.success) {
        setMessage('Task created successfully!');
        resetForm();
        setTimeout(() => {
          if (onTaskCreated) onTaskCreated();
          onClose();
          setMessage('');
        }, 800);
      } else {
        setMessage(data.error || 'Failed to create task.');
      }
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setMessage('Cannot connect to server. Please ensure the backend is running on port 5001.');
      } else {
        setMessage('Error creating task. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setTaskTitle('');
    setTaskDescription('');
    setTaskStatus('pending');
    setSelectedProject('');
    setDueDate('');
  };

  const handleClose = () => {
    resetForm();
    setMessage('');
    onClose();
  };

  if (!show) return null;

  return (
    <div className='modal' onClick={handleClose}>
      <div className='modal-content' onClick={e => e.stopPropagation()}>
        <h3 style={{ marginTop: 0, marginBottom: '18px', color: '#23272f', textAlign: 'center' }}>
          Add New Task
        </h3>
        
        <form onSubmit={handleCreateTask}>
          <div>
            <label htmlFor="taskTitle" className="modal-label">Task Title *:</label>
            <input 
              className='modal-input' 
              id="taskTitle" 
              type="text" 
              value={taskTitle} 
              onChange={e => setTaskTitle(e.target.value)}
              placeholder="Enter task title"
              required 
            />
          </div>

          <div>
            <label htmlFor="taskDescription" className="modal-label">Description:</label>
            <textarea 
              className='modal-input' 
              id="taskDescription" 
              value={taskDescription} 
              onChange={e => setTaskDescription(e.target.value)}
              placeholder="Enter task description (optional)"
              rows="3"
            />
          </div>

          <div>
            <label htmlFor="taskStatus" className="modal-label">Status:</label>
            <select 
              id="taskStatus" 
              value={taskStatus} 
              onChange={e => setTaskStatus(e.target.value)} 
              className='modal-select'
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label htmlFor="dueDate" className="modal-label">Due Date:</label>
            <input 
              className='modal-input' 
              id="dueDate" 
              type="date" 
              value={dueDate} 
              onChange={e => setDueDate(e.target.value)} 
            />
          </div>

          <button type="submit" className="modal-btn">Create Task</button>
          <button type="button" className="modal-btn-cancel" onClick={handleClose}>
            Cancel
          </button>
        </form>
        
        {message && (
          <div style={{ 
            color: message.includes('success') ? 'green' : 'red', 
            marginTop: '10px',
            textAlign: 'center'
          }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTaskModal;