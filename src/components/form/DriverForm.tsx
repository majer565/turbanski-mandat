"use client";

import { saveDriver } from "@/actions/saveDriver";
import { driverSchema } from "@/lib/form/driver-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { useToast } from "../ui/use-toast";
import FormInputItem from "./form-items/form-input-item";

const DriverForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: saveDriver,
    onError: (e) => {
      toast({
        variant: "destructive",
        title: "Błąd | Nie udało się dodać kierowcy",
        description:
          "Wystąpił błąd podczas dodawania kierowcy. Spróbuj ponownie. Jeśli problem będzie się powtarzał, skontaktuj się z administratorem.",
      });
      setLoading(false);
    },
    onSuccess: (data) => {
      form.reset(defaultValues);
      toast({
        variant: "default",
        title: "Pomyślnie dodano kierowcę",
        description: `Kierowca ${data.name} ${data.surname} został dodany`,
      });
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
      setLoading(false);
    },
  });

  const defaultValues = {
    name: "",
    surname: "",
  };

  const form = useForm<z.infer<typeof driverSchema>>({
    resolver: zodResolver(driverSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof driverSchema>) => {
    setLoading(true);
    try {
      mutation.mutate({
        name: values.name,
        surname: values.surname,
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Błąd | Nie udało się dodać kierowcy",
        description:
          "Wystąpił błąd podczas dodawania kierowcy. Spróbuj ponownie. Jeśli problem będzie się powtarzał, skontaktuj się z administratorem.",
      });
      setLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2"
        >
          <FormInputItem
            form={form}
            label="Imię"
            name="name"
            placeholder="Wprowadź imię"
          />
          <FormInputItem
            form={form}
            label="Nazwisko"
            name="surname"
            placeholder="Wprowadź nazwisko"
          />
          <div>
            <Button type="submit" disabled={loading} className="w-1/2">
              {loading ? (
                <LoaderCircle className="w-4 h-4 animate-spin" />
              ) : (
                "Dodaj kierowcę"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DriverForm;
