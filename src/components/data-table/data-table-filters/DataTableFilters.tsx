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
  // value: keyof TData;
  // filterValues?: string[];
  // filterOperator?: string;
  // isMulti?: boolean;
}

interface DataTableFiltersProps<TData> {
  table: Table<TData>;
  columnFilters: DataTableFilterOption<TData>[];
}

function DataTableFilters<TData>({ table, columnFilters }: DataTableFiltersProps<TData>) {
  const [allFilters, setAllFilters] = useState<DataTableFilterOption<TData>[]>(
    []
  );
  const [selectedFilters, setSelectedFilters] = useState<
    DataTableFilterOption<TData>[]
  >([]);

  useEffect(() => {
    let columns: DataTableFilterOption<TData>[] = [];
    columnFilters.forEach((col) =>
      columns.push({
        id: col.id,
        label: col.label,
        options: col.options,
      })
    );

    setAllFilters(columns);
  }, []);

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
    return allFilters.filter((f) => !selectedFilters.includes(f));
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
      {selectedFilters.length !== allFilters.length && (
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
