"use client";

import { getDrivers } from "@/actions/getDrivers";
import { saveTicket } from "@/actions/saveTickets";
import { uploadFile } from "@/actions/uploadFile";
import { ticketSchema } from "@/lib/form/ticket-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { useToast } from "../ui/use-toast";
import FormComboboxItem from "./form-items/form-combobox-item";
import FormDateItem from "./form-items/form-date-item";
import FormFileItem from "./form-items/form-file-item";
import FormInputItem from "./form-items/form-input-item";
import FormTimeItem from "./form-items/form-time-item";

const TicketForm = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const { data: driversOptions } = useQuery({ queryKey: ["getDrivers"], queryFn: getDrivers });
  const mutation = useMutation({
    mutationFn: saveTicket,
    onError: (e) => {
      toast({
        variant: "destructive",
        title: "Błąd | Nie udało się zapisać mandatu",
        description: e.message,
      });
      setLoading(false);
    },
    onSuccess: (data) => {
      form.reset(defaultValues);
      setPdfFile(null);
      toast({
        variant: "default",
        title: "Pomyślnie zapisano mandat",
        description: `Mandat o numerze ${data.number} został zapisany.`,
      });
      setLoading(false);
    },
  });

  const defaultValues = {
    number: "",
    date: "",
    time: "",
    vehiclePlate: "",
    amount: "",
    currency: "",
    postPayoutDate: "",
    file: "",
    driverId: "",
  };

  const form = useForm<z.infer<typeof ticketSchema>>({
    resolver: zodResolver(ticketSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof ticketSchema>) => {
    setLoading(true);
    try {
      if (!pdfFile) throw new Error("Nie udało się wczytać poprawnie pliku");
      const savedFile = await uploadFile(pdfFile);

      const amount = Number(values.amount) || null;
      const driverId = Number(values.driverId) || null;

      if (!amount) throw new Error("Kwota mandatu nie może być równa NULL");
      if (!driverId) throw new Error("Identyfikator kierowcy nie może być równy NULL");

      mutation.mutate({
        number: values.number,
        date: values.date,
        time: values.time,
        vehiclePlate: values.vehiclePlate,
        amount,
        currency: values.currency,
        postPayoutDate: values.postPayoutDate,
        file: savedFile,
        driverId,
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-x-16 gap-y-8">
          <FormInputItem form={form} label="Numer mandatu" name="number" placeholder="Wprowadź numer" />
          <FormDateItem form={form} label="Data mandatu" name="date" placeholder="Wybierz datę" />
          <FormTimeItem form={form} label="Godzina mandatu" name="time" placeholder="Wybierz godzinę" />
          <FormInputItem form={form} label="Numer rejestracyjny" name="vehiclePlate" placeholder="Wprowadź numer" />
          <FormInputItem
            form={form}
            label="Kwota mandatu"
            type="number"
            min="0"
            name="amount"
            placeholder="Wprowadź kwotę"
          />
          <FormComboboxItem
            form={form}
            label="Waluta"
            name="currency"
            placeholder="Wybierz walutę"
            options={[
              { value: "EUR", label: "EUR" },
              { value: "PLN", label: "PLN" },
            ]}
          />
          <FormDateItem form={form} label="Data płatności poczty" name="postPayoutDate" placeholder="Wybierz datę" />
          <FormFileItem form={form} label="Plik" name="file" placeholder="Dodaj plik" setFile={setPdfFile} />
          <FormComboboxItem
            form={form}
            label="Kierowca"
            name="driverId"
            placeholder="Wybierz kierowcę"
            options={driversOptions?.map((a) => ({ value: String(a.id), label: `${a.name} ${a.surname}` })) ?? []}
          />
          <div className="col-start-1 col-end-3 flex justify-center">
            <Button type="submit" disabled={loading} className="w-1/4">
              {loading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : "Dodaj mandat"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TicketForm;
