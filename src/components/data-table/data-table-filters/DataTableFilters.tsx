"use client";

import { Table } from "@tanstack/react-table";
import { ReactNode, useState } from "react";
import DataTableFilterAddButton from "./DataTableFilterAddButton";
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
  columnFilters: ColumFilterDefinition[];
  queryFilters: DataTableFilterPropsV2[];
}

//State potrzebny do kontrolowania buttonów - OK
//Potrzeba onAddFilter -> dodanie do state filtra - OK
//Potrzeba removeSelectedFilter -> usunięcie ze state filtra - 2/3
//  - usunięcie ze state filtra - OK
//  - usunięcie z table.ColumFilterState - OK
//  - usunięcie z URL
function DataTableFilters<TData>({ table, columnFilters, queryFilters }: DataTableFiltersProps<TData>) {
  const [selectedFilters, setSelectedFilters] = useState<DataTableFilterPropsV2[]>(queryFilters);

  const onAddFilter = (filter: DataTableFilterPropsV2) => {
    setSelectedFilters((prev) => [...prev, filter]);
  };

  const removeSelectedFilter = (filter: DataTableFilterPropsV2) => {
    table.setColumnFilters((prev) => {
      const filtered = prev.filter((f) => f.id !== filter.id);

      return [...filtered, { id: filter.id, value: "" }];
    });
    setSelectedFilters((prev) => {
      const filters = prev.filter((f) => f.id !== filter.id);
      return filters;
    });
  };

  const getNotSelectedFilters = () => {
    return columnFilters.filter((f) => !selectedFilters.find((s) => s.id === f.id));
  };

  return (
    <div className="w-1/2 flex gap-2">
      {selectedFilters.map((f) => (
        <DataTableFilterButtonV2
          key={String(f.id)}
          table={table}
          filterData={f}
          onRemoveFilter={removeSelectedFilter}
        />
      ))}
      {selectedFilters.length !== columnFilters.length && (
        <DataTableFilterAddButton options={getNotSelectedFilters()} onAddFilter={onAddFilter} table={table} />
      )}
    </div>
  );
}

export default DataTableFilters;
