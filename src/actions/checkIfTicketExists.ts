"use client";

import { Ticket } from "@prisma/client";

export const checkIfTicketExists = async (
  ticket: Pick<Ticket, "number" | "date" | "time">
) => {
  try {
    const queryParams = new URLSearchParams({
      number: ticket.number,
      date: ticket.date,
      time: ticket.time,
    }).toString();
    const response = await fetch("/api/mandaty/find" + "?" + queryParams);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return response.json();
  } catch (e) {
    throw e;
  }
};
