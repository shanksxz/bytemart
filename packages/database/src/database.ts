import { drizzle } from "drizzle-orm/mysql2";
import { getEnvVar } from "./utils";
export const db = drizzle({ connection: { uri: getEnvVar("DATABASE_URL") } });

export async function checkDatabaseConnection() {
	try {
		await db.execute("SELECT 1");
		console.log("✅ Database connection established successfully");
	} catch (error) {
		console.error("❌ Database connection failed:", error);
		process.exit(1);
	}
}
