import { defineConfig } from "drizzle-kit";
import { getEnvVar } from "./src/utils";

export default defineConfig({
  schema: "./src/schema/*",
  dialect: "mysql",
  dbCredentials: {
    url: getEnvVar("DATABASE_URL"),
  }
});
