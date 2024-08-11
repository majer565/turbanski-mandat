import Settings from "@/components/settings/settings";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import FlexColumn from "@/components/wrappers/flex-column-wrapper";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Ustawienia() {
  const session = await verifySession();
  if (!session.userId || !session.userEmail) redirect("/");

  return (
    <FlexColumn>
      <div className="px-8 py-[8px]">
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Ustawienia</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="container mx-auto py-10 space-y-4">
        <div>
          <h3 className="text-lg font-medium">Konto</h3>
          <p className="text-sm text-muted-foreground">Tutaj możesz zarządzać swoim profilem</p>
        </div>
        <Separator />
        <Settings userEmail={session.userEmail as string} />
      </div>
    </FlexColumn>
  );
}
