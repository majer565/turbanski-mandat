"use client";

import { useQuery } from "@tanstack/react-query";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { DataTable, TableProps } from "../../components/data-table/DataTable";
import { usePagination } from "../../hooks/usePagination";
import { useSorting } from "../../hooks/useSorting";
import { queryFilterAdapter } from "../utils";
import { columnFilters, columns, getPayments } from "./test-columns";
import { useColumnFilter } from "../../hooks/useColumnFilter";

const PaymentsTable = (props: TableProps) => {
  const queryFilters = queryFilterAdapter(columnFilters, props.filter);

  const { data, isPending, error } = useQuery({
    queryKey: [
      "payments",
      props.page,
      props.pageSize,
      props.sort,
      props.filter,
    ],
    queryFn: () =>
      getPayments(props.page, props.pageSize, props.sort, queryFilters),
  });

  const { pagination, setPagination } = usePagination({
    pageIndex: props.page - 1,
    pageSize: props.pageSize,
  });

  const { sorting, setSorting } = useSorting(props.sort);

  const { filters, setFilters } = useColumnFilter(props.filter);

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setFilters,
    rowCount: 100,
    state: {
      pagination,
      sorting,
      columnFilters: filters,
    },
  });

  return (
    <DataTable
      columnFilters={columnFilters}
      queryFilters={queryFilters}
      table={table}
      isDataLoading={isPending}
    />
  );
};

export default PaymentsTable;
