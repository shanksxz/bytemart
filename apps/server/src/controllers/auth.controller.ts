import { db, eq, users } from "@bytemart/database";
import { LoginSchema, SignupSchema } from "@bytemart/types";
import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { generateToken, handleError } from "../utils";
import ApiError from "../utils/api-error";

export const signup = async (req: Request, res: Response) => {
  try {
    const validatedData = SignupSchema.parse(req.body);

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, validatedData.email),
    });

    if (existingUser) {
      throw ApiError.conflict("Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(validatedData.password, salt);

    // this only returns the id of the user
    const [user] = await db
      .insert(users)
      .values({
        email: validatedData.email,
        password_hash: hashedPassword,
        first_name: validatedData.firstName,
        last_name: validatedData.lastName,
        phone: validatedData.phone,
      })
      .$returningId();

    if (!user) {
      throw ApiError.badRequest("Failed to create user");
    }
    generateToken(res, user.id);

    res.status(201).json({
      success: true,
      data: {
        id: user.id,
        email: validatedData.email,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        role: "customer",
      },
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const validatedData = LoginSchema.parse(req.body);

    const user = await db.query.users.findFirst({
      where: eq(users.email, validatedData.email),
    });

    if (!user) {
      throw ApiError.unauthorized("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(
      validatedData.password,
      user.password_hash
    );

    if (!isMatch) {
      throw ApiError.unauthorized("Invalid email or password");
    }

    generateToken(res, user.id);

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
      },
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const signout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ success: true });
};

export const me = async (req: Request, res: Response) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, req.user.id),
    });
    if (!user) {
      throw ApiError.notFound("User not found");
    }
    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
      },
    });
  } catch (error) {
    handleError(error, res);
  }
};
