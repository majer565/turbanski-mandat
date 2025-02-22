import { Ticket } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";
import { logger } from "../../../../lib/logger/client";
import { LoggerRequest } from "../../../../lib/logger/Logger";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const number = searchParams.get("number");
    const date = searchParams.get("date");
    const time = searchParams.get("time");

    if (!number || !date || !time) {
      return NextResponse.json({ isInDb: undefined }, { status: 200 });
    }

    const res = await prisma.ticket.findFirst({
      where: {
        OR: [
          {
            number,
          },
          { date, time },
        ],
      },
    });

    return NextResponse.json({ isInDb: res ? true : false }, { status: 200 });
  } catch (e) {
    logger.error("Can't fetch data from database:: " + e, LoggerRequest.GET);
    throw new Error("Can't fetch data from database:: " + e);
  }
}

export async function POST(req: NextRequest) {
  try {
    const ticket: Pick<Ticket, "number" | "date" | "time"> = await req.json();
    const ticketFromDb = await prisma.ticket.findFirst({
      where: {
        number: ticket.number,
        OR: [{ date: ticket.date }, { time: ticket.time }],
      },
    });

    if (ticketFromDb) throw new Error("Mandat o takim numerze już istnieje");

    return NextResponse.json(ticketFromDb, { status: 200 });
  } catch (e) {
    logger.error("Can't create new ticket:: " + e, LoggerRequest.POST);
    return NextResponse.json({ message: String(e) }, { status: 500 });
  }
}
