import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const churches = await prisma.church.findMany({
    include: { confessionSchedules: true },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(churches);
}
