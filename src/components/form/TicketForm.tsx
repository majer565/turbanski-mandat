"use client";

import { ticketSchema } from "@/lib/form/ticket-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import FormInputItem from "./form-items/form-input-item";
import FormComboboxItem from "./form-items/form-combobox-item";

const TicketForm = () => {
  const form = useForm<z.infer<typeof ticketSchema>>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      number: "",
      currency: "",
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
