import axios from "axios";
import useAuthStore from "../store/useAuthStore";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const privateApi = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

privateApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

privateApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      console.error("Token expired or invalid. Logging out...");

      const { setIsLoggedIn, setUser, setToken } = useAuthStore.getState();

      setIsLoggedIn(false);
      setToken("");
      setUser(undefined);

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
