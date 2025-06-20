"use client";

import { saveTicket } from "@/actions/saveTicket";
import { uploadFile } from "@/actions/uploadFile";
import { useGetDrivers } from "@/hooks/useGetDrivers";
import { ticketSchema } from "@/lib/form/ticket-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Ban,
  CircleCheck,
  CircleDot,
  CircleHelp,
  LoaderCircle,
  RefreshCw,
  UserRoundPlus,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { findFormTicket } from "../../actions/findFormTicket";
import { useCheckTicketIfExists } from "../../hooks/useCheckTicketIfExists";

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
        description:
          "Wystąpił błąd podczas zapisywania mandatu. Spróbuj ponownie. Jeśli problem będzie się powtarzał, skontaktuj się z administratorem.",
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
    isSalaryCut: "",
  };

  const form = useForm<z.infer<typeof ticketSchema>>({
    resolver: zodResolver(ticketSchema),
    defaultValues,
  });

  const watchNumber = form.watch("number");
  const watchDate = form.watch("date");
  const watchTime = form.watch("time");
  const payment = form.watch("payment");

  const {
    data: isTicketInDb,
    isLoading: isTicketInDbLoading,
    error: isTicketInDbError,
  } = useCheckTicketIfExists(watchNumber, watchDate, watchTime);

  useEffect(() => {
    if (watchNumber && watchDate && watchTime) {
      queryClient.invalidateQueries({
        queryKey: ["checkTicket", watchNumber, watchDate, watchTime],
      });
    }
  }, [watchNumber, watchDate, watchTime, queryClient]);

  useEffect(() => {
    if (payment === "Nieopłacone") form.setValue("paymentDate", undefined);
  }, [form, payment]);

  const onSubmit = async (values: z.infer<typeof ticketSchema>) => {
    setLoading(true);
    let savedFile: string | null = null;

    try {
      const amount = Number(values.amount) || null;
      const driverId = Number(values.driverId) || null;

      if (!amount) throw new Error("Kwota mandatu nie może być równa NULL");
      if (!driverId)
        throw new Error("Identyfikator kierowcy nie może być równy NULL");

      const ticketInDb = await findFormTicket({
        number: values.number,
        date: values.date,
        time: values.time,
      });
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
        isSalaryCut: values.isSalaryCut,
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Błąd | Nie udało się zapisać mandatu",
        description:
          "Wystąpił błąd podczas zapisywania mandatu. Spróbuj ponownie. Jeśli problem będzie się powtarzał, skontaktuj się z administratorem.",
      });

      if (savedFile !== null) await removeFile(savedFile);
      setLoading(false);
    }
  };

  const getTicketStatusFooter = () => {
    if (isTicketInDbLoading) {
      return (
        <>
          <RefreshCw className="w-4 h-4 animate-spin text-primary" />
          <span>Trwa sprawdzanie mandatu...</span>
        </>
      );
    }

    if (isTicketInDbError) {
      return (
        <>
          <CircleDot className="w-4 h-4 text-destructive" />
          <span className="text-destructive">
            Wystąpił błąd podczas sprawdzania mandatu.
          </span>
        </>
      );
    }

    if (isTicketInDb?.isInDb === undefined) {
      return (
        <>
          <CircleHelp className="w-6 h-6" />
          <span>Wprowadź numer, datę oraz godzinę mandatu.</span>
        </>
      );
    }

    if (isTicketInDb?.isInDb) {
      return (
        <>
          <Ban className="w-4 h-4 text-destructive" />
          <span>Mandat o takich danych już istnieje.</span>
        </>
      );
    } else {
      return (
        <>
          <CircleCheck className="w-6 h-6 text-success" />
          <span>Brak mandatu w bazie.</span>
        </>
      );
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
            step="0.01"
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
          <FormSelectItem
            form={form}
            label="Odliczone od wypłaty"
            name="isSalaryCut"
            placeholder="Wybierz opcję"
            options={[
              { value: "Tak", label: "Tak" },
              { value: "Nie", label: "Nie" },
            ]}
          />
        </form>
      </Form>
      <div className="mt-8 flex flex-col gap-4 justify-center">
        <Separator />
        <div className="flex justify-between">
          <div className="w-1/3 items-center flex gap-2 text-sm">
            {getTicketStatusFooter()}
          </div>
          <div className="flex gap-4 w-2/3 justify-end">
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
                    W tym panelu możesz dodać kierowcę bezpośrednio, bez
                    konieczności odwiedzania strony wszystkich kierowców.
                  </SheetDescription>
                  <DriverForm />
                </SheetHeader>
              </SheetContent>
            </Sheet>
            <Button
              type="submit"
              disabled={loading}
              className="w-1/2"
              onClick={() => formRef.current?.requestSubmit()}
            >
              {loading ? (
                <LoaderCircle className="w-4 h-4 animate-spin" />
              ) : (
                "Dodaj mandat"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketForm;
