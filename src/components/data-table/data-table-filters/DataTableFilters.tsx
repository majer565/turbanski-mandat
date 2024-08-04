"use client";

import { ColumnFilter, ColumnFiltersState, Table } from "@tanstack/react-table";
import { ReactNode, useState } from "react";
import DataTableFilterAddButton from "./DataTableFilterAddButton";
import DataTableFilterButtonV2, { ColumnFilterDefinition } from "./DataTableFilterButton";

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
  columnFilters: ColumnFilterDefinition[];
}

function DataTableFilters<TData>({ table, columnFilters }: DataTableFiltersProps<TData>) {
  const [selectedFilters, setSelectedFilters] = useState<ColumnFiltersState>(table.getState().columnFilters);

  const removeSelectedFilter = (filter: ColumnFilter) => {
    const filterFn = (prev: ColumnFiltersState) => prev.filter((f) => f.id !== filter.id);

    table.setColumnFilters(filterFn);
    setSelectedFilters(filterFn);
  };

  const onAddFilter = (filter: ColumnFilter) => {
    setSelectedFilters((prev) => [...prev, filter]);
  };

  const getNotSelectedFilters = () => {
    return columnFilters.filter((f) => !selectedFilters.find((s) => s.id === f.id));
  };

  const getColumnDataByFilterId = (filterId: string): ColumnFilterDefinition => {
    const columnData = columnFilters.find((cf) => cf.id === filterId);
    return (
      columnData || {
        id: "",
        label: "",
        type: FilterType.TEXT,
      }
    );
  };

  return (
    <div className="w-1/2 max-w-[50rem] flex flex-wrap gap-2">
      {selectedFilters.map((f) => (
        <DataTableFilterButtonV2
          key={String(f.id)}
          table={table}
          filter={f}
          columnData={getColumnDataByFilterId(f.id)}
          onRemoveFilter={removeSelectedFilter}
        />
      ))}
      {selectedFilters.length !== columnFilters.length && (
        <DataTableFilterAddButton options={getNotSelectedFilters()} onAddFilter={onAddFilter} />
      )}
    </div>
  );
}

export default DataTableFilters;
