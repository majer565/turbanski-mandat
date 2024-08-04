"use client";

import { useGetTickets } from "@/hooks/useGetTickets";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useColumnFilter } from "../../hooks/useColumnFilter";
import { usePagination } from "../../hooks/usePagination";
import { useSorting } from "../../hooks/useSorting";
import { ticketFilters as columnFilters, ticketColumns as columns } from "../../lib/data-table/ticket-columns";
import { DataTable } from "../data-table/DataTable";

const TicketsTable = () => {
  const { data, isPending, isError } = useGetTickets();

  const { sorting, setSorting } = useSorting([]);
  const { pagination, setPagination } = usePagination({
    pageIndex: 0,
    pageSize: 10,
  });
  const { filters, setFilters } = useColumnFilter([]);

  const table = useReactTable({
    data: data ?? [],
    columns,
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

  if (isError) return <div>Error</div>;

  return <DataTable columnFilters={columnFilters} table={table} isDataLoading={isPending} />;
};

export default TicketsTable;
