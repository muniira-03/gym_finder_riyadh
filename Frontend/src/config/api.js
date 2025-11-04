// API Configuration
const API_BASE_URL = 'http://127.0.0.1:8000';

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  REGISTER: `${API_BASE_URL}/users/register`,
  LOGIN: `${API_BASE_URL}/users/login`,
  ME: `${API_BASE_URL}/users/me`,
  
  // Gym endpoints
  GYMS: `${API_BASE_URL}/gyms/`,
  
  // Contact endpoints
  CONTACT_MESSAGES: `${API_BASE_URL}/contact-messages/`,
  
  // Gym suggestions endpoints
  GYM_SUGGESTIONS: `${API_BASE_URL}/gym-suggestions/`,
};

// API utility functions
export const apiRequest = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Network error' }));
    throw new Error(error.detail || `HTTP ${response.status}`);
  }
  
  return response.json();
};

// Auth API functions
export const authAPI = {
  register: async (userData) => {
    return apiRequest(API_ENDPOINTS.REGISTER, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  
  login: async (email, password) => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    
    return apiRequest(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      headers: {}, // Remove Content-Type for FormData
      body: formData,
    });
  },
  
  getMe: async (token) => {
    return apiRequest(API_ENDPOINTS.ME, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
};

// Gym API functions
export const gymAPI = {
  getAll: async () => {
    return apiRequest(API_ENDPOINTS.GYMS);
  },
  
  create: async (gymData, token) => {
    return apiRequest(API_ENDPOINTS.GYMS, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(gymData),
    });
  },
};

// Contact API functions
export const contactAPI = {
  sendMessage: async (messageData) => {
    return apiRequest(API_ENDPOINTS.CONTACT_MESSAGES, {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  },
};

export default API_BASE_URL;
