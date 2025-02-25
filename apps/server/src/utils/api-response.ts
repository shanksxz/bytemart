import type { Response } from "express";

export const HttpStatus = {
	OK: 200,
	CREATED: 201,
	NO_CONTENT: 204,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	CONFLICT: 409,
	UNPROCESSABLE_ENTITY: 422,
	INTERNAL_SERVER_ERROR: 500,
} as const;

export type HttpStatusCode = (typeof HttpStatus)[keyof typeof HttpStatus];

export type ApiSuccessResponse<T> = {
	success: true;
	data: T;
};

export type ApiErrorResponse = {
	success: false;
	error: string;
	details?: unknown;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export function sendSuccess<T>(
	res: Response,
	data: T,
	status: HttpStatusCode = HttpStatus.OK,
): void {
	res.status(status).json({
		success: true,
		data,
	});
}

export function sendError(
	res: Response,
	error: string,
	status: HttpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR,
	details?: unknown,
): void {
	res.status(status).json({
		success: false,
		error,
		...(details && { details }),
	});
}
