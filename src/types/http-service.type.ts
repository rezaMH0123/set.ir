/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  errors: any[];
  data: T | null;
}
export interface ApiErrorResponse {
  success: false;
  message: string;
  errors: any[];
  data: null;
}

export type LoginRespons = {
  token: string;
  refreshToken: string;
  accessExpiresAt: string;
  refreshExpiresAt: string;
};
