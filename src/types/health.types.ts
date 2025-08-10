import type { ApiResponse } from "./api.types";

export interface HealthData {
  message: string;
}

export type HealthResponse = ApiResponse<HealthData>;
