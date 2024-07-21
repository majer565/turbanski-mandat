"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Trash } from "lucide-react";
import { Button } from "../../../ui/button";
import { Checkbox } from "../../../ui/checkbox";
import { DataTableFilterPopoverContentProps } from "../DataTableFilterPopoverContent";

const SelectContent = (props: DataTableFilterPopoverContentProps) => {
  const handleSelect = (value: string) => {
    props.handleValueChange((prev) => {
      if (!prev) return value;
      else return `, ${value}`;
    });
  };

  const isSelected = (value: string): boolean => {
    return props.value.includes(value);
  };

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
      <Command>
        <CommandInput className="text-xs" placeholder="Wybierz opcję..." />
        <CommandList>
          <CommandEmpty>Nie znaleziono opcji.</CommandEmpty>
          <CommandGroup className="p-2">
            {props.options?.selectOptions?.map((o) => (
              <CommandItem
                className="cursor-pointer flex items-center gap-3"
                key={`command-item-option-${o.value}`}
                value={o.value}
                onSelect={handleSelect}
              >
                <Checkbox
                  checked={isSelected(o.value)}
                  id={`command-item-option-${o.value}`}
                />
                {o.icon}
                {o.value}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </>
  );
};

export default SelectContent;
