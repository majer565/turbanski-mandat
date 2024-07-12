"use client";

import { Table } from "@tanstack/react-table";
import {
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  useEffect,
  useState,
} from "react";
import DataTableFilterAddButton from "./DataTableFilterAddButton";
import DataTableFilterButton from "./DataTableFilterButton";
import { LucideProps } from "lucide-react";

export interface Option {
  value: string;
  label: string;
  icon?: ReactNode;
}

export interface DataTableFilterOption<TData> {
  id: string;
  label: string;
  options: Option[];
  value?: string[];
  // filterValues?: string[];
  // filterOperator?: string;
  // isMulti?: boolean;
}

interface DataTableFiltersProps<TData> {
  table: Table<TData>;
  columnFilters: DataTableFilterOption<TData>[];
  queryFilters: DataTableFilterOption<TData>[];
}

function DataTableFilters<TData>({
  table,
  columnFilters,
  queryFilters,
}: DataTableFiltersProps<TData>) {
  const [selectedFilters, setSelectedFilters] =
    useState<DataTableFilterOption<TData>[]>(queryFilters);

  const addSelectedFilter = (filter: DataTableFilterOption<TData>) => {
    setSelectedFilters((prev) => [...prev, filter]);
  };

  const removeSelectedFilter = (filter: DataTableFilterOption<TData>) => {
    setSelectedFilters((prev) => {
      const filters = prev.filter((f) => f.id !== filter.id);
      return filters;
    });
  };

  const isFilterSelected = (filter: DataTableFilterOption<TData>): boolean => {
    return selectedFilters.some((f) => f.id === filter.id);
  };

  const getNotSelectedFilters = () => {
    return columnFilters.filter((f) => !selectedFilters.includes(f));
  };

  return (
    <div className="w-1/2 flex gap-2">
      {selectedFilters.map((f) => (
        <DataTableFilterButton
          key={String(f.id)}
          onRemoveFilter={removeSelectedFilter}
          filter={f}
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
