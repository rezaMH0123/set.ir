/* eslint-disable @typescript-eslint/no-empty-object-type */
interface Problem {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  warnings: string[];
}

interface BadRequestError extends Problem {}
interface UnauthorizedError extends Problem {}
interface ValidationError extends Problem {}
interface NotFoundError extends Problem {}
interface UnhandledException extends Problem {}
interface NetworkError extends Problem {}

type ApiError =
  | BadRequestError
  | NetworkError
  | NotFoundError
  | UnhandledException
  | UnauthorizedError
  | ValidationError;

export type {
  Problem,
  BadRequestError,
  UnauthorizedError,
  ValidationError,
  NotFoundError,
  UnhandledException,
  NetworkError,
  ApiError,
};
