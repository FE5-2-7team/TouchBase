import axios from "axios";
import { userStore } from "../stores/userStore";

export const axiosInstance = axios.create({
  baseURL: "http://13.125.208.179:5011/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = userStore.getState().getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;

  if (!config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

const token = userStore.getState().getToken();

export const axiosFileInstance = axios.create({
  baseURL: "http://13.125.208.179:5011/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
