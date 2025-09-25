import React, { useEffect, useState } from 'react';
import './projecttasksboard.css';

const ProjectTasksBoard = () => {
  const [projects, setProjects] = useState([]);
  const [draggedTask, setDraggedTask] = useState(null);

  const fetchProjects = () => {
    fetch('http://localhost:5001/api/projects')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProjects(data.data);
        }
      });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDragStart = (task, fromProjectId) => {
    setDraggedTask({ ...task, fromProjectId });
  };

  const handleDrop = async (toProjectId) => {
    if (!draggedTask || draggedTask.fromProjectId === toProjectId) return;
    // Move task in backend
    await fetch(`http://localhost:5001/api/projects/${toProjectId}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId: draggedTask._id, fromProjectId: draggedTask.fromProjectId })
    });
    setDraggedTask(null);
    fetchProjects();
  };

  return (
    <div className="project-tasks-board-container">
      <h2 className="project-tasks-board-title">Project Tasks Overview</h2>
      <div className="project-tasks-board-list">
        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          projects.map(project => (
            <div
              key={project._id}
              className="project-tasks-board-item"
              onDragOver={e => e.preventDefault()}
              onDrop={() => handleDrop(project._id)}
            >
              <div className="project-tasks-board-header">{project.name}</div>
              <div className="project-tasks-board-content">
                {project.tasks && project.tasks.length > 0 ? (
                  <ul className="project-tasks-board-tasks">
                    {project.tasks.map(task => (
                      <li
                        key={task._id}
                        className="project-tasks-board-task"
                        draggable
                        onDragStart={() => handleDragStart(task, project._id)}
                      >
                        {task.title}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="project-tasks-board-none">No tasks</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectTasksBoard;