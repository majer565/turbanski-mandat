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
import { Ticket } from "@prisma/client";
import { CheckCheck } from "lucide-react";
import { useState } from "react";
import { formatDateValueToString } from "../../lib/utils";
import TicketPaymentSheet from "../form/TicketPaymentSheet";
import { Skeleton } from "../ui/skeleton";
import { HomeData } from "../wrappers/home-wrapper";

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
            <TableHead className="text-right w-[130px]">
              Dni od wpływu
            </TableHead>
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
              <TableCell>
                <Skeleton className="h-4 w-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Razem</TableCell>
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
            <TableHead className="text-right w-[100px]">
              Dni od wpływu
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={5} className="font-medium text-center">
              Wystąpił błąd podczas pobierania danych. Spróbuj ponownie.
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Razem</TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-4 w-full" />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );

  const unpaidTickets =
    tickets
      ?.filter(({ payment }) => payment === "Nieopłacone")
      ?.sort(
        (a, b) =>
          new Date(a.postPayoutDate).getTime() -
          new Date(b.postPayoutDate).getTime()
      ) || [];

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
            <TableHead className="text-right w-[100px]">
              Dni od wpływu
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={5} className="font-medium text-center">
              <div className="flex justify-center gap-2 items-center">
                Brak nieopłaconych mandatów
                <CheckCheck className="w-4 h-4 text-primary" />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Razem</TableCell>
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

  const getDateCellFromPostPayoutDate = (postPayoutDate: string) => {
    const postDate = new Date(postPayoutDate);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - postDate.getTime());
    const daysFrom = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return (
      <TableCell
        className={`font-medium text-right ${
          daysFrom <= 1 && "text-yellow-500"
        } ${daysFrom > 1 && daysFrom <= 3 && "text-orange-500"} ${
          daysFrom > 3 && "text-red-600"
        }`}
      >
        {daysFrom}
      </TableCell>
    );
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
            <TableHead className="text-right w-[130px]">
              Dni od wpływu
            </TableHead>
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
              {getDateCellFromPostPayoutDate(ticket.postPayoutDate)}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Razem</TableCell>
            <TableCell className="text-right">{unpaidTickets.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default HomeTable;
