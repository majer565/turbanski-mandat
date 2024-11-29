"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCheck } from "lucide-react";
import { formatDateValueToString } from "../../lib/utils";
import { Skeleton } from "../ui/skeleton";
import { HomeData } from "../wrappers/home-wrapper";
import TicketPaymentSheet from "../form/TicketPaymentSheet";
import { useState } from "react";
import { Ticket } from "@prisma/client";

const HomeTable = ({ tickets, isLoading, isError }: HomeData) => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>();

  if (isLoading)
    return (
      <Table>
        <TableCaption>Lista nieopłaconych mandatów.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[230px]">Numer</TableHead>
            <TableHead>Data wpływu poczty</TableHead>
            <TableHead className="w-[100px]">Kwota</TableHead>
            <TableHead className="text-right w-[100px]">Waluta</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
            <TableRow key={id}>
              <TableCell>
                <Skeleton className="h-4 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Razem</TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-4 w-full" />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );

  if (isError)
    return (
      <Table>
        <TableCaption>Lista nieopłaconych mandatów.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[230px]">Numer</TableHead>
            <TableHead>Data wpływu poczty</TableHead>
            <TableHead className="w-[100px]">Kwota</TableHead>
            <TableHead className="text-right w-[100px]">Waluta</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={4} className="font-medium text-center">
              Wystąpił błąd podczas pobierania danych. Spróbuj ponownie.
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Razem</TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-4 w-full" />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );

  const unpaidTickets =
    tickets?.filter((ticket) => ticket.payment === "Nieopłacone") || [];

  if (!unpaidTickets)
    return (
      <Table>
        <TableCaption>Lista nieopłaconych mandatów.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[230px]">Numer</TableHead>
            <TableHead>Data wpływu poczty</TableHead>
            <TableHead className="w-[100px]">Kwota</TableHead>
            <TableHead className="text-right w-[100px]">Waluta</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={4} className="font-medium text-center">
              <div className="flex justify-center gap-2 items-center">
                Brak nieopłaconych mandatów
                <CheckCheck className="w-4 h-4 text-primary" />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Razem</TableCell>
            <TableCell className="text-right">0</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );

  const handleOpenChange = (_isClosed: boolean) => {
    setSelectedTicket(undefined);
  };

  const handleRowClick = (rowTicket: Ticket) => {
    setSelectedTicket(rowTicket);
  };

  return (
    <>
      <TicketPaymentSheet
        ticket={selectedTicket}
        handleOpenChange={handleOpenChange}
      />
      <Table>
        <TableCaption>Lista nieopłaconych mandatów.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[230px]">Numer</TableHead>
            <TableHead>Data wpływu poczty</TableHead>
            <TableHead className="w-[100px]">Kwota</TableHead>
            <TableHead className="text-right w-[100px]">Waluta</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {unpaidTickets.map((ticket) => (
            <TableRow
              key={ticket.id}
              className="cursor-pointer"
              onClick={() => handleRowClick(ticket)}
            >
              <TableCell className="font-medium">{ticket.number}</TableCell>
              <TableCell>
                {formatDateValueToString(ticket.postPayoutDate)}
              </TableCell>
              <TableCell>{ticket.amount}</TableCell>
              <TableCell className="text-right">{ticket.currency}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Razem</TableCell>
            <TableCell className="text-right">{unpaidTickets.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default HomeTable;
