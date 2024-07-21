"use client";

import { ReactNode, useState } from "react";
import DataTableFilterAddButton from "./DataTableFilterAddButton";
import DataTableFilterButton from "./DataTableFilterButton";
import { ColumnFiltersState, Table } from "@tanstack/react-table";
import DataTableFilterButtonV2, { ColumFilterDefinition, DataTableFilterPropsV2 } from "./DataTableFilterButtonV2";

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
    useState<DataTableFilterPropsV2[]>(queryFilters);

  const addSelectedFilter = (filter: DataTableFilterPropsV2) => {
    setSelectedFilters((prev) => [...prev, filter]);
  };

  const removeSelectedFilter = (filter: DataTableFilterPropsV2) => {
    setSelectedFilters((prev) => {
      const filters = prev.filter((f) => f.label !== filter.label);
      return filters;
    });
  };

  const isFilterSelected = (filter: DataTableFilterPropsV2): boolean => {
    return selectedFilters.some((f) => f.label === filter.label);
  };

  const getNotSelectedFilters = () => {
    return columnFilters.filter((f) => !selectedFilters.includes(f));
  };

  return (
    <div className="w-1/2 flex gap-2">
      {selectedFilters.map((f) => (
        <DataTableFilterButtonV2
          key={String(f.label)}
          table={table}
          filterData={f}
        />
      ))}
      {selectedFilters.length !== columnFilters.length && (
        <DataTableFilterAddButton
          options={getNotSelectedFilters()}
          onAddFilter={addSelectedFilter}
          isFilterSelected={isFilterSelected}
        />
      )}
    </div>
  );
}

export default DataTableFilters;
