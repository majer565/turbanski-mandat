"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  label: string;
  filter?: ColumnFilter;
  type: FilterType;
  options?: DataTableFilterPropsOptions;
}

interface DataTableFilterButtonV2Props<TData> {
  table: Table<TData>;
  filterData: DataTableFilterPropsV2;
}

//TODO:
// - ColumnFilters add for every iteration
// - Status is borken
// - Can't remove filter
export default function DataTableFilterButtonV2<TData>(
  props: DataTableFilterButtonV2Props<TData>
) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>(
    (props.filterData.filter?.value as string) || ""
  );

  useEffect(() => {
    props.table.setColumnFilters((prev) => {
      return [...prev, { id: props.filterData.filter?.id || props.filterData.label, value: value }];
    });
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 flex text-xs rounded-2xl bg-muted/40"
          onClick={() => setOpen(true)}
        >
          {props.filterData.filter?.id || props.filterData.label}
          {value && (
            <>
              <span>:</span>
              <span className="ml-2 opacity-50">{value}</span>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-2 flex gap-2 flex-col">
        <DataTableFilterPopoverContent
          value={value}
          handleValueChange={setValue}
          type={props.filterData.type}
          id={props.filterData.label}
          options={props.filterData.options}
        />
      </PopoverContent>
    </Popover>
  );
}
