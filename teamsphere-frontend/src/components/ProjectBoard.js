import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import InviteMember from './InviteMember';
import ProjectTasksBoard from './ProjectTasksBoard';
import './projectboard.css';

const ProjectBoard = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showTasksModal, setShowTasksModal] = useState(false);
  const theme = useSelector(state => state.tasks.theme);

  const reloadProjects = () => {
    fetch('http://localhost:5001/api/projects')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProjects(data.data);
        }
      });
  };

  useEffect(() => {
    reloadProjects();
  }, []);

  const handleViewTasks = (project) => {
    setSelectedProject(project);
    setShowTasksModal(true);
    
    // Fetch detailed task information to ensure we have all data including dates
    if (project.tasks && project.tasks.length > 0) {
      const taskIds = project.tasks.map(task => task._id);
      // Fetch detailed task data
      Promise.all(
        taskIds.map(taskId => 
          fetch(`http://localhost:5001/api/tasks/${taskId}`)
            .then(res => res.json())
            .then(data => data.success ? data.data : null)
        )
      ).then(detailedTasks => {
        const validTasks = detailedTasks.filter(task => task !== null);
        setSelectedProject(prev => ({
          ...prev,
          tasks: validTasks
        }));
      }).catch(error => {
        console.error('Error fetching detailed task data:', error);
      });
    }
  };

  const closeTasksModal = () => {
    setShowTasksModal(false);
    setSelectedProject(null);
  };

  return (
    <div style={{ backgroundColor: theme === 'dark' ? '#23272f' : '#f5f5f5' }}>
      <div className="invite-left">
        <InviteMember />
      </div>
      <div className="project-board-container">
        <h2 className="project-board-title">Projects</h2>
        <div>
          {projects.length === 0 ? (
            <p>No projects found.</p>
          ) : (
            <ul className="project-list">
              {projects.map(project => (
                <li key={project._id} className="project-list-item">
                  <div className="project-name">{project.name}</div>
                   <div className="project-members">
                    <span className="project-label">Members:</span>
                    <div className="project-member-names">
                      {project.members && project.members.length > 0
                        ? project.members.map((m, index) => (
                            <span key={m._id}>
                              <span className="member-name">{m.name}</span>
                              {index < project.members.length - 1 && <span className="member-separator">, </span>}
                            </span>
                          ))
                        : <span className="member-none">None</span>}
                    </div>
                  </div>
                  <div className="project-tasks">
                    <button 
                      className="tasks-button"
                      onClick={() => handleViewTasks(project)}
                    >
                      Tasks ({project.tasks?.length || 0})
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Tasks Modal */}
      {showTasksModal && selectedProject && (
        <div className="modal" onClick={closeTasksModal}>
          <div className="modal-content tasks-modal-content" onClick={e => e.stopPropagation()}>
            <div className="tasks-modal-header">
              <div>
                <h3 style={{ margin: '0 0 4px 0', color: '#23272f', fontSize: '1.5rem' }}>
                  Tasks for: {selectedProject.name}
                </h3>
                <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>
                  View and manage all tasks for this project
                </p>
              </div>
              <button 
                onClick={closeTasksModal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
              >
                ×
              </button>
            </div>
            
            <div className="tasks-modal-body">
              {selectedProject.tasks && selectedProject.tasks.length > 0 ? (
                <div>
                  <div className="tasks-summary">
                    <span className="tasks-count">Total Tasks: {selectedProject.tasks.length}</span>
                    <div className="tasks-stats">
                      <span className="stat completed">
                        Completed: {selectedProject.tasks.filter(t => t.status === 'completed').length}
                      </span>
                      <span className="stat in-progress">
                        In Progress: {selectedProject.tasks.filter(t => t.status === 'in-progress').length}
                      </span>
                      <span className="stat pending">
                        Pending: {selectedProject.tasks.filter(t => t.status === 'pending' || !t.status).length}
                      </span>
                    </div>
                  </div>
                  
                  <div className="tasks-detailed-grid">
                    {selectedProject.tasks.map(task => (
                      <div key={task._id} className="task-detailed-card">
                        <div className="task-detailed-header">
                          <h4 className="task-detailed-title">{task.title}</h4>
                          <span className={`task-detailed-status ${task.status || 'pending'}`}>
                            {task.status?.replace('-', ' ') || 'pending'}
                          </span>
                        </div>
                        
                        {task.description && (
                          <div className="task-detailed-description">
                            {task.description}
                          </div>
                        )}
                        
                        <div className="task-detailed-info">
                          <div className="task-info-row">
                            <span className="task-info-label">📅 Due Date:</span>
                            <span className="task-info-value">
                              {task.dueDate 
                                ? new Date(task.dueDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })
                                : 'Not set'
                              }
                            </span>
                          </div>
                          
                          <div className="task-info-row">
                            <span className="task-info-label">📝 Created:</span>
                            <span className="task-info-value">
                              {task.createdAt 
                                ? new Date(task.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })
                                : 'Unknown'
                              }
                            </span>
                          </div>
                          
                          {task.updatedAt && task.updatedAt !== task.createdAt && (
                            <div className="task-info-row">
                              <span className="task-info-label">🔄 Updated:</span>
                              <span className="task-info-value">
                                {new Date(task.updatedAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="tasks-modal-empty">
                  <div style={{ fontSize: '3rem', marginBottom: '16px', opacity: 0.5 }}>📋</div>
                  <h4 style={{ color: '#374151', marginBottom: '8px' }}>No tasks in this project</h4>
                  <p style={{ color: '#6b7280', margin: 0 }}>
                    Add tasks to this project to start tracking progress.
                  </p>
                </div>
              )}
            </div>
            
            <div className="tasks-modal-footer">
              <button 
                className="modal-btn-cancel" 
                onClick={closeTasksModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <ProjectTasksBoard />
    </div>
  );
};

export default ProjectBoard;