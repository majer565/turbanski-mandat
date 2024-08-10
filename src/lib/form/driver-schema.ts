"use client";

import { z } from "zod";

export const driverSchema = z.object({
  name: z
    .string({ required_error: "To pole jest wymagane" })
    .min(1, { message: "To pole jest wymagane" })
    .regex(/^[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]+$/, { message: "Pole może zawierać tylko litery" }),
  surname: z
    .string({ required_error: "To pole jest wymagane" })
    .min(1, { message: "To pole jest wymagane" })
    .regex(/^[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]+$/, { message: "Pole może zawierać tylko litery" }),
});
