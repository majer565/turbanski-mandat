"use client";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Input } from "../../ui/input";

export interface FormItemProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  label: string;
  name: string;
  description?: string;
}

interface FormFileProps<T extends FieldValues> extends FormItemProps<T> {
  placeholder: string;
}

const FormFileItem = <T extends FieldValues>(props: FormFileProps<T>) => {
  return (
    <FormField
      control={props.form.control}
      name={props.name as Path<T>}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <Input
              id="picture"
              type="file"
              accept=".pdf"
              placeholder={props.placeholder}
              {...field}
              value={undefined}
            />
          </FormControl>
          {props.description && <FormDescription>{props.description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFileItem;
