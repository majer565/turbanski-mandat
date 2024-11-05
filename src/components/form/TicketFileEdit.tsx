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
import { useGetTicketByNumber } from "../../hooks/useGetTicket";
import FlexRow from "../wrappers/FlexRowWrapper";
import TicketFileEditForm from "./TicketFileEditForm";

const TicketFileEdit = () => {
  const params = useParams();
  const router = useRouter();

  const { data, isLoading, isError } = useGetTicketByNumber(
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
      <TicketFileEditForm number={data?.number} />
    </>
  );
};

export default TicketFileEdit;
