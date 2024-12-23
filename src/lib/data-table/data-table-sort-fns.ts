import { Row } from "@tanstack/react-table";

export function dateSortFn<TData>(rowA: Row<TData>, rowB: Row<TData>, columnId: string): number {
  const dateA = new Date(rowA.getValue<string>(columnId));
  const dateB = new Date(rowB.getValue<string>(columnId));

  if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) {
    return 0;
  }

  if (isNaN(dateA.getTime())) {
    return 1;
  }

  if (isNaN(dateB.getTime())) {
    return -1;
  }

  return dateA.getTime() - dateB.getTime();
}

export function driverTextSortFn<TData>(rowA: Row<TData>, rowB: Row<TData>, columnId: string): number {
  const driverA = rowA.getValue<string>(columnId).split(" ")[1];
  const driverB = rowB.getValue<string>(columnId).split(" ")[1];

  return driverA.localeCompare(driverB);
}