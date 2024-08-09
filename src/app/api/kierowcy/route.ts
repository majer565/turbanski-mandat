import { prisma } from "../../../../prisma/client";


export async function GET() {
  try {
    const res = await prisma.driver.findMany();
    return Response.json(res);
  } catch (e) {
    throw new Error("Can't fetch data from database");
  }
}
