"use client";

import { Ticket } from "@prisma/client";
import { useGetTickets } from "../../hooks/useGetTickets";
import HomeCharts from "../charts/home-charts";
import HomeTable from "../tables/home-table";
import FlexRow from "./FlexRowWrapper";
import HomeDriversStatsTable from "../tables/home-driver-stats";

export interface HomeData {
  tickets?: Ticket[];
  isLoading: boolean;
  isError: boolean;
}

const HomeWrapper = () => {
  const { data, isLoading, isError } = useGetTickets();

  return (
    <FlexRow className="gap-16">
      <div className="flex flex-col gap-6 max-w-[30rem]">
        <HomeCharts tickets={data} isLoading={isLoading} isError={isError} />
        <HomeDriversStatsTable />
      </div>
      <HomeTable tickets={data} isLoading={isLoading} isError={isError} />
    </FlexRow>
  );
};

export default HomeWrapper;
