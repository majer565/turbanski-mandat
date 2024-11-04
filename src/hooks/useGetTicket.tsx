"use client";

import { useQuery } from "@tanstack/react-query";
import { getTicketByName } from "../actions/getTicketByName";

export const useGetTicketByNumber = (number: string) => {
  return useQuery({
    queryKey: ["ticket"],
    queryFn: () => getTicketByName(number),
  });
};
