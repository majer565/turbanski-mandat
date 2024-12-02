"use client";

import { useGetDrivers } from "@/hooks/useGetDrivers";
import { Driver } from "@prisma/client";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useColumnFilter } from "../../hooks/useColumnFilter";
import { usePagination } from "../../hooks/usePagination";
import { useSorting } from "../../hooks/useSorting";
import {
  driverFilters as columnFilters,
  driverColumnsMap,
  getDriverColumns,
} from "../../lib/data-table/driver-columns";
import { DataTable } from "../data-table/DataTable";
import DriverEditSheet from "../form/DriverEditSheet";
import { useToast } from "../ui/use-toast";

const DriversTable = () => {
  const { data, isPending, isError } = useGetDrivers();
  const [selectedDriver, setSelectedDriver] = useState<Driver | undefined>();

  const { sorting, setSorting } = useSorting([]);
  const { pagination, setPagination } = usePagination({
    pageIndex: 0,
    pageSize: 10,
  });
  const { filters, setFilters } = useColumnFilter([]);
  const { toast } = useToast();

  const handleEditDriver = (driver: Driver) => {
    setSelectedDriver(driver);
  };

  const table = useReactTable({
    data: !isError ? data ?? [] : [],
    columns: getDriverColumns(handleEditDriver),
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
        description:
          "Wystąpił problem przy ładowaniu danych. Spróbuj ponownie. Jeśli problem będzie się powtarzał, skontaktuj się z administratorem.",
      });
    }
  }, [isError]);

  return (
    <>
      <DriverEditSheet
        handleOpenChange={() => setSelectedDriver(undefined)}
        driver={selectedDriver}
      />
      <DataTable
        viewDataMap={driverColumnsMap}
        columnFilters={columnFilters}
        table={table}
        isDataLoading={isPending}
      />
    </>
  );
};

export default DriversTable;
