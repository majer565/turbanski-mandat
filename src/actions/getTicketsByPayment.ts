"use client";

import { TicketWithDriver } from "@/lib/types/ticket";
import { Ticket } from "@prisma/client";

export const getTicketsByPayment = async (): Promise<
  Pick<Ticket, "id" | "number" | "postPayoutDate" | "amount" | "currency">[]
> => {
  const response = await fetch("/api/mandaty/unpaid");
  return response.json();
};
