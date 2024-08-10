"use client";

import { z } from "zod";

export const driverSchema = z.object({
  name: z.string({ required_error: "To pole jest wymagane" }).min(1, { message: "To pole jest wymagane" }),
  surname: z.string({ required_error: "To pole jest wymagane" }).min(1, { message: "To pole jest wymagane" }),
});
