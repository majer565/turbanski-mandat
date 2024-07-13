"use client";

import { PaginationState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import useSearchParamsUpdate from "./useSearchParamsUpdate";

export const usePagination = (state: PaginationState) => {
  const [pagination, setPagination] = useState<PaginationState>(state);
  const { updateSearchParams } = useSearchParamsUpdate();

  useEffect(() => {
    updateSearchParams([
      { id: "p", param: String(pagination.pageIndex + 1) },
      { id: "ps", param: String(pagination.pageSize) },
    ]);
  }, [pagination]);

  return {
    pagination,
    setPagination,
  };
};
