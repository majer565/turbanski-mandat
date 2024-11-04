"use client";

import { saveTicket } from "@/actions/saveTicket";
import { useGetDrivers } from "@/hooks/useGetDrivers";
import { ticketSchema } from "@/lib/form/ticket-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ticket } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { useToast } from "../ui/use-toast";
import FormComboboxItem from "./form-items/form-combobox-item";
import FormDateItem from "./form-items/form-date-item";
import FormInputItem from "./form-items/form-input-item";
import FormSelectItem from "./form-items/form-select-item";
import FormTimeItem from "./form-items/form-time-item";
import { updateTicket } from "../../actions/updateTicket";

export interface FormTicket
  extends Omit<Ticket, "amount" | "driverId" | "paymentDate"> {
  amount: string;
  driverId: string;
  paymentDate?: string;
}

interface TicketEditFormProps {
  defaultData?: FormTicket;
}

const defaultValues: FormTicket = {
  id: -1,
  number: "",
  date: "",
  time: "",
  vehiclePlate: "",
  amount: "",
  currency: "",
  postPayoutDate: "",
  file: "",
  payment: "",
  driverId: "-1",
};

const TicketEditForm = ({ defaultData }: TicketEditFormProps) => {
  const [ticket, setTicket] = useState<FormTicket>(
    defaultData || defaultValues
  );
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const { data: driversOptions } = useGetDrivers();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateTicket,
    onError: (e) => {
      toast({
        variant: "destructive",
        title: "Błąd | Nie udało się edytować mandatu",
        description: e.message,
      });
      setLoading(false);
    },
    onSuccess: (data) => {
      form.reset(ticket);
      toast({
        variant: "default",
        title: "Pomyślnie edytowano mandat",
        description: `Mandat o numerze ${data.number} został zaktualizowany`,
      });
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      setLoading(false);
    },
  });

  const form = useForm<z.infer<typeof ticketSchema>>({
    resolver: zodResolver(ticketSchema),
    defaultValues: ticket,
  });

  const payment = form.watch("payment");

  useEffect(() => {
    if (payment === "Nieopłacone") form.setValue("paymentDate", undefined);
  }, [payment]);

  const onSubmit = async (values: z.infer<typeof ticketSchema>) => {
    setLoading(true);

    try {
      const amount = Number(values.amount) || null;
      const driverId = Number(values.driverId) || null;

      if (!amount) throw new Error("Kwota mandatu nie może być równa NULL");
      if (!driverId)
        throw new Error("Identyfikator kierowcy nie może być równy NULL");

      const ticketToSave = {
        id: defaultData?.id || -1,
        number: values.number,
        date: values.date,
        time: values.time,
        vehiclePlate: values.vehiclePlate,
        amount,
        currency: values.currency,
        postPayoutDate: values.postPayoutDate,
        payment: values.payment,
        paymentDate: values.paymentDate || null,
        driverId,
      };

      mutation.mutate({ ...ticketToSave, file: defaultValues.file });
      setTicket({
        ...ticketToSave,
        amount: String(amount),
        driverId: String(driverId),
        paymentDate: values.paymentDate || undefined,
        file: defaultValues.file,
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Błąd | Nie udało się zapisać mandatu",
        description: String(e),
      });

      setLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-x-16 gap-y-8"
        >
          <FormInputItem
            form={form}
            label="Numer mandatu"
            name="number"
            placeholder="Wprowadź numer"
          />
          <FormDateItem
            form={form}
            label="Data mandatu"
            name="date"
            placeholder="Wybierz datę"
          />
          <FormTimeItem
            form={form}
            label="Godzina mandatu"
            name="time"
            placeholder="Wybierz godzinę"
          />
          <FormInputItem
            form={form}
            label="Numer rejestracyjny"
            name="vehiclePlate"
            placeholder="Wprowadź numer"
          />
          <FormInputItem
            form={form}
            label="Kwota mandatu"
            type="number"
            min="0"
            name="amount"
            placeholder="Wprowadź kwotę"
          />
          <FormSelectItem
            form={form}
            label="Waluta"
            name="currency"
            placeholder="Wybierz walutę"
            options={[
              { value: "EUR", label: "EUR" },
              { value: "PLN", label: "PLN" },
            ]}
          />
          <FormDateItem
            form={form}
            label="Data wpływu poczty"
            name="postPayoutDate"
            placeholder="Wybierz datę"
          />
          <FormSelectItem
            form={form}
            label="Płatność"
            name="payment"
            placeholder="Wybierz status płatności"
            options={[
              { value: "Opłacone", label: "Opłacone" },
              { value: "Nieopłacone", label: "Nieopłacone" },
            ]}
          />
          <FormDateItem
            form={form}
            label="Data płatności"
            name="paymentDate"
            placeholder="Wybierz datę"
            disabled={payment === "Nieopłacone"}
          />
          <FormComboboxItem
            form={form}
            label="Kierowca"
            name="driverId"
            placeholder="Wybierz kierowcę"
            options={
              driversOptions?.map((a) => ({
                value: String(a.id),
                label: `${a.name} ${a.surname}`,
              })) ?? []
            }
          />
          <div className="col-start-1 col-end-3 flex justify-center">
            <Button type="submit" disabled={loading} className="w-1/4">
              {loading ? (
                <LoaderCircle className="w-4 h-4 animate-spin" />
              ) : (
                "Edytuj mandat"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TicketEditForm;
