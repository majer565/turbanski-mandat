import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SimpleFilter } from "../components/data-table/DataTable";
import { DataTableFilterOption } from "../components/data-table/data-table-filters/DataTableFilters";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Join column filters with query filters from URL
 * @param columnFilters all available filters from the table
 * @param queryFilters filters from the URL
 * @returns filters from URL joined with column filters
 */
export function queryFilterAdapter(
  columnFilters: DataTableFilterOption[],
  queryFilters: SimpleFilter[]
) {
  const columnFilterMap: { [key: string]: DataTableFilterOption } = {};
  columnFilters.forEach((filter) => {
    columnFilterMap[filter.id] = filter;
  });

  let result: DataTableFilterOption[] = [];

  queryFilters.forEach((simpleFilter) => {
    const correspondingFilter = columnFilterMap[simpleFilter.id];
    if (correspondingFilter) {
      result.push({
        ...correspondingFilter,
        value: simpleFilter.value,
      });
    }
  });

  return result;
}
