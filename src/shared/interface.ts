export interface ApiResponse<T> {
  status: number;
  data: T;
  error: ApiError | null;
}

export interface ApiError {
  errorCode: string;
  errorMessage: string;
  details?: string[] | null;
}
