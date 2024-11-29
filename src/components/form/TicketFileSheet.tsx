"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Ticket } from "@prisma/client";
import TicketFileEditForm from "./TicketFileEditForm";

interface TicketFileSheetProps {
  ticket?: Ticket;
  handleOpenChange: (open: boolean) => void;
}

const TicketFileSheet = ({
  ticket,
  handleOpenChange,
}: TicketFileSheetProps) => {
  return (
    <Sheet open={ticket !== undefined} onOpenChange={handleOpenChange}>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Mandat {ticket?.number}</SheetTitle>
          <SheetDescription className="pb-3">
            Wybierz nowy plik PDF do zapisania.
          </SheetDescription>
          <TicketFileEditForm
            id={ticket?.id || -1}
            closeDialog={() => handleOpenChange(false)}
          />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default TicketFileSheet;
