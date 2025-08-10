import api from "./client";
import type {
  GoogleAuthRequest,
  AuthResponse,
  AuthStatus,
} from "../../types/auth.types";

/**
 * Authenticate with Google ID token.
 * Saves accessToken to localStorage on success.
 */
export const googleAuthenticate = async (
  body: GoogleAuthRequest
): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/auth/google", body);

  // Persist token for subsequent authorized requests
  const token = res.data?.data?.accessToken;
  if (token) localStorage.setItem("accessToken", token);

  return res.data;
};

/**
 * Utility: Clear auth token from localStorage (logout helper for consumers)
 */
export const clearAuthToken = () => localStorage.removeItem("accessToken");

/**
 * Utility: Get current auth token from localStorage
 */
export const getAuthToken = () => localStorage.getItem("accessToken");

export type { AuthStatus };
