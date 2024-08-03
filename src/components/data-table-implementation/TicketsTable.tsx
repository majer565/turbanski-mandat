"use client";

// import { ticketFilters as columnFilters, ticketColumns as columns } from "@/lib/data-table-columns/ticket-columns";
import {
  columns,
  columnFilters,
} from "../../lib/data-table-columns/test-columns";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DataTable } from "../data-table/DataTable";
import { MOCK_PAYMENTS } from "@/lib/data-table-columns/mock-payments";
import { useSorting } from "../../hooks/useSorting";
import { usePagination } from "../../hooks/usePagination";
import { useColumnFilter } from "../../hooks/useColumnFilter";

//Client side table does not work
const TicketsTable = () => {
  const { sorting, setSorting } = useSorting([]);
  const { pagination, setPagination } = usePagination({
    pageIndex: 0,
    pageSize: 10,
  });
  const { filters, setFilters } = useColumnFilter([]);

  const table = useReactTable({
    data: MOCK_PAYMENTS,
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

  return (
    <DataTable
      columnFilters={columnFilters}
      table={table}
      isDataLoading={false}
    />
  );
};

export default TicketsTable;
