"use client";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
import { DataTableFilterOption } from "./DataTableFilters";

interface DataTableFilterAddButtonProps<TData> {
  options: DataTableFilterOption<TData>[];
  onAddFilter: (filter: DataTableFilterOption<TData>) => void;
  isFilterSelected: (filter: DataTableFilterOption<TData>) => boolean;
}

export default function DataTableFilterAddButton<TData>(props: DataTableFilterAddButtonProps<TData>) {
  const [open, setOpen] = useState(false);

  const getFilterById = (id: string): DataTableFilterOption<TData> | undefined => {
    return props.options.find((f) => f.id === id);
  };

  const handleFilterSelect = (value: string) => {
    const filter = getFilterById(value);

    if (filter) props.onAddFilter(filter);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 text-xs flex rounded-2xl bg-muted/40">
          <Plus className="h-4 w-4 mr-2 opacity-50" />
          Dodaj filtr
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-0">
        <Command>
          <CommandInput placeholder="Wybierz filtr..." />
          <CommandList>
            <CommandEmpty>Nie znaleziono filtru.</CommandEmpty>
            <CommandGroup className="p-2">
              {props.options.map((o) => (
                <CommandItem
                  className="cursor-pointer"
                  key={`command-item-${o.id}`}
                  value={o.id}
                  onSelect={handleFilterSelect}
                >
                  {o.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
