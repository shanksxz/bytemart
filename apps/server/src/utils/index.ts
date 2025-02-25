import type { Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { ZodError } from "zod";
import { JWT_SECRET } from "../config";
import ApiError from "./api-error";

export function handleError(error: unknown, res: Response) {
	if (error instanceof ZodError) {
		return res.status(400).json({
			success: false,
			error: "Validation failed",
			details: error.errors,
		});
	}

	if (error instanceof ApiError) {
		if (!error.isOperational) {
			console.error("Programming error:", error);
		}

		return res.status(error.statusCode).json({
			success: false,
			error: error.message,
			...(process.env.NODE_ENV === "development" &&
				!error.isOperational && { stack: error.stack }),
		});
	}

	if (error instanceof JsonWebTokenError) {
		return res.status(401).json({
			success: false,
			error: "Unauthorized",
		});
	}

	if (error instanceof jwt.TokenExpiredError) {
		return res.status(401).json({
			success: false,
			error: "Token expired",
		});
	}

	console.error("An unexpected error occurred:", error);
	return res.status(500).json({
		success: false,
		error:
			process.env.NODE_ENV === "development"
				? String(error)
				: "An unexpected error occurred",
	});
}

interface TokenPayload {
	id: string;
}

export const generateToken = (res: Response, userId: string) => {
	const payload: TokenPayload = { id: userId };
	const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

	res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});
};
