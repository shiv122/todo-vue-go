import axios from "axios";
import { useAuthStore } from "../stores/auth";

const instance = axios.create({
  baseURL: "http://127.0.0.1:4000/api/",
});

instance.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  const token = authStore.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["Content-Type"] = "multipart/form-data";
  return config;
});

export default instance;
