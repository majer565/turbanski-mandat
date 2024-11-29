"use client";

import { useQuery } from "@tanstack/react-query";
import { getTicketById } from "../actions/getTicketById";

export const useGetTicketById = (id: string) => {
  return useQuery({
    queryKey: ["ticket", id],
    queryFn: () => getTicketById(id),
  });
};
