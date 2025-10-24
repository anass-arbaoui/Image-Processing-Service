import { date, pgEnum } from "drizzle-orm/pg-core";
import {
  integer,
  numeric,
  primaryKey,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("roles", ["admin", "user"]);

export const category = pgTable("category", {
  id: serial("id").primaryKey(),
  categoryName: varchar("category_name", { length: 255 }).notNull().unique(),
  description: text("description"),
});

export const brand = pgTable("brand", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  brandName: varchar("brand_name", { length: 255 }).notNull().unique(),
});
export const product = pgTable("product", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  productName: varchar("product_name", { length: 255 }).notNull().unique(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  categoryId: integer("category_id").references(() => category.id),
  brandId: integer("brand_id").references(() => brand.id),
});

export const tag = pgTable("tag", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  tagName: varchar("tag_name", { length: 255 }).notNull().unique(),
});

export const productTag = pgTable(
  "product_tag",
  {
    productId: integer()
      .notNull()
      .references(() => product.id),
    tagId: integer()
      .notNull()
      .references(() => tag.id),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.productId, table.tagId],
    }),
  })
);

export const order = pgTable("order", {
  id: serial("id").primaryKey(),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  createdAt: date("created_at").notNull(),
  status: varchar("status", { length: 50 }).default("pending").notNull(),
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
});

export const orderItem = pgTable("order_item", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer("order_id").references(() => order.id),
  productId: integer("product_id").references(() => product.id),
  quantity: integer("quantity").notNull(),
});
export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  login: varchar("login", { length: 255 }).notNull().unique(),
  password: varchar("password").notNull(),
  name: varchar("name"),
  role: roleEnum("role").default("user").notNull(),
});
