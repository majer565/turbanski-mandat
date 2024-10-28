import { verifySession } from "@/lib/session";
import { prisma } from "../../../../../prisma/client";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await verifySession();
    if (!session) throw new Error("Sesja wygasła");
    const driverId = Number(params.id);

    const res = await prisma.driver.findUnique({
      where: {
        id: driverId,
      },
    });
    return Response.json(res);
  } catch (e) {
    throw new Error("Can't fetch data from database:: " + e);
  }
}
