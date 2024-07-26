"use client";

import { ColumnFilter } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";
import { DataTableFilterPropsOptions } from "./DataTableFilterButtonV2";
import { FilterType } from "./DataTableFilters";
import DateContent from "./popover-content/DateContent";
import InputContent from "./popover-content/InputContent";
import RangeContent from "./popover-content/RangeContent";
import SelectContent from "./popover-content/SelectContent";

export interface DataTableFilterPopoverContentProps {
  id: string;
  type: FilterType;
  value: ColumnFilter;
  handleValueChange: Dispatch<SetStateAction<ColumnFilter>>;
  onRemove: () => void;
  options?: DataTableFilterPropsOptions;
}

export type DataTablePopoverContentProps = Omit<DataTableFilterPopoverContentProps, "type">;

const DataTableFilterPopoverContent = (props: DataTableFilterPopoverContentProps) => {
  switch (props.type) {
    case FilterType.TEXT: {
      return (
        <InputContent
          id={props.id}
          value={props.value}
          handleValueChange={props.handleValueChange}
          onRemove={props.onRemove}
        />
      );
    }
    case FilterType.SELECT: {
      return (
        <SelectContent
          id={props.id}
          value={props.value}
          handleValueChange={props.handleValueChange}
          options={props.options}
          onRemove={props.onRemove}
        />
      );
    }
    case FilterType.DATE: {
      return (
        <DateContent
          id={props.id}
          value={props.value}
          handleValueChange={props.handleValueChange}
          onRemove={props.onRemove}
        />
      );
    }
    case FilterType.RANGE: {
      return (
        <RangeContent
          id={props.id}
          value={props.value}
          handleValueChange={props.handleValueChange}
          onRemove={props.onRemove}
        />
      );
    }
    default: {
      return (
        <InputContent
          id={props.id}
          value={props.value}
          handleValueChange={props.handleValueChange}
          onRemove={props.onRemove}
        />
      );
    }
  }
};

export default DataTableFilterPopoverContent;
