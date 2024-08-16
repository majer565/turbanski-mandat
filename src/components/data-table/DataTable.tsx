"use client";

import { ColumnFiltersState, ColumnSort, flexRender, Table as TanstackTable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "../ui/skeleton";
import { DataTableHeaderWrapper, DataTableWrapper } from "../wrappers/DataTableWrappers";
import { ColumnFilterDefinition } from "./data-table-filters/DataTableFilterButton";
import DataTableFilters from "./data-table-filters/DataTableFilters";
import { DataTablePagination } from "./DataTablePagination";
import { DataTableViewOptions } from "./DataTableViewOptions";
import DataTableNewRow from "./data-table-new-row";
import FlexRow from "../wrappers/FlexRowWrapper";
import { PAGINATION_SETUP } from "@/lib/data-table/data-table-config";
import { DataTableExportButton } from "./data-table-export-button";

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
  filter: ColumnFiltersState;
}

export interface DataTableProps<TData> {
  table: TanstackTable<TData>;
  columnFilters: ColumnFilterDefinition[];
  isDataLoading: boolean;
  viewDataMap: Map<string, string>;
}

export function DataTable<TData>({ table, columnFilters, isDataLoading, viewDataMap }: DataTableProps<TData>) {
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
        <DataTableFilters columnFilters={columnFilters} table={table} />
        <FlexRow className="gap-3">
          <DataTableNewRow />
          <DataTableExportButton dataMap={viewDataMap} table={table} />
          <DataTableViewOptions dataMap={viewDataMap} table={table} />
        </FlexRow>
      </DataTableHeaderWrapper>
      <div className="rounded-md border border-border">
        <Table className="">
          <TableHeader className="sticky top-0 bg-muted/40">
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
          <TableBody className="max-h-[30rem] overflow-y-auto">{getTableBody(isDataLoading)}</TableBody>
        </Table>
      </div>
      <DataTablePagination config={PAGINATION_SETUP} table={table} />
    </DataTableWrapper>
  );
}
