import { db } from "~/server/db";
import { rows } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    console.log('Delete request body:', body);
    const { rowId } = body;

    if (!rowId) {
      console.log('No rowId provided');
      return NextResponse.json({ error: 'Row ID is required' }, { status: 400 });
    }

    console.log('Attempting to delete row with ID:', rowId);
    
    // Delete the row (cascade will handle related records)
    const result = await db.delete(rows).where(eq(rows.id, rowId));
    console.log('Delete result:', result);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting row:', error);
    return NextResponse.json({ error: 'Failed to delete row' }, { status: 500 });
  }
} 