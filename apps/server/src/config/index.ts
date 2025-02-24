import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
	SERVER_PORT: z.string().default("8787"),
	DATABASE_URL: z.string().default(""),
	SERVER_JWT_SECRET: z.string().default(""),
	SERVER_ALLOWED_ORIGINS: z.string(),
	CLIENT_URL: z.string().default("http://localhost:5173"),
});

const envVars = envSchema.parse(process.env);

export const PORT = envVars.SERVER_PORT;
export const DATABASE_URL = envVars.DATABASE_URL;
export const JWT_SECRET = envVars.SERVER_JWT_SECRET;
export const ALLOWED_ORIGINS = envVars.SERVER_ALLOWED_ORIGINS.split(",");
export const CLIENT_URL = envVars.CLIENT_URL;
