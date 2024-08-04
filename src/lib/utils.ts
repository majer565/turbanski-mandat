import { ColumnFiltersState } from "@tanstack/react-table";
import { type ClassValue, clsx } from "clsx";
import { parse } from "date-fns";
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
  value: string[],
  format: string
): DateRange | undefined => {
  if (value.length !== 2) return undefined;
  const from = parse(value[0], format, new Date(), { locale: pl });
  const to = parse(value[1], format, new Date(), { locale: pl });

  return { from, to };
};
