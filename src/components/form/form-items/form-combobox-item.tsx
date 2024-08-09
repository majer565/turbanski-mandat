"use client";

import { Option } from "@/components/data-table/data-table-filters/DataTableFilters";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FieldValues, Path, PathValue } from "react-hook-form";
import { FormItemProps } from "./form-input-item";

import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface FormComboboxProps<T extends FieldValues> extends FormItemProps<T> {
  placeholder: string;
  options: Option[];
}

const FormComboboxItem = <T extends FieldValues>(props: FormComboboxProps<T>) => {
  return (
    <FormField
      control={props.form.control}
      name={props.name as Path<T>}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="h-[24px]">{props.label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn("justify-between", !field.value && "text-muted-foreground")}
                >
                  {field.value
                    ? props.options.find((option) => option.value === field.value)?.label
                    : props.placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent align="start" className="p-0">
              <Command>
                <CommandInput placeholder={props.placeholder} />
                <CommandList>
                  <CommandEmpty>Nie znaleziono opcji.</CommandEmpty>
                  <CommandGroup>
                    {props.options.map((option) => (
                      <CommandItem
                        value={option.label}
                        key={option.value}
                        onSelect={() => {
                          field.onChange(option.value as PathValue<T, Path<T>>);
                        }}
                      >
                        <Check
                          className={cn("mr-2 h-4 w-4", option.value === field.value ? "opacity-100" : "opacity-0")}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {props.description && <FormDescription>{props.description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormComboboxItem;
