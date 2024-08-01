"use client";

import { Dispatch, SetStateAction } from "react";
import { DataTableFilterPropsOptions } from "./DataTableFilterButton";
import { FilterType } from "./DataTableFilters";
import DateContent from "./popover-content/DateContent";
import InputContent from "./popover-content/InputContent";
import RangeContent from "./popover-content/RangeContent";
import SelectContent from "./popover-content/SelectContent";

export interface DataTableFilterPopoverContentProps {
  label: string;
  type: FilterType;
  value: string[];
  handleValueChange: Dispatch<SetStateAction<string[]>>;
  onRemove: () => void;
  options?: DataTableFilterPropsOptions;
}

export type DataTablePopoverContentProps = Omit<DataTableFilterPopoverContentProps, "type">;

const DataTableFilterPopoverContent = (props: DataTableFilterPopoverContentProps) => {
  switch (props.type) {
    case FilterType.TEXT: {
      return (
        <InputContent
          label={props.label}
          value={props.value}
          handleValueChange={props.handleValueChange}
          onRemove={props.onRemove}
        />
      );
    }
    case FilterType.SELECT: {
      return (
        <SelectContent
          label={props.label}
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
          label={props.label}
          value={props.value}
          handleValueChange={props.handleValueChange}
          onRemove={props.onRemove}
        />
      );
    }
    case FilterType.RANGE: {
      return (
        <RangeContent
          label={props.label}
          value={props.value}
          handleValueChange={props.handleValueChange}
          onRemove={props.onRemove}
        />
      );
    }
    default: {
      return (
        <InputContent
          label={props.label}
          value={props.value}
          handleValueChange={props.handleValueChange}
          onRemove={props.onRemove}
        />
      );
    }
  }
};

export default DataTableFilterPopoverContent;
