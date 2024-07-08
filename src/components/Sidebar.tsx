import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FileClock, FilePlus2, Home } from "lucide-react";
import SideBarWrapper from "./wrappers/SideBarWrapper";
import Link from "next/link";

const Sidebar = () => {
  return (
    <SideBarWrapper>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
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
              href="/mandaty"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <FileClock className="h-5 w-5" />
              <span className="sr-only">Historia mandatów</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Historia mandatów</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <FilePlus2 className="h-5 w-5" />
              <span className="sr-only">Dodaj mandat</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Dodaj mandat</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </SideBarWrapper>
  );
};

export default Sidebar;
