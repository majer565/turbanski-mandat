"use client";

import { ColumnFiltersState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import useSearchParamsUpdate from "./useSearchParamsUpdate";
import { filterToQuery } from "../lib/utils";

export const useColumnFilter = (state: ColumnFiltersState) => {
  const [filters, setFilters] = useState<ColumnFiltersState>(state);
  const { updateSearchParams } = useSearchParamsUpdate();
console.log("filters:: ", filters)
  useEffect(() => {
    const filtersQuery = filterToQuery(filters);
    updateSearchParams(filtersQuery);
  }, [filters]);

  return {
    filters,
    setFilters,
  };
};
