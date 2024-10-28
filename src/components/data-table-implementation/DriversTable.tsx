"use client";

import { useGetDrivers } from "@/hooks/useGetDrivers";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useColumnFilter } from "../../hooks/useColumnFilter";
import { usePagination } from "../../hooks/usePagination";
import { useSorting } from "../../hooks/useSorting";
import {
  driverFilters as columnFilters,
  driverColumnsMap,
  getDriverColumns,
} from "../../lib/data-table/driver-columns";
import { DataTable } from "../data-table/DataTable";
import { useToast } from "../ui/use-toast";

const DriversTable = () => {
  const { data, isPending, isError } = useGetDrivers();

  const { sorting, setSorting } = useSorting([]);
  const { pagination, setPagination } = usePagination({
    pageIndex: 0,
    pageSize: 10,
  });
  const { filters, setFilters } = useColumnFilter([]);
  const { toast } = useToast();

  const router = useRouter();
  const handleEdit = (id: string) => {
    router.push(`/kierowcy/edytuj/${id}`);
  };

  const table = useReactTable({
    data: !isError ? data ?? [] : [],
    columns: getDriverColumns(handleEdit),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setFilters,
    state: {
      sorting,
      pagination,
      columnFilters: filters,
    },
  });

  useEffect(() => {
    if (isError) {
      toast({
        variant: "destructive",
        title: "Błąd | Nie można wczytać danych",
        description: "Wystąpił problem przy ładowaniu danych. Spróbuj ponownie",
      });
    }
  }, [isError]);

  return (
    <DataTable
      viewDataMap={driverColumnsMap}
      columnFilters={columnFilters}
      table={table}
      isDataLoading={isPending}
    />
  );
};

export default DriversTable;
