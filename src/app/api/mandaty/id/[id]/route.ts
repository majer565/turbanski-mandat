import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const idAsNumber = parseInt(params.id);

    const res = await prisma.ticket.findFirst({
      where: { id: idAsNumber },
    });
    return Response.json(res);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch ticket" },
      { status: 500 }
    );
  }
}