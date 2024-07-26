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

export type ColumFilterDefinition = Omit<DataTableFilterPropsV2, "filter">;

export interface DataTableFilterPropsV2 {
  id: string;
  label: string;
  filter: ColumnFilter;
  type: FilterType;
  options?: DataTableFilterPropsOptions;
}

interface DataTableFilterButtonV2Props<TData> {
  table: Table<TData>;
  filterData: DataTableFilterPropsV2;
  onRemoveFilter: (filterData: DataTableFilterPropsV2) => void;
}

export default function DataTableFilterButtonV2<TData>(props: DataTableFilterButtonV2Props<TData>) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<ColumnFilter>(props.filterData.filter);

  useEffect(() => {
    props.table.setColumnFilters((prev) => {
      const filterId: string = props.filterData.id;

      if (!value.value) {
        return prev.filter((f) => f.id !== filterId);
      }

      const filterToUpdate = prev.findIndex((f) => f.id === filterId);

      if (filterToUpdate !== -1) {
        const prevWithoutCurrentFilter = prev.filter((f) => f.id !== filterId);
        return [...prevWithoutCurrentFilter, value];
      }

      return [...prev, value];
    });
  }, [value]);

  const handleRemove = () => {
    setValue((prev) => ({ ...prev, value: "" }));
    props.onRemoveFilter(props.filterData);
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
          {props.filterData.label}
          {(value.value as string) && (
            <>
              <span>:</span>
              <span className="ml-2 opacity-50">{value.value as string}</span>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-2 flex gap-2 flex-col">
        <DataTableFilterPopoverContent
          value={value}
          handleValueChange={setValue}
          type={props.filterData.type}
          id={props.filterData.id}
          options={props.filterData.options}
          onRemove={handleRemove}
        />
      </PopoverContent>
    </Popover>
  );
}
