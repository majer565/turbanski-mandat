"use client";

import { useQuery } from "@tanstack/react-query";
import { getDriverById } from "../actions/getDriverById";

export const useGetDriver = (id: string) => {
  return useQuery({ queryKey: ["driver"], queryFn: () => getDriverById(id) });
};
