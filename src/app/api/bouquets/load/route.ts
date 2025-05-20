import { db } from "~/server/db";
import {
  rows,
  bouquets,
  rowBouquets,
  bouquetFlowers,
  bouquetConsumables,
} from "~/server/db/schema";
import { eq, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Step 1: Fetch all rows
    const allRows = await db.select().from(rows);

    // Step 2: For each row, fetch its bouquets
    const result = [];
    for (const row of allRows) {
      // Get the bouquet links for this row
      const bouquetLinks = await db
        .select()
        .from(rowBouquets)
        .where(eq(rowBouquets.row_id, row.id));

      if (bouquetLinks.length === 0) {
        result.push({
          id: row.id,
          title: row.title,
          items: [],
        });
        continue;
      }

      // Get the bouquet IDs
      const bouquetIds = bouquetLinks.map((link) => link.bouquet_id);

      // Get the bouquets
      const bouquetsData = await db
        .select()
        .from(bouquets)
        .where(inArray(bouquets.id, bouquetIds));

      const fullBouquets = [];

      // For each bouquet, get its flowers and consumables
      for (const bq of bouquetsData) {
        const flowers = await db
          .select()
          .from(bouquetFlowers)
          .where(eq(bouquetFlowers.bouquet_id, bq.id));

        const consumables = await db
          .select()
          .from(bouquetConsumables)
          .where(eq(bouquetConsumables.bouquet_id, bq.id));

        fullBouquets.push({
          id: bq.id,
          label: bq.label,
          image: bq.image,
          price: bq.price,
          flowers: Object.fromEntries(flowers.map((f) => [f.flower_name, f.quantity])),
          consumables: consumables.map((c) => c.consumable_name),
        });
      }

      result.push({
        id: row.id,
        title: row.title,
        items: fullBouquets,
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error loading bouquets:', error);
    return NextResponse.json({ error: 'Failed to load bouquets' }, { status: 500 });
  }
}