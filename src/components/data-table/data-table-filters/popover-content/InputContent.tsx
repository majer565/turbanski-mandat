"use client"

import { Trash } from "lucide-react";
import { Button } from "../../../ui/button";
import { DataTableFilterPopoverContentProps } from "../DataTableFilterPopoverContent";
import { Input } from "../../../ui/input";
import { useDebouncedCallback } from "use-debounce";

const InputContent = (props: DataTableFilterPopoverContentProps) => {
  const handleChange = useDebouncedCallback((input: string) => {
    props.handleValueChange(input);
  }, 300);

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <span className="text-xs h-3 pl-1 opacity-50">{props.id}</span>
        <Button
          className="h-6 w-6"
          variant="ghost"
          size="icon"
          onClick={() => props.handleValueChange("")}
        >
          <Trash className="w-3 h-3 opacity-50" />
        </Button>
      </div>
      <Input
        onChange={(e) => handleChange(e.target.value)}
        defaultValue={props.value || ""}
        placeholder="Wpisz tutaj..."
        className="w-full h-8 text-sm px-2 py-4"
        type="text"
      />
    </>
  );
};

export default InputContent;
