import { prisma } from "../../../../../prisma/client";

export async function GET() {
  try {
    const res = await prisma.ticket.findMany({
      where: { payment: "Nieopłacone" },
      select: {
        id: true,
        number: true,
        amount: true,
        currency: true,
        postPayoutDate: true,
        payment: true,
      }
    });
    return Response.json(res);
  } catch (e) {
    throw new Error("Can't fetch data from database:: " + e);
  }
}
