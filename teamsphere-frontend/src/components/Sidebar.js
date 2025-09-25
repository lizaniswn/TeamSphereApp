import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ThemeToggle from './ThemeToggle';
import './sidebar.css';
import CreateProjectModal from './CreateProjectModal';
import AddTaskModal from './AddTaskModal';

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const navigate = useNavigate();
  const theme = useSelector(state => state.tasks.theme);

  // Auto-refresh handler after modal closes
  const handleProjectCreated = () => {
    window.location.reload();
  };

  // Handle task created
  const handleTaskCreated = () => {
    window.location.reload();
  };

  // Handle adding a new member - navigate to AddMemberPage
  const handleAddMember = () => {
    navigate('/add-member');
  };

  // Handle viewing all tasks
  const handleViewTasks = () => {
    navigate('/task-details');
  };


  return (
    <div style={{
      width: '220px',
      backgroundColor: theme === 'dark' ? '#23272f' : '#1f2a40',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      justifyContent: 'space-between'
    }}>
      
      <div>
        <h2 style={{ marginBottom: '30px' }}>TEAMSPHERE</h2>
        <nav>
          <div style={{ marginBottom: '15px', cursor: 'pointer'}} onClick={() => navigate('/')}>📊 Project Board</div>
          <div style={{ marginBottom: '15px', cursor: 'pointer', color: '#6366f1'  }} onClick={() => setShowModal(true)}>+ Create Project</div>
          <div style={{ marginBottom: '15px', cursor: 'pointer', color: '#f59e0b' }} onClick={handleAddMember}>+ Add Member</div>
          <div style={{ marginBottom: '15px', cursor: 'pointer', color: '#28a745' }} onClick={() => setShowTaskModal(true)}>+ Add Task</div>
          <div style={{ marginBottom: '15px', cursor: 'pointer', color: '#3b82f6' }} onClick={handleViewTasks}>📋 View Tasks</div>
           </nav>
        <ThemeToggle />
      </div>
      
      <button style={{
        marginTop: 'auto',
        padding: '10px',
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        cursor: 'pointer'
      }}>
        LOGOUT
      </button>
      
      <CreateProjectModal show={showModal} onClose={() => setShowModal(false)} onProjectCreated={handleProjectCreated} />
      <AddTaskModal show={showTaskModal} onClose={() => setShowTaskModal(false)} onTaskCreated={handleTaskCreated} />
    </div>
  );
};

export default Sidebar;