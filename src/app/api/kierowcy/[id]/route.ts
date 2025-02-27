import { verifySession } from "@/lib/session";
import { prisma } from "../../../../../prisma/client";
import { logger } from "../../../../lib/logger/client";
import { LoggerRequest } from "../../../../lib/logger/Logger";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const driverId = Number(params.id);

    const res = await prisma.driver.findUnique({
      where: {
        id: driverId,
      },
    });
    return Response.json(res);
  } catch (e) {
    logger.error("Can't fetch data from database:: " + e, LoggerRequest.GET);
    throw new Error("Can't fetch data from database:: " + e);
  }
}
