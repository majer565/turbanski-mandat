"use client";

import { ReactNode, useState } from "react";
import DataTableFilterAddButton from "./DataTableFilterAddButton";
import DataTableFilterButton from "./DataTableFilterButton";

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

interface DataTableFiltersProps {
  columnFilters: DataTableFilterOption[];
  queryFilters: DataTableFilterOption[];
}
function DataTableFilters({
  columnFilters,
  queryFilters,
}: DataTableFiltersProps) {
  const [selectedFilters, setSelectedFilters] =
    useState<DataTableFilterOption[]>(queryFilters);

  const addSelectedFilter = (filter: DataTableFilterOption) => {
    setSelectedFilters((prev) => [...prev, filter]);
  };

  const removeSelectedFilter = (filter: DataTableFilterOption) => {
    setSelectedFilters((prev) => {
      const filters = prev.filter((f) => f.id !== filter.id);
      return filters;
    });
  };

  const isFilterSelected = (filter: DataTableFilterOption): boolean => {
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
