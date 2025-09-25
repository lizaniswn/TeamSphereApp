import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from './components/Sidebar';
import ProjectBoard from './components/ProjectBoard';
import TaskDetailsPage from './components/TaskDetailsPage';
import AddMemberPage from './components/AddMemberPage';

const App = () => {
  const theme = useSelector(state => state.tasks.theme);

  const appStyles = {
    display: 'flex',
    height: '100vh',
    backgroundColor: theme === 'dark' ? '#23272f' : '#f5f5f5',
    color: theme === 'dark' ? '#ffffff' : '#000000',
    transition: 'all 0.3s ease'
  };

  const contentStyles = {
    flex: 1,
    padding: '20px',
    overflowY: 'auto'
  };

  return (
    <Router>
      <Routes>
        {/* Task Details Page Route - Full page without sidebar */}
        <Route path="/tasks/:projectId" element={<TaskDetailsPage />} />
        
        {/* Add Member Page Route - Full page without sidebar */}
        <Route path="/add-member" element={<AddMemberPage />} />
        
        <Route path="/task-details" element={<TaskDetailsPage />} />
        <Route path="/task-details/:projectId" element={<TaskDetailsPage />} />
        
        {/* Main App Route - With sidebar */}
        <Route path="/" element={
          <div style={appStyles}>
            <Sidebar />
            <div style={contentStyles}>
              <ProjectBoard />
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;
