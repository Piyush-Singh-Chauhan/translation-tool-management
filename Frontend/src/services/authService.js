import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';
const TOKEN_KEY = 'tmt_token';
const CURRENT_USER_KEY = 'tmt_current_user';

// Register new user
export const register = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password
    });
    
    // Store token and user data
    localStorage.setItem(TOKEN_KEY, response.data.token);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(response.data.user));
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

// Login user
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    });
    
    // Store token and user data
    localStorage.setItem(TOKEN_KEY, response.data.token);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(response.data.user));
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
};

// Get current user
export const getCurrentUser = () => {
  const userStr = localStorage.getItem(CURRENT_USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

// Get token
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Check if authenticated
export const isAuthenticated = () => {
  return !!getToken();
};
