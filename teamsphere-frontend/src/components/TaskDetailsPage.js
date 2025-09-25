import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import './TaskDetailsPage.css';

const TaskDetailsPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const theme = useSelector(state => state.tasks.theme);

  const isViewingAllTasks = !projectId;

  const fetchTasks = useCallback(() => {
    const url = isViewingAllTasks 
      ? 'http://localhost:5001/api/tasks'
      : `http://localhost:5001/api/tasks?project=${projectId}`;
      
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setTasks(data.data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      });
  }, [projectId, isViewingAllTasks]);

  useEffect(() => {
    if (projectId) {
      fetch(`http://localhost:5001/api/projects/${projectId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setProject(data.data);
          }
        })
        .catch(error => console.error('Error fetching project:', error));
    }

    fetchTasks();
  }, [projectId, fetchTasks]);

  if (loading) {
    return (
      <div className="loading-container" style={{ 
        backgroundColor: theme === 'dark' ? '#23272f' : '#f8fafc' 
      }}>
        <Sidebar />
        <div className="loading-content" style={{
          color: theme === 'dark' ? '#fff' : '#000'
        }}>Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="task-details-container" style={{
      backgroundColor: theme === 'dark' ? '#23272f' : '#f8fafc'
    }}>
      <Sidebar />

      <div className="task-details-content" style={{
        backgroundColor: theme === 'dark' ? '#23272f' : '#f8fafc'
      }}>
        <div className="task-details-header">
          <h1 className="task-details-title">
            {isViewingAllTasks ? 'All Tasks' : `Tasks for: ${project?.name || 'Project'}`}
          </h1>
          <p className="task-details-subtitle">
            {isViewingAllTasks 
              ? 'Manage and track all your tasks across projects'
              : `View and manage tasks for this specific project`
            }
          </p>
        </div>

        <div className="tasks-content-container">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📋</div>
              <h3 className="empty-state-title">
                {isViewingAllTasks ? 'No tasks found' : 'No tasks in this project'}
              </h3>
              <p className="empty-state-description">
                {isViewingAllTasks 
                  ? 'Create your first task to get started with project management.'
                  : 'Add tasks to this project to start tracking progress.'
                }
              </p>
            </div>
          ) : (
            <div>
              <p className="tasks-count">Total Tasks: {tasks.length}</p>
              
              <div className="tasks-grid">
                {tasks.map(task => (
                  <div key={task._id} className="task-card">
                    <div className="task-card-header">
                      <h3 className="task-title">{task.title}</h3>
                      <span className={`task-status ${task.status}`}>
                        {task.status.replace('-', ' ')}
                      </span>
                    </div>
                    {task.description && (
                      <p className="task-description">
                        {task.description.length > 100 
                          ? task.description.substring(0, 100) + '...' 
                          : task.description}
                      </p>
                    )}
                    <div className="task-footer">
                      <span>📅 {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</span>
                      <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;