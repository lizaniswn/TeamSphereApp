// API base URL - update this to match your backend URL
const API_BASE_URL = 'http://localhost:5000/api';

// Task API service
export const taskAPI = {
  // Get all tasks with optional filters
  getAllTasks: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] && filters[key] !== '') {
        queryParams.append(key, filters[key]);
      }
    });
    
    const queryString = queryParams.toString();
    const url = `${API_BASE_URL}/tasks${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch tasks');
    }
    
    return data;
  },

  // Get tasks for a specific project
  getTasksByProject: async (projectId, filters = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] && filters[key] !== '') {
        queryParams.append(key, filters[key]);
      }
    });
    
    const queryString = queryParams.toString();
    const url = `${API_BASE_URL}/tasks/project/${projectId}${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch project tasks');
    }
    
    return data;
  },

  // Get task statistics for a project
  getTaskStats: async (projectId) => {
    const response = await fetch(`${API_BASE_URL}/tasks/project/${projectId}/stats`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch task statistics');
    }
    
    return data;
  },

  // Get single task by ID
  getTask: async (taskId) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch task');
    }
    
    return data;
  },

  // Create new task
  createTask: async (projectId, taskData) => {
    const response = await fetch(`${API_BASE_URL}/tasks/project/${projectId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to create task');
    }
    
    return data;
  },

  // Update task
  updateTask: async (taskId, taskData) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to update task');
    }
    
    return data;
  },

  // Update task status only
  updateTaskStatus: async (taskId, status) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to update task status');
    }
    
    return data;
  },

  // Delete task
  deleteTask: async (taskId) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'DELETE',
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to delete task');
    }
    
    return data;
  },

  // Bulk update tasks
  bulkUpdateTasks: async (taskIds, updateData) => {
    const response = await fetch(`${API_BASE_URL}/tasks/bulk-update`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taskIds,
        updateData
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to bulk update tasks');
    }
    
    return data;
  }
};

// Project API service
export const projectAPI = {
  // Get all projects
  getAllProjects: async () => {
    const response = await fetch(`${API_BASE_URL}/projects`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch projects');
    }
    
    return data;
  },

  // Get single project
  getProject: async (projectId) => {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch project');
    }
    
    return data;
  }
};

// Utility function to handle API errors
export const handleAPIError = (error) => {
  console.error('API Error:', error);
  
  // You can customize error handling here
  if (error.message.includes('Failed to fetch')) {
    return 'Network error. Please check your connection.';
  }
  
  return error.message || 'An unexpected error occurred';
};