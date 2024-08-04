"use client";

import { Minus, Trash } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { DataTablePopoverContentProps } from "../DataTableFilterPopoverContent";

const RangeContent = (props: DataTablePopoverContentProps) => {
  const handleChange = useDebouncedCallback(
    (input: string, type: "min" | "max") => {
      props.handleValueChange((prev) => {
        let min = prev[0];
        let max = prev[1];

        if (!min) min = "0";
        if (!max) max = "0";

        if (type === "min") return [input, max];
        return [min, input];
      });
    },
    300
  );

  const min = props.value[0] || "";
  const max = props.value[1] || "";

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <span className="text-xs h-3 pl-1 opacity-50">{props.label}</span>
        <Button
          className="h-6 w-6"
          variant="ghost"
          size="icon"
          onClick={() => props.onRemove()}
        >
          <Trash className="w-3 h-3 opacity-50" />
        </Button>
      </div>
      <div className="flex gap-2">
        <Input
          key={`filter-input-min-${props.label}`}
          onChange={(e) => handleChange(e.target.value, "min")}
          defaultValue={min}
          placeholder="Min"
          className="w-full h-8 text-sm px-2 py-4 [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
          type="number"
        />
        <Minus className="w-8 h-8" />
        <Input
          key={`filter-input-max-${props.label}`}
          onChange={(e) => handleChange(e.target.value, "max")}
          defaultValue={max}
          placeholder="Max"
          className="w-full h-8 text-sm px-2 py-4 [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
          type="number"
        />
      </div>
    </>
  );
};

export default RangeContent;
