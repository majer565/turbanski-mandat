"use client";

import { Trash } from "lucide-react";
import { Button } from "../../../ui/button";
import { DataTablePopoverContentProps } from "../DataTableFilterPopoverContent";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn, resolveDateFromString } from "@/lib/utils";
import { pl } from "date-fns/locale";

const DateContent = (props: DataTablePopoverContentProps) => {
  const handleSelect = (value: DateRange | undefined) => {
    const from = value?.from || new Date();
    const to = value?.to || new Date();

    props.handleValueChange([String(from), String(to)]);
  };

  const date: DateRange | undefined = resolveDateFromString(props.value);
  // const date: DateRange | undefined = resolveDateFromString(props.value, "LLL dd, y");

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <span className="text-xs h-3 pl-1 opacity-50">{props.label}</span>
        <Button className="h-6 w-6" variant="ghost" size="icon" onClick={() => props.onRemove()}>
          <Trash className="w-3 h-3 opacity-50" />
        </Button>
      </div>
      <div className={cn("grid gap-2")}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y", { locale: pl })} - {format(date.to, "LLL dd, y", { locale: pl })}
                  </>
                ) : (
                  format(date.from, "LLL dd, y", { locale: pl })
                )
              ) : (
                <span>Wybierz datę</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={(val) => handleSelect(val)}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default DateContent;
