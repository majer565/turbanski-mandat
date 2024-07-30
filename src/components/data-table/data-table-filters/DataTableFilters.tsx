"use client";

import { ColumnFilter, ColumnFiltersState, Table } from "@tanstack/react-table";
import { ReactNode, useState } from "react";
import DataTableFilterAddButton from "./DataTableFilterAddButton";
import DataTableFilterButtonV2, { ColumFilterDefinition, DataTableFilterPropsV2 } from "./DataTableFilterButtonV2";
import { Button } from "@/components/ui/button";
import useSearchParamsUpdate from "@/hooks/useSearchParamsUpdate";

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
}

//State potrzebny do kontrolowania buttonów - OK
//Potrzeba onAddFilter -> dodanie do state filtra - OK
//Potrzeba removeSelectedFilter -> usunięcie ze state filtra - 2/3
//  - usunięcie ze state filtra - OK
//  - usunięcie z table.ColumFilterState - OK
//  - usunięcie z URL
function DataTableFilters<TData>({ table, columnFilters }: DataTableFiltersProps<TData>) {
  const [selectedFilters, setSelectedFilters] = useState<ColumnFiltersState>(table.getState().columnFilters);

  const removeSelectedFilter = (filter: ColumnFilter) => {
    table.setColumnFilters((prev) => {
      const filtersToSet = prev.filter((f) => f.id !== filter.id);
      return [...filtersToSet, { id: filter.id, value: [] }];
    });
    setSelectedFilters((prev) => prev.filter((f) => f.id !== filter.id));
  };

  const onAddFilter = (filter: ColumnFilter) => {
    setSelectedFilters((prev) => [...prev, filter]);
  };


  const getNotSelectedFilters = () => {
    return columnFilters.filter((f) => !selectedFilters.find((s) => s.id === f.id));
  };

  const getColumnDataByFilterId = (filterId: string): ColumFilterDefinition => {
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
    <div className="w-1/2 flex gap-2">
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
