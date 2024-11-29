"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Ticket } from "@prisma/client";
import TicketPaymentForm from "./TicketPaymentForm";

interface TicketPaymentSheet {
  ticket?: Ticket;
  handleOpenChange: (open: boolean) => void;
}

const TicketPaymentSheet = ({
  ticket,
  handleOpenChange,
}: TicketPaymentSheet) => {
  return (
    <Sheet open={ticket !== undefined} onOpenChange={handleOpenChange}>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Mandat {ticket?.number}</SheetTitle>
          <SheetDescription className="pb-3">
            W tym miejscu możesz podać datę płatności i zmienić status na
            opłacony.
          </SheetDescription>
          <TicketPaymentForm id={ticket?.id || -1} closeDialog={() => handleOpenChange(false)} />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default TicketPaymentSheet;
