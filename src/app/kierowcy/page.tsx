import DriversTable from "@/components/data-table-implementation/DriversTable";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import FlexColumn from "@/components/wrappers/flex-column-wrapper";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function DriversPage() {
  const session = await verifySession();
  if (!session.userId) redirect("/");

  return (
    <FlexColumn>
      <div className="px-8 py-[8px]">
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Kierowcy</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="container mx-auto py-10">
        <Suspense>
          <DriversTable />
        </Suspense>
      </div>
    </FlexColumn>
  );
}
