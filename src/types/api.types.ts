export interface ApiSuccess<T> {
  statusCode: number;
  data: T;
  message: string;
}

export interface ApiError {
  statusCode: number;
  error: {
    message: string;
  };
  message: string;
}

export type ApiResponse<T> = ApiSuccess<T>;
