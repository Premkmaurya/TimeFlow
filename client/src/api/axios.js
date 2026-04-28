import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Request interceptor to add Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for automatic token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and not already retried
    const isAuthPath =
      originalRequest.url.includes("/login") ||
      originalRequest.url.includes("/register");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthPath
    ) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        const response = await axios.post(
          `${API_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );

        // If refresh returns a new token, update it
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }

        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed - logout user
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
