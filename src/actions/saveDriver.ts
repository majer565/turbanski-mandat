"use client";

import { DriverWithoutId } from "@/lib/types/driver";

export const saveDriver = async (driver: DriverWithoutId) => {
  try {
    const response = await fetch("/api/kierowcy", {
      method: "POST",
      body: JSON.stringify(driver),
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
