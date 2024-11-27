"use client";

import { saveTicket } from "@/actions/saveTicket";
import { uploadFile } from "@/actions/uploadFile";
import { useGetDrivers } from "@/hooks/useGetDrivers";
import { ticketSchema } from "@/lib/form/ticket-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle, UserRoundPlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getTicketByName } from "../../actions/getTicketByName";
import { removeFile } from "../../actions/removeFile";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { useToast } from "../ui/use-toast";
import FormComboboxItem from "./form-items/form-combobox-item";
import FormDateItem from "./form-items/form-date-item";
import FormFileItem from "./form-items/form-file-item";
import FormInputItem from "./form-items/form-input-item";
import FormSelectItem from "./form-items/form-select-item";
import FormTimeItem from "./form-items/form-time-item";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import DriverForm from "./DriverForm";

const TicketForm = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const { data: driversOptions } = useGetDrivers();
  const queryClient = useQueryClient();
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
        description: `Mandat o numerze ${data.number} został zapisany`,
      });
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
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
    payment: "",
    driverId: "",
  };

  const form = useForm<z.infer<typeof ticketSchema>>({
    resolver: zodResolver(ticketSchema),
    defaultValues,
  });

  const payment = form.watch("payment");

  useEffect(() => {
    if (payment === "Nieopłacone") form.setValue("paymentDate", undefined);
  }, [payment]);

  const onSubmit = async (values: z.infer<typeof ticketSchema>) => {
    setLoading(true);
    let savedFile: string | null = null;

    try {
      const amount = Number(values.amount) || null;
      const driverId = Number(values.driverId) || null;

      if (!amount) throw new Error("Kwota mandatu nie może być równa NULL");
      if (!driverId)
        throw new Error("Identyfikator kierowcy nie może być równy NULL");

      const ticketInDb = await getTicketByName(values.number);
      if (ticketInDb?.number)
        throw new Error("Mandat o takim numerze już istnieje");

      if (!pdfFile) throw new Error("Nie udało się wczytać poprawnie pliku");
      savedFile = await uploadFile(pdfFile);
      if (!savedFile) throw new Error("Nie udało się zapisać pliku");

      mutation.mutate({
        number: values.number,
        date: values.date,
        time: values.time,
        vehiclePlate: values.vehiclePlate,
        amount,
        currency: values.currency,
        postPayoutDate: values.postPayoutDate,
        file: savedFile,
        payment: values.payment,
        paymentDate: values.paymentDate || null,
        driverId,
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Błąd | Nie udało się zapisać mandatu",
        description: String(e),
      });

      if (savedFile !== null) await removeFile(savedFile);
      setLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          ref={formRef}
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-x-16 gap-y-2"
        >
          <FormInputItem
            form={form}
            label="Numer mandatu"
            name="number"
            placeholder="Wprowadź numer"
          />
          <FormInputItem
            form={form}
            label="Numer rejestracyjny"
            name="vehiclePlate"
            placeholder="Wprowadź numer"
          />
          <FormDateItem
            form={form}
            label="Data mandatu"
            name="date"
            placeholder="Wybierz datę"
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
          <FormTimeItem
            form={form}
            label="Godzina mandatu"
            name="time"
            placeholder="Wybierz godzinę"
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
          <FormInputItem
            form={form}
            label="Kwota mandatu"
            type="number"
            min="0"
            name="amount"
            placeholder="Wprowadź kwotę"
          />
          <FormDateItem
            form={form}
            label="Data płatności"
            name="paymentDate"
            placeholder="Wybierz datę"
            disabled={payment === "Nieopłacone"}
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
          <FormFileItem
            form={form}
            label="Plik"
            name="file"
            placeholder="Dodaj plik"
            setFile={setPdfFile}
          />
          <FormDateItem
            form={form}
            label="Data wpływu poczty"
            name="postPayoutDate"
            placeholder="Wybierz datę"
          />
        </form>
      </Form>
      <div className="mt-8 flex flex-col gap-4 justify-center">
        <Separator />
        <div className="flex justify-between">
          <Button
            type="submit"
            disabled={loading}
            className="w-1/4"
            onClick={() => formRef.current?.requestSubmit()}
          >
            {loading ? (
              <LoaderCircle className="w-4 h-4 animate-spin" />
            ) : (
              "Dodaj mandat"
            )}
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="bg-transparent"
                type="button"
                variant="outline"
              >
                <UserRoundPlus className="w-4 h-4 mr-2" />
                <span>Dodaj kierowcę</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[500px]">
              <SheetHeader>
                <SheetTitle>Dodaj kierowcę z panelu mandatu</SheetTitle>
                <SheetDescription className="mb-3">
                  W tym panelu możesz dodać kierowcę bezpośrednio, bez konieczności odwiedzania
                  strony wszystkich kierowców.
                </SheetDescription>
                <DriverForm />
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default TicketForm;
