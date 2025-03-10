"use client";

import { Ticket } from "@prisma/client";


export const updateTicketFile = async (ticketFile: Pick<Ticket, 'id' | 'file'>) => {
  try {
    const response = await fetch(`/api/mandaty/${ticketFile.id}/edytuj`, {
      method: "PUT",
      body: JSON.stringify(ticketFile),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return response.json();
  } catch (e) {
    throw e;
  }
};
