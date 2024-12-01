"use client";

interface DriverTicketCount {
  driver: string;
  tickets: number;
}

export const getDriversTicketsCount = async (): Promise<
  DriverTicketCount[]
> => {
  const response = await fetch("/api/mandaty/kierowcy");
  return response.json();
};
