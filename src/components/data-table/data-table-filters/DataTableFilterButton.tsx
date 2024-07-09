"use client";

import React from "react";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
import { DataTableFilterOption } from "./DataTableFilters";
import { Input } from "@/components/ui/input";

interface DataTableFiterProps<TData> {
  filter: DataTableFilterOption<TData>;
  onRemoveFilter: (filter: DataTableFilterOption<TData>) => void;
}

export default function DataTableFilterButton<TData>(props: DataTableFiterProps<TData>) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const handleInputChange = (e: { target: { value: string } }) => {
    setInput(e.target.value);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 flex text-xs rounded-2xl bg-muted/40"
          onClick={() => setOpen(true)}
        >
          {props.filter.label}
          {input.length > 0 && (
            <>
              <span>:</span>
              <span className="ml-2 opacity-50">{input}</span>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-2 flex gap-2 flex-col">
        <div className="w-full flex justify-between items-center">
          <span className="text-xs h-3 pl-1 opacity-50">{props.filter.label}</span>
          <Button className="h-6 w-6" variant="ghost" size="icon" onClick={() => props.onRemoveFilter(props.filter)}>
            <Trash className="w-3 h-3 opacity-50" />
          </Button>
        </div>
        <Input
          onChange={handleInputChange}
          value={input}
          placeholder="Wpisz tutaj..."
          className="w-full h-8 text-sm px-2 py-4"
          type="text"
        />
      </PopoverContent>
    </Popover>
  );
}
