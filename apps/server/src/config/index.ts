import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
	PORT: z.string().default("8787"),
	DATABASE_URL: z.string().default(""),
	JWT_SECRET: z.string().default(""),
	ALLOWED_ORIGINS: z.string(),
	CLIENT_URL: z.string().default("http://localhost:5173"),
});

const envVars = envSchema.parse(process.env);

export const PORT = envVars.PORT;
export const DATABASE_URL = envVars.DATABASE_URL;
export const JWT_SECRET = envVars.JWT_SECRET;
export const ALLOWED_ORIGINS = envVars.ALLOWED_ORIGINS.split(",");
export const CLIENT_URL = envVars.CLIENT_URL;
