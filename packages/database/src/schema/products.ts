import { relations } from "drizzle-orm";
import {
	decimal,
	int,
	mysqlTable,
	text,
	timestamp,
	unique,
	varchar,
} from "drizzle-orm/mysql-core";

export const categories = mysqlTable(
	"categories",
	{
		id: varchar("id", { length: 255 }).primaryKey(),
		name: varchar("name", { length: 255 }).notNull(),
		parent_id: varchar("parent_id", { length: 255 }),
		created_at: timestamp("created_at").defaultNow(),
		updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
	},
	(table) => ({
		nameIdx: unique("name_idx").on(table.name),
	}),
);

export const products = mysqlTable("products", {
	id: varchar("id", { length: 255 }).primaryKey(),
	name: varchar("name", { length: 255 }).notNull(),
	description: text("description"),
	price: decimal("price", { precision: 10, scale: 2 }).notNull(),
	stock_quantity: int("stock_quantity").notNull(),
	category_id: varchar("category_id", { length: 255 }).references(
		() => categories.id,
	),
	image_url: varchar("image_url", { length: 1024 }),
	created_at: timestamp("created_at").defaultNow(),
	updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const categoriesRelations = relations(categories, ({ one, many }) => ({
	parent: one(categories, {
		fields: [categories.parent_id],
		references: [categories.id],
	}),
	products: many(products),
}));

export const productsRelations = relations(products, ({ one }) => ({
	category: one(categories, {
		fields: [products.category_id],
		references: [categories.id],
	}),
}));
