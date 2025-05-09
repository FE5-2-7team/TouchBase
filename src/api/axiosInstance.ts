import axios from "axios";
import { useUserStore } from "../stores/useUserStore";

export const axiosInstance = axios.create({
  baseURL: "http://13.125.208.179:5011/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = useUserStore.getState().getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
