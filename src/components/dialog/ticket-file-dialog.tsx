"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileSearch } from "lucide-react";
import { Button } from "../ui/button";

interface TicketFileDialogProps {
  ticketNumber: string;
  filePath: string;
}

const TicketFileDialog = ({ filePath, ticketNumber }: TicketFileDialogProps) => {
  const srcPath = `/api/mandaty/${filePath}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <FileSearch className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[70rem] border-border">
        <DialogHeader className="space-y-4">
          <DialogTitle>Numer mandatu - {ticketNumber}</DialogTitle>
          <DialogDescription>
            <iframe src={srcPath} className="w-full h-[48rem]" />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TicketFileDialog;
