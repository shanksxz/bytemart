import {
  mysqlTable,
  varchar,
  decimal,
  int,
  index,
  timestamp,
} from "drizzle-orm/mysql-core";
import { customers } from "./users";
import { products } from "./products";
import { addresses } from "./addresses";
import { relations } from "drizzle-orm";

export const orders = mysqlTable(
  "orders",
  {
    id: varchar("id", { length: 255 }).primaryKey(),
    customer_id: varchar("customer_id", { length: 255 })
      .notNull()
      .references(() => customers.id),
    status: varchar("status", { length: 50 }).notNull(),
    total: decimal("total", { precision: 10, scale: 2 }).notNull(),
    shipping_address_id: varchar("shipping_address_id", {
      length: 255,
    }).references(() => addresses.id),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
  },
  (table) => ({
    customerIdx: index("customer_idx").on(table.customer_id),
  })
);

export const orderItems = mysqlTable("order_items", {
  id: varchar("id", { length: 255 }).primaryKey(),
  order_id: varchar("order_id", { length: 255 })
    .notNull()
    .references(() => orders.id),
  product_id: varchar("product_id", { length: 255 })
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
