"use client";

import { Ticket } from "@prisma/client";

export const findFormTicket= async (
  ticket: Pick<Ticket, "number" | "date" | "time">
) => {
  try {
    const response = await fetch("/api/mandaty/find", {
      method: "POST",
      body: JSON.stringify(ticket),
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
