import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { env } from '../utils/env';

const apiClient = axios.create({
  baseURL: env.apiUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const message =
      (error.response?.data as { message?: string })?.message ?? 'Something went wrong. Please try again.';

    if (status === 401) {
      localStorage.removeItem('access_token');
    }

    return Promise.reject(new Error(message));
  }
);

export const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.request<T>(config);
  return response.data;
};

export default apiClient;
