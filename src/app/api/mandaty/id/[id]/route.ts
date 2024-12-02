import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../prisma/client";
import { logger } from "../../../../../lib/logger/client";
import { LoggerRequest } from "../../../../../lib/logger/Logger";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const idAsNumber = parseInt(params.id);

    const res = await prisma.ticket.findFirst({
      where: { id: idAsNumber },
    });

    return Response.json(res);
  } catch (error) {
    logger.error("Failed to fetch ticket:: " + error, LoggerRequest.GET);
    return NextResponse.json(
      { message: "Failed to fetch ticket" },
      { status: 500 }
    );
  }
}