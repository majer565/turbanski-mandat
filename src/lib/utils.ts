import { ColumnFiltersState } from "@tanstack/react-table";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  ColumFilterDefinition,
  DataTableFilterPropsV2,
} from "../components/data-table/data-table-filters/DataTableFilterButtonV2";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Join column filters with query filters from URL
 * @param columnFilters all available filters from the table
 * @param queryFilters filters from the URL
 * @returns filters from URL joined with column filters
 */
export function queryFilterAdapter(columnFilters: ColumFilterDefinition[], queryFilters: ColumnFiltersState) {
  const columnFilterMap: { [key: string]: ColumFilterDefinition } = {};
  columnFilters.forEach((filter) => {
    columnFilterMap[filter.id] = filter;
  });

  let result: DataTableFilterPropsV2[] = [];

  queryFilters.forEach((columnFilter) => {
    const correspondingFilter = columnFilterMap[columnFilter.id];
    if (correspondingFilter) {
      result.push({
        ...correspondingFilter,
        filter: columnFilter,
      });
    }
  });

  return result;
}

function resolveFilterValue(value: string): string {
  if (value.match(/^(\w+,\s)+\w+$/)) {
    return value.replaceAll(", ", ".");
  }

  return value;
}

export function filterToQuery(columnState: ColumnFiltersState): {
  id: string;
  param: string;
}[] {
  let filters: { id: string; param: string }[] = [];
  columnState.forEach((filter) => {
    filters.push({
      id: filter.id,
      param: resolveFilterValue(filter.value as string),
    });
  });

  return filters;
}
