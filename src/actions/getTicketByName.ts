"use client";

import { Ticket } from "@prisma/client";

export const getTicketByName = async (number: string): Promise<Ticket> => {
  const response = await fetch(`/api/mandaty/num/${number}`);
  return response.json();
};
