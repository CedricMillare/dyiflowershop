import { sql } from "drizzle-orm";
import { index, pgTableCreator, integer, varchar, real, timestamp, primaryKey } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `dyiflowershop_${name}`);

// Rows
export const rows = createTable("rows", (d) => ({
  id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
  title: d.varchar({ length: 256 }).notNull(),
}));

// Bouquets
export const bouquets = createTable("bouquets", (d) => ({
  id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
  label: d.varchar({ length: 256 }).notNull(),
  image: d.varchar({ length: 1024 }).notNull(),
  price: d.real().notNull(),
  created_at: d.timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  updated_at: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
}));

// Row-Bouquet join table (many-to-many)
export const rowBouquets = createTable("row_bouquets", (d) => ({
  row_id: d.integer().notNull(),
  bouquet_id: d.integer().notNull(),
}), (t) => [primaryKey(t.row_id, t.bouquet_id)]);

// Flowers per bouquet (name + quantity)
export const bouquetFlowers = createTable("bouquet_flowers", (d) => ({
  bouquet_id: d.integer().notNull(),
  flower_name: d.varchar({ length: 256 }).notNull(),
  quantity: d.integer().notNull(),
}), (t) => [primaryKey(t.bouquet_id, t.flower_name)]);

// Consumables per bouquet
export const bouquetConsumables = createTable("bouquet_consumables", (d) => ({
  bouquet_id: d.integer().notNull(),
  consumable_name: d.varchar({ length: 256 }).notNull(),
}), (t) => [primaryKey(t.bouquet_id, t.consumable_name)]);