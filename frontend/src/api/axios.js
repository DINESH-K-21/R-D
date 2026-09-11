import axios from "axios";

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_URL || "http://localhost:5001/api",
});

export const productApi = axios.create({
  baseURL: import.meta.env.VITE_PRODUCT_API_URL || "http://localhost:5002/api",
});

// attach token automatically if present
function attachToken(config) {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}

authApi.interceptors.request.use(attachToken);
productApi.interceptors.request.use(attachToken);
