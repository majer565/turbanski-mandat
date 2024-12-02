import { verifySession } from "@/lib/session";
import { DriverWithoutId } from "@/lib/types/driver";
import { Driver } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";
import { logger } from "../../../lib/logger/client";
import { Request } from "../../../lib/logger/Logger";

export async function GET() {
  try {
    const res = await prisma.driver.findMany();
    return Response.json(res);
  } catch (e) {
    logger.error("Can't fetch data from database:: " + e, Request.GET);
    throw new Error("Can't fetch data from database");
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await verifySession();
    if (!session) throw new Error("Sesja wygasła");

    const driver: DriverWithoutId = await req.json();
    const driverInDb = await prisma.driver.findFirst({
      where: {
        name: driver.name,
        surname: driver.surname,
      },
    });

    if (driverInDb) throw new Error("Kierowca już istnieje");

    const res = await prisma.driver.create({ data: driver });

    logger.info(`Driver created successfully with id ${res.id}.`, Request.POST);
    return NextResponse.json(res, { status: 200 });
  } catch (e) {
    logger.error("Can't create driver:: " + e, Request.POST);
    return NextResponse.json({ message: String(e) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await verifySession();
    if (!session) throw new Error("Sesja wygasła");

    const driver: Driver = await req.json();
    const driverInDb = await prisma.driver.findFirst({
      where: {
        id: driver.id,
      },
    });

    if (!driverInDb) throw new Error("Kierowca nie znajduje się w bazie");

    const res = await prisma.driver.update({
      where: {
        id: driver.id,
      },
      data: {
        name: driver.name,
        surname: driver.surname,
      },
    });

    logger.info(`Driver with id ${res.id} updated successfully.`, Request.PUT);
    return NextResponse.json(res, { status: 200 });
  } catch (e) {
    logger.error("Can't update driver:: " + e, Request.PUT);
    return NextResponse.json({ message: String(e) }, { status: 500 });
  }
}
