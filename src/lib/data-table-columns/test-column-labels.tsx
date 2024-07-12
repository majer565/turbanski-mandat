import { CircleCheck, CircleDashed, CircleX, LoaderCircle } from "lucide-react";
import { Option } from "../../components/data-table/data-table-filters/DataTableFilters";

export const COLUMN_LABELS = new Map<string, string>([
  ["status", "Status"],
  ["amount", "Amount"],
  ["email", "Email"],
]);

export const COLUMN_OPTIONS = new Map<string, Option[]>([
  [
    "status",
    [
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
  ],
  ["amount", []],
  ["email", []],
]);
