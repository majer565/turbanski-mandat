"use client";

import { z } from "zod";

export const ticketSchema = z
  .object({
    number: z.string({ required_error: "To pole jest wymagane" }).min(1, { message: "To pole jest wymagane" }),
    date: z.string({ required_error: "To pole jest wymagane" }).min(2, { message: "To pole jest wymagane" }),
    time: z.string({ required_error: "To pole jest wymagane" }).min(2, { message: "To pole jest wymagane" }),
    vehiclePlate: z.string({ required_error: "To pole jest wymagane" }).min(2, { message: "To pole jest wymagane" }),
    amount: z.string({ required_error: "To pole jest wymagane" }).min(1, { message: "To pole jest wymagane" }),
    currency: z.string({ required_error: "To pole jest wymagane" }).min(2, { message: "To pole jest wymagane" }),
    postPayoutDate: z.string({ required_error: "To pole jest wymagane" }).min(2, { message: "To pole jest wymagane" }),
    file: z.string({ required_error: "To pole jest wymagane" }).min(2, { message: "To pole jest wymagane" }),
    driverId: z.string({ required_error: "To pole jest wymagane" }).min(0, { message: "To pole jest wymagane" }),
  })
  .refine(
    (val) => {
      const dateFirst = new Date(val.date);
      const dateSecond = new Date(val.postPayoutDate);

      return dateFirst < dateSecond;
    },
    {
      message: "Data płatności poczty musi nastąpić nie wcześniej, niż data mandatu",
      path: ["postPayoutDate"],
    }
  );
