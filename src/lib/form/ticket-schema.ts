"use client";

import { z } from "zod";

export const ticketSchema = z.object({
  number: z.string().min(1).max(50),
  date: z.string().min(2).max(100),
  time: z.string().min(2).max(50),
  vehiclePlateNumber: z.string().min(2).max(50),
  amount: z.string().min(2).max(50),
  currency: z.string().min(2).max(50),
  postPayoutDate: z.string().min(2).max(50),
  file: z.string().min(2).max(50),
  driverId: z.string().min(2).max(50),
});
