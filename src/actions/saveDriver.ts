"use client";

import { DriverWithoutId } from "@/lib/types/driver";

export const saveDriver = async (ticket: DriverWithoutId) => {
  try {
    const response = await fetch("/api/kierowcy", {
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
