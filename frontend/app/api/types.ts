export interface ApiSuccessResponse<D> {
  statusCode: number;
  message: string;
  data: D;
}

export interface ApiErrorResponse<D> {
  statusCode: string;
  message: string;
  data?: null;
}

export type ApiResponse<D> = ApiSuccessResponse<D> | ApiErrorResponse<D>;
