"use client";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ChangeEvent, SetStateAction } from "react";
import { ControllerRenderProps, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Input } from "../../ui/input";

export interface FormItemProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  label: string;
  name: string;
  description?: string;
}

interface FormFileProps<T extends FieldValues> extends FormItemProps<T> {
  placeholder: string;
  setFile: React.Dispatch<SetStateAction<File | null>>;
}

const FormFileItem = <T extends FieldValues>(props: FormFileProps<T>) => {
  const handleChangeEvent = (e: ChangeEvent<HTMLInputElement>, field: ControllerRenderProps<T, Path<T>>) => {
    const file = e.target.files;
    if (file && file[0].type === "application/pdf") {
      props.setFile(file[0]);
    } else props.setFile(null);

    field.onChange(e.target.value);
  };

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
              onChange={(e) => handleChangeEvent(e, field)}
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
