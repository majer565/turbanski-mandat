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
import { useGetDriver } from "../../hooks/useGetDriver";
import FlexRow from "../wrappers/FlexRowWrapper";
import DriverForm from "./DriverForm";
import DriverEditForm from "./DriverEditForm";

const DriverEdit = () => {
  const params = useParams();
  const router = useRouter();

  const { data, isLoading, isError } = useGetDriver(params.id as string);

  if (isLoading)
    return (
      <FlexRow className="justify-center">
        <FadeLoader width={5} height={10} />
      </FlexRow>
    );

  const handleClose = () => {
    router.push("/kierowcy");
  };

  return (
    <>
      <AlertDialog open={isError} onOpenChange={handleClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Wystąpił błąd</AlertDialogTitle>
            <AlertDialogDescription>
              Nie znaleziono kierowcy o podanym identyfikatorze.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <DriverEditForm defaultData={data} />
    </>
  );
};

export default DriverEdit;
