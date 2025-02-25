import { db, eq, users } from "@bytemart/database";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { handleError } from "../utils";
import ApiError from "../utils/api-error";

export const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const token = req.cookies.token;
		if (!token) throw ApiError.unauthorized("Unauthorized");

		const decoded = jwt.verify(token, JWT_SECRET);
		const userId = (decoded as { id: string }).id;

		const user = await db.query.users.findFirst({
			where: eq(users.id, String(userId)),
		});

		if (!user) throw ApiError.unauthorized("Unauthorized");
		req.user = { id: user.id, role: user.role };
		next();
	} catch (error) {
		handleError(error, res);
	}
};

export const adminMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		if (req.user.role !== "admin") {
			throw ApiError.forbidden("Forbidden");
		}
		next();
	} catch (error) {
		handleError(error, res);
	}
};
