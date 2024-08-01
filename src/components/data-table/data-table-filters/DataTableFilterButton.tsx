"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ColumnFilter, Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import DataTableFilterPopoverContent from "./DataTableFilterPopoverContent";
import { FilterType } from "./DataTableFilters";

export interface DataTableFilterSelectOption {
  value: string;
  icon?: React.ReactNode;
}

export interface DataTableFilterPropsOptions {
  selectOptions?: DataTableFilterSelectOption[];
}

export type ColumnFilterDefinition = Omit<DataTableFilterPropsV2, "filter">;

export interface DataTableFilterPropsV2 {
  id: string;
  label: string;
  filter: ColumnFilter;
  type: FilterType;
  options?: DataTableFilterPropsOptions;
}

interface DataTableFilterButtonProps<TData> {
  table: Table<TData>;
  filter: ColumnFilter;
  columnData: ColumnFilterDefinition;
  onRemoveFilter: (filterData: ColumnFilter) => void;
}

export default function DataTableFilterButtonV2<TData>({
  table,
  columnData,
  filter,
  onRemoveFilter,
}: DataTableFilterButtonProps<TData>) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string[]>(filter.value as string[]);

  useEffect(() => {
    table.setColumnFilters((prev) => {
      const prevFilter = prev.find((p) => p.id === filter.id);

      if (prevFilter) {
        const prevValue = prevFilter.value as string[];
        if (prevValue.length === 1 && !prevValue[0]) {
          return prev.filter((p) => p.id !== prevFilter.id);
        }

        return [...prev.filter((p) => p.id !== prevFilter.id), { id: prevFilter.id, value }];
      }

      return [...prev, { id: filter.id, value }];
    });
  }, [value]);

  const handleRemove = () => {
    onRemoveFilter(filter);
  };

  const getValueAsText = (valueToChange: string[]): string => {
    if (valueToChange.length > 2) return `${valueToChange.length} zaznaczone`;

    return valueToChange.join(", ");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 flex text-xs rounded-2xl bg-muted/40"
          onClick={() => setOpen(true)}
        >
          {columnData.label}
          {value[0] && (
            <>
              <span>:</span>
              <span className="ml-2 opacity-50">{getValueAsText(value)}</span>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-2 flex gap-2 flex-col">
        <DataTableFilterPopoverContent
          value={value}
          handleValueChange={setValue}
          type={columnData.type}
          label={columnData.label}
          options={columnData.options}
          onRemove={handleRemove}
        />
      </PopoverContent>
    </Popover>
  );
}
