import { verifySession } from "@/lib/session";
import { Ticket } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../prisma/client";
import { logger } from "../../../../../lib/logger/client";
import { LoggerRequest } from "../../../../../lib/logger/Logger";

export async function PUT(req: NextRequest) {
  try {
    const ticket: Pick<Ticket, "id" | "file"> = await req.json();
    const ticketInDb = await prisma.ticket.findFirst({
      where: {
        id: ticket.id,
      },
    });

    if (!ticketInDb) throw new Error("Mandat nie znajduje się w bazie");

    const res = await prisma.ticket.update({
      where: {
        id: ticketInDb.id,
      },
      data: {
        file: ticket.file,
      },
    });

    logger.info(`Ticket with id ${res.id} updated successfully.`, LoggerRequest.PUT);
    return NextResponse.json(res, { status: 200 });
  } catch (e) {
    logger.error("Can't update ticket:: " + e, LoggerRequest.PUT);
    return NextResponse.json({ message: String(e) }, { status: 500 });
  }
}
