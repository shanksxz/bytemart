import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";
import { getEnvVar } from "./utils";

const connection = mysql.createPool(getEnvVar("DATABASE_URL"));

export const db = drizzle(connection, { schema, mode: "default" });

export async function checkDatabaseConnection() {
	try {
		await db.execute("SELECT 1");
		console.log("✅ Database connection established successfully");
	} catch (error) {
		console.error("❌ Database connection failed:", error);
		process.exit(1);
	}
}
