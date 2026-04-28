import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // for refresh token cookie
});

// ✅ REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // 🔥 consistent name

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ✅ RESPONSE INTERCEPTOR (AUTO REFRESH)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

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
        // 🔥 refresh token (cookie-based)
        const res = await axios.post(
          `${API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;

        if (newAccessToken) {
          // 🔥 update token
          localStorage.setItem("accessToken", newAccessToken);

          // 🔥 retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // ❌ logout
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        window.location.href = "/login"; // redirect

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;