"use client";

import { Driver } from "@prisma/client";

export const getDrivers = async (): Promise<Driver[]> => {
  const response = await fetch("/api/kierowcy");
  return response.json();
};
