"use client";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FieldValues, Path } from "react-hook-form";
import { FormItemProps } from "./form-input-item";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { Button } from "../../ui/button";
import { pl } from "date-fns/locale";
import { Input } from "@/components/ui/input";

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
          {/* <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                >
                  {field.value ? format(field.value, "PPP", { locale: pl }) : <span>Wybierz datę</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start"> */}
          <div className="relative">
            <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
              <Clock className="w-4 h-4 opacity-50 bg-background" />
            </div>
            <Input type="time" className="block" placeholder={props.placeholder} {...field} />
          </div>
          {/* </PopoverContent>
          </Popover> */}
          {props.description && <FormDescription>{props.description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormTimeItem;
