"use client";

import { Ticket } from "@prisma/client";


export const updateTicket = async (ticket: Ticket) => {
  try {
    const response = await fetch("/api/mandaty", {
      method: "PUT",
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
