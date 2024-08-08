"use client";

import { ticketSchema } from "@/lib/form/ticket-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import FormInputItem from "./form-items/form-input-item";
import FormComboboxItem from "./form-items/form-combobox-item";
import FormSelectItem from "./form-items/form-select-item";
import FormFileItem from "./form-items/form-file-item";
import FormDateItem from "./form-items/form-date-item";
import FormTimeItem from "./form-items/form-time-item";

//TODO:
//- change date saving format to Date
//- file item:
//  - save file only with submit button
//- make time item
const TicketForm = () => {
  const form = useForm<z.infer<typeof ticketSchema>>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      number: "",
      currency: "",
      date: "",
      file: "",
      time: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ticketSchema>) => {
    console.log(values);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-x-16 gap-y-8">
          <FormInputItem
            form={form}
            label="Number"
            name="number"
            placeholder="Enter number"
            description="This is number field."
          />
          <FormComboboxItem
            form={form}
            label="Waluta"
            name="currency"
            placeholder="Enter currency"
            description="This is currency field."
            options={[
              { value: "EUR", label: "EUR" },
              { value: "PLN", label: "PLN" },
            ]}
          />
          {/* <FormSelectItem
            form={form}
            label="Waluta"
            name="currency"
            placeholder="Enter currency"
            description="This is currency field."
            options={[
              { value: "EUR", label: "EUR" },
              { value: "PLN", label: "PLN" },
            ]}
          /> */}
          <FormFileItem
            form={form}
            label="Plik"
            name="file"
            placeholder="Dodaj plik"
            description="To jest pole pliku"
          />
          <FormDateItem form={form} label="Data" name="date" placeholder="Wybierz datę" description="To pole to data" />
          <FormTimeItem form={form} label="Cas" name="time" placeholder="Wybierz czas" description="To pole to czas" />
          <div className="col-start-1 col-end-3 flex justify-center">
            <Button type="submit" className="w-1/2">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TicketForm;
