"use client";

import { useGetTickets } from "@/hooks/useGetTickets";
import { Ticket } from "@prisma/client";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useEffect, useReducer } from "react";
import { useColumnFilter } from "../../hooks/useColumnFilter";
import { usePagination } from "../../hooks/usePagination";
import { useSorting } from "../../hooks/useSorting";
import {
  ticketFilters as columnFilters,
  getTicketColumns,
  ticketColumnsMap,
} from "../../lib/data-table/ticket-columns";
import { DataTable } from "../data-table/DataTable";
import TicketFileSheet from "../form/TicketFileSheet";
import TicketPaymentSheet from "../form/TicketPaymentSheet";
import { useToast } from "../ui/use-toast";

enum ActionType {
  FILE_EDIT = "FILE_EDIT",
  PAYMENT_EDIT = "PAYMENT_EDIT",
  NULL = "NULL",
}

enum EditType {
  FILE = "FILE",
  PAYMENT = "PAYMENT",
}

interface TicketAction {
  type: ActionType;
  payload?: Ticket;
}

interface TicketState {
  ticket: Ticket | undefined;
  editType: EditType | undefined;
}

function reducer(state: TicketState, action: TicketAction) {
  const { type } = action;
  switch (type) {
    case ActionType.FILE_EDIT:
      return {
        ticket: action.payload || undefined,
        editType: EditType.FILE,
      };
    case ActionType.PAYMENT_EDIT:
      return {
        ticket: action.payload || undefined,
        editType: EditType.PAYMENT,
      };
    default:
      return {
        ticket: undefined,
        editType: undefined,
      };
  }
}

const initalState: TicketState = {
  ticket: undefined,
  editType: undefined,
};

const TicketsTable = () => {
  const { data, isPending, isError } = useGetTickets();
  const [state, dispatch] = useReducer<
    React.Reducer<TicketState, TicketAction>
  >(reducer, initalState);

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

  const handleFileEdit = (ticket: Ticket) => {
    dispatch({ type: ActionType.FILE_EDIT, payload: ticket });
  };

  const handlePaymentEdit = (ticket: Ticket) => {
    dispatch({ type: ActionType.PAYMENT_EDIT, payload: ticket });
  };

  const handleOpenChange = () => {
    dispatch({ type: ActionType.NULL });
  };

  const table = useReactTable({
    data: !isError ? data ?? [] : [],
    columns: getTicketColumns(handleEdit, handleFileEdit, handlePaymentEdit),
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
      <TicketFileSheet
        handleOpenChange={handleOpenChange}
        ticket={state?.editType === EditType.FILE ? state.ticket : undefined}
      />
      <TicketPaymentSheet
        handleOpenChange={handleOpenChange}
        ticket={state?.editType === EditType.PAYMENT ? state.ticket : undefined}
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
