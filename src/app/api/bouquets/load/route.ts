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
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";

// Helper function to check if user is admin
async function isAdmin() {
  const { userId } = getAuth();
  if (!userId) return false;

  // Get user's public metadata from Clerk
  const user = await clerkClient.users.getUser(userId);
  return user.publicMetadata.role === "admin";
}

export async function GET() {
  try {
    // Check if user is admin
    if (!await isAdmin()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Fetching bouquets data...');
    const bouquetsData = await db.select().from(bouquets);
    console.log('Bouquets data:', bouquetsData);
    
    return NextResponse.json(bouquetsData);
  } catch (error) {
    console.error('Error fetching bouquets:', error);
    return NextResponse.json({ error: 'Failed to fetch bouquets' }, { status: 500 });
  }
}