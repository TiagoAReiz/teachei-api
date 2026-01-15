import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
import { API_CONFIG } from "@/constants/config";
import { getToken, removeToken } from "@/utils/storage";
import { router } from "expo-router";

// Create Axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_CONFIG.baseUrl,
  timeout: API_CONFIG.timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - add JWT token
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - logout user
      await removeToken();
      router.replace("/(auth)/login");
    }
    return Promise.reject(error);
  }
);

export default api;



