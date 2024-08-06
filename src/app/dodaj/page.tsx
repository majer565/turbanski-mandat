import TicketForm from "@/components/form/TicketForm";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import FlexColumn from "@/components/wrappers/flex-column-wrapper";

export default async function AddTicket() {
  return (
    <FlexColumn>
      <div className="px-8 py-[8px]">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Mandaty</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Nowy mandat</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="container mx-auto py-10">
        <TicketForm />
      </div>
    </FlexColumn>
  );
}
