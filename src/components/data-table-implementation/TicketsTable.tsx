"use client";

import { MOCK_TICKETS } from "@/lib/data-table/mockTickets";
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
  const { sorting, setSorting } = useSorting([]);
  const { pagination, setPagination } = usePagination({
    pageIndex: 0,
    pageSize: 10,
  });
  const { filters, setFilters } = useColumnFilter([]);

  const table = useReactTable({
    data: MOCK_TICKETS,
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

  return <DataTable columnFilters={columnFilters} table={table} isDataLoading={false} />;
};

export default TicketsTable;
