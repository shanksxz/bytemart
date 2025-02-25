import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import {
	decimal,
	index,
	int,
	mysqlTable,
	timestamp,
	varchar,
} from "drizzle-orm/mysql-core";
import { addresses } from "./addresses";
import { products } from "./products";
import { customers } from "./users";

export const orders = mysqlTable("orders", {
	id: varchar("id", { length: 128 })
		.$defaultFn(() => createId())
		.primaryKey(),
	customer_id: varchar("customer_id", { length: 128 })
		.notNull()
		.references(() => customers.id),
	status: varchar("status", { length: 50 }).notNull(),
	total: decimal("total", { precision: 10, scale: 2 }).notNull(),
	shipping_address_id: varchar("shipping_address_id", {
		length: 128,
	}).references(() => addresses.id),
	created_at: timestamp("created_at").defaultNow(),
	updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const orderItems = mysqlTable("order_items", {
	id: varchar("id", { length: 128 })
		.$defaultFn(() => createId())
		.primaryKey(),
	order_id: varchar("order_id", { length: 128 })
		.notNull()
		.references(() => orders.id),
	product_id: varchar("product_id", { length: 128 })
		.notNull()
		.references(() => products.id),
	quantity: int("quantity").notNull(),
	price: decimal("price", { precision: 10, scale: 2 }).notNull(),
	created_at: timestamp("created_at").defaultNow(),
	updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const ordersRelations = relations(orders, ({ one, many }) => ({
	customer: one(customers, {
		fields: [orders.customer_id],
		references: [customers.id],
	}),
	shippingAddress: one(addresses, {
		fields: [orders.shipping_address_id],
		references: [addresses.id],
	}),
	items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
	order: one(orders, {
		fields: [orderItems.order_id],
		references: [orders.id],
	}),
	product: one(products, {
		fields: [orderItems.product_id],
		references: [products.id],
	}),
}));
