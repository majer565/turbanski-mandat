import { QueryParams } from "../components/data-table/DataTable";

const isValidNumber = (value: string | undefined, base: number) => {
  if (!value) return base;
  const check = value ? parseInt(value) : base;
  if (isNaN(check)) return base;

  return check < base ? base : check;
};

export const useQueryParamsResolver = (queryParams?: QueryParams) => {
  const p = isValidNumber(queryParams?.p, 1);
  const ps = parseInt(queryParams?.ps || "10") || 10;

  return { p, ps };
};
