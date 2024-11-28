"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useParams, useRouter } from "next/navigation";
import { FadeLoader } from "react-spinners";
import FlexRow from "../wrappers/FlexRowWrapper";
import TicketFileEditForm from "./TicketFileEditForm";
import { useGetTicketById } from "../../hooks/useGetTicket";

const TicketFileEdit = () => {
  const params = useParams();
  const router = useRouter();

  const { data, isLoading, isError } = useGetTicketById(
    params.id as string
  );

  if (isLoading)
    return (
      <FlexRow className="justify-center">
        <FadeLoader width={5} height={10} />
      </FlexRow>
    );

  const handleClose = () => {
    router.push("/mandaty");
  };

  return (
    <>
      <AlertDialog open={isError} onOpenChange={handleClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Wystąpił błąd</AlertDialogTitle>
            <AlertDialogDescription>
              Nie znaleziono mandatu o podanym numerze.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <TicketFileEditForm id={data?.id} />
    </>
  );
};

export default TicketFileEdit;
