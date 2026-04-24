import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://time-flow-5sbe.vercel.app/api",
  withCredentials: true,
});

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
        await axios.post(
          "https://time-flow-5sbe.vercel.app/api/auth/refresh",
          {},
          { withCredentials: true },
        );

        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed - logout user
        localStorage.removeItem("user");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
