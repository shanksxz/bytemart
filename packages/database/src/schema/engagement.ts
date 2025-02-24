import { mysqlTable, varchar, int, text, index, timestamp } from "drizzle-orm/mysql-core";
import { customers } from "./users";
import { products } from "./products";
import { relations } from "drizzle-orm";

export const reviews = mysqlTable("reviews", {
  id: varchar("id", { length: 255 }).primaryKey(),
  product_id: varchar("product_id", { length: 255 }).notNull().references(() => products.id),
  customer_id: varchar("customer_id", { length: 255 }).notNull().references(() => customers.id),
  rating: int("rating").notNull(),
  comment: text("comment"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
}, (table) => ({
  productIdx: index("product_idx").on(table.product_id),
}));

export const wishlists = mysqlTable("wishlists", {
  id: varchar("id", { length: 255 }).primaryKey(),
  customer_id: varchar("customer_id", { length: 255 }).notNull().references(() => customers.id),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const wishlistItems = mysqlTable("wishlist_items", {
  id: varchar("id", { length: 255 }).primaryKey(),
  wishlist_id: varchar("wishlist_id", { length: 255 }).notNull().references(() => wishlists.id),
  product_id: varchar("product_id", { length: 255 }).notNull().references(() => products.id),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const carts = mysqlTable("carts", {
  id: varchar("id", { length: 255 }).primaryKey(),
  customer_id: varchar("customer_id", { length: 255 }).notNull().references(() => customers.id),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const cartItems = mysqlTable("cart_items", {
  id: varchar("id", { length: 255 }).primaryKey(),
  cart_id: varchar("cart_id", { length: 255 }).notNull().references(() => carts.id),
  product_id: varchar("product_id", { length: 255 }).notNull().references(() => products.id),
  quantity: int("quantity").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const reviewsRelations = relations(reviews, ({ one }) => ({
  product: one(products, {
    fields: [reviews.product_id],
    references: [products.id],
  }),
  customer: one(customers, {
    fields: [reviews.customer_id],
    references: [customers.id],
  }),
}));

export const wishlistsRelations = relations(wishlists, ({ one, many }) => ({
  customer: one(customers, {
    fields: [wishlists.customer_id],
    references: [customers.id],
  }),
  items: many(wishlistItems),
}));

export const wishlistItemsRelations = relations(wishlistItems, ({ one }) => ({
  wishlist: one(wishlists, {
    fields: [wishlistItems.wishlist_id],
    references: [wishlists.id],
  }),
  product: one(products, {
    fields: [wishlistItems.product_id],
    references: [products.id],
  }),
}));

export const cartsRelations = relations(carts, ({ one, many }) => ({
  customer: one(customers, {
    fields: [carts.customer_id],
    references: [customers.id],
  }),
  items: many(cartItems),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  cart: one(carts, {
    fields: [cartItems.cart_id],
    references: [carts.id],
  }),
  product: one(products, {
    fields: [cartItems.product_id],
    references: [products.id],
  }),
})); 