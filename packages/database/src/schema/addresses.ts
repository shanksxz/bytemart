import { relations } from "drizzle-orm";
import { boolean, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { customers } from "./users";

export const addresses = mysqlTable("addresses", {
	id: varchar("id", { length: 255 }).primaryKey(),
	customer_id: varchar("customer_id", { length: 255 })
		.notNull()
		.references(() => customers.id),
	address_line1: varchar("address_line1", { length: 255 }).notNull(),
	address_line2: varchar("address_line2", { length: 255 }),
	city: varchar("city", { length: 100 }).notNull(),
	state: varchar("state", { length: 100 }).notNull(),
	postal_code: varchar("postal_code", { length: 20 }).notNull(),
	country: varchar("country", { length: 100 }).notNull(),
	is_default: boolean("is_default").default(false),
	created_at: varchar("created_at", { length: 255 }).notNull(),
	updated_at: varchar("updated_at", { length: 255 }).notNull(),
});

export const addressesRelations = relations(addresses, ({ one }) => ({
	customer: one(customers, {
		fields: [addresses.customer_id],
		references: [customers.id],
	}),
}));
