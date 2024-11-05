"use client";

import { useQuery } from "@tanstack/react-query";
import { getTicketsByPayment } from "../actions/getTicketsByPayment";

export const useGetUnpaidTickets = () => {
  return useQuery({
    queryKey: ["unpaid_ticket"],
    queryFn: () => getTicketsByPayment(),
  });
};
