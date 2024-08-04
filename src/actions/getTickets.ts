"use client";

import { TicketWithDriver } from "@/lib/types/ticket";

export const getTickets = async (): Promise<TicketWithDriver[]> => {
  const response = await fetch("/api/");
  return response.json();
};
