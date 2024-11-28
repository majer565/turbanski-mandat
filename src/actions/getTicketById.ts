"use client";

import { Ticket } from "@prisma/client";

export const getTicketById = async (id: string): Promise<Ticket> => {
  const response = await fetch(`/api/mandaty/id/${id}`);
  return response.json();
};
