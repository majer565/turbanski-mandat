"use client";

import { driverSchema } from "@/lib/form/driver-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Driver } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateDriver } from "../../actions/updateDriver";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { useToast } from "../ui/use-toast";
import FormInputItem from "./form-items/form-input-item";

interface DriverEditFormProps {
  defaultData?: Driver;
  closeDialog: () => void;
}

const defaultValues: Driver = {
  id: -1,
  name: "",
  surname: "",
};

const DriverEditForm = ({ defaultData, closeDialog }: DriverEditFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateDriver,
    onError: (e) => {
      toast({
        variant: "destructive",
        title: "Błąd | Nie udało się edytować kierowcy",
        description:
          "Wystąpił błąd podczas edycji kierowcy. Spróbuj ponownie. Jeśli problem będzie się powtarzał, skontaktuj się z administratorem.",
      });
      setLoading(false);
    },
    onSuccess: (data: Driver) => {
      form.reset(defaultValues);
      toast({
        variant: "default",
        title: "Pomyślnie edytowano kierowcę",
        description: `Kierowca ${data.name} ${data.surname} został zauktualizowany`,
      });
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
      setLoading(false);
      closeDialog();
    },
  });

  const form = useForm<z.infer<typeof driverSchema>>({
    resolver: zodResolver(driverSchema),
    defaultValues: defaultData || defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof driverSchema>) => {
    setLoading(true);
    try {
      mutation.mutate({
        id: defaultData?.id || -1,
        name: values.name,
        surname: values.surname,
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Błąd | Nie udało się edytować kierowcy",
        description:
          "Wystąpił błąd podczas edycji kierowcy. Spróbuj ponownie. Jeśli problem będzie się powtarzał, skontaktuj się z administratorem.",
      });
      setLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-1"
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
          <Button type="submit" disabled={loading} className="w-1/4">
            {loading ? (
              <LoaderCircle className="w-4 h-4 animate-spin" />
            ) : (
              "Edytuj kierowcę"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default DriverEditForm;
