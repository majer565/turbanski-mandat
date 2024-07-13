"use client";

import { useQuery } from "@tanstack/react-query";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { DataTable, TableProps } from "../../components/data-table/DataTable";
import SkeletonDataTable from "../../components/data-table/SkeletonDataTable";
import { usePagination } from "../../hooks/usePagination";
import { columnFilters, columns, getPayments } from "./test-columns";

const PaymentsTable = (props: TableProps) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["payments", props.page, props.pageSize],
    queryFn: () => getPayments(props.page, props.pageSize),
  });

  const { pagination, setPagination } = usePagination({
    pageIndex: props.page - 1,
    pageSize: props.pageSize,
  });

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualFiltering: true,
    manualPagination: true,
    onPaginationChange: setPagination,
    rowCount: 100,
    state: {
      pagination,
    },
  });

  if (isPending)
    return <SkeletonDataTable columnFilters={columnFilters} table={table} />;

  return <DataTable columnFilters={columnFilters} table={table} />;
};

export default PaymentsTable;
