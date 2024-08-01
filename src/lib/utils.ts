import { ColumnFiltersState } from "@tanstack/react-table";
import { type ClassValue, clsx } from "clsx";
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
