import axios from 'axios';

const API_URL = 'http://localhost:8080/api/translations';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Translation API function
export const translateText = async (text, targetLang) => {
  try {
    // Using MyMemory Translation API (Free, no API key required)
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`;
    
    const response = await axios.get(url, {
      timeout: 10000 // 10 second timeout
    });

    // Check if translation exists in response
    if (response.data && response.data.responseData && response.data.responseData.translatedText) {
      return response.data.responseData.translatedText;
    }
    
    // Fallback if no translation in response
    return text;
    
  } catch (error) {
    console.error(`Translation API error for ${targetLang}:`, error.message);
    // Return original text as fallback
    return text;
  }
};

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