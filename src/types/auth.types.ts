import type { ApiResponse } from "./api.types";

export interface GoogleAuthRequest {
  id_token: string;
}

export type AuthStatus = "registered" | "login";

export interface AuthUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  provider: "google" | string;
  createdAt: string;
  updatedAt: string;
  auth: AuthStatus;
}

export interface AuthPayload {
  data: AuthUser;
  accessToken: string;
}

export type AuthResponse = ApiResponse<AuthPayload>;
