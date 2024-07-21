import {
  ColumnFilter,
  ColumnFiltersState,
  ColumnSort,
} from "@tanstack/react-table";
import { QueryParams } from "../components/data-table/DataTable";

const isValidNumber = (value: string | undefined, base: number) => {
  if (!value) return base;
  const check = value ? parseInt(value) : base;
  if (isNaN(check)) return base;

  return check < base ? base : check;
};

const getSortOption = (sortQuery: string): ColumnSort[] => {
  const [id, order] = sortQuery.split(".");
  return [{ id, desc: order === "desc" }];
};

const getFilterOption = (filterOptions: {
  [key: string]: string | undefined;
}) => {
  let filters: ColumnFilter[] = [];

  Object.keys(filterOptions).forEach((key) => {
    filters.push({
      id: key,
      value: filterOptions[key]?.replaceAll(".", ", ") || [],
    });
  });

  return filters;
};

const resolveFiltersQuery = (
  queryParams?: QueryParams
): ColumnFiltersState | undefined => {
  if (!queryParams) return undefined;

  let filter: { [key: string]: string | undefined } = {};

  Object.keys(queryParams).forEach((key) => {
    if (key !== "p" && key !== "ps" && key !== "sort") {
      filter[key] = queryParams[key];
    }
  });

  return getFilterOption(filter);
};

export const useQueryParamsResolver = (queryParams?: QueryParams) => {
  const p = isValidNumber(queryParams?.p, 1);
  const ps = parseInt(queryParams?.ps || "10") || 10;
  const sort: ColumnSort[] = queryParams?.sort
    ? getSortOption(queryParams.sort)
    : [];
  const filter = resolveFiltersQuery(queryParams) || [];

  return { p, ps, sort, filter };
};
