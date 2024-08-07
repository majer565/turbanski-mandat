"use client";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

export interface FormItemProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  label: string;
  name: string;
  description?: string;
}

interface FormInputProps<T extends FieldValues> extends FormItemProps<T> {
  placeholder: string;
}

const FormInputItem = <T extends FieldValues>(props: FormInputProps<T>) => {
  return (
    <FormField
      control={props.form.control}
      name={props.name as Path<T>}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <Input placeholder={props.placeholder} {...field} />
          </FormControl>
          {props.description && <FormDescription>{props.description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInputItem;
