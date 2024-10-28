"use client";

import { Driver } from "@prisma/client";

export const updateDriver = async (driver: Driver) => {
  try {
    const response = await fetch("/api/kierowcy", {
      method: "PUT",
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
