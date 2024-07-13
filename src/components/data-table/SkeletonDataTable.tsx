"use client";

import { flexRender } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PAGINATION_SETUP } from "../../lib/data-table-columns/test-columns";
import { Skeleton } from "../ui/skeleton";
import {
  DataTableHeaderWrapper,
  DataTableWrapper,
} from "../wrappers/DataTableWrappers";
import DataTableFilters from "./data-table-filters/DataTableFilters";
import { DataTableProps } from "./DataTable";
import { DataTablePagination } from "./DataTablePagination";
import { DataTableViewOptions } from "./DataTableViewOptions";

export default function SkeletonDataTable<TData>({
  table,
  columnFilters,
}: DataTableProps<TData>) {
  const getSkeleton = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
      <TableRow key={n} className="border-border">
        {table.getVisibleFlatColumns().map((column) => (
          <TableCell key={column.id}>
            <Skeleton className="w-full h-4" />
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <DataTableWrapper>
      <DataTableHeaderWrapper>
        <DataTableFilters columnFilters={columnFilters} queryFilters={[]} />
        <DataTableViewOptions table={table} />
      </DataTableHeaderWrapper>
      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="border-border" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>{getSkeleton()}</TableBody>
        </Table>
      </div>
      <DataTablePagination config={PAGINATION_SETUP} table={table} />
    </DataTableWrapper>
  );
}
