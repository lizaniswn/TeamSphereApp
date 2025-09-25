import React, { useState, useEffect } from 'react';
import './modal.css';

const CreateProjectModal = ({ show, onClose, onProjectCreated }) => {
  const [projectName, setProjectName] = useState('');
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [selectedMember, setSelectedMember] = useState('');
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (show) {
      fetch('http://localhost:5001/api/tasks')
        .then(res => res.json())
        .then(data => {
          if (data.success) setTasks(data.data);
        });
      fetch('http://localhost:5001/api/members')
        .then(res => res.json())
        .then(data => {
          if (data.success) setMembers(data.data);
        });
    }
  }, [show]);

  const handleTaskSelection = (taskId) => {
    setSelectedTasks(prev => {
      if (prev.includes(taskId)) {
        return prev.filter(id => id !== taskId);
      } else {
        return [...prev, taskId];
      }
    });
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!projectName || selectedTasks.length === 0 || !selectedMember) {
      setMessage('Please fill all fields and select at least one task.');
      return;
    }
    const res = await fetch('http://localhost:5001/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: projectName,
        tasks: selectedTasks,
        members: [selectedMember]
      })
    });
    const data = await res.json();
    if (data.success) {
      setMessage('Project created successfully!');
      setProjectName('');
      setSelectedTasks([]);
      setSelectedMember('');
      setTimeout(() => {
        if (onProjectCreated) onProjectCreated();
        onClose();
        setMessage('');
      }, 800);
    } else {
      setMessage(data.error || 'Failed to create project.');
    }
  };

  if (!show) return null;

  return (
    <div className='modal' onClick={() => { onClose(); setMessage(''); }}>
      <div className='modal-content' onClick={e => e.stopPropagation()}>
        <h3 style={{ marginTop: 0, marginBottom: '18px', color: '#23272f', textAlign: 'center' }}>Create Project</h3>
        <form onSubmit={handleCreateProject}>
          <div>
            <label htmlFor="projectName" className="modal-label">Project Name:</label>
            <input className='modal-input' id="projectName" type="text" value={projectName} onChange={e => setProjectName(e.target.value)} />
          </div>
          
          <div>
            <label className="modal-label">Tasks: (Select multiple)</label>
            <div style={{ 
              maxHeight: '150px', 
              overflowY: 'auto', 
              border: '1px solid #bfc8e6', 
              borderRadius: '8px', 
              padding: '10px',
              backgroundColor: '#f8fafc'
            }}>
              {tasks.length === 0 ? (
                <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>No tasks available</p>
              ) : (
                tasks.map(task => (
                  <div key={task._id} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      id={`task-${task._id}`}
                      checked={selectedTasks.includes(task._id)}
                      onChange={() => handleTaskSelection(task._id)}
                      style={{ marginRight: '8px' }}
                    />
                    <label 
                      htmlFor={`task-${task._id}`} 
                      style={{ 
                        fontSize: '14px', 
                        color: '#23272f',
                        cursor: 'pointer',
                        flex: 1
                      }}
                    >
                      {task.title}
                      {task.status && (
                        <span style={{ 
                          marginLeft: '8px', 
                          fontSize: '12px', 
                          color: '#6b7280',
                          textTransform: 'capitalize'
                        }}>
                          ({task.status})
                        </span>
                      )}
                    </label>
                  </div>
                ))
              )}
            </div>
            {selectedTasks.length > 0 && (
              <small style={{ color: '#6b7280', fontSize: '12px' }}>
                {selectedTasks.length} task(s) selected
              </small>
            )}
          </div>

          <div>
            <label htmlFor="memberSelect" className="modal-label">Member:</label>
            <select id="memberSelect" value={selectedMember} onChange={e => setSelectedMember(e.target.value)} className='modal-select'>
              <option value="">Select Member</option>
              {members.map(member => (
                <option key={member._id} value={member._id}>{member.name}</option>
              ))}
            </select>
          </div>
          
          <button type="submit" className="modal-btn">Create</button>
          <button type="button" className="modal-btn-cancel" onClick={() => { onClose(); setMessage(''); }}>Cancel</button>
        </form>
        {message && <div style={{ color: message.includes('success') ? 'green' : 'red', marginTop: '10px' }}>{message}</div>}
      </div>
    </div>
  );
};

export default CreateProjectModal;