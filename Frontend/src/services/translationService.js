import axios from 'axios';

const API_URL = 'http://localhost:8080/api/translations';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const addTranslation = async (key, englishText) => {
  try {
    const response = await api.post('/add', { key, englishText });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to add translation';
  }
};

export const searchTranslations = async (query = '') => {
  try {
    const response = await api.get('/search', {
      params: { query },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to search translations';
  }
};

export const getAllTranslations = async () => {
  try {
    const response = await api.get('/search', {
      params: { query: '' },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch translations';
  }
};

export const updateTranslation = async (id, translations) => {
  try {
    const response = await api.put(`/update/${id}`, { translations });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to update translation';
  }
};
