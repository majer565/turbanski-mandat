import { DriverWithoutId } from "@/lib/types/driver";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";

export async function GET() {
  try {
    const res = await prisma.driver.findMany();
    return Response.json(res);
  } catch (e) {
    throw new Error("Can't fetch data from database");
  }
}

export async function POST(req: NextRequest) {
  try {
    const driver: DriverWithoutId = await req.json();
    const driverInDb = await prisma.driver.findFirst({
      where: {
        name: driver.name,
        surname: driver.surname,
      },
    });

    if (driverInDb) throw new Error("Kierowca już istnieje");

    const res = await prisma.driver.create({ data: driver });

    return NextResponse.json(res, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: String(e) }, { status: 500 });
  }
}
