"use client";

// import { ticketFilters as columnFilters, ticketColumns as columns } from "@/lib/data-table-columns/ticket-columns";
import { columns, columnFilters } from "../../lib/data-table-columns/test-columns";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { DataTable } from "../data-table/DataTable";
import { MOCK_PAYMENTS } from "@/lib/data-table-columns/mock-payments";

//Client side table does not work
const TicketsTable = () => {
  const table = useReactTable({
    data: MOCK_PAYMENTS,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <DataTable columnFilters={columnFilters} table={table} isDataLoading={false} />;
};

export default TicketsTable;
