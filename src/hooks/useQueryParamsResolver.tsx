import { ColumnSort } from "@tanstack/react-table";
import { QueryParams } from "../components/data-table/DataTable";

const isValidNumber = (value: string | undefined, base: number) => {
  if (!value) return base;
  const check = value ? parseInt(value) : base;
  if (isNaN(check)) return base;

  return check < base ? base : check;
};

const getSortOption = (sortQuery: string) => {
  const [id, order] = sortQuery.split(".");
  return [{ id, desc: order === "desc" }];
};

export const useQueryParamsResolver = (queryParams?: QueryParams) => {
  const p = isValidNumber(queryParams?.p, 1);
  const ps = parseInt(queryParams?.ps || "10") || 10;
  const sort: ColumnSort[] = queryParams?.sort
    ? getSortOption(queryParams.sort)
    : [];

  return { p, ps, sort };
};
