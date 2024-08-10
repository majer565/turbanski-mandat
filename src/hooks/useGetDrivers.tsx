"use client";

import { getDrivers } from "@/actions/getDrivers";
import { getTickets } from "@/actions/getTickets";
import { useQuery } from "@tanstack/react-query";

export const useGetDrivers = () => {
  return useQuery({ queryKey: ["drivers"], queryFn: getDrivers });
};
