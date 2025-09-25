import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import './AddMemberPage.css';

const AddMemberPage = () => {
  const navigate = useNavigate();
  const theme = useSelector(state => state.tasks.theme);
  const [memberForm, setMemberForm] = useState({
    name: '',
    email: '',
    role: 'member'
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!memberForm.name || !memberForm.email) {
      setMessage('Name and email are required');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(memberForm.email)) {
      setMessage('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memberForm),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Member created successfully!');
        // Reset form
        setMemberForm({
          name: '',
          email: '',
          role: 'member'
        });
        
        // Auto-navigate back after success
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setMessage('Error creating member: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error creating member. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-member-container" style={{
      backgroundColor: theme === 'dark' ? '#23272f' : '#f8fafc'
    }}>
      <Sidebar />
      
      <div className="add-member-content" style={{
        backgroundColor: theme === 'dark' ? '#23272f' : '#f8fafc'
      }}>
        <div className="add-member-header">
          <h1 className="add-member-title">Add New Member</h1>
          <p className="add-member-subtitle">
            Invite new team members to collaborate on your projects
          </p>
        </div>

        <div className="add-member-form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Member Name *</label>
              <input 
                type="text" 
                className="form-input"
                value={memberForm.name} 
                onChange={(e) => {
                  setMemberForm(prev => ({
                    ...prev,
                    name: e.target.value
                  }));
                  if (message) setMessage('');
                }}
                placeholder="Enter member's full name"
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input 
                type="email" 
                className="form-input"
                value={memberForm.email} 
                onChange={(e) => {
                  setMemberForm(prev => ({
                    ...prev,
                    email: e.target.value
                  }));
                  if (message) setMessage('');
                }}
                placeholder="Enter member's email address"
                disabled={isLoading}
              />
            </div>

            <div className="form-group last">
              <label className="form-label">Role</label>
              <select 
                className="form-select"
                value={memberForm.role} 
                onChange={(e) => {
                  setMemberForm(prev => ({
                    ...prev,
                    role: e.target.value
                  }));
                  if (message) setMessage('');
                }}
                disabled={isLoading}
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
              <small className="form-help-text">
                Admins have full access, members have limited access
              </small>
            </div>

            <div className="button-group">
              <button 
                type="submit" 
                className={`btn btn-invite ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Creating Member...' : 'Create Member'}
              </button>
              <button 
                type="button" 
                className="btn btn-cancel"
                onClick={() => navigate('/')}
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </form>

          {message && (
            <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddMemberPage;