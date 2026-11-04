import axios from "axios";
import { useContext } from "react";
import { MyStore } from "../../context/AuthContextProvider";

export const useApi = () => {
  const { accessToken, setAccessToken } = useContext(MyStore);

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "",
    withCredentials: true,
  });

  api.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,

    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        originalRequest &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const API_BASE_URL = import.meta.env.VITE_API_URL || "";

          const res = await axios.post(
            `${API_BASE_URL}/api/auth/refresh-token`,
            {},
            { withCredentials: true }
          );

          const newAccessToken = res.data.data.accessToken;

          setAccessToken(newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return axios(originalRequest);
        } catch (refreshError) {
          setAccessToken(null);
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
};