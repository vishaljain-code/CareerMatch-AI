import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 90000, // 90 seconds timeout for AI generation
});

export async function checkHealth() {
  try {
    const res = await api.get('/health');
    return res.data;
  } catch (error) {
    if (error.response?.data) return error.response.data;
    return {
      success: false,
      status: 'offline',
      aiConfigured: false,
      error: error.message || 'Cannot reach backend server',
    };
  }
}

export async function analyzeResume(formData, onProgress) {
  try {
    const res = await api.post('/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percent);
        }
      },
    });
    return res.data;
  } catch (error) {
    if (error.response?.data) {
      throw error.response.data;
    }
    throw {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message:
          error.message === 'Network Error'
            ? 'Unable to communicate with the CareerMatch AI server. Ensure the backend is running.'
            : error.message,
      },
    };
  }
}

export async function improveBullet(payload) {
  try {
    const res = await api.post('/improve-bullet', payload);
    return res.data;
  } catch (error) {
    if (error.response?.data) {
      throw error.response.data;
    }
    throw {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: error.message || 'Failed to improve bullet point.',
      },
    };
  }
}

export default api;
