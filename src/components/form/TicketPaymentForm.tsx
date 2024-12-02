"use client";

import { saveDriver } from "@/actions/saveDriver";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { useToast } from "../ui/use-toast";
import FormDateItem from "./form-items/form-date-item";
import { updateTicketPayment } from "../../actions/updateTicketPayment";

const TicketPaymentForm = ({
  id: ticketId,
  closeDialog,
}: {
  id: number;
  closeDialog: () => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateTicketPayment,
    onError: (e) => {
      toast({
        variant: "destructive",
        title: "Błąd | Nie udało się zmienić statusu płatności",
        description:
          "Wystąpił błąd podczas zmiany statusu płatności. Spróbuj ponownie. Jeśli problem będzie się powtarzał, skontaktuj się z administratorem.",
      });
      setLoading(false);
    },
    onSuccess: (_data) => {
      form.reset(defaultValues);
      toast({
        variant: "default",
        title: "Pomyślnie zmianiono status płatności",
        description: `Status płatności został zatwierdzony.`,
      });
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      setLoading(false);
      closeDialog();
    },
  });

  const defaultValues = {
    id: ticketId,
    paymentDate: "",
  };

  const ticketPaymentSchema = z.object({
    id: z.number({ required_error: "To pole jest wymagane" }),
    paymentDate: z
      .string({ required_error: "To pole jest wymagane" })
      .min(2, { message: "To pole jest wymagane" }),
  });

  const form = useForm<z.infer<typeof ticketPaymentSchema>>({
    resolver: zodResolver(ticketPaymentSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof ticketPaymentSchema>) => {
    setLoading(true);
    try {
      mutation.mutate({
        id: defaultValues.id,
        paymentDate: values.paymentDate,
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Błąd | Nie udało się zmienić statusu płatności",
        description:
          "Wystąpił błąd podczas zmiany statusu płatności. Spróbuj ponownie. Jeśli problem będzie się powtarzał, skontaktuj się z administratorem.",
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
          <FormDateItem
            form={form}
            label="Data płatności"
            name="paymentDate"
            placeholder="Wybierz datę"
          />
          <div>
            <Button type="submit" disabled={loading} className="w-1/2">
              {loading ? (
                <LoaderCircle className="w-4 h-4 animate-spin" />
              ) : (
                "Zmień status płatności"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TicketPaymentForm;
