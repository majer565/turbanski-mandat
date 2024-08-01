"use client";

import { ColumnFiltersState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { filterToQuery } from "../lib/utils";
import useSearchParamsUpdate from "./useSearchParamsUpdate";

export const useColumnFilter = (state: ColumnFiltersState) => {
  const [filters, setFilters] = useState<ColumnFiltersState>(state);
  const { updateFilterSearchParams } = useSearchParamsUpdate();

  useEffect(() => {
    const filtersQuery = filterToQuery(filters);
    updateFilterSearchParams(filtersQuery);
  }, [filters]);

  return {
    filters,
    setFilters,
  };
};
