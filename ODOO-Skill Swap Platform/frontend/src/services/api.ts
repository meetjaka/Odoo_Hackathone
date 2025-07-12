import axios from 'axios';

const API_BASE_URL = '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data: {
    name: string;
    email: string;
    password: string;
    skillsOffered?: string[];
    skillsWanted?: string[];
  }) => api.post('/auth/register', data),

  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),

  logout: () => api.post('/auth/logout'),

  getCurrentUser: () => api.get('/auth/me'),

  updateProfile: (data: any) => api.put('/auth/profile', data),
};

// Users API
export const usersAPI = {
  getAll: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    availability?: string;
    skillsOffered?: string;
    skillsWanted?: string;
  }) => api.get('/users', { params }),

  getById: (id: string) => api.get(`/users/${id}`),

  getByName: (name: string) => api.get(`/users/name/${name}`),

  rateUser: (id: string, data: { rating: number; review?: string }) =>
    api.post(`/users/${id}/rate`, data),
};

// Skills API
export const skillsAPI = {
  getAll: (params?: {
    category?: string;
    search?: string;
    limit?: number;
  }) => api.get('/skills', { params }),

  getCategories: () => api.get('/skills/categories'),

  getPopular: (limit?: number) =>
    api.get('/skills/popular', { params: { limit } }),

  create: (data: { name: string; category: string; description?: string }) =>
    api.post('/skills', data),

  updateUsage: (id: string) => api.put(`/skills/${id}/usage`),
};

// Requests API
export const requestsAPI = {
  getAll: (params?: {
    page?: number;
    limit?: number;
    status?: string;
    type?: 'sent' | 'received' | 'all';
  }) => api.get('/requests', { params }),

  getById: (id: string) => api.get(`/requests/${id}`),

  create: (data: {
    toUserId: string;
    skillsOffered: string[];
    skillsWanted: string[];
    message?: string;
  }) => api.post('/requests', data),

  updateStatus: (
    id: string,
    data: { status: 'accepted' | 'rejected'; responseMessage?: string }
  ) => api.put(`/requests/${id}/status`, data),

  complete: (id: string, data: { rating: number; review?: string }) =>
    api.put(`/requests/${id}/complete`, data),
};

export default api; 