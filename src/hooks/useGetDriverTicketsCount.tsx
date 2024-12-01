"use client";

import { useQuery } from "@tanstack/react-query";
import { getDriversTicketsCount } from "../actions/getDriversTicketsCount";

export const useGetDriverTicketsCount = () => {
  return useQuery({
    queryKey: ["driversCount"],
    queryFn: () => getDriversTicketsCount(),
  });
};
