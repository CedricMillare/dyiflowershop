import { db } from "~/server/db";
import { rows, rowBouquets, bouquets, bouquetFlowers, bouquetConsumables } from "~/server/db/schema";
import { eq, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    console.log('Delete request body:', body);
    const { rowId } = body;

    // If no rowId is provided, this is a local-only row that hasn't been saved to the database
    if (!rowId) {
      console.log('No rowId provided - this is a local-only row');
      return NextResponse.json({ success: true });
    }

    console.log('Attempting to delete row with ID:', rowId);
    
    // First, get all bouquet IDs associated with this row
    const rowBouquetLinks = await db
      .select()
      .from(rowBouquets)
      .where(eq(rowBouquets.row_id, rowId));

    const bouquetIds = rowBouquetLinks.map(link => link.bouquet_id);

    // Delete in the correct order to respect foreign key constraints
    if (bouquetIds.length > 0) {
      // Delete consumables and flowers first
      await db.delete(bouquetConsumables).where(inArray(bouquetConsumables.bouquet_id, bouquetIds));
      await db.delete(bouquetFlowers).where(inArray(bouquetFlowers.bouquet_id, bouquetIds));
      
      // Then delete the bouquets
      await db.delete(bouquets).where(inArray(bouquets.id, bouquetIds));
      
      // Finally delete the row-bouquet links
      await db.delete(rowBouquets).where(eq(rowBouquets.row_id, rowId));
    }

    // Now delete the row
    const result = await db.delete(rows).where(eq(rows.id, rowId));
    console.log('Delete result:', result);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting row:', error);
    return NextResponse.json({ error: 'Failed to delete row' }, { status: 500 });
  }
} 