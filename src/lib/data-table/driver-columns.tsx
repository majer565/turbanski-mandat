import { ColumnFilterDefinition } from "@/components/data-table/data-table-filters/DataTableFilterButton";
import { FilterType } from "@/components/data-table/data-table-filters/DataTableFilters";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Driver } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowDownNarrowWide,
  ArrowDownWideNarrow,
  MoreHorizontal,
  Pencil,
} from "lucide-react";
import { textFilterFn } from "./data-table-filter-fns";

const renderSortIcon = (sortOption: string | false) => {
  if (!sortOption) return;

  return sortOption === "asc" ? (
    <ArrowDownNarrowWide className="ml-2 h-4 w-4" />
  ) : (
    <ArrowDownWideNarrow className="ml-2 h-4 w-4" />
  );
};

export const getDriverColumns = (
  handleEdit: (id: string) => void
): ColumnDef<Driver>[] => {
  return [
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const driver = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel color="primary">Akcje</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleEdit(String(driver.id))}>
                <Pencil className="h-4 w-4 mr-2 text-primary" />
                <span>Edytuj</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      size: 20,
    },
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

export const driverColumnsMap = new Map<string, string>([
  ["name", "Imię"],
  ["surname", "Nazwisko"],
]);
