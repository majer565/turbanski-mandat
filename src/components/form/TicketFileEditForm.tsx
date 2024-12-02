"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { removeFile } from "../../actions/removeFile";
import { updateTicketFile } from "../../actions/updateTicketFile";
import { uploadFile } from "../../actions/uploadFile";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { useToast } from "../ui/use-toast";
import FormFileItem from "./form-items/form-file-item";

interface TicketEditFormProps {
  id?: number;
  closeDialog: () => void;
}

const TicketFileEditForm = ({ id, closeDialog }: TicketEditFormProps) => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateTicketFile,
    onError: (e) => {
      toast({
        variant: "destructive",
        title: "Błąd | Nie udało się edytować pliku",
        description: e.message,
      });
      setLoading(false);
    },
    onSuccess: (data) => {
      form.reset({ filename: "", id: data.id });
      toast({
        variant: "default",
        title: "Pomyślnie zaktualizowano mandat",
        description: `Mandat o numerze ${data.number} został zaktualizowany`,
      });
      queryClient.invalidateQueries({ queryKey: ["tickets", 'ticket', id] });
      setLoading(false);
      closeDialog();
    },
  });

  const fileSchema = z.object({
    id: z.number().default(id || -1),
    filename: z.string(),
  });

  const form = useForm<z.infer<typeof fileSchema>>({
    resolver: zodResolver(fileSchema),
    defaultValues: { filename: "" },
  });

  const onSubmit = async (values: z.infer<typeof fileSchema>) => {
    setLoading(true);
    let savedFile: string | null = null;

    try {
      if (!pdfFile) throw new Error("Nie udało się wczytać poprawnie pliku");
      savedFile = await uploadFile(pdfFile);
      if (!savedFile) throw new Error("Nie udało się zapisać pliku");
      if (!values.id) throw new Error("Nie udało się pobrać numeru mandatu");

      const ticketFile = {
        id: values.id,
        file: savedFile,
      };

      mutation.mutate(ticketFile);
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
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2"
        >
          <FormFileItem
            form={form}
            label="Plik"
            name="file"
            className="w-[27rem]"
            placeholder="Dodaj plik"
            setFile={setPdfFile}
          />
          <Button type="submit" disabled={loading} className="w-1/4">
            {loading ? (
              <LoaderCircle className="w-4 h-4 animate-spin" />
            ) : (
              "Edytuj mandat"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TicketFileEditForm;
