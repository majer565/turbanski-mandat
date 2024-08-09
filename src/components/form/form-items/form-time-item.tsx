"use client";

import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FieldValues, Path } from "react-hook-form";
import { FormItemProps } from "./form-input-item";

import { Input } from "@/components/ui/input";
import { Clock } from "lucide-react";

interface FormTimeProps<T extends FieldValues> extends FormItemProps<T> {
  placeholder: string;
}
const FormTimeItem = <T extends FieldValues>(props: FormTimeProps<T>) => {
  return (
    <FormField
      control={props.form.control}
      name={props.name as Path<T>}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="h-[24px]">{props.label}</FormLabel>

          <div className="relative">
            <div className="absolute inset-y-0 end-0 top-0 flex items-center me-3.5 my-2 pointer-events-none bg-background">
              <Clock className="w-4 h-4 opacity-50 bg-background" />
            </div>
            <Input type="time" className="block" placeholder={props.placeholder} {...field} />
          </div>
          {props.description && <FormDescription>{props.description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormTimeItem;
