import { Prisma, Ticket } from "@prisma/client";

export type TicketWithDriver = Prisma.TicketGetPayload<{
  include: {
    driver: true;
  };
}>;

export type TicketWithoutId = Omit<Ticket, "id">;
