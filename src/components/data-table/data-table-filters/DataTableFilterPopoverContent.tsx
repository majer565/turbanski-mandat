"use client"

import { Dispatch, SetStateAction } from "react";
import { FilterType } from "./DataTableFilters";
import DateContent from "./popover-content/DateContent";
import InputContent from "./popover-content/InputContent";
import RangeContent from "./popover-content/RangeContent";
import SelectContent from "./popover-content/SelectContent";
import { DataTableFilterPropsOptions } from "./DataTableFilterButtonV2";

export interface DataTablePopoverContentProps {
  id: string;
  type: FilterType;
  value: string;
  handleValueChange: Dispatch<SetStateAction<string>>;
  onRemove: () => void;
  options?: DataTableFilterPropsOptions;
}

export type DataTableFilterPopoverContentProps = Omit<
  DataTablePopoverContentProps,
  "type"
>;

const DataTableFilterPopoverContent = (props: DataTablePopoverContentProps) => {
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
