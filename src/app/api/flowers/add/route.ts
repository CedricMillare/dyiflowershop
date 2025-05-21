import { db } from "~/server/db";
import { flowers } from "~/server/db/schema";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    // Temporarily disabled admin check
    // const session = await auth();
    // if (!session?.userId || session.sessionClaims?.role !== "admin") {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const body = await req.json();
    console.log('Add flower request body:', body);

    if (!body.name || typeof body.quantity !== 'number' || body.quantity < 0) {
      return NextResponse.json({ error: 'Invalid flower data' }, { status: 400 });
    }

    await db.insert(flowers).values({
      name: body.name,
      quantity: body.quantity,
    });

    return NextResponse.json({ message: "Flower added successfully" });
  } catch (error) {
    console.error('Error adding flower:', error);
    return NextResponse.json({ error: 'Failed to add flower' }, { status: 500 });
  }
} 