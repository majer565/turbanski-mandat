"use client";

import { Option } from "@/components/data-table/data-table-filters/DataTableFilters";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues } from "react-hook-form";
import { FormItemProps } from "./form-input-item";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormSelectProps<T extends FieldValues> extends FormItemProps<T> {
  placeholder: string;
  options: Option[];
}
const FormSelectItem = <T extends FieldValues>(props: FormSelectProps<T>) => {
  return (
    <FormField
      control={props.form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {props.options.map((o) => (
                <SelectItem value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {props.description && (
            <FormDescription>{props.description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSelectItem;
