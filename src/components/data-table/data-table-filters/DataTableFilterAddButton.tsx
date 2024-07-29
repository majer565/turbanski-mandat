"use client";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ColumnFilter, Table } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
import { ColumFilterDefinition, DataTableFilterPropsV2 } from "./DataTableFilterButtonV2";

interface DataTableFilterAddButtonProps<TData> {
  options: ColumFilterDefinition[];
  onAddFilter: (filter: ColumnFilter) => void;
  table: Table<TData>;
}

export default function DataTableFilterAddButton<TData>(props: DataTableFilterAddButtonProps<TData>) {
  const [open, setOpen] = useState(false);

  const handleFilterSelect = (id: string) => {
    props.onAddFilter({ id, value: [""] });
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
