import { create } from 'zustand';
import axios from 'axios';
import { AuthState, User } from '@/types';

const API_URL = 'http://localhost:8000/api';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      // Replace with your actual API endpoint
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      
      const { user, token } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      const errorMessage = 
        axios.isAxiosError(error) && error.response
          ? error.response.data.message
          : 'Failed to login. Please try again.';
      
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },

  register: async (name: string, email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      // Replace with your actual API endpoint
      const response = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
      });
      
      const { user, token } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      const errorMessage = 
        axios.isAxiosError(error) && error.response
          ? error.response.data.message
          : 'Failed to register. Please try again.';
      
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  clearError: () => {
    set({ error: null });
  },
}));

// Setup axios interceptors for authentication
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);