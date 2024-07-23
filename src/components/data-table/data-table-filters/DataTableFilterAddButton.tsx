"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
import { DataTableFilterPropsV2 } from "./DataTableFilterButtonV2";
import { Table } from "@tanstack/react-table";

interface DataTableFilterAddButtonProps<TData> {
  options: DataTableFilterPropsV2[];
  table: Table<TData>;
}

export default function DataTableFilterAddButton<TData>(
  props: DataTableFilterAddButtonProps<TData>
) {
  const [open, setOpen] = useState(false);

  const getFilterById = (id: string): DataTableFilterPropsV2 | undefined => {
    return props.options.find((f) => f.label === id);
  };

  const handleFilterSelect = (value: string) => {
    const filter = getFilterById(value);

    if (filter) props.table.setColumnFilters((prev) => [...prev, {id: filter.label, value: ""}]);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs flex rounded-2xl bg-muted/40"
        >
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
                  key={`command-item-${o.label}`}
                  value={o.label}
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
