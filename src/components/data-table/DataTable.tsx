"use client";

import { ColumnSort, flexRender, Table as TanstackTable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PAGINATION_SETUP } from "../../lib/data-table-columns/test-columns";
import { DataTableHeaderWrapper, DataTableWrapper } from "../wrappers/DataTableWrappers";
import DataTableFilters, { DataTableFilterOption } from "./data-table-filters/DataTableFilters";
import { DataTablePagination } from "./DataTablePagination";
import { DataTableViewOptions } from "./DataTableViewOptions";
import { Skeleton } from "../ui/skeleton";

export interface QueryParams {
  p?: string;
  ps?: string;
  sort?: string;
  [key: string]: string | undefined;
}

export type SimpleFilter = { id: string; value: string[] };

export interface TableProps {
  page: number;
  pageSize: number;
  sort: ColumnSort[];
  filter: SimpleFilter[];
}

export interface DataTableProps<TData> {
  table: TanstackTable<TData>;
  columnFilters: DataTableFilterOption[];
  queryFilters: DataTableFilterOption[];
  isDataLoading: boolean;
}

export function DataTable<TData>({ table, columnFilters, queryFilters, isDataLoading }: DataTableProps<TData>) {
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

  const getTableBody = (isLoading: boolean) => {
    return isLoading ? (
      getSkeleton()
    ) : table.getRowModel().rows?.length ? (
      table.getRowModel().rows.map((row) => (
        <TableRow className="border-border" key={row.id} data-state={row.getIsSelected() && "selected"}>
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
          ))}
        </TableRow>
      ))
    ) : (
      <TableRow className="border-border">
        <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
          Brak wyników.
        </TableCell>
      </TableRow>
    );
  };

  return (
    <DataTableWrapper>
      <DataTableHeaderWrapper>
        <DataTableFilters columnFilters={columnFilters} queryFilters={queryFilters} />
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
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>{getTableBody(isDataLoading)}</TableBody>
        </Table>
      </div>
      <DataTablePagination config={PAGINATION_SETUP} table={table} />
    </DataTableWrapper>
  );
}
