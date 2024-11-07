"use client";

import * as React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { HomeData } from "../wrappers/home-wrapper";
import { compareTwoValuesToPercent } from "../../lib/utils";

const chartConfig = {
  tickets: {
    label: "Mandaty",
  },
  paid: {
    label: "Opłacone",
    color: "hsl(var(--chart-1))",
  },
  unpaid: {
    label: "Nieopłacone",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const HomeCharts = ({ tickets, isLoading, isError }: HomeData) => {
  const totalVisitors = tickets ? tickets.length : 0;

  const getPaidTickets = () => {
    return tickets?.filter((ticket) => ticket.payment === "Opłacone").length;
  };

  const getUnpaidTickets = () => {
    return tickets?.filter((ticket) => ticket.payment === "Nieopłacone").length;
  };

  const chartData = [
    { payment: "paid", tickets: getPaidTickets(), fill: "hsl(var(--chart-2))" },
    {
      payment: "unpaid",
      tickets: getUnpaidTickets(),
      fill: "hsl(var(--chart-1))",
    },
  ];

  const getTicketTrending = () => {
    const previousYear = new Date().getFullYear() - 1;
    const currentYear = new Date().getFullYear();

    const previousYearTickets = tickets?.filter(
      (ticket) => new Date(ticket.date).getFullYear() === previousYear
    ).length;
    const currentYearTickets = tickets?.filter(
      (ticket) => new Date(ticket.date).getFullYear() === currentYear
    ).length;

    if (previousYearTickets === undefined || currentYearTickets === undefined)
      return "";

    const trendPercent = compareTwoValuesToPercent(previousYearTickets, currentYearTickets);

    if (previousYearTickets > currentYearTickets)
      return (
        <div className="flex items-center gap-2 font-medium leading-none">
          Spadek {trendPercent}% w skali roku{" "}
          <TrendingDown className="h-4 w-4" />
        </div>
      );
    else {
      return (
        <div className="flex items-center gap-2 font-medium leading-none">
          Wzrost {trendPercent}% w skali roku <TrendingUp className="h-4 w-4" />
        </div>
      );
    }
  };

  return (
    <Card className="flex flex-col border-border bg-transparent w-[30rem]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Liczba mandatów</CardTitle>
        <CardDescription>Rok {new Date().getFullYear()}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="tickets"
              nameKey="payment"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Mandaty
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {getTicketTrending()}
        <div className="leading-none text-muted-foreground">
          Prezentacja mandatów z obecnego roku.
        </div>
      </CardFooter>
    </Card>
  );
};

export default HomeCharts;
