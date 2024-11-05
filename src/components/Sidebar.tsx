import { logout } from "@/actions/auth";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleDotDashed, House, LogOut, Settings, Tickets, User } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import SideBarWrapper from "./wrappers/SideBarWrapper";
import Image from "next/image";
import logoIcon from "../../public/icon.png";

const Sidebar = () => {
  return (
    <SideBarWrapper>
      <TooltipProvider>
        <div className="flex flex-col gap-8 items-center">
          <div>
            <Image src={logoIcon} width={30} height={30} alt={"T"} />
          </div>
          <div className="gap-3 flex flex-col items-center">
          <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/home"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <House className="h-5 w-5" />
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
                  <Tickets className="h-5 w-5" />
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
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/ustawienia"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Ustawienia</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Ustawienia</TooltipContent>
            </Tooltip>
          </div>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <form
              action={async () => {
                "use server";
                await logout();
              }}
            >
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </form>
          </TooltipTrigger>
          <TooltipContent side="right">Wyloguj</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </SideBarWrapper>
  );
};

export default Sidebar;
