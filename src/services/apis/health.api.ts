import api, { API_BASE_URL, getServerRootFromApiBase } from "./client";
import type { HealthResponse } from "../../types/health.types";
import axios from "axios";

/**
 * GET / -> Root health check outside /api/v1
 */
export const getRootHealth = async (): Promise<HealthResponse> => {
  const root = getServerRootFromApiBase(API_BASE_URL);
  const res = await axios.get<HealthResponse>(root + "/");
  return res.data;
};

/**
 * GET /api/v1/ -> API health check
 */
export const getApiHealth = async (): Promise<HealthResponse> => {
  const res = await api.get<HealthResponse>("/");
  return res.data;
};
