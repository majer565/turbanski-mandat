import { Row } from "@tanstack/react-table";
import { resolveDateFromString } from "../utils";

export function textFilterFn<TData>(row: Row<TData>, id: string, filterValue: any) {
  const rowValue = row.getValue(id) as string[];
  const input = filterValue as string[];
  if (rowValue.length > 0 && input[0]) {
    return filterValue.some((value: string) => rowValue.includes(value));
  }

  return undefined;
}

export function rangeFilterFn<TData>(row: Row<TData>, id: string, filterValue: any): any {
  const rowValue = row.getValue(id) as number;
  const input = filterValue as string[];
  if (input.length === 2) {
    const min = Number(input[0]) || 0;
    const max = Number(input[1]) || 0;

    return rowValue >= min && rowValue <= max;
  }

  return undefined;
}

export function selectFilterFn<TData>(row: Row<TData>, id: string, filterValue: any): any {
  const rowValue = row.getValue(id) as string;
  const input = filterValue as string[];

  if (input.length > 0) return input.some((value) => rowValue === value);
  return undefined;
}

export function dateFilterFn<TData>(row: Row<TData>, id: string, filterValue: any): any {
  const rowValue = row.getValue(id) as string;
  const input = filterValue as string[];

  if (input.length === 2) {
    const dateRange = resolveDateFromString(input);
    const value = new Date(rowValue);

    if (!dateRange) return undefined;
    return value >= dateRange.from! && value <= dateRange.to!;
  }

  return undefined;
}
