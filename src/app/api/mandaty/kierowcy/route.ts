import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";

export async function GET(request: NextRequest) {
  try {
    const driversStats = await prisma.ticket.groupBy({
      by: ["driverId"],
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: "desc",
        },
      },
      take: 5,
    });

    const ticketsIds = driversStats.map((d) => d.driverId);

    const drivers = await prisma.driver.findMany({
      where: {
        id: {
          in: ticketsIds,
        },
      },
      select: {
        id: true,
        name: true,
        surname: true,
      },
    });

    const formattedResult = driversStats.map((item) => {
      const driver = drivers.find((d) => d.id === item.driverId);
      return {
        driver: `${driver?.name} ${driver?.surname}`,
        tickets: item._count.id,
      };
    });

    return Response.json(formattedResult);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch ticket" },
      { status: 500 }
    );
  }
}