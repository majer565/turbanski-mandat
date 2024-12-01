"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetDriverTicketsCount } from "../../hooks/useGetDriverTicketsCount";
import { Skeleton } from "../ui/skeleton";

const HomeDriversStatsTable = () => {
  const { data, isLoading, isError } = useGetDriverTicketsCount();

  if (isLoading)
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[230px]">Kierowca</TableHead>
            <TableHead className="text-right w-[100px]">
              Liczba mandatów
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3, 4, 5].map((id) => (
            <TableRow key={id}>
              <TableCell>
                <Skeleton className="h-4 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );

  if (isError)
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[230px]">Kierowca</TableHead>
            <TableHead className="text-right w-[100px]">
              Liczba mandatów
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={4} className="font-medium text-center">
              Wystąpił błąd podczas pobierania danych. Spróbuj ponownie.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

  return (
    <Card className="flex flex-col border-border bg-transparent w-[30rem]">
      <CardContent className="flex-1 pb-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[230px]">Kierowca</TableHead>
              <TableHead className="text-right w-[200px]">
                Liczba mandatów
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((driversCount, idx) => (
              <TableRow key={`${idx}-row-for-driver-tickets-count`}>
                <TableCell className="font-medium">
                  {driversCount.driver}
                </TableCell>
                <TableCell className="text-right">
                  {driversCount.tickets}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="bg-transparent">
            <TableRow className="text-center">
              <TableCell colSpan={2} className="text-sm">
                Top 5 kierowców z największą liczbą mandatów
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
};

export default HomeDriversStatsTable;
