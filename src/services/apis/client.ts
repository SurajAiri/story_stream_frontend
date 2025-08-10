import axios from "axios";
import type { AxiosHeaders, AxiosRequestHeaders } from "axios";

// Prefer env var; fallback to documented default
const DEFAULT_BASE_URL = "http://localhost:3000/api/v1";
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || DEFAULT_BASE_URL;

export const getServerRootFromApiBase = (apiBase: string = API_BASE_URL) =>
  apiBase.replace(/\/?api\/v1\/?$/, "");

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach Authorization header automatically if token exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  console.log(`token: ${token}`);
  if (token) {
    if (
      config.headers instanceof
      (axios.AxiosHeaders as unknown as typeof AxiosHeaders)
    ) {
      (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);
    } else {
      const headers: AxiosRequestHeaders =
        (config.headers as AxiosRequestHeaders) || {};
      config.headers = {
        ...headers,
        Authorization: `Bearer ${token}`,
      } as AxiosRequestHeaders;
    }
  }
  return config;
});

export default api;
