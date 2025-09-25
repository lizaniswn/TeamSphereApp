
import React, { useEffect, useState } from 'react';
import './modal.css';

const InviteMember = () => {
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedMember, setSelectedMember] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Auto-refresh handler
  const handleCloseModal = () => {
    setShowModal(false);
    setMessage('');
    window.location.reload();
  };

  useEffect(() => {
    if (showModal) {
      fetch('http://localhost:5001/api/projects')
        .then(res => res.json())
        .then(data => {
          if (data.success) setProjects(data.data);
        });
      fetch('http://localhost:5001/api/members')
        .then(res => res.json())
        .then(data => {
          if (data.success) setMembers(data.data);
        });
    }
  }, [showModal]);

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!selectedProject || !selectedMember) {
      setMessage('Please select both project and member.');
      return;
    }
    const res = await fetch(`http://localhost:5001/api/projects/${selectedProject}/invite`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ memberId: selectedMember })
    });
    const data = await res.json();
    if (data.success) {
      setMessage('Member invited successfully!');
      setSelectedProject('');
      setSelectedMember('');
      setTimeout(() => {
        handleCloseModal();
      }, 800);
    } else {
      setMessage(data.error || 'Failed to invite member.');
    }
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} className="modal-btn">Invite Member</button>
      {showModal && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Invite Member to Project</h3>
            <form onSubmit={handleInvite}>
              <label className="modal-label">
                Project:<br />
                <select
                  value={selectedProject}
                  onChange={e => setSelectedProject(e.target.value)}
                  className="modal-select"
                >
                  <option value="">Select Project</option>
                  {projects.map(project => (
                    <option key={project._id} value={project._id}>{project.name}</option>
                  ))}
                </select>
              </label>
              <br />
              <label className="modal-label">
                Member:<br />
                <select
                  value={selectedMember}
                  onChange={e => setSelectedMember(e.target.value)}
                  className="modal-select"
                >
                  <option value="">Select Member</option>
                  {members.map(member => (
                    <option key={member._id} value={member._id}>{member.name}</option>
                  ))}
                </select>
              </label>
              <br />
              <button type="submit" className="modal-btn">Invite</button>
              <button type="button" className="modal-btn-cancel" onClick={handleCloseModal}>Cancel</button>
            </form>
            {message && <div style={{ color: message.includes('success') ? 'green' : 'red', marginTop: '10px' }}>{message}</div>}
          </div>
        </div>
      )}
    </>
  );
};

export default InviteMember;
