import { verifySession } from "@/lib/session";
import { Ticket } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";

export async function PUT(req: NextRequest) {
  try {
    const session = await verifySession();
    if (!session) throw new Error("Sesja wygasła");

    const ticket: Pick<Ticket, "id" | "paymentDate"> = await req.json();
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
        payment: "Opłacone",
        paymentDate: ticket.paymentDate,
      },
    });

    return NextResponse.json(res, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: String(e) }, { status: 500 });
  }
}
