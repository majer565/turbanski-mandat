"use client";

import { useGetTickets } from "@/hooks/useGetTickets";
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
  ticketFilters as columnFilters,
  getTicketColumns,
  ticketColumnsMap,
} from "../../lib/data-table/ticket-columns";
import { DataTable } from "../data-table/DataTable";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import TicketPaymentSheet from "../form/TicketPaymentSheet";
import { Ticket } from "@prisma/client";

const TicketsTable = () => {
  const { data, isPending, isError } = useGetTickets();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>();

  const { sorting, setSorting } = useSorting([]);
  const { pagination, setPagination } = usePagination({
    pageIndex: 0,
    pageSize: 10,
  });
  const { filters, setFilters } = useColumnFilter([]);
  const { toast } = useToast();

  const router = useRouter();
  const handleEdit = (id: string) => {
    router.push(`/mandaty/edytuj/${id}`);
  };
  const handleFileEdit = (id: string) => {
    router.push(`/mandaty/edytuj/${id}/plik`);
  };
  const handleEditPayment = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  const table = useReactTable({
    data: !isError ? data ?? [] : [],
    columns: getTicketColumns(handleEdit, handleFileEdit, handleEditPayment),
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
    <>
      <TicketPaymentSheet
        handleOpenChange={() => setSelectedTicket(undefined)}
        ticket={selectedTicket}
      />
      <DataTable
        viewDataMap={ticketColumnsMap}
        columnFilters={columnFilters}
        table={table}
        isDataLoading={isPending}
      />
    </>
  );
};

export default TicketsTable;
