import TicketsTable from "@/components/data-table-implementation/TicketsTable";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import FlexColumn from "@/components/wrappers/flex-column-wrapper";
import { Suspense } from "react";

export default async function Home() {
  return (
    <FlexColumn>
      <div className="px-8 py-[8px]">
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Mandaty</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="container mx-auto py-10">
        <Suspense>
          <TicketsTable />
        </Suspense>
      </div>
    </FlexColumn>
  );
}
