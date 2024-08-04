"use client";

import { getTickets } from "@/actions/getTickets";
import { useQuery } from "@tanstack/react-query";

export const useGetTickets = () => {
  return useQuery({ queryKey: ["tickets"], queryFn: getTickets });
};
