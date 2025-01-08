import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL, // Replace with your backend URL
  withCredentials: true, // Send cookies with requests
});

api.interceptors.response.use(
  (response) => {
    // If the response is successful, return it directly
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to token expiration and ensure no infinite loops
    if (
      error.response &&
      error.response.data.message === 'jwt expired' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Mark this request as retried

      try {
        // Call the refresh token endpoint to get a new access token
        await api.post('/api/token');
        // Retry the original request with the new token
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    // If not a 403 error or if retry fails, reject the promise
    return Promise.reject(error);
  }
);

export default api;
