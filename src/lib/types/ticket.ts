import { Prisma } from "@prisma/client";

export type TicketWithDriver = Prisma.TicketGetPayload<{
  include: {
    driver: true;
  };
}>;
