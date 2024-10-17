import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { number: string } }
) {
  try {
    const res = await prisma.ticket.findFirst({
      where: { number: params.number },
    });
    return Response.json(res);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch ticket" },
      { status: 500 }
    );
  }
}
