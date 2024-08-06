import { ColumnDef } from "@tanstack/react-table";
import { Ticket } from "@prisma/client";
import { ArrowDownNarrowWide, ArrowDownWideNarrow, FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TicketWithDriver } from "../types/ticket";
import {
  ColumnFilterDefinition,
  DataTableFilterSelectOption,
} from "@/components/data-table/data-table-filters/DataTableFilterButton";
import { FilterType } from "@/components/data-table/data-table-filters/DataTableFilters";
import { dateFilterFn, rangeFilterFn, textFilterFn } from "./data-table-filter-fns";
import TicketFileDialog from "@/components/dialog/ticket-file-dialog";

const renderSortIcon = (sortOption: string | false) => {
  if (!sortOption) return;

  return sortOption === "asc" ? (
    <ArrowDownNarrowWide className="ml-2 h-4 w-4" />
  ) : (
    <ArrowDownWideNarrow className="ml-2 h-4 w-4" />
  );
};

export const ticketColumns: ColumnDef<TicketWithDriver>[] = [
  {
    accessorKey: "number",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Numer
          {renderSortIcon(column.getIsSorted())}
        </Button>
      );
    },
    filterFn: textFilterFn,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Data
          {renderSortIcon(column.getIsSorted())}
        </Button>
      );
    },
    filterFn: dateFilterFn,
  },
  {
    accessorKey: "time",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Godzina
          {renderSortIcon(column.getIsSorted())}
        </Button>
      );
    },
    filterFn: textFilterFn,
  },
  {
    accessorKey: "driver",
    accessorFn: (ticket) => {
      return `${ticket.driver.name} ${ticket.driver.surname}`;
    },
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Kierowca
          {renderSortIcon(column.getIsSorted())}
        </Button>
      );
    },
    filterFn: textFilterFn,
  },
  {
    accessorKey: "vehiclePlate",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Numer rejestracyjny
          {renderSortIcon(column.getIsSorted())}
        </Button>
      );
    },
    filterFn: textFilterFn,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Kwota
          {renderSortIcon(column.getIsSorted())}
        </Button>
      );
    },
    filterFn: rangeFilterFn,
  },
  {
    accessorKey: "currency",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Waluta
          {renderSortIcon(column.getIsSorted())}
        </Button>
      );
    },
    filterFn: textFilterFn,
  },
  {
    accessorKey: "postPayoutDate",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Data poczty
          {renderSortIcon(column.getIsSorted())}
        </Button>
      );
    },
    filterFn: dateFilterFn,
  },
  {
    accessorKey: "file",
    header: "Plik",
    cell: ({ row }) => <TicketFileDialog filePath={row.original.file} ticketNumber={row.original.number} />,
    enableSorting: false,
    enableColumnFilter: false,
  },
];

const CURRENCY_OPTIONS: DataTableFilterSelectOption[] = [
  { value: "EUR" },
  { value: "BGN" },
  { value: "CZK" },
  { value: "DKK" },
  { value: "HUF" },
  { value: "PLN" },
  { value: "RON" },
  { value: "SEK" },
];

export const ticketFilters: ColumnFilterDefinition[] = [
  {
    id: "number",
    label: "Numer mandatu",
    type: FilterType.TEXT,
  },
  {
    id: "date",
    label: "Data mandatu",
    type: FilterType.DATE,
  },
  {
    id: "driver",
    label: "Kierowca",
    type: FilterType.TEXT,
  },
  {
    id: "vehiclePlate",
    label: "Numer rejestracyjny",
    type: FilterType.TEXT,
  },
  {
    id: "amount",
    label: "Kwota",
    type: FilterType.RANGE,
  },
  {
    id: "currency",
    label: "Waluta",
    type: FilterType.SELECT,
    options: {
      selectOptions: CURRENCY_OPTIONS,
    },
  },
  {
    id: "postPayoutDate",
    label: "Data poczty",
    type: FilterType.DATE,
  },
];