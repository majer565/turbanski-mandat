import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import FlexColumn from "@/components/wrappers/flex-column-wrapper";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import HomeCharts from "../../components/charts/home-charts";
import FlexRow from "../../components/wrappers/FlexRowWrapper";
import HomeTable from "../../components/tables/home-table";
import HomeWrapper from "../../components/wrappers/home-wrapper";

export default async function Home() {
  const session = await verifySession();
  if (!session.userId) redirect("/");

  return (
    <FlexColumn>
      <div className="px-8 py-[8px]">
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Strona początkowa</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="container mx-auto py-10">
        <Suspense>
          <HomeWrapper />
        </Suspense>
      </div>
    </FlexColumn>
  );
}
