"use client";

import { useEffect } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import useSearchParamsUpdate from "../../../hooks/useSearchParamsUpdate";
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import { DataTableFilterOption } from "./DataTableFilters";

interface DataTableFiterProps<TData> {
  filter: DataTableFilterOption<TData>;
  onRemoveFilter: (filter: DataTableFilterOption<TData>) => void;
}

interface PopoverContentProps<TData> {
  filter: DataTableFilterOption<TData>;
  onRemove: () => void;
  value: string[];
  onValueChange: (valueToUpdate: string) => void;
}

export default function DataTableFilterButton<TData>(
  props: DataTableFiterProps<TData>
) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string[]>(props.filter.value || []);
  const { updateSearchParams } = useSearchParamsUpdate();

  useEffect(() => {
    if (value.length === 0) {
      updateSearchParams(props.filter.id, "");
    } else {
      updateSearchParams(props.filter.id, value.map((v) => v).join("."));
    }
  }, [value]);

  const handleValueUpdate = (valueToUpdate: string) => {
    if (props.filter.options.length === 0) {
      if (valueToUpdate === "") {
        setValue([]);
      } else setValue([valueToUpdate]);
      return;
    }

    if (value.some((v) => v === valueToUpdate)) {
      setValue(value.filter((v) => v !== valueToUpdate));
    } else setValue((prev) => [...prev, valueToUpdate]);
  };

  const getLabelByValue = (value: string): string => {
    return props.filter.options.find((o) => o.value === value)?.label || value;
  };

  const getChoosenFiltersText = () => {
    if (value.length === 1) {
      return <span className="ml-2 opacity-50">{getLabelByValue(value[0])}</span>;
    } else {
      return value.length > 2 ? (
        <span className="ml-2 opacity-50">{value.length} zaznaczone</span>
      ) : (
        <span className="ml-2 opacity-50">
          {value.map((v, i) => {
            const label = getLabelByValue(v);
            return i === 1 ? `${label}` : `${label}, `;
          })}
        </span>
      );
    }
  };

  const handleRemove = () => {
    updateSearchParams(props.filter.id, "");
    props.onRemoveFilter(props.filter);
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
                <span className="ml-2 opacity-50">{getLabelByValue(value[0])}</span>
              )}
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-2 flex gap-2 flex-col">
        {props.filter.options.length === 0 ? (
          <InputPopoverContent
            filter={props.filter}
            onRemove={handleRemove}
            value={value}
            onValueChange={handleValueUpdate}
          />
        ) : (
          <SelectPopoverContent
            filter={props.filter}
            onRemove={handleRemove}
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
    props.onValueChange(input);
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
          onClick={() => props.onRemove()}
        >
          <Trash className="w-3 h-3 opacity-50" />
        </Button>
      </div>
      <Input
        onChange={(e) => handleChange(e.target.value)}
        defaultValue={props.value[0] || ""}
        placeholder="Wpisz tutaj..."
        className="w-full h-8 text-sm px-2 py-4"
        type="text"
      />
    </>
  );
}

function SelectPopoverContent<TData>(props: PopoverContentProps<TData>) {
  const handleSelect = (value: string) => {
    props.onValueChange(value);
  };

  const isSelected = (value: string): boolean => {
    return props.value.some((v) => v === value);
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
          onClick={() => props.onRemove()}
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
