"use client";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Trash } from "lucide-react";
import { Button } from "../../../ui/button";
import { Checkbox } from "../../../ui/checkbox";
import { DataTablePopoverContentProps } from "../DataTableFilterPopoverContent";

const SelectContent = (props: DataTablePopoverContentProps) => {
  const handleSelect = (value: string) => {
    props.handleValueChange((prev) => {
      if (prev[0]) {
        if (prev.find((p) => p === value)) return prev.filter((p) => p !== value);
        return [...prev, value];
      }
      return [value];
    });
  };

  const isSelected = (value: string): boolean => {
    return Boolean(props.value.find((v) => v === value));
  };

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <span className="text-xs h-3 pl-1 opacity-50">{props.label}</span>
        <Button className="h-6 w-6" variant="ghost" size="icon" onClick={() => props.onRemove()}>
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
                <Checkbox checked={isSelected(o.value)} id={`command-item-option-${o.value}`} />
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
