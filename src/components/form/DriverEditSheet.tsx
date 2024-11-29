"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Driver } from "@prisma/client";
import DriverEditForm from "./DriverEditForm";

interface DriverEditSheetProps {
  driver?: Driver;
  handleOpenChange: (open: boolean) => void;
}

const DriverEditSheet = ({
  driver,
  handleOpenChange,
}: DriverEditSheetProps) => {
  return (
    <Sheet open={driver !== undefined} onOpenChange={handleOpenChange}>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>
            Kierowca {driver?.name} {driver?.surname}
          </SheetTitle>
          <SheetDescription className="pb-3">
            Edytuj kierowcę podając nowe dane
          </SheetDescription>
          <DriverEditForm
            defaultData={driver}
            closeDialog={() => handleOpenChange(false)}
          />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default DriverEditSheet;
