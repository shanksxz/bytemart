import { mysqlTable, varchar, unique } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";
import { addresses } from "./addresses";

export const users = mysqlTable("users", {
  id: varchar("id", { length: 255 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  password_hash: varchar("password_hash", { length: 255 }).notNull(),
  first_name: varchar("first_name", { length: 255 }).notNull(),
  last_name: varchar("last_name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  role: varchar("role", { length: 50 }).notNull().default("customer"),
  created_at: varchar("created_at", { length: 255 }).notNull(),
  updated_at: varchar("updated_at", { length: 255 }).notNull(),

}, (table) => ({
  emailIdx: unique("email_idx").on(table.email),
}));

export const customers = mysqlTable("customers", {
  id: varchar("id", { length: 255 }).primaryKey(),
  user_id: varchar("user_id", { length: 255 }).notNull().references(() => users.id),
  billing_address_id: varchar("billing_address_id", { length: 255 }),
  default_payment_id: varchar("default_payment_id", { length: 255 }),
  created_at: varchar("created_at", { length: 255 }).notNull(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  customer: one(customers, {
    fields: [users.id],
    references: [customers.user_id],
  }),
}));

export const customersRelations = relations(customers, ({ one }) => ({
  user: one(users, {
    fields: [customers.user_id],
    references: [users.id],
  }),
  billingAddress: one(addresses, {
    fields: [customers.billing_address_id],
    references: [addresses.id],
  }),
})); 