"use client";

import { TicketWithoutId } from "@/lib/types/ticket";

export const saveTicket = async (ticket: TicketWithoutId) => {
  try {
    const response = await fetch("/api/", {
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
