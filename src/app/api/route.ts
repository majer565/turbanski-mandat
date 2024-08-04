import { prisma } from "../../../prisma/client";

export async function GET() {
  try {
    const res = await prisma.ticket.findMany({ include: { driver: true } });
    return Response.json(res);
  } catch (e) {
    console.log("Error:: ", e);
    throw new Error("Can't fetch data from database");
  }
}
