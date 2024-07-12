"use client";

import React from "react";

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
import { Plus, Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
import { DataTableFilterOption } from "./DataTableFilters";
import { Input } from "@/components/ui/input";
import { Checkbox } from "../../ui/checkbox";
import { useDebouncedCallback } from "use-debounce";

interface DataTableFiterProps<TData> {
  filter: DataTableFilterOption<TData>;
  onRemoveFilter: (filter: DataTableFilterOption<TData>) => void;
}

interface PopoverContentProps<TData> {
  filter: DataTableFilterOption<TData>;
  onRemoveFilter: (filter: DataTableFilterOption<TData>) => void;
  value: FilterOption[];
  onValueChange: (option: FilterOption) => void;
}

interface FilterOption {
  value: string;
  label: string;
}

export default function DataTableFilterButton<TData>(
  props: DataTableFiterProps<TData>
) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<FilterOption[]>([]);

  const handleValueUpdate = (option: FilterOption) => {
    if (props.filter.options.length === 0) {
      if (option.value === "") {
        setValue([]);
      } else setValue([option]);
      return;
    }

    if (value.some((v) => v.value === option.value)) {
      setValue(value.filter((v) => v.value !== option.value));
    } else setValue((prev) => [...prev, option]);
  };

  const getChoosenFiltersText = () => {
    if (value.length === 1) {
      return <span className="ml-2 opacity-50">{value[0].label}</span>;
    } else {
      return value.length > 2 ? (
        <span className="ml-2 opacity-50">{value.length} zaznaczone</span>
      ) : (
        <span className="ml-2 opacity-50">
          {value.map((v, i) => (i === 1 ? `${v.label}` : `${v.label}, `))}
        </span>
      );
    }
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
          {value.length > 0 && (
            <>
              <span>:</span>
              {value.length > 1 ? (
                getChoosenFiltersText()
              ) : (
                <span className="ml-2 opacity-50">{value[0].label}</span>
              )}
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-2 flex gap-2 flex-col">
        {props.filter.options.length === 0 ? (
          <InputPopoverContent
            filter={props.filter}
            onRemoveFilter={props.onRemoveFilter}
            value={value}
            onValueChange={handleValueUpdate}
          />
        ) : (
          <SelectPopoverContent
            filter={props.filter}
            onRemoveFilter={props.onRemoveFilter}
            value={value}
            onValueChange={handleValueUpdate}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}

function InputPopoverContent<TData>(props: PopoverContentProps<TData>) {
  const handleChange = useDebouncedCallback((input: string) => {
    props.onValueChange({
      value: input,
      label: input,
    });
  }, 300);

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <span className="text-xs h-3 pl-1 opacity-50">
          {props.filter.label}
        </span>
        <Button
          className="h-6 w-6"
          variant="ghost"
          size="icon"
          onClick={() => props.onRemoveFilter(props.filter)}
        >
          <Trash className="w-3 h-3 opacity-50" />
        </Button>
      </div>
      <Input
        onChange={(e) => handleChange(e.target.value)}
        defaultValue={props.value[0] ? props.value[0].value : ""}
        placeholder="Wpisz tutaj..."
        className="w-full h-8 text-sm px-2 py-4"
        type="text"
      />
    </>
  );
}

function SelectPopoverContent<TData>(props: PopoverContentProps<TData>) {
  const handleSelect = (value: string) => {
    props.onValueChange({
      value,
      label:
        props.filter.options.find((o) => o.value === value)?.label || value,
    });
  };

  const isSelected = (value: string): boolean => {
    return props.value.some((v) => v.value === value);
  };

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <span className="text-xs h-3 pl-1 opacity-50">
          {props.filter.label}
        </span>
        <Button
          className="h-6 w-6"
          variant="ghost"
          size="icon"
          onClick={() => props.onRemoveFilter(props.filter)}
        >
          <Trash className="w-3 h-3 opacity-50" />
        </Button>
      </div>
      <Command>
        <CommandInput className="text-xs" placeholder="Wybierz opcję..." />
        <CommandList>
          <CommandEmpty>Nie znaleziono opcji.</CommandEmpty>
          <CommandGroup className="p-2">
            {props.filter.options.map((o) => (
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
                {o.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </>
  );
}
