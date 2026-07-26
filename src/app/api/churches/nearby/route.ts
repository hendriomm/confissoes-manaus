import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function getDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const lat = parseFloat(searchParams.get("lat") ?? "");
  const lng = parseFloat(searchParams.get("lng") ?? "");
  const radius = parseFloat(searchParams.get("radius") ?? "10");

  if (isNaN(lat) || isNaN(lng)) {
    return NextResponse.json(
      { error: "Parâmetros 'lat' e 'lng' são obrigatórios" },
      { status: 400 }
    );
  }

  const churches = await prisma.church.findMany({
    include: { confessionSchedules: true },
  });

  const churchesWithDistance = churches
    .map((church) => ({
      ...church,
      distance: Math.round(getDistance(lat, lng, church.latitude, church.longitude) * 10) / 10,
    }))
    .filter((church) => church.distance <= radius)
    .sort((a, b) => a.distance - b.distance);

  return NextResponse.json({
    churches: churchesWithDistance,
    userLocation: { lat, lng },
  });
}
