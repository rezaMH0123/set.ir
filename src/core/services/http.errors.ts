import {
  ApiError,
  BadRequestError,
  NetworkError,
  NotFoundError,
  UnauthorizedError,
  UnhandledException,
  ValidationError,
} from "@/types/http-errors.type";

export type ApiErrorHandler = (errorData: ApiError) => void;

export const badRequestErrorStrategy: ApiErrorHandler = (errorData) => {
  throw {
    ...errorData,
  } as BadRequestError;
};

export const validationErrorStrategy: ApiErrorHandler = (errorData) => {
  throw { ...errorData } as ValidationError;
};

export const notFoundErrorStrategy: ApiErrorHandler = (errorData) => {
  throw { ...errorData, message: "سرویس مورد نظر یافت نشد" } as NotFoundError;
};

export const unauthorizedErrorStrategy: ApiErrorHandler = (errorData) => {
  throw {
    ...errorData,
    message: "دسترسی به سرویس مورد نظر امکان پذیر نمی باشد",
  } as UnauthorizedError;
};

export const unhandledExceptionStrategy: ApiErrorHandler = (errorData) => {
  throw { ...errorData, message: "خطای سرور" } as UnhandledException;
};

export const networkErrorStrategy = () => {
  throw { message: "خطای شبکه" } as NetworkError;
};

export const errorHandler: Record<number, ApiErrorHandler> = {
  400: (errorData) =>
    (errorData.warnings ? validationErrorStrategy : badRequestErrorStrategy)(
      errorData
    ),
  401: unauthorizedErrorStrategy,
  403: unauthorizedErrorStrategy,
  404: notFoundErrorStrategy,
  500: unhandledExceptionStrategy,
};
