"use client";

import { ReactNode, useState } from "react";
import DataTableFilterAddButton from "./DataTableFilterAddButton";
import DataTableFilterButton from "./DataTableFilterButton";
import { ColumnFilter, ColumnFiltersState, Table } from "@tanstack/react-table";
import DataTableFilterButtonV2, { ColumFilterDefinition, DataTableFilterPropsV2 } from "./DataTableFilterButtonV2";
import { columnFilterToFilterData } from "../../../lib/utils";

export enum FilterType {
  TEXT,
  SELECT,
  DATE,
  RANGE,
}

export interface Option {
  value: string;
  label: string;
  icon?: ReactNode;
}

export interface DataTableFilterOption {
  id: string;
  label: string;
  options: Option[];
  value?: string[];
}

interface DataTableFiltersProps<TData> {
  table: Table<TData>;
  columnFilters: DataTableFilterPropsV2[];
  queryFilters: DataTableFilterPropsV2[];
}
function DataTableFilters<TData>({
  table,
  columnFilters,
  queryFilters,
}: DataTableFiltersProps<TData>) {
  const [selectedFilters, setSelectedFilters] =
    useState<ColumnFiltersState>(table.getState().columnFilters);

  const removeSelectedFilter = (filter: DataTableFilterPropsV2) => {
    table.setColumnFilters((prev) => prev.filter((f) => f.id !== filter.label));
    // setSelectedFilters((prev) => {
    //   const filters = prev.filter((f) => f.label !== filter.label);
    //   return filters;
    // });
  };

  const getNotSelectedFilters = () => {
    return columnFilters.filter((f) => !selectedFilters.includes({ id: f.label, value: f.filter?.value }));
  };

  return (
    <div className="w-1/2 flex gap-2">
      {/* {filters.map((f) => ())} */}
      {selectedFilters.map((f) => (
        <DataTableFilterButtonV2
          key={String(f.id)}
          table={table}
          filterData={columnFilterToFilterData(f, columnFilters)}
          onRemoveFilter={removeSelectedFilter}
        />
      ))}
      {selectedFilters.length !== columnFilters.length && (
        <DataTableFilterAddButton
          options={getNotSelectedFilters()}
          table={table}
        />
      )}
    </div>
  );
}

export default DataTableFilters;
