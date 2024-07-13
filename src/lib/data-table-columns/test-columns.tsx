"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck, CircleDashed, CircleX, LoaderCircle } from "lucide-react";
import { DataTableFilterOption } from "../../components/data-table/data-table-filters/DataTableFilters";
import { PaginationConfig } from "../../components/data-table/DataTablePagination";
import { MOCK_PAYMENTS } from "./mock-payments";
import { COLUMN_LABELS, COLUMN_OPTIONS } from "./test-column-labels";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: number;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columnFilters: DataTableFilterOption[] = [
  {
    id: "status",
    label: "Status",
    options: [
      {
        value: "pending",
        label: "Pending",
        icon: <CircleDashed className="w-4 h-4" />,
      },
      {
        value: "processing",
        label: "Processing",
        icon: <LoaderCircle className="w-4 h-4" />,
      },
      {
        value: "success",
        label: "Success",
        icon: <CircleCheck className="w-4 h-4" />,
      },
      {
        value: "failed",
        label: "Failed",
        icon: <CircleX className="w-4 h-4" />,
      },
    ],
  },
  {
    id: "email",
    label: "Email",
    options: [],
  },
  {
    id: "amount",
    label: "Amount",
    options: [],
  },
];

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];

export const TEST_COLUMN: DataTableFilterOption[] = [
  {
    id: "status",
    label: COLUMN_LABELS.get("status") || "",
    options: COLUMN_OPTIONS.get("status") || [],
    value: ["pending", "success"],
  },
  {
    id: "amount",
    label: COLUMN_LABELS.get("amount") || "",
    options: COLUMN_OPTIONS.get("amount") || [],
    value: ["100"],
  },
];

export const PAGINATION_SETUP: PaginationConfig = {
  selectRows: false,
  rppOptions: [10, 20, 30, 40, 50],
};

export const getPayments = (
  page: number,
  pageSize: number
): Promise<Payment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_PAYMENTS.slice((page - 1) * pageSize, page * pageSize));
    }, 500);
  });
};
