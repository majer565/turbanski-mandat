"use client";

import { Driver } from "@prisma/client";

export const getDriverById = async (id: string): Promise<Driver> => {
  const response = await fetch(`/api/kierowcy/${id}`);
  const data = await response.json();
  return data;
};
