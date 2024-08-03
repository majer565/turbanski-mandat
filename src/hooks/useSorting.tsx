"use client";

import { SortingState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import useSearchParamsUpdate from "./useSearchParamsUpdate";

export const useSorting = (state: SortingState, serverSide?: boolean) => {
  const [sorting, setSorting] = useState<SortingState>(state);
  const { updateSearchParams } = useSearchParamsUpdate();

  useEffect(() => {
    if (serverSide) {
      const sort = sorting[0];
      if (sort)
        updateSearchParams([
          { id: "sort", param: `${sort.id}.${sort.desc ? "desc" : "asc"}` },
        ]);
      else updateSearchParams([{ id: "sort", param: "" }]);
    }
  }, [sorting]);

  return {
    sorting,
    setSorting,
  };
};
