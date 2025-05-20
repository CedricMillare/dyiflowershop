import { db } from "~/server/db";
import { bouquets, bouquetFlowers, bouquetConsumables, rows, rowBouquets } from "~/server/db/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Save request body:', JSON.stringify(body, null, 2));

    // First, delete all existing data
    await db.delete(bouquetConsumables);
    await db.delete(bouquetFlowers);
    await db.delete(rowBouquets);
    await db.delete(bouquets);
    await db.delete(rows);

    // Then insert the new data
    for (const [rowIndex, row] of body.entries()) {
      if (!row?.title) {
        console.log('Skipping row without title:', row);
        continue;
      }
      
      console.log('Processing row:', row.title);
      const rowResult = await db.insert(rows).values({ title: row.title }).returning({ id: rows.id });
      const rowId = rowResult[0]?.id;
      if (!rowId) {
        console.log('Failed to get row ID for:', row.title);
        continue;
      }
      console.log('Created row with ID:', rowId);

      for (const bouquet of row.items || []) {
        console.log('Processing bouquet:', bouquet.label);
        if (!bouquet?.label || !bouquet?.image || typeof bouquet?.price !== 'number') {
          console.log('Skipping invalid bouquet:', bouquet);
          continue;
        }
        
        const bouquetResult = await db.insert(bouquets).values({
          label: bouquet.label,
          image: bouquet.image,
          price: bouquet.price,
        }).returning({ id: bouquets.id });
        const bouquetId = bouquetResult[0]?.id;
        if (!bouquetId) {
          console.log('Failed to get bouquet ID for:', bouquet.label);
          continue;
        }
        console.log('Created bouquet with ID:', bouquetId);

        await db.insert(rowBouquets).values({ 
          row_id: rowId, 
          bouquet_id: bouquetId 
        });
        console.log('Created row-bouquet link');

        const flowersData = Object.entries(bouquet.flowers || {}).map(([name, quantity]) => ({
          bouquet_id: bouquetId,
          flower_name: name,
          quantity: Number(quantity),
        }));
        if (flowersData.length) {
          await db.insert(bouquetFlowers).values(flowersData);
          console.log('Added flowers:', flowersData);
        }

        const consumablesData = (bouquet.consumables || []).map((name: string) => ({
          bouquet_id: bouquetId,
          consumable_name: name,
        }));
        if (consumablesData.length) {
          await db.insert(bouquetConsumables).values(consumablesData);
          console.log('Added consumables:', consumablesData);
        }
      }
    }

    return NextResponse.json({ message: "Saved successfully" });
  } catch (error) {
    console.error('Error saving bouquets:', error);
    return NextResponse.json({ error: 'Failed to save bouquets' }, { status: 500 });
  }
}