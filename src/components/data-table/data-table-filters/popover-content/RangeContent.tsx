"use client";

import { Trash } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { DataTablePopoverContentProps } from "../DataTableFilterPopoverContent";

const RangeContent = (props: DataTablePopoverContentProps) => {
  const handleChange = useDebouncedCallback((input: string, type: "min" | "max") => {
    props.handleValueChange((prev) => {
      const prevAsString = String(prev.value);

      let [min, max] = prevAsString.split("-");
      if (!min) min = "0";
      if (!max) max = "0";

      if (type === "min") return { id: props.id, value: `${input}-${max}` };
      else return { id: props.id, value: `${min}-${input}` };
    });
  }, 300);

  const filterValue = String(props.value.value);
  const min = filterValue.split("-")[0] || "";
  const max = filterValue.split("-")[1] || "";

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <span className="text-xs h-3 pl-1 opacity-50">{props.id}</span>
        <Button className="h-6 w-6" variant="ghost" size="icon" onClick={() => props.onRemove()}>
          <Trash className="w-3 h-3 opacity-50" />
        </Button>
      </div>
      <div className="flex">
        <Input
          key={`filter-input-min-${props.id}`}
          onChange={(e) => handleChange(e.target.value, "min")}
          defaultValue={min}
          placeholder="Min"
          className="w-full h-8 text-sm px-2 py-4 [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
          type="number"
        />
        <span className="w-12">-</span>
        <Input
          key={`filter-input-max-${props.id}`}
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
