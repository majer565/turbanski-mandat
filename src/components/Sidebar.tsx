import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Ticket, Home, User } from "lucide-react";
import Link from "next/link";
import SideBarWrapper from "./wrappers/SideBarWrapper";

const Sidebar = () => {
  return (
    <SideBarWrapper>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Home className="h-5 w-5" />
              <span className="sr-only">Home</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Home</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Ticket className="h-5 w-5" />
              <span className="sr-only">Mandaty</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Mandaty</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/kierowcy"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <User className="h-5 w-5" />
              <span className="sr-only">Kierowcy</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Kierowcy</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </SideBarWrapper>
  );
};

export default Sidebar;
