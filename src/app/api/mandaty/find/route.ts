import { Ticket } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";
import { logger } from "../../../../lib/logger/client";
import { Request } from "../../../../lib/logger/Logger";

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
    logger.error("Can't create new ticket:: " + e, Request.POST);
    return NextResponse.json({ message: String(e) }, { status: 500 });
  }
}
