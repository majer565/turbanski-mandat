"use client";

import { ColumnDef, SortingState } from "@tanstack/react-table";
import {
  ArrowDownNarrowWide,
  ArrowDownWideNarrow,
  CircleCheck,
  CircleDashed,
  CircleX,
  LoaderCircle,
} from "lucide-react";
import { DataTableFilterOption, FilterType } from "../../components/data-table/data-table-filters/DataTableFilters";
import { PaginationConfig } from "../../components/data-table/DataTablePagination";
import { Button } from "../../components/ui/button";
import { MOCK_PAYMENTS } from "./mock-payments";
import { COLUMN_LABELS, COLUMN_OPTIONS } from "./test-column-labels";
import { ColumFilterDefinition, DataTableFilterPropsV2 } from "../../components/data-table/data-table-filters/DataTableFilterButtonV2";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: number;
  amount: number;
  status: "Pending" | "Processing" | "Success" | "Failed";
  email: string;
};

export const columnFilters: ColumFilterDefinition[] = [
  {
    label: "Status",
    type: FilterType.SELECT,
    options: {
      selectOptions: [
        {
          value: "Pending",
          icon: <CircleDashed className="w-4 h-4" />,
        },
        {
          value: "Processing",
          icon: <LoaderCircle className="w-4 h-4" />,
        },
        {
          value: "Success",
          icon: <CircleCheck className="w-4 h-4" />,
        },
        {
          value: "Failed",
          icon: <CircleX className="w-4 h-4" />,
        },
      ],
    }
  },
  {
    label: "Email",
    type: FilterType.TEXT,
  },
  {
    label: "Amount",
    type: FilterType.RANGE,
  },
];

const renderSortIcon = (sortOption: string | false) => {
  if (!sortOption) return;

  return sortOption === "asc" ? (
    <ArrowDownNarrowWide className="ml-2 h-4 w-4" />
  ) : (
    <ArrowDownWideNarrow className="ml-2 h-4 w-4" />
  );
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Status
          {renderSortIcon(column.getIsSorted())}
        </Button>
      );
    },
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
  pageSize: number,
  sort: SortingState,
  filter: DataTableFilterPropsV2[]
): Promise<Payment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let arr: Payment[];
      sort[0]
        ? (arr = [...MOCK_PAYMENTS].sort((a, b) =>
            sort[0].desc
              ? a.status.localeCompare(b.status)
              : b.status.localeCompare(a.status)
          ))
        : (arr = MOCK_PAYMENTS);
      arr = arr.filter((payment) => {
        return filter.every((f) => {
          if (f.filter?.value) {
            if (f.filter.id === "Status") {
              return (f.filter.value as string).includes(payment.status);
            }
            if (f.filter.id === "Email") {
              return payment.email.includes(f.filter.value as string);
            }
            if (f.filter.id === "Amount") {
              const [min, max] = (f.filter.value as string).split("-");
              const minNum = parseInt(min) || 0;
              const maxNum = parseInt(max) || 0;

              return payment.amount >= minNum && payment.amount <= maxNum;
            }
            return true;
          }
        });
      });
      resolve(arr.slice((page - 1) * pageSize, page * pageSize));
    }, 500);
  });
};
