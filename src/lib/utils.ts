import { ColumnFiltersState } from "@tanstack/react-table";
import { type ClassValue, clsx } from "clsx";
import { format, parse } from "date-fns";
import { pl } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function resolveFilterValue(value: string[]): string {
  return value.join(".");
}

export function filterToQuery(columnState: ColumnFiltersState): {
  id: string;
  param: string;
}[] {
  let filters: { id: string; param: string }[] = [];
  columnState.forEach((filter) => {
    filters.push({
      id: filter.id,
      param: resolveFilterValue(filter.value as string[]),
    });
  });

  return filters;
}

export const resolveDateFromString = (
  value: string[]
): DateRange | undefined => {
  if (value.length !== 2) return undefined;
  const from = new Date(value[0]);
  const to = new Date(value[1]);

  return { from, to };
};

export const formatDateValueToString = (dateToChange: string) => {
  return format(new Date(dateToChange), "LLL dd, y", { locale: pl });
};
