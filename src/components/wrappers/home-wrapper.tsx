"use client";

import { Ticket } from "@prisma/client";
import { useGetTickets } from "../../hooks/useGetTickets";
import HomeCharts from "../charts/home-charts";
import HomeTable from "../tables/home-table";
import FlexRow from "./FlexRowWrapper";

export interface HomeData {
  tickets?: Ticket[];
  isLoading: boolean;
  isError: boolean;
}

const HomeWrapper = () => {
  const { data, isLoading, isError } = useGetTickets();

  return (
    <FlexRow className="gap-16">
      <HomeCharts tickets={data} isLoading={isLoading} isError={isError} />
      <HomeTable tickets={data} isLoading={isLoading} isError={isError} />
    </FlexRow>
  );
};

export default HomeWrapper;
