import { db } from "~/server/db";
import { bouquets, bouquetFlowers, bouquetConsumables, rows, rowBouquets } from "~/server/db/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Save request body:', JSON.stringify(body, null, 2));

    // Delete data in the correct order to respect foreign key constraints
    try {
      // First delete consumables and flowers (they reference bouquets)
      await db.delete(bouquetConsumables);
      await db.delete(bouquetFlowers);
      // Then delete row-bouquet links (they reference both rows and bouquets)
      await db.delete(rowBouquets);
      // Then delete bouquets and rows
      await db.delete(bouquets);
      await db.delete(rows);
    } catch (error) {
      console.error('Error deleting existing data:', error);
      return NextResponse.json({ error: 'Failed to clear existing data' }, { status: 500 });
    }

    // Then insert the new data
    for (const [rowIndex, row] of body.entries()) {
      if (!row?.title) {
        console.log('Skipping row without title:', row);
        continue;
      }
      
      console.log('Processing row:', row.title);
      try {
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
          
          try {
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

            // Create row-bouquet link
            await db.insert(rowBouquets).values({ 
              row_id: rowId, 
              bouquet_id: bouquetId 
            });
            console.log('Created row-bouquet link');

            // Add flowers
            const flowersData = Object.entries(bouquet.flowers || {}).map(([name, quantity]) => ({
              bouquet_id: bouquetId,
              flower_name: name,
              quantity: Number(quantity),
            }));
            if (flowersData.length) {
              await db.insert(bouquetFlowers).values(flowersData);
              console.log('Added flowers:', flowersData);
            }

            // Add consumables
            const consumablesData = (bouquet.consumables || []).map((name: string) => ({
              bouquet_id: bouquetId,
              consumable_name: name,
            }));
            if (consumablesData.length) {
              await db.insert(bouquetConsumables).values(consumablesData);
              console.log('Added consumables:', consumablesData);
            }
          } catch (error) {
            console.error('Error processing bouquet:', error);
            // Continue with next bouquet even if this one fails
            continue;
          }
        }
      } catch (error) {
        console.error('Error processing row:', error);
        // Continue with next row even if this one fails
        continue;
      }
    }

    return NextResponse.json({ message: "Saved successfully" });
  } catch (error) {
    console.error('Error saving bouquets:', error);
    return NextResponse.json({ error: 'Failed to save bouquets' }, { status: 500 });
  }
}