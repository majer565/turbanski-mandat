import { ColumnFilterDefinition } from "@/components/data-table/data-table-filters/DataTableFilterButton";
import { FilterType } from "@/components/data-table/data-table-filters/DataTableFilters";
import { Button } from "@/components/ui/button";
import { Driver } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDownNarrowWide, ArrowDownWideNarrow } from "lucide-react";
import { textFilterFn } from "./data-table-filter-fns";

const renderSortIcon = (sortOption: string | false) => {
  if (!sortOption) return;

  return sortOption === "asc" ? (
    <ArrowDownNarrowWide className="ml-2 h-4 w-4" />
  ) : (
    <ArrowDownWideNarrow className="ml-2 h-4 w-4" />
  );
};

export const driverColumns: ColumnDef<Driver>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Imię
          {renderSortIcon(column.getIsSorted())}
        </Button>
      );
    },
    filterFn: textFilterFn,
  },
  {
    accessorKey: "surname",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Nazwisko
          {renderSortIcon(column.getIsSorted())}
        </Button>
      );
    },
    filterFn: textFilterFn,
  },
];

export const driverFilters: ColumnFilterDefinition[] = [
  {
    id: "name",
    label: "Imię",
    type: FilterType.TEXT,
  },
  {
    id: "surname",
    label: "Nazwisko",
    type: FilterType.TEXT,
  },
];
