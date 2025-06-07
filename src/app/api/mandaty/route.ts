import { verifySession } from "@/lib/session";
import { TicketWithoutId } from "@/lib/types/ticket";
import { Ticket } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";
import { logger } from "../../../lib/logger/client";
import { LoggerRequest } from "../../../lib/logger/Logger";

export async function GET(_req: NextRequest) {
  try {
    const res = await prisma.ticket.findMany({ include: { driver: true } });

    return Response.json(res);
  } catch (e) {
    logger.error("Can't fetch data from database:: " + e, LoggerRequest.GET);
    throw new Error("Can't fetch data from database:: " + e);
  }
}

export async function POST(req: NextRequest) {
  try {
    const ticket: TicketWithoutId = await req.json();
    const ticketFromDb = await prisma.ticket.findFirst({
      where: {
        number: ticket.number,
      },
    });

    if (ticketFromDb) throw new Error("Mandat o takim numerze już istnieje");

    const res = await prisma.ticket.create({ data: ticket });

    logger.info(`Ticket created successfully with id ${res.id}.`, LoggerRequest.POST);
    return NextResponse.json(res, { status: 200 });
  } catch (e) {
    logger.error("Can't create ticket:: " + e, LoggerRequest.POST);
    return NextResponse.json({ message: String(e) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const ticket: Ticket = await req.json();
    const ticketInDb = await prisma.ticket.findFirst({
      where: {
        id: ticket.id,
      },
    });

    if (!ticketInDb) throw new Error("Mandat nie znajduje się w bazie");

    const res = await prisma.ticket.update({
      where: {
        id: ticket.id,
      },
      data: {
        number: ticket.number,
        date: ticket.date,
        time: ticket.time,
        vehiclePlate: ticket.vehiclePlate,
        amount: ticket.amount,
        currency: ticket.currency,
        postPayoutDate: ticket.postPayoutDate,
        payment: ticket.payment,
        paymentDate: ticket.paymentDate,
        driverId: ticket.driverId,
        isSalaryCut: ticket.isSalaryCut,
      },
    });

    logger.info(`Ticket with id ${res.id} updated successfully.`, LoggerRequest.PUT);
    return NextResponse.json(res, { status: 200 });
  } catch (e) {
    logger.error("Can't update ticket:: " + e, LoggerRequest.PUT);
    return NextResponse.json({ message: String(e) }, { status: 500 });
  }
}
