import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import FlexColumn from "@/components/wrappers/flex-column-wrapper";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";
import TicketEdit from "../../../../components/form/TicketEdit";

export default async function EditTicket() {
  const session = await verifySession();
  if (!session.userId) redirect("/");

  return (
    <FlexColumn>
      <div className="px-8 py-[8px]">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/mandaty">Mandaty</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edytuj mandat</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="container mx-auto py-10">
        <TicketEdit />
      </div>
    </FlexColumn>
  );
}
