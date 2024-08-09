"use client";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

export interface FormItemProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  label: string;
  name: string;
  description?: string;
}

interface FormInputProps<T extends FieldValues>
  extends FormItemProps<T>,
    Omit<InputHTMLAttributes<HTMLInputElement>, "form" | "label" | "name" | "description"> {}

const FormInputItem = <T extends FieldValues>(props: FormInputProps<T>) => {
  const { form, label, name, description, ...rest } = props;

  return (
    <FormField
      control={props.form.control}
      name={props.name as Path<T>}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <Input
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              {...field}
              {...rest}
            />
          </FormControl>
          {props.description && <FormDescription>{props.description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInputItem;
