"use client";

import { useQuery } from "@tanstack/react-query";
import { checkIfTicketExists } from "../actions/checkIfTicketExists";

export const useCheckTicketIfExists = (
  tnumber: string,
  date: string,
  time: string
) => {
  const isEnabled: boolean = !tnumber || !date || !time;

  return useQuery({
    queryKey: ["checkTicket", tnumber, date, time],
    queryFn: () => checkIfTicketExists({ number: tnumber, date, time }),
    enabled: !isEnabled,
  });
};
