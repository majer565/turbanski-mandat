"use client";

import { Trash } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { DataTablePopoverContentProps } from "../DataTableFilterPopoverContent";

const InputContent = (props: DataTablePopoverContentProps) => {
  const handleChange = useDebouncedCallback((input: string) => {
    if (input) props.handleValueChange([input]);
    else props.handleValueChange([]);
  }, 300);

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <span className="text-xs h-3 pl-1 opacity-50">{props.label}</span>
        <Button className="h-6 w-6" variant="ghost" size="icon" onClick={() => props.onRemove()}>
          <Trash className="w-3 h-3 opacity-50" />
        </Button>
      </div>
      <Input
        onChange={(e) => handleChange(e.target.value)}
        defaultValue={props.value[0]}
        placeholder="Wpisz tutaj..."
        className="w-full h-8 text-sm px-2 py-4"
        type="text"
      />
    </>
  );
};

export default InputContent;
