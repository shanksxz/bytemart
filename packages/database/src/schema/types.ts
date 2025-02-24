import type { mysqlTable } from "drizzle-orm/mysql-core";

export type TableType<T extends ReturnType<typeof mysqlTable>> =
	T["$inferSelect"];
